/**
 * @file components/GoogleLoginButton.jsx
 * @description Google Identity Services sign-in button.
 *
 * The Google library calls our `callback` with a signed Google ID token.
 * We POST that token to the gateway → auth service for server-side verification.
 * On success, the server sets httpOnly cookies — the frontend never sees tokens.
 *
 * Uses apiClient (not raw axios) so any retry/interceptor logic is consistent.
 */

import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import apiClient from '../services/apiClient.js';
import { setUser } from '../redux/slices/authSlice.js';

const GoogleLoginButton = () => {
  const googleButtonRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const initializeGoogle = () => {
      if (!window.google || !googleButtonRef.current) return;

      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,

        callback: async (response) => {
          try {
            const { data } = await apiClient.post('/auth/google', {
              credential: response.credential,
            });

            // Cookies are now set server-side.
            // Update Redux auth state with the returned profile.
            dispatch(setUser(data.user));

            // Redirect to the main app.
            navigate('/');
          } catch (error) {
            console.error(
              '[GoogleLoginButton] Login failed:',
              error?.response?.data?.message || error.message
            );
            // TODO: surface this error to the user via a toast/alert component
          }
        },
      });

      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        width: 300,
      });
    };

    if (window.google) {
      initializeGoogle();
    } else {
      window.onGoogleLibraryLoad = initializeGoogle;
    }
  }, [dispatch, navigate]);

  return <div ref={googleButtonRef} />;
};

export default GoogleLoginButton;