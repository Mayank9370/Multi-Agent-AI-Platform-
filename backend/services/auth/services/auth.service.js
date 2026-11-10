/**
 * @file services/auth.service.js
 * @deprecated
 *
 * This file has been replaced by the following focused service modules:
 *
 *   services/google.service.js  — verifyGoogleToken()
 *   services/user.service.js    — findOrCreateUser()
 *   services/token.service.js   — issueTokenPair(), rotateRefreshToken(),
 *                                  validateRefreshToken(), revokeRefreshToken(),
 *                                  revokeAllUserSessions()
 *
 * The original file also had two bugs:
 *   - `OAth2Client` (typo) — corrected to `OAuth2Client`
 *   - `client.verifyidtoken()` (wrong case) — corrected to `verifyIdToken()`
 *
 * This file is no longer imported by anything and will be deleted in a
 * future cleanup pass.
 */