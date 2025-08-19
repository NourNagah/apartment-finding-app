# Security

## Authentication & Authorization
- JWT (Bearer) used for stateless authentication
- `POST /apartments` requires a valid JWT
- Passwords are hashed with bcrypt; only `passwordHash` stored

## Input Validation
- Global `ValidationPipe` (whitelisting + forbidNonWhitelisted + transform)
- DTOs validate payloads for auth and apartments

## CORS
- Configurable via `CORS_ORIGIN` (default: `http://localhost:3000`)

## Database
- Migrations control schema changes (no `synchronize`)
- Parameterized queries through TypeORM

## Transport
- For production, place services behind HTTPS (reverse proxy/CDN)

## Recommendations (Next Steps)
- Store JWT in httpOnly cookies + CSRF protection for write routes
- Rate limiting and brute-force protection on auth routes
- Helmet for secure headers
- Structured logging and audit trails
- RBAC if more roles are introduced
- Secrets management (e.g., Docker secrets, Vault)