# Future Work

## High Priority
- Proper auth UX on frontend (httpOnly cookie JWT, login/logout screens)
- RBAC and admin-only creation
- E2E tests (Playwright) and API contract tests
- CI/CD pipeline (lint, test, build, docker push)

## Medium Priority
- Image upload support (S3/GCS) instead of URLs
- Caching on list endpoints (Redis) and response caching headers
- Advanced filters (price range, bedrooms, project facets)
- Sorting (price, area, newest)

## Low Priority
- i18n and accessibility audits
- Analytics events on searches and details views
- Database read replicas and connection pooling

## Architecture Evolution
- Extract auth and apartments as separate services if needed
- Introduce an API gateway for auth and rate limiting
- Add OpenAPI codegen for frontend API clients