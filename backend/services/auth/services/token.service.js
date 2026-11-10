/**
 * @file services/token.service.js
 * @description All token lifecycle operations: issue, rotate, revoke, validate.
 *
 * ─── Refresh Token Design ───────────────────────────────────────────────────
 * Refresh tokens are opaque UUIDs — NOT JWTs. Their validity record is stored
 * in Redis and Redis is the single source of truth for session state.
 *
 * Redis key schema:
 *   session:{tokenId}  → JSON { userId, email, plan, deviceInfo, issuedAt }
 *                         TTL = JWT_REFRESH_EXPIRY_DAYS * 86400 seconds
 *
 *   used:{tokenId}     → userId string (tombstone)
 *                         TTL = same as session (so old tokens are trackable
 *                         within their original validity window)
 *
 *   user_sessions:{userId} → Redis Set of active tokenIds
 *                            (no TTL — lazily cleaned up on access)
 *
 * ─── Reuse / Theft Detection ────────────────────────────────────────────────
 * When a refresh token is rotated (old deleted, new issued), a tombstone key
 * `used:{oldTokenId}` is written. If a client later presents that same old
 * tokenId and `session:{tokenId}` is gone but `used:{tokenId}` exists, we
 * know the token was previously valid and has been replayed — possible theft.
 * Response: revoke ALL sessions for that userId (nuclear option) + 401.
 *
 * If neither key exists, the tokenId was never issued — silent 401, no action.
 *
 * ─── Session Cap ────────────────────────────────────────────────────────────
 * MAX_SESSIONS_PER_USER = 5. Before issuing a new session, we count active
 * sessions via the user_sessions Set. If at/above the cap, the oldest session
 * (by issuedAt) is evicted. This matches standard consumer-app behaviour
 * ("new device signed in, oldest session removed").
 * ────────────────────────────────────────────────────────────────────────────
 */

import { randomUUID } from 'crypto';
import redisClient from '../config/redis.js';
import { signAccessToken } from '../../../shared/jwt.js';

const MAX_SESSIONS_PER_USER = 5;

// ─── Key builders ────────────────────────────────────────────────────────────

const sessionKey = (tokenId) => `session:${tokenId}`;
const usedKey = (tokenId) => `used:${tokenId}`;
const userSessionsKey = (userId) => `user_sessions:${userId}`;

// ─── Helpers ─────────────────────────────────────────────────────────────────

const getRefreshTtlSeconds = () =>
  parseInt(process.env.JWT_REFRESH_EXPIRY_DAYS, 10) * 24 * 60 * 60;

/**
 * Counts and enforces the per-user session cap.
 * Evicts the oldest session if the user is at or above MAX_SESSIONS_PER_USER.
 * Performs lazy cleanup of stale tokenIds in the user_sessions Set.
 *
 * @param {string} userId
 */
const enforceSessionLimit = async (userId) => {
  const setKey = userSessionsKey(userId);
  const members = await redisClient.sMembers(setKey);

  if (members.length < MAX_SESSIONS_PER_USER) return;

  // Fetch all active sessions and clean up stale Set entries simultaneously.
  const activeSessions = [];

  for (const tokenId of members) {
    const raw = await redisClient.get(sessionKey(tokenId));
    if (raw) {
      activeSessions.push({ tokenId, ...JSON.parse(raw) });
    } else {
      // Session expired naturally — remove from Set (lazy cleanup).
      await redisClient.sRem(setKey, tokenId);
    }
  }

  if (activeSessions.length < MAX_SESSIONS_PER_USER) return;

  // Sort ascending by issuedAt — oldest first.
  activeSessions.sort((a, b) => a.issuedAt - b.issuedAt);

  // Evict oldest sessions until we're one below the cap (leaving room for new one).
  while (activeSessions.length >= MAX_SESSIONS_PER_USER) {
    const oldest = activeSessions.shift();
    const ttl = await redisClient.ttl(sessionKey(oldest.tokenId));
    const remainingTtl = ttl > 0 ? ttl : getRefreshTtlSeconds();

    const pipeline = redisClient.multi();
    pipeline.del(sessionKey(oldest.tokenId));
    pipeline.set(usedKey(oldest.tokenId), oldest.userId, { EX: remainingTtl });
    pipeline.sRem(setKey, oldest.tokenId);
    await pipeline.exec();
  }
};

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Issues a new access + refresh token pair for the given user.
 * Enforces session cap before creating the new session.
 *
 * @param {object} user       - Mongoose User document.
 * @param {object} deviceInfo - Optional metadata (userAgent, ip) for this session.
 * @returns {Promise<{ accessToken: string, refreshToken: string }>}
 */
