/**
 * @file services/user.service.js
 * @description User find-or-create logic, isolated from Google token verification
 * and token issuance. Pure DB operations — no JWT, no Redis, no cookies.
 */

import User from '../model/auth.model.js';

/**
 * Finds an existing user by Google ID, or creates a new one.
 *
 * Edge case handled: if a user exists with the same email but a different
 * Google ID (e.g., registered earlier with another method), we link the
 * Google ID to that account rather than creating a duplicate.
 *
 * @param {object} params
 * @param {string} params.googleId - Google `sub` claim (stable unique identifier).
 * @param {string} params.name     - Display name from Google payload.
 * @param {string} params.email    - Email from Google payload (already verified).
 * @param {string} params.picture  - Profile image URL from Google payload.
 * @returns {Promise<import('mongoose').Document>} The user document (new or existing).
 */
export const findOrCreateUser = async ({ googleId, name, email, picture }) => {
  // 1. Fast path: user already exists and has logged in via Google before.
  let user = await User.findOne({ googleId });

  if (user) {
    user.lastLogin = new Date();
    await user.save();
    return user;
  }

  // 2. Email collision: account exists from a previous auth method.
  //    Link the Google ID rather than rejecting or duplicating.
  user = await User.findOne({ email });

  if (user) {
    user.googleId = googleId;
    user.lastLogin = new Date();
    // Only update profile image if the account has none yet.
    if (picture && !user.profileImage) {
      user.profileImage = picture;
    }
    await user.save();
    return user;
  }

  // 3. New user — create with defaults.
  user = await User.create({
    googleId,
    name,
    email,
    profileImage: picture || null,
    role: 'user',
    plan: 'free',
    lastLogin: new Date(),
  });

  return user;
};
