/**
 * @file services/google.service.js
 * @description Server-side Google ID token verification.
 *
 * The frontend receives a Google ID token via the Google Identity Services
 * button callback and forwards it to POST /auth/google. This service verifies
 * that token against Google's public keys — we never trust the frontend's
 * claim of identity.
 *
 * The original auth.service.js had two bugs that would cause runtime failures:
 *   - `OAth2Client` (typo — should be OAuth2Client)
 *   - `client.verifyidtoken(...)` (wrong case — should be verifyIdToken)
 * Both are fixed here.
 */

import { OAuth2Client } from 'google-auth-library';
import { UnauthorizedError } from '../../../shared/errors.js';

// Instantiate once at module load — the client caches Google's public keys
// internally, so this avoids a fresh JWKS fetch on every login request.
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Verifies a Google ID token received from the frontend.
 *
 * @param {string} idToken - The credential string from Google Identity Services.
 * @returns {Promise<object>} Verified Google payload (sub, name, email, picture, email_verified).
 * @throws {UnauthorizedError} If the token is invalid, expired, or the email is unverified.
 */
export const verifyGoogleToken = async (idToken) => {
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload.email_verified) {
      throw new UnauthorizedError('Google account email is not verified.');
    }

    return payload;
  } catch (error) {
    // Re-throw our own operational errors unchanged.
    if (error instanceof UnauthorizedError) throw error;
    // Wrap google-auth-library errors (invalid token, expired, wrong audience, etc.)
    throw new UnauthorizedError('Google ID token verification failed.');
  }
};
