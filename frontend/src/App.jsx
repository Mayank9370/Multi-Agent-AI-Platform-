import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectAuthLoading, hydrateAuth } from './redux/slices/authSlice.js';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';

// ─── Auth Gate ────────────────────────────────────────────────────────────────
// Dispatches hydrateAuth on mount to restore session from cookies.
// Replaces the useEffect that lived in the former AuthProvider.
const AuthGate = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hydrateAuth());
  }, [dispatch]);

  return children;
};

// ─── Protected Route Guard ────────────────────────────────────────────────────
// Wraps any route that requires authentication. Shows nothing while the initial
// /auth/me hydration is in progress (prevents the login-flash on page reload).
const ProtectedRoute = ({ children }) => {
  const user = useSelector(selectUser);
  const loading = useSelector(selectAuthLoading);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-950">
        <div className="w-6 h-6 border-2 border-zinc-600 border-t-indigo-400 rounded-full animate-spin" />
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
};

// ─── Root App ─────────────────────────────────────────────────────────────────
const App = () => {
  return (
    <BrowserRouter>
      <AuthGate>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <>
                <Dashboard />
              </>
            }
          />
          {/* Catch-all: redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthGate>
    </BrowserRouter>
  );
};

export default App;