/**
 * @file pages/Login.jsx
 * @description Login page for AgentFlow.
 *
 * Displays AgentFlow branding, a short tagline, and the existing
 * GoogleLoginButton component (unchanged).
 *
 * Auth-aware redirect:
 *   - If auth is loading → shows nothing (prevents premature redirect)
 *   - If user is already authenticated → redirects to /
 *   - If unauthenticated → renders the login UI
 */

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUser, selectAuthLoading } from '../redux/slices/authSlice.js';
import GoogleLoginButton from '../components/GoogleLoginButton.jsx';

const Login = () => {
  const user = useSelector(selectUser);
  const loading = useSelector(selectAuthLoading);

  // Wait for auth hydration before deciding — prevents redirect race
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-950">
        <div className="w-6 h-6 border-2 border-zinc-600 border-t-indigo-400 rounded-full animate-spin" />
      </div>
    );
  }

  // Already authenticated — redirect to dashboard
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-surface-950 px-4 overflow-hidden">
      {/* ── Background effects ────────────────────── */}
      <div className="absolute inset-0 -z-10 home-grid-bg" aria-hidden="true" />
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-indigo-600/8 blur-3xl animate-glow-pulse -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-violet-600/6 blur-3xl -z-10"
        aria-hidden="true"
      />

      {/* ── Floating agent badges (decorative) ───── */}
      <div className="absolute top-[18%] left-[12%] hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-900/60 border border-surface-800/40 backdrop-blur-sm text-xs text-surface-500 animate-float" aria-hidden="true" style={{ animationDelay: '0s' }}>
        <span>💬</span> Chat Agent
      </div>
      <div className="absolute top-[28%] right-[10%] hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-900/60 border border-surface-800/40 backdrop-blur-sm text-xs text-surface-500 animate-float" aria-hidden="true" style={{ animationDelay: '1s' }}>
        <span>💻</span> Coding Agent
      </div>
      <div className="absolute bottom-[30%] left-[8%] hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-900/60 border border-surface-800/40 backdrop-blur-sm text-xs text-surface-500 animate-float" aria-hidden="true" style={{ animationDelay: '2s' }}>
        <span>📊</span> Presentation
      </div>
      <div className="absolute bottom-[22%] right-[14%] hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-900/60 border border-surface-800/40 backdrop-blur-sm text-xs text-surface-500 animate-float" aria-hidden="true" style={{ animationDelay: '3s' }}>
        <span>🔎</span> Search Agent
      </div>

      {/* ── Main content ─────────────────────────── */}
      <div className="relative w-full max-w-md text-center animate-fade-in-up">
        {/* Logo */}
        <div className="mb-10">
          <div className="mx-auto mb-5 flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-xl shadow-indigo-500/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-8 h-8"
              aria-hidden="true"
            >
              <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-surface-50 tracking-tight">
            Welcome to <span className="home-gradient-text">AgentFlow</span>
          </h1>
          <p className="mt-3 text-sm text-surface-400 leading-relaxed max-w-xs mx-auto">
            Your AI workspace with specialized agents for chat, coding, research, documents, and more.
          </p>
        </div>

        {/* Login card */}
        <div className="relative">
          {/* Card glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600/10 via-violet-600/10 to-indigo-600/10 rounded-3xl blur-xl -z-10" aria-hidden="true" />

          <div className="rounded-2xl border border-surface-800/60 bg-surface-900/70 backdrop-blur-xl p-8 sm:p-10 shadow-2xl shadow-black/20">
            <h2 className="text-lg font-semibold text-surface-100 mb-2">
              Sign in to continue
            </h2>
            <p className="text-sm text-surface-500 mb-8">
              Access your AI agents and workspace
            </p>

            {/* Existing Google login button — rendered unchanged */}
            <div className="flex justify-center">
              <GoogleLoginButton />
            </div>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-surface-800/50" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-surface-900/70 px-4 text-xs text-surface-600">
                  Secure authentication
                </span>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-6 text-xs text-surface-500">
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500/70">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Encrypted
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500/70">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                Verified
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500/70">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Private
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-xs text-surface-600">
          By continuing, you agree to AgentFlow&apos;s terms of service.
        </p>

        {/* Agent strip */}
        <div className="mt-10 flex items-center justify-center gap-3 text-xs text-surface-600">
          <span>💬</span>
          <span>💻</span>
          <span>📊</span>
          <span>📄</span>
          <span>🔎</span>
          <span className="ml-1 text-surface-500">5 AI Agents await</span>
        </div>
      </div>
    </div>
  );
};

export default Login;