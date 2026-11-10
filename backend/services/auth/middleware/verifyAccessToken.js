/**
 * @file middleware/verifyAccessToken.js
 * @description Express middleware that verifies the access token JWT from cookies.
 *
 * On success: attaches `req.user = { userId, email, plan }` and calls next().
 * On failure: calls next(UnauthorizedError) — caught by the central error handler.
 *
 * Used on protected routes within the auth service (e.g. GET /auth/me,
 * POST /auth/logout-all). The gateway has its own equivalent in
 * backend/gateway/middleware/authProxy.js.
 */

import { verifyAccessToken as verifyJwt } from '../../../shared/jwt.js';
import { UnauthorizedError } from '../../../shared/errors.js';

/**
 * @param {import('express').Request}  req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const verifyAccessToken = (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return next(new UnauthorizedError('Access token cookie is missing.'));
    }

    const payload = verifyJwt(token, process.env.JWT_ACCESS_SECRET);

    // Attach minimal decoded claims — controllers read from req.user.
    req.user = {
      userId: payload.userId,
      email: payload.email,
      plan: payload.plan,
    };

    next();
  } catch (error) {
    // JsonWebTokenError, TokenExpiredError, NotBeforeError all map to 401.
    const message =
      error.name === 'TokenExpiredError'
        ? 'Access token has expired.'
        : 'Invalid access token.';
    next(new UnauthorizedError(message));
  }
};

export default verifyAccessToken;