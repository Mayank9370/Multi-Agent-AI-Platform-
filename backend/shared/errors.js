/**
 * @file errors.js
 * @description Custom error class hierarchy for AgentFlow.
 *
 * All operational errors extend AppError so the centralized error handler can
 * distinguish them from unexpected programming errors (which become 500s).
 *
 * Imported by: all backend services and the gateway via relative path.
 */

// ---------------------------------------------------------------------------
// Base operational error
// ---------------------------------------------------------------------------

export class AppError extends Error {
  /**
   * @param {string} message   - Human-readable error description.
   * @param {number} statusCode - HTTP status code to send to the client.
   */
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    /** Flag to distinguish operational errors from programming bugs. */
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// ---------------------------------------------------------------------------
// Specific error types
// ---------------------------------------------------------------------------

/** 400 — Request body failed schema validation. */
export class ValidationError extends AppError {
  /**
   * @param {string}   message - Top-level error message.
   * @param {string[]} errors  - Array of field-level error strings.
   */
  constructor(message = 'Validation failed', errors = []) {
    super(message, 400);
    this.errors = errors;
  }
}

/** 401 — Missing, invalid, or expired credentials. */
export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

/** 403 — Authenticated but lacks permission. */
export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(message, 403);
  }
}

/** 404 — Resource not found. */
export class NotFoundError extends AppError {
  constructor(message = 'Not found') {
    super(message, 404);
  }
}

/** 429 — Too many requests (supplement express-rate-limit). */
export class TooManyRequestsError extends AppError {
  constructor(message = 'Too many requests — please try again later') {
    super(message, 429);
  }
}
