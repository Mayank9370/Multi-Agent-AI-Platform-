/**
 * @file redux/store.js
 * @description Redux Toolkit store configuration for AgentFlow.
 *
 * Currently registers a single slice:
 *   - auth: manages authenticated user state (replaces AuthContext)
 */

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;