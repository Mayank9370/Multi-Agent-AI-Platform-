/**
 * @file routes/auth.router.js
 * @description Auth route definitions — HTTP verb + path → middleware chain → controller.
 *
 * This file contains NO logic. It only wires:
 *   rate limiter → input validator → controller
 *
 * Route summary:
 *   POST /auth/google      — Public. Google OAuth login. Rate-limited + validated.
 *   POST /auth/refresh     — Public. Rotate refresh token. Rate-limited.
 *   POST /auth/logout      — Public (works even with expired access token).
 *   POST /auth/logout-all  — Protected (valid access token required).
 *   GET  /auth/me          — Protected (valid access token required).
 */

import express from 'express';

import { googleLoginLimiter, refreshLimiter } from '../middleware/rateLimiter.js';
import { validate, googleLoginSchema } from '../middleware/validate.js';
import verifyAccessToken from '../middleware/verifyAccessToken.js';

import {
  googleLoginController,
  refreshController,
  logoutController,
  logoutAllController,
  getMeController,
} from '../controller/auth.controller.js';

const authRouter = express.Router();

// ── Public routes ─────────────────────────────────────────────────────────────

authRouter.post(
  '/google',
  googleLoginLimiter,
  validate(googleLoginSchema),
  googleLoginController
);

authRouter.post(
  '/refresh',
  refreshLimiter,
  refreshController
);

authRouter.post(
  '/logout',
  logoutController
);

// ── Protected routes (require valid access token cookie) ──────────────────────

authRouter.post(
  '/logout-all',
  verifyAccessToken,
  logoutAllController
);

authRouter.get(
  '/me',
  verifyAccessToken,
  getMeController
);

export default authRouter;