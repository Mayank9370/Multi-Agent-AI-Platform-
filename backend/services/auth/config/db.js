/**
 * @file config/db.js
 * @description MongoDB connection via Mongoose.
 *
 * Exits the process on connection failure so the auth service never starts
 * in a degraded state without a database. Docker will restart the container.
 */

import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('[db] ✅ MongoDB connected.');
  } catch (error) {
    console.error('[db] ❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDb;