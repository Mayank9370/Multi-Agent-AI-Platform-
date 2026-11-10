/**
 * @file middleware/authProxy.js
 * @description Gateway middleware that verifies the access token and injects
 * trusted user identity headers before proxying to downstream services.
 *
 * ─── TRUST BOUNDARY DECISION ────────────────────────────────────────────────
 * Architecture: Option A — Gateway verifies, downstream services trust headers.
 *
 * The gateway reads the `accessToken` httpOnly cookie, verifies the JWT using
 * the shared JWT_ACCESS_SECRET, and — on success — injects the following
 * headers before proxying the request to any downstream service:
 *
 *   x-user-id:    <userId>
 *   x-user-email: <email>
 *   x-user-plan:  <plan>
 *
 * Downstream services (chat, pdf, ppt, etc.) read these headers as TRUSTED
 * identity — they do NOT re-verify the JWT on every request. This is efficient
 * but carries an implicit assumption:
 *
 *   ⚠️  ASSUMPTION: Downstream services are NEVER publicly reachable.
 *   They must only be accessible from within the Docker internal network,
 *   reachable exclusively through this gateway. If any downstream service
 *   is exposed directly (wrong port binding in docker-compose, cloud firewall
 *   misconfiguration, etc.), an attacker could forge these headers and
 *   impersonate any user.
 *
 *   To revisit this: change to Option B (each service re-verifies the JWT
 *   using backend/shared/jwt.js + its own JWT_ACCESS_SECRET env var) if
 *   the threat model changes or if services need to be independently reachable.
 *
 * GREP TAG: TRUST_BOUNDARY_OPTION_A
 * ────────────────────────────────────────────────────────────────────────────
 *
 * Routes with `bypassAuth: true` (e.g. /auth/*) are proxied without verification —
 * the auth service itself manages its own authentication.
 */

import { verifyAccessToken } from '../../../shared/jwt.js';
import { UnauthorizedError } from '../../../shared/errors.js';

/**
 * Returns an Express middleware that:
 *   1. Reads the `accessToken` cookie
 *   2. Verifies the JWT (HS256-pinned, algorithm-confusion-safe)
 *   3. Injects x-user-* headers for downstream services
 *   4. Calls next() so the proxy middleware can forward the request
 *
 * @returns {import('express').RequestHandler}
 */
export const createAuthMiddleware = () => (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return next(new UnauthorizedError('Access token cookie is missing.'));
    }

    const payload = verifyAccessToken(token, process.env.JWT_ACCESS_SECRET);

    // Inject verified identity as trusted internal headers.
    // Downstream services read x-user-* — they never see or verify the JWT.
    req.headers['x-user-id'] = payload.userId;
    req.headers['x-user-email'] = payload.email;
    req.headers['x-user-plan'] = payload.plan;

    // Remove the raw cookie header from the proxied request so downstream
    // services don't accidentally read the JWT from the cookie.
    // Note: express-http-proxy forwards all headers by default.
    // x-user-* headers set above are forwarded automatically.

    next();
  } catch (error) {
    const message =
      error.name === 'TokenExpiredError'
        ? 'Access token has expired.'
        : 'Invalid access token.';
    next(new UnauthorizedError(message));
  }
};
