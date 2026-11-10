/**
 * @file jwt.js
 * @description Shared JWT sign/verify utilities for AgentFlow.
 *
 * ─── SECURITY NOTE — Algorithm Pinning ──────────────────────────────────────
 * The algorithm is explicitly pinned to HS256 on BOTH sign and verify.
 * This closes the "algorithm confusion" class of attacks where a forged token
 * with `alg: none` or `alg: RS256` would pass validation if the library were
 * allowed to infer the algorithm from the token header.
 *
 * References:
 *   - CVE-2015-9235 (Auth0 jwt-simple none-algorithm bypass)
 *   - https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/
 * ────────────────────────────────────────────────────────────────────────────
 *
 * Imported by: backend/services/auth (sign + verify), backend/gateway (verify only).
 * Any future downstream service that needs self-sufficient JWT verification can
 * also import from here using its own JWT_ACCESS_SECRET env var.
 */

import jwt from 'jsonwebtoken';

/** Only HS256 is accepted — never let the library infer from token header. */
const ALGORITHM = 'HS256';

/**
 * Signs an access token JWT.
 *
 * @param {object} payload   - Claims to embed. Should be minimal: { userId, email, plan }.
 * @param {string} secret    - Signing secret from JWT_ACCESS_SECRET env var.
 * @param {string} expiresIn - Expiry string e.g. '15m', '1h'. From JWT_ACCESS_EXPIRY env var.
 * @returns {string} Signed JWT string.
 */
export const signAccessToken = (payload, secret, expiresIn) => {
  return jwt.sign(payload, secret, {
    algorithm: ALGORITHM,
    expiresIn,
  });
};

/**
 * Verifies an access token JWT.
 *
 * @param {string} token  - JWT string from cookie.
 * @param {string} secret - Verification secret. Must be the same JWT_ACCESS_SECRET used to sign.
 * @returns {object} Decoded payload if valid.
 * @throws {JsonWebTokenError | TokenExpiredError} If token is invalid or expired.
 */
export const verifyAccessToken = (token, secret) => {
  return jwt.verify(token, secret, {
    algorithms: [ALGORITHM], // array — rejects any other algorithm in the token header
  });
};
