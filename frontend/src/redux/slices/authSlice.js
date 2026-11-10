/**
 * @file redux/slices/authSlice.js
 * @description Redux Toolkit slice that manages the authenticated user's state.
 *
 * Replaces the former AuthContext. The slice manages:
 *   - user   (object | null)  — the authenticated user profile
 *   - loading (boolean)       — true until the initial /auth/me hydration completes
 *
 * Async thunks:
 *   - hydrateAuth      — calls GET /auth/me to restore session from cookies on app start
 *   - logoutUser        — calls POST /auth/logout then clears user
 *   - logoutAllSessions — calls POST /auth/logout-all then clears user
 *
 * Sync actions:
 *   - setUser(profile)  — directly sets the user (e.g. after Google login callback)
 *
 * The existing API layer (authService / apiClient) is consumed unchanged.
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMe, logout as apiLogout, logoutAll as apiLogoutAll } from '../../services/authService.js';

// ── Async Thunks ─────────────────────────────────────────────────────────────

/**
 * Hydrate auth state from cookies on app start.
 * Mirrors the former AuthProvider useEffect.
 *
 * - On success: returns the user profile object.
 * - On failure (401 / no session): returns null (not an error — expected when
 *   the user is not logged in).
 */
export const hydrateAuth = createAsyncThunk(
  'auth/hydrateAuth',
  async (_, { rejectWithValue }) => {
    try {
      const profile = await getMe();
      return profile; // fulfilled payload
    } catch {
      // 401 = not logged in — this is expected, not an error.
      return rejectWithValue(null);
    }
  }
);

/**
 * Logout current device.
 * Calls POST /auth/logout then clears user regardless of success/failure,
 * mirroring the original try/finally pattern in AuthContext.
 */
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    try {
      await apiLogout();
    } catch {
      // Original AuthContext used try/finally — logout clears user even on error.
    }
  }
);

/**
 * Logout all devices.
 * Calls POST /auth/logout-all then clears user regardless of success/failure,
 * mirroring the original try/finally pattern in AuthContext.
 */
export const logoutAllSessions = createAsyncThunk(
  'auth/logoutAllSessions',
  async () => {
    try {
      await apiLogoutAll();
    } catch {
      // Original AuthContext used try/finally — logoutAll clears user even on error.
    }
  }
);

// ── Slice ────────────────────────────────────────────────────────────────────

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: true, // true until initial hydration completes
  },
  reducers: {
    /**
     * Directly set the authenticated user (e.g. after Google login callback).
     */
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    // ── hydrateAuth ──────────────────────────────────────────────────────────
    builder
      .addCase(hydrateAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(hydrateAuth.rejected, (state) => {
        state.user = null;
        state.loading = false;
      });

    // ── logoutUser ───────────────────────────────────────────────────────────
    // User is cleared on both fulfilled and rejected to match try/finally.
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.user = null;
      });

    // ── logoutAllSessions ────────────────────────────────────────────────────
    builder
      .addCase(logoutAllSessions.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(logoutAllSessions.rejected, (state) => {
        state.user = null;
      });
  },
});

// ── Exports ──────────────────────────────────────────────────────────────────

export const { setUser } = authSlice.actions;

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectAuthLoading = (state) => state.auth.loading;

export default authSlice.reducer;