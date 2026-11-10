/**
 * @file config/redis.js
 * @description Redis client singleton for the auth service.
 *
 * Exports both the client instance (for direct use in services) and
 * a connectRedis() async function called at server startup.
 * Exits the process on connection failure — no Redis means no refresh token
 * support, which makes the auth service non-functional.
 */

import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on('error', (error) => {
  console.error('[redis] Error:', error.message);
});

redisClient.on('reconnecting', () => {
  console.warn('[redis] Reconnecting...');
});

redisClient.on('ready', () => {
  console.log('[redis] ✅ Redis connected and ready.');
});

/**
 * Opens the Redis connection. Call this at service startup and await it
 * before calling app.listen() — ensures Redis is ready before serving requests.
 */
export const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
  } catch (error) {
    console.error('[redis] ❌ Redis connection failed:', error.message);
    process.exit(1);
  }
};

export default redisClient;