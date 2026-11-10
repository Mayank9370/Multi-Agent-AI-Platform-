/**
 * @file model/auth.model.js
 * @description Mongoose User schema for AgentFlow authentication.
 *
 * Fields added vs. original:
 *   - plan:      billing tier, embedded in JWT payload so downstream services
 *                can gate features without a DB call.
 *   - lastLogin: updated on every Google sign-in, useful for analytics and
 *                "last seen" displays.
 *
 * Fields removed vs. original:
 *   - isActive:  not used in the auth flow; can be re-added if soft-delete
 *                functionality is required in a future pass.
 */

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
      sparse: true, // allows null while still enforcing uniqueness on non-null values
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    profileImage: {
      type: String,
      default: null,
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },

    /**
     * Billing tier. Embedded in the JWT access token payload so downstream
     * services can enforce feature gates without querying the database.
     * Upgrade/downgrade is applied at next login (token rotation).
     */
    plan: {
      type: String,
      enum: ['free', 'pro', 'enterprise'],
      default: 'free',
    },

    /** Timestamp of the most recent successful login. */
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const User = mongoose.model('User', userSchema);

export default User;