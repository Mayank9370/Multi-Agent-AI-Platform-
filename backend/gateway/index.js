/**
 * @file index.js
 * @description API Gateway entry point.
 *
 * The gateway is the single public entry point for all AgentFlow clients.
 * It handles:
 *   - CORS enforcement
 *   - Security headers (helmet)
 *   - Request ID generation (forwarded to all downstream services)
 *   - HTTP request logging
 *   - Access token verification for protected routes
 *   - Proxying to downstream microservices
 *
 * Route pattern:
 *   /auth/*     → auth service  (NO JWT verification — auth service self-manages)
 *   /chat/*     → chat service  (JWT verification required)
 *   (future)    → other services (JWT verification required)
 *
 * Graceful shutdown: SIGTERM/SIGINT → stop accepting connections → exit.
 */

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
// import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import proxy from 'express-http-proxy';
import requestId from './middleware/requestId.js';
import { createAuthMiddleware } from './middleware/authProxy.js';
import { AppError, UnauthorizedError } from '../../shared/errors.js';

// ── Validate required env vars ────────────────────────────────────────────────
const REQUIRED_VARS = ['PORT', 'NODE_ENV', 'AUTH_SERVICE', 'JWT_ACCESS_SECRET', 'FRONTEND_URL'];
const missing = REQUIRED_VARS.filter((k) => !process.env[k]);
if (missing.length > 0) {
  console.error('[gateway] ❌ Missing env vars:', missing.join(', '));
  process.exit(1);
}

const app = express();

// ── Trust proxy (required for real client IPs behind load balancers) ──────────
app.set('trust proxy', 1);

// ── Security headers ──────────────────────────────────────────────────────────
// app.use(helmet());

// ── CORS ──────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// ── Request ID ────────────────────────────────────────────────────────────────
// Must be early so all subsequent middleware and logs have access to req.id.
app.use(requestId);

// ── HTTP logging ──────────────────────────────────────────────────────────────
const morganFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(morganFormat));

// ── Cookie + body parsing ─────────────────────────────────────────────────────
// cookieParser is needed to read accessToken cookie in authProxy middleware.
app.use(cookieParser());
app.use(express.json());

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'gateway',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// ── Proxy: Auth service (PUBLIC — no JWT verification) ────────────────────────
// The auth service manages its own session state. The gateway must not
// intercept /auth/* with JWT checks — the tokens don't exist yet at login.
app.use('/auth', proxy(process.env.AUTH_SERVICE));

// ── Protected proxy routes ─────────────────────────────────────────────────────
// All routes below require a valid access token cookie.
// The gateway verifies the JWT and injects x-user-* headers before proxying.
// Downstream services trust those headers without re-verifying the JWT.
// See: backend/gateway/middleware/authProxy.js — TRUST_BOUNDARY_OPTION_A
const authMiddleware = createAuthMiddleware();

app.use('/agent', authMiddleware, proxy(process.env.AGENT_SERVICE || 'http://localhost:8003'));
app.use('/chat', authMiddleware, proxy(process.env.CHAT_SERVICE || 'http://localhost:8002'));

// ── 404 for unmatched routes ──────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

// ── Centralized error handler ─────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const isDev = process.env.NODE_ENV === 'development';
  const requestIdHeader = req.id || 'n/a';

  if (err instanceof AppError) {
    if (isDev) {
      console.error(`[gateway] reqId=${requestIdHeader} status=${err.statusCode} ${err.message}`);
    }
    return res.status(err.statusCode).json({ success: false, message: err.message });
  }

  console.error(`[gateway] reqId=${requestIdHeader} UNEXPECTED:`, err);
  return res.status(500).json({
    success: false,
    message: 'An unexpected gateway error occurred.',
    ...(isDev && { stack: err.stack }),
  });
});

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`[gateway] ✅ Gateway started on port ${PORT} (${process.env.NODE_ENV})`);
});

// ── Graceful shutdown ─────────────────────────────────────────────────────────
const shutdown = (signal) => {
  console.log(`\n[gateway] ${signal} received — initiating graceful shutdown...`);
  server.close(() => {
    console.log('[gateway] HTTP server closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));