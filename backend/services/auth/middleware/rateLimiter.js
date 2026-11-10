/**
 * @file middleware/rateLimiter.js
 * @description Per-route rate limiters using express-rate-limit.
 *
 * Limits are intentionally conservative for auth endpoints:
 *   - googleLoginLimiter: 10 attempts per 15 minutes per IP
 *     (defends against brute-forcing Google ID tokens at our endpoint)
 *   - refreshLimiter: 20 attempts per 15 minutes per IP
 *     (defends against refresh token brute-force and DoS on the rotate path)
 *
 * In production, if the service runs behind a reverse proxy (Nginx, load
 * balancer), set `app.set('trust proxy', 1)` in index.js so express-rate-limit
 * reads the real client IP from X-Forwarded-For rather than the proxy's IP.
 */

import rateLimit from 'express-rate-limit';

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

/** Applied to POST /auth/google */
export const googleLoginLimiter = rateLimit({
  windowMs: WINDOW_MS,
  max: 10,
  standardHeaders: true,  // Return RateLimit-* headers (RFC 6585)
  legacyHeaders: false,   // Disable deprecated X-RateLimit-* headers
  message: {
    success: false,
    message: 'Too many login attempts. Please try again in 15 minutes.',
  },
});

/** Applied to POST /auth/refresh */
export const refreshLimiter = rateLimit({
  windowMs: WINDOW_MS,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many token refresh attempts. Please try again in 15 minutes.',
  },
});
