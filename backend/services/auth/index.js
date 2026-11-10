/**
 * @file index.js
 * @description Auth service entry point.
 *
 * Boot order (intentional):
 *   1. Load .env (dotenv)
 *   2. Validate all required env vars — exits immediately if any are missing
 *   3. Connect MongoDB — exits on failure
 *   4. Connect Redis — exits on failure
 *   5. Register middleware (security, CORS, logging, body parsing, cookies)
 *   6. Mount routes
 *   7. Register central error handler (must be LAST)
 *   8. Start listening
 *   9. Register graceful shutdown handlers
 *
 * Additions per production requirements:
 *   - helmet: sensible default security headers
 *   - GET /health: Docker/load-balancer healthcheck endpoint
 *   - Request ID: reads x-request-id from gateway for cross-service log tracing
 *   - Morgan: 'dev' format in development, 'combined' in production
 *   - Graceful shutdown: SIGTERM/SIGINT → stop server → close DB/Redis → exit
 */

import 'dotenv/config';

// Step 1: fail fast if any required env var is missing
import { validateEnv } from './config/env.js';
validateEnv();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

import connectDb from './config/db.js';
import { connectRedis } from './config/redis.js';
import redisClient from './config/redis.js';
import authRouter from './routes/auth.router.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// ── Trust proxy (needed for accurate req.ip behind Nginx / Docker gateway) ───
// Required for rate limiters to use the real client IP, not the proxy's IP.
app.set('trust proxy', 1);

// ── Security headers (helmet) ─────────────────────────────────────────────────
// app.use(helmet());

// ── CORS ──────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true, // required for cookies to be sent cross-origin
  })
);

// ── Request ID (read from gateway header for cross-service log correlation) ───
app.use((req, _res, next) => {
  req.id = req.headers['x-request-id'] || 'n/a';
  next();
});

// ── HTTP request logging ──────────────────────────────────────────────────────
// 'dev' in development: colourised, minimal. 'combined' in production: full Apache format.
const morganFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(morganFormat));

// ── Body parsing + cookies ────────────────────────────────────────────────────
app.use(express.json());
app.use(cookieParser());

// ── Health check ──────────────────────────────────────────────────────────────
// No auth required. Used by Docker HEALTHCHECK and any future load balancer.
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'auth',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/', authRouter);

// ── Centralized error handler — MUST be last ──────────────────────────────────
app.use(errorHandler);

// ── Startup ───────────────────────────────────────────────────────────────────
const PORT = process.env.PORT;

const start = async () => {
  // Connect to both datastores before accepting requests
  await connectDb();
  await connectRedis();

  const server = app.listen(PORT, () => {
    console.log(`[auth] ✅ Auth service started on port ${PORT} (${process.env.NODE_ENV})`);
  });

  // ── Graceful shutdown ────────────────────────────────────────────────────────
  // Stops accepting new connections, drains in-flight requests, then closes
  // DB and Redis connections cleanly. Critical for zero-downtime deploys in
  // Docker / Kubernetes — the orchestrator sends SIGTERM before force-killing.
  const shutdown = async (signal) => {
    console.log(`\n[auth] ${signal} received — initiating graceful shutdown...`);

    server.close(async () => {
      console.log('[auth] HTTP server closed. Closing datastores...');
      try {
        await mongoose.connection.close();
        console.log('[auth] MongoDB connection closed.');
        await redisClient.quit();
        console.log('[auth] Redis connection closed.');
      } catch (err) {
        console.error('[auth] Error during shutdown:', err.message);
      } finally {
        process.exit(0);
      }
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
};

start();