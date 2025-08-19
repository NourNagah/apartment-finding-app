# Apartments App (Next.js + NestJS + PostgreSQL)

Fully containerized full-stack app with authentication, apartment listing, details, and creation.
## Epic url for whole app: https://nournagah89.atlassian.net/jira/software/projects/SCRUM/boards/1/backlog?issueParent=10008&selectedIssue=SCRUM-15&atlOrigin=eyJpIjoiMjIwYTNkZjdjZDRiNGMwZDk3MWRiYWZjMzgzNDA1OWEiLCJwIjoiaiJ9
## Tech Stack
- Frontend: Next.js 14 (App Router) + Tailwind CSS
- Backend: NestJS 10 + TypeORM + JWT Auth
- Database: PostgreSQL 16
- Container: Docker Compose

## Quick Start (Docker)
Prerequisites: Docker + Docker Compose installed.

1. Build and run all services:
```
docker-compose up --build
```
2. Open:
- Frontend: http://localhost:3000
- Backend API Docs (Swagger): http://localhost:4000/docs
- DB: postgres on localhost:5432 (user: postgres, pass: postgres, db: apartments)

On first start, backend runs migrations automatically.

## API Summary
- POST `/auth/register` { email, password } -> { user, token }
- POST `/auth/login` { email, password } -> { user, token }
- GET `/apartments` query: offset, limit, search, project -> { data, total }
- GET `/apartments/:id` -> Apartment
- POST `/apartments` (Bearer token) -> creates apartment

## Local Development (without Docker)
- Backend
  - cd backend
  - npm install
  - start Postgres locally
  - set env vars (DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME, JWT_SECRET)
  - npm run build && node dist/main.js
- Frontend
  - cd frontend
  - npm install
  - set `NEXT_PUBLIC_API_URL=http://localhost:4000`
  - npm run dev

## Database Notes
- Using PostgreSQL with TypeORM
- Migrations are in `backend/src/migrations`. They enable `pgcrypto` for UUID generation and create `users` and `apartments` tables with indexes for faster search.
- In Docker, DB is persisted in a named volume `db_data`.

## Project Structure
- `backend`: NestJS app (entities, modules, migrations)
- `frontend`: Next.js app (app router pages and UI)
- `docker-compose.yml`: Orchestrates DB, backend, frontend

## Seeding (optional)
Use Swagger to create a user, get a token, and POST a few apartments.
