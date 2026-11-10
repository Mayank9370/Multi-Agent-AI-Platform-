/**
 * @file controller/auth.controller.js
 * @description Auth route controllers — thin orchestration layer only.
 *
 * Each controller:
 *   1. Reads validated input from req.body / req.cookies / req.user
 *   2. Delegates ALL business logic to the services layer
 *   3. Sets cookies and sends the response
 *
 * No direct DB queries, no Redis calls, no JWT operations here.
 */

import { verifyGoogleToken } from '../services/google.service.js';
import { findOrCreateUser } from '../services/user.service.js';
import {
  issueTokenPair,
  validateRefreshToken,
  rotateRefreshToken,
  revokeRefreshToken,
  revokeAllUserSessions,
} from '../services/token.service.js';
import { getCookieOptions } from '../utils/cookie.utils.js';
import { UnauthorizedError } from '../../../shared/errors.js';
import User from '../model/auth.model.js';

// ─── Helper: extract device metadata from request ────────────────────────────

const getDeviceInfo = (req) => ({
  userAgent: req.headers['user-agent'] || 'unknown',
  ip: req.ip || req.headers['x-forwarded-for'] || 'unknown',
});

// ─── POST /auth/google ───────────────────────────────────────────────────────

/**
 * Verifies a Google ID token, finds/creates the user, and issues token cookies.
 */
export const googleLoginController = async (req, res, next) => {
  try {
    const { credential } = req.body; // already validated by zod middleware

    // 1. Verify identity with Google — never trust frontend's claim
    const googlePayload = await verifyGoogleToken(credential);
    const { sub: googleId, name, email, picture } = googlePayload;

    // 2. Find or create the user in MongoDB
    const user = await findOrCreateUser({ googleId, name, email, picture });

    // 3. Issue access JWT + opaque refresh token, stored in Redis
    const deviceInfo = getDeviceInfo(req);
    const { accessToken, refreshToken } = await issueTokenPair(user, deviceInfo);

    // 4. Set both as httpOnly cookies — JS can never read these
    res.cookie('accessToken', accessToken, getCookieOptions('access'));
    res.cookie('refreshToken', refreshToken, getCookieOptions('refresh'));

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role,
        plan: user.plan,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ─── POST /auth/refresh ──────────────────────────────────────────────────────

/**
 * Rotates the refresh token. Detects replayed (stolen) tokens and revokes
 * all sessions for the affected user as a containment measure.
 */
export const refreshController = async (req, res, next) => {
  try {
    const tokenId = req.cookies?.refreshToken;

    if (!tokenId) {
      return next(new UnauthorizedError('Refresh token cookie is missing.'));
    }

    const result = await validateRefreshToken(tokenId);

    if (!result.valid) {
      if (result.stolen) {
        // ⚠️  Token was previously valid but has already been used/rotated.
        // This indicates a possible theft — revoke all sessions as containment.
        console.warn(`[auth] 🚨 Refresh token reuse detected for userId=${result.userId}. Revoking all sessions.`);
        await revokeAllUserSessions(result.userId);

        // Clear cookies on the current client too
        res.clearCookie('accessToken', getCookieOptions('clear'));
        res.clearCookie('refreshToken', getCookieOptions('clear'));

        return res.status(401).json({
          success: false,
          message: 'Session security violation detected. All sessions have been revoked. Please log in again.',
        });
      }

      // Token was never issued — reject silently
      return next(new UnauthorizedError('Invalid refresh token.'));
    }

    // Valid token — rotate: delete old, issue new
    const deviceInfo = getDeviceInfo(req);
    const { accessToken, refreshToken } = await rotateRefreshToken(
      tokenId,
      result.session,
      deviceInfo
    );

    res.cookie('accessToken', accessToken, getCookieOptions('access'));
    res.cookie('refreshToken', refreshToken, getCookieOptions('refresh'));

    return res.status(200).json({ success: true, message: 'Token refreshed.' });
  } catch (error) {
    next(error);
  }
};

// ─── POST /auth/logout ───────────────────────────────────────────────────────

/**
 * Revokes the current device's refresh token and clears cookies.
 * Does NOT require the access token — logout should work even if the
 * access token has expired.
 */
export const logoutController = async (req, res, next) => {
  try {
    const tokenId = req.cookies?.refreshToken;

    if (tokenId) {
      // Fetch session data to get userId (needed to clean up user_sessions Set)
      const result = await validateRefreshToken(tokenId);
      if (result.valid) {
        await revokeRefreshToken(tokenId, result.session.userId);
      }
    }

    res.clearCookie('accessToken', getCookieOptions('clear'));
    res.clearCookie('refreshToken', getCookieOptions('clear'));

    return res.status(200).json({ success: true, message: 'Logged out successfully.' });
  } catch (error) {
    next(error);
  }
};

// ─── POST /auth/logout-all ───────────────────────────────────────────────────

/**
 * Revokes ALL sessions for the authenticated user (all devices).
 * Protected — requires a valid access token (verifyAccessToken middleware runs first).
 * req.user is set by the middleware.
 */
export const logoutAllController = async (req, res, next) => {
  try {
    const { userId } = req.user;

    await revokeAllUserSessions(userId);

    res.clearCookie('accessToken', getCookieOptions('clear'));
    res.clearCookie('refreshToken', getCookieOptions('clear'));

    return res.status(200).json({
      success: true,
      message: 'All sessions revoked. You have been logged out from all devices.',
    });
  } catch (error) {
    next(error);
  }
};

// ─── GET /auth/me ────────────────────────────────────────────────────────────

/**
 * Returns the current user's profile.
 * Protected — req.user set by verifyAccessToken middleware.
 */
export const getMeController = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId).select(
      'name email profileImage role plan createdAt lastLogin'
    );

    if (!user) {
      return next(new UnauthorizedError('User account not found.'));
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role,
        plan: user.plan,
        memberSince: user.createdAt,
        lastLogin: user.lastLogin,
      },
    });
  } catch (error) {
    next(error);
  }
};