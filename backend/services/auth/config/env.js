/**
 * @file config/env.js
 * @description Fail-fast environment variable validation.
 *
 * Call validateEnv() as the VERY FIRST thing in index.js, before any imports
 * that read process.env. If any required variable is missing, the process exits
 * immediately with a clear error — no silent failures mid-request.
 */

const REQUIRED_VARS = [
  'PORT',
  'NODE_ENV',
  'MONGO_URI',
  'REDIS_URL',
  'GOOGLE_CLIENT_ID',
  'JWT_ACCESS_SECRET',
  'JWT_ACCESS_EXPIRY',
  'JWT_REFRESH_EXPIRY_DAYS',
  'FRONTEND_URL',
];

export const validateEnv = () => {
  const missing = REQUIRED_VARS.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error(
      '\n[config/env] ❌ Missing required environment variables:\n' +
        missing.map((k) => `  • ${k}`).join('\n') +
        '\n\nCheck your .env file against .env.example and restart.\n'
    );
    process.exit(1);
  }

  console.log('[config/env] ✅ All required environment variables present.');
};
