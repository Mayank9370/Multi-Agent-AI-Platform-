/**
 * @file middleware/errorHandler.js
 * @description Centralized Express error handling middleware.
 *
 * Must be registered LAST in index.js (after all routes) as a 4-argument
 * middleware: (err, req, res, next).
 *
 * Behaviour:
 *   - AppError subclasses (operational errors): return their statusCode + message.
 *   - Mongoose ValidationError: normalise to 400.
 *   - JWT errors (JsonWebTokenError, TokenExpiredError): normalise to 401.
 *   - Everything else: 500, with stack trace in development only.
 *
 * In production, raw stack traces are NEVER sent to the client — they are
 * only written to server-side logs (console.error).
 */

import { AppError } from '../../../shared/errors.js';

/**
 * @param {Error}                      err
 * @param {import('express').Request}  req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next  - Required signature; must be declared even if unused.
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const isDev = process.env.NODE_ENV === 'development';
  const requestId = req.headers['x-request-id'] || 'n/a';

  // ── Operational errors (thrown intentionally via AppError subclasses) ──
  if (err instanceof AppError) {
    if (isDev) {
      console.error(`[error] reqId=${requestId} status=${err.statusCode} ${err.message}`);
    }

    const body = {
      success: false,
      message: err.message,
      ...(err.errors && { errors: err.errors }), // ValidationError field details
    };

    return res.status(err.statusCode).json(body);
  }

  // ── Mongoose validation errors ─────────────────────────────────────────
  if (err.name === 'ValidationError' && err.errors) {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: 'Database validation failed.',
      errors: messages,
    });
  }

  // ── JWT errors (not caught by verifyAccessToken middleware) ────────────
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }

  // ── Unexpected errors ──────────────────────────────────────────────────
  console.error(`[error] reqId=${requestId} UNEXPECTED:`, err);

  return res.status(500).json({
    success: false,
    message: 'An unexpected error occurred.',
    // Stack is included in dev responses only — never in production.
    ...(isDev && { stack: err.stack }),
  });
};

export default errorHandler;