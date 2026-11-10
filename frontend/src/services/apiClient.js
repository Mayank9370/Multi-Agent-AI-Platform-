/**
 * @file services/apiClient.js
 * @description Centralized Axios instance for all AgentFlow API calls.
 *
 * ─── Token Refresh Interceptor ───────────────────────────────────────────────
 * When any response returns 401, this interceptor:
 *   1. Calls POST /auth/refresh (which rotates the refresh token via httpOnly cookies)
 *   2. On success: retries the original request once (cookies are now updated)
 *   3. On failure: the refresh token is expired/invalid → redirects to /login
 *
 * Frontend JS never reads, stores, or inspects any token — tokens live
 * exclusively in httpOnly cookies managed by the browser and server.
 * ────────────────────────────────────────────────────────────────────────────
 */

import axios from 'axios';

const GATEWAY_URL = import.meta.env.VITE_GATEWAY_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: GATEWAY_URL,
  withCredentials: true, // Required: sends httpOnly cookies on every request
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Response interceptor — silent token refresh on 401 ───────────────────────

let isRefreshing = false;

// Queue of requests that arrived during an in-progress refresh.
// They all resolve/reject together once refresh completes.
let refreshQueue = [];

const processQueue = (error) => {
  refreshQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve();
  });
  refreshQueue = [];
};

apiClient.interceptors.response.use(
  // Pass successful responses through unchanged.
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Only intercept 401 errors that haven't already been retried.
    if (error.response?.status !== 401 || originalRequest._retried) {
      return Promise.reject(error);
    }

    // Don't intercept 401s from auth-related endpoints —
    // these should propagate directly so the React auth flow can handle them.
    //   /auth/refresh — refresh token is invalid/expired
    //   /auth/google  — login attempt failed
    //   /auth/me      — hydration check; 401 just means "not logged in"
    const isAuthEndpoint =
      originalRequest.url?.includes('/auth/refresh') ||
      originalRequest.url?.includes('/auth/google') ||
      originalRequest.url?.includes('/auth/me');

    if (isAuthEndpoint) {
      return Promise.reject(error);
    }

    // If a refresh is already in progress, queue this request.
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push({ resolve, reject });
      })
        .then(() => apiClient(originalRequest))
        .catch((err) => Promise.reject(err));
    }

    // Attempt token refresh.
    originalRequest._retried = true;
    isRefreshing = true;

    try {
      await apiClient.post('/auth/refresh');
      processQueue(null);
      return apiClient(originalRequest); // Retry original request with new cookie
    } catch (refreshError) {
      processQueue(refreshError);
      // Refresh failed — let React's auth flow (ProtectedRoute) handle
      // the redirect to /login. Avoid window.location.href which causes
      // a full page reload and can trigger an infinite refresh loop.
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default apiClient;