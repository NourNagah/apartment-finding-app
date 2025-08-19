# Apartments App — Overview

This document provides a high-level overview of the Apartments application, its goals, features, and the technology stack used.

## Goals
- Deliver a simple apartments listing experience with details view
- Provide an authenticated API to add apartments
- Ensure production-grade code quality: modular architecture, validation, migrations
- Containerize the entire stack for a single-command run

## Features
- Apartments listing with search and filter (by unit name/number/project)
- Apartment details page
- Auth: JWT-based register and login
- Protected endpoint to add apartments
- API documentation via Swagger
- Responsive, accessible UI with Tailwind CSS

## Tech Stack
- Frontend: Next.js 14 (Pages Router) + Tailwind CSS
- Backend: NestJS 10 + TypeORM 0.3 + PostgreSQL 16 + JWT + Passport
- Database: PostgreSQL with `pgcrypto` for UUID generation
- Containerization: Docker & docker-compose

## Non-Functional
- Input validation and DTO whitelisting
- Migrations-first (no synchronize)
- CORS restricted to frontend origin
- Production Docker images and health checks

## Repository Structure
```
/ (root)
├─ docker-compose.yml
├─ backend/
│  ├─ src/
│  │  ├─ auth/
│  │  ├─ users/
│  │  ├─ apartments/
│  │  ├─ migrations/
│  │  ├─ app.module.ts, main.ts
│  ├─ Dockerfile, package.json, tsconfig*.json
├─ frontend/
│  ├─ src/pages/* (Pages Router)
│  ├─ src/components/*
│  ├─ Dockerfile, package.json, tailwind.config.ts
└─ docs/
```

## User Journeys
- Visitor browses apartments, searches/filters, and opens details
- Admin (or authenticated user) logs in via API, and creates apartments