/**
 * @file utils/cookie.utils.js
 * @description Single source of truth for httpOnly cookie configuration.
 *
 * All cookie attributes (httpOnly, secure, sameSite, domain, maxAge) are
 * computed here. Controllers and services should never construct cookie options
 * inline — use getCookieOptions() so changes apply everywhere at once.
 *
 * Local dev behaviour:
 *   - secure: false  (HTTPS not available on localhost)
 *   - domain: undefined (COOKIE_DOMAIN not set in dev)
 *
 * Production behaviour:
 *   - secure: true
 *   - domain: process.env.COOKIE_DOMAIN (e.g. '.agentflow.io' for subdomains)
 *
 * NOTE: sameSite is 'strict' in all environments. If the frontend and API
 * ever move to different subdomains under a shared parent, change this to
 * 'none' (which requires secure: true) and set COOKIE_DOMAIN accordingly.
 */

/**
 * Returns Express cookie options for the given token type.
 *
 * @param {'access' | 'refresh' | 'clear'} type
 *   - 'access'  → 15-minute maxAge (matches JWT_ACCESS_EXPIRY)
 *   - 'refresh' → JWT_REFRESH_EXPIRY_DAYS-day maxAge
 *   - 'clear'   → maxAge: 0, expires: past (used when clearing cookies on logout)
 * @returns {import('express').CookieOptions}
 */
export const getCookieOptions = (type) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const domain = process.env.COOKIE_DOMAIN || undefined;

  const base = {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
    ...(domain && { domain }),
  };

  switch (type) {
    case 'access': {
      // Keep maxAge in sync with JWT_ACCESS_EXPIRY.
      // The cookie expiry is a belt-and-suspenders measure — the JWT itself
      // also expires and verifyAccessToken will reject it.
      return { ...base, maxAge: 15 * 60 * 1000 }; // 15 minutes in ms
    }

    case 'refresh': {
      const days = parseInt(process.env.JWT_REFRESH_EXPIRY_DAYS || '7', 10);
      return { ...base, maxAge: days * 24 * 60 * 60 * 1000 };
    }

    case 'clear': {
      return { ...base, maxAge: 0, expires: new Date(0) };
    }

    default:
      return base;
  }
};
