# AgentFlow — Auth Service TODO

These items are explicitly out of scope for the current implementation pass.
They should be addressed before the service is considered production-ready.

## Testing
- [ ] Unit tests for `token.service.js` (issueTokenPair, validateRefreshToken, rotateRefreshToken, revokeAll)
- [ ] Unit tests for `google.service.js` (mock OAuth2Client)
- [ ] Unit tests for `user.service.js` (mock Mongoose)
- [ ] Integration tests for all 5 auth endpoints (use supertest + a test Redis/Mongo instance)
- [ ] Frontend: tests for the refresh interceptor in apiClient.js (mock axios)

## Security
- [ ] Upgrade JWT_ACCESS_SECRET in production to a 64-byte random hex string
      `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
- [ ] Add Redis AUTH password for production Redis (REDIS_URL=redis://:password@host:6379)
- [ ] Consider rotating JWT_ACCESS_SECRET via key versioning if a breach occurs

## Docker / Infrastructure
- [ ] Finalize Dockerfiles (multi-stage builds, non-root user, .dockerignore)
- [ ] Add .dockerignore to auth/ and gateway/ (exclude node_modules, .env, etc.)
- [ ] Add production Nginx config if needed in front of gateway
- [ ] Add docker-compose.override.yml for local dev (volume mounts for hot-reload)

## Features (Future Passes)
- [ ] RBAC / permissions system (role + plan-based route guards on downstream services)
- [ ] Email/password auth (multi-provider) — currently Google-only
- [ ] GitHub OAuth provider
- [ ] Account deletion / GDPR data erasure (purge all Redis sessions + MongoDB user doc)
- [ ] Admin endpoint to view/revoke active sessions for a user
- [ ] Frontend: proper error toasts/alerts on login failure

## Frontend
- [ ] Replace the Dashboard stub in App.jsx with a real dashboard component
- [ ] Add proper loading and error UI to GoogleLoginButton callback failures
- [ ] Add a state management library (Zustand) when the auth context grows complex
