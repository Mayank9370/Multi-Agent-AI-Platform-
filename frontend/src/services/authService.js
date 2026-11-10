/**
 * @file services/authService.js
 * @description Thin wrappers over apiClient for auth-specific API calls.
 *
 * All token management happens server-side via httpOnly cookies.
 * These functions only call endpoints and return server responses —
 * they never touch, read, or store any token value.
 */

import apiClient from './apiClient.js';

/**
 * Fetches the current authenticated user's profile.
 * Requires a valid access token cookie.
 *
 * @returns {Promise<object>} User profile { id, name, email, profileImage, role, plan, ... }
 */
export const getMe = async () => {
  const { data } = await apiClient.get('/auth/me');
  return data.user;
};

/**
 * Logs out the current device by revoking the refresh token.
 * Clears both access and refresh token cookies server-side.
 */
export const logout = async () => {
  await apiClient.post('/auth/logout');
};

/**
 * Logs out all devices by revoking every active session for this user.
 * Requires a valid access token (sends it via cookie automatically).
 */
export const logoutAll = async () => {
  await apiClient.post('/auth/logout-all');
};