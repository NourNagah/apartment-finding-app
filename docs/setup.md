# Setup Guide

## Prerequisites
- Docker & Docker Compose (recommended)
- Or Node.js 20+, PostgreSQL 16+ for local dev without Docker

## Run with Docker (one command)
```bash
docker compose up --build
```
Services:
- Frontend: http://localhost:3000
- Backend: http://localhost:4000 (Swagger at /docs)
- Database: localhost:5432 (postgres/postgres, db: apartments)

## Environment Variables
Backend (with defaults):
- `PORT=4000`
- `DB_HOST=db`, `DB_PORT=5432`, `DB_USERNAME=postgres`, `DB_PASSWORD=postgres`, `DB_NAME=apartments`
- `JWT_SECRET=supersecretjwt`, `JWT_EXPIRES_IN=7d`
- `CORS_ORIGIN=http://localhost:3000`

Frontend:
- `PORT=3000`
- `NEXT_PUBLIC_API_URL=http://localhost:4000`

## Local Development (without Docker)
### Backend
```bash
cd backend
npm install
export DB_HOST=localhost DB_PORT=5432 DB_USERNAME=postgres DB_PASSWORD=postgres DB_NAME=apartments JWT_SECRET=supersecretjwt CORS_ORIGIN=http://localhost:3000
npm run build && node dist/main.js
```

### Frontend
```bash
cd frontend
npm install
export NEXT_PUBLIC_API_URL=http://localhost:4000
npm run dev
```

## Database Migrations (manual)
```bash
cd backend
npm run build
node --loader ts-node/esm ./node_modules/typeorm/cli.js -d dist/ormconfig.js migration:run
```

## Health Check
- Backend: `GET http://localhost:4000/health` → `{ ok: true }`