export const issueTokenPair = async (user, deviceInfo = {}) => {
  const userId = user._id.toString();

  await enforceSessionLimit(userId);

  // Sign short-lived access JWT — minimal claims only.
  const accessToken = signAccessToken(
    { userId, email: user.email, plan: user.plan },
    process.env.JWT_ACCESS_SECRET,
    process.env.JWT_ACCESS_EXPIRY
  );

  // Opaque refresh token = UUID (122 bits of randomness, sufficient for session token).
  const tokenId = randomUUID();
  const ttlSeconds = getRefreshTtlSeconds();

  const sessionData = JSON.stringify({
    userId,
    email: user.email,
    plan: user.plan,
    deviceInfo,
    issuedAt: Date.now(),
  });

  // Atomic pipeline: write session + add to user's session set.
  const pipeline = redisClient.multi();
  pipeline.setEx(sessionKey(tokenId), ttlSeconds, sessionData);
  pipeline.sAdd(userSessionsKey(userId), tokenId);
  await pipeline.exec();

  return { accessToken, refreshToken: tokenId };
};

/**
 * Validates a refresh tokenId against Redis.
 *
 * @param {string} tokenId - The UUID from the refreshToken cookie.
 * @returns {Promise<
 *   { valid: true, session: object } |
 *   { valid: false, stolen: true,  userId: string } |
 *   { valid: false, stolen: false }
 * >}
 */
export const validateRefreshToken = async (tokenId) => {
  // Primary lookup — is this an active session?
  const raw = await redisClient.get(sessionKey(tokenId));
  if (raw) {
    return { valid: true, session: JSON.parse(raw) };
  }

  // Tombstone lookup — was this token ever valid?
  const userId = await redisClient.get(usedKey(tokenId));
  if (userId) {
    // Token existed but was already used/rotated → possible theft.
    return { valid: false, stolen: true, userId };
  }

  // Token was never issued (random/guessed tokenId) → silent reject.
  return { valid: false, stolen: false };
};

/**
 * Rotates a refresh token: atomically deletes the old session, writes a
 * tombstone, and issues a new token pair.
 *
 * @param {string} oldTokenId  - The tokenId from the incoming refreshToken cookie.
 * @param {object} session     - Session data from validateRefreshToken.
 * @param {object} deviceInfo  - Device metadata for the new session entry.
 * @returns {Promise<{ accessToken: string, refreshToken: string }>}
 */
export const rotateRefreshToken = async (oldTokenId, session, deviceInfo = {}) => {
  const { userId, email, plan } = session;
  const ttlSeconds = getRefreshTtlSeconds();

  // Invalidate old session atomically.
  const pipeline = redisClient.multi();
  pipeline.del(sessionKey(oldTokenId));
  pipeline.set(usedKey(oldTokenId), userId, { EX: ttlSeconds });
  pipeline.sRem(userSessionsKey(userId), oldTokenId);
  await pipeline.exec();

  // Issue new token pair. Build a minimal user-like object for signAccessToken.
  const newTokenId = randomUUID();
  const newAccessToken = signAccessToken(
    { userId, email, plan },
    process.env.JWT_ACCESS_SECRET,
    process.env.JWT_ACCESS_EXPIRY
  );

  const newSessionData = JSON.stringify({
    userId,
    email,
    plan,
    deviceInfo,
    issuedAt: Date.now(),
  });

  const newPipeline = redisClient.multi();
  newPipeline.setEx(sessionKey(newTokenId), ttlSeconds, newSessionData);
  newPipeline.sAdd(userSessionsKey(userId), newTokenId);
  await newPipeline.exec();

  return { accessToken: newAccessToken, refreshToken: newTokenId };
};

/**
 * Revokes a single refresh token session.
 *
 * @param {string} tokenId - The tokenId to revoke.
 * @param {string} userId  - Needed to clean up the user_sessions Set.
 */
export const revokeRefreshToken = async (tokenId, userId) => {
  const ttlSeconds = getRefreshTtlSeconds();

  const pipeline = redisClient.multi();
  pipeline.del(sessionKey(tokenId));
  pipeline.set(usedKey(tokenId), userId, { EX: ttlSeconds });
  pipeline.sRem(userSessionsKey(userId), tokenId);
  await pipeline.exec();
};

/**
 * Revokes ALL active sessions for a user (logout-all-devices, or theft response).
 *
 * @param {string} userId
 */
export const revokeAllUserSessions = async (userId) => {
  const setKey = userSessionsKey(userId);
  const members = await redisClient.sMembers(setKey);

  if (members.length === 0) return;

  const ttlSeconds = getRefreshTtlSeconds();
  const pipeline = redisClient.multi();

  for (const tokenId of members) {
    pipeline.del(sessionKey(tokenId));
    pipeline.set(usedKey(tokenId), userId, { EX: ttlSeconds });
  }

  pipeline.del(setKey);
  await pipeline.exec();
};
