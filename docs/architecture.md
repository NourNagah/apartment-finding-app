# Architecture

This document describes the system architecture for the Apartments application, including backend, frontend, and infrastructure design.

## High-Level Architecture
- Frontend (Next.js) calls the Backend (NestJS) via REST
- Backend persists data to PostgreSQL via TypeORM
- Docker Compose orchestrates the services

```mermaid
flowchart LR
  FE[Frontend (Next.js)] -->|HTTP| BE[Backend (NestJS)]
  BE --> DB[(PostgreSQL)]
```

## Backend Architecture
- Pattern: Modular monolith with layered design
  - Controller → Service → Repository (TypeORM) → Database
- Modules
  - `AuthModule`: JWT auth, register/login
  - `UsersModule`: user entity and service
  - `ApartmentsModule`: listing, details, creation
- Cross-cutting concerns
  - Validation (class-validator)
  - Swagger docs
  - Config via env
  - JWT Strategy/Guard (Passport)

```mermaid
flowchart LR
  Client[[Client]] --> Controller
  Controller --> Service
  Service --> Repo[(TypeORM Repository)]
  Repo --> DB[(PostgreSQL)]
  Client -->|Bearer Token| Guard[JWT Guard]
  Guard --> Controller
```

### Key Sequences
Login flow:
```mermaid
sequenceDiagram
  participant C as Client
  participant AC as AuthController
  participant AS as AuthService
  participant US as UsersService
  participant DB as PostgreSQL
  participant JWT as JwtService

  C->>AC: POST /auth/login {email, password}
  AC->>AS: login
  AS->>US: findByEmail
  US->>DB: SELECT user
  DB-->>US: user
  AS->>AS: bcrypt compare
  AS->>JWT: sign({ sub, email })
  JWT-->>AS: token
  AS-->>AC: { user, token }
  AC-->>C: 200 OK
```

Create apartment flow:
```mermaid
sequenceDiagram
  participant C as Client
  participant APTC as ApartmentsController
  participant GUARD as JwtAuthGuard
  participant APTS as ApartmentsService
  participant DB as PostgreSQL

  C->>APTC: POST /apartments (Bearer token)
  APTC->>GUARD: validate
  GUARD-->>APTC: ok
  APTC->>APTS: create(dto)
  APTS->>DB: INSERT apartment
  DB-->>APTS: created row
  APTS-->>APTC: entity
  APTC-->>C: 201 Created
```

## Frontend Architecture
- Next.js 14 Pages Router
  - `src/pages/home.tsx`: hero + search
  - `src/pages/search.tsx`: projects aggregated from apartments with infinite scroll
  - `src/pages/search/[projectId]/*`: project and apartment details
  - `src/pages/sell.tsx`: sell form
- Styling: Tailwind CSS (responsive grid/cards)

```mermaid
flowchart LR
  UI[Next.js Pages] -->|fetch| API[`NEXT_PUBLIC_API_URL`]
  API --> BE[Backend]
  BE --> DB[(PostgreSQL)]
```

## Database Architecture
- PostgreSQL with `pgcrypto` for `gen_random_uuid()`
- Migrations manage schema and indices
- Entities: `users`, `apartments`

```mermaid
erDiagram
  USERS {
    uuid id PK
    varchar email UK
    varchar passwordHash
    varchar role
    timestamptz createdAt
    timestamptz updatedAt
  }

  APARTMENTS {
    uuid id PK
    varchar unitName
    varchar unitNumber
    varchar project
    text description
    int bedrooms
    int bathrooms
    int areaSqm
    numeric priceUsd
    text[] images
    timestamptz createdAt
    timestamptz updatedAt
  }
```

## Deployment / Infra
- Docker Compose services
  - `db` (postgres:16-alpine) + healthcheck + volume
  - `backend` (NestJS) with env config and migrations
  - `frontend` (Next.js) production server

```mermaid
flowchart LR
  subgraph compose
    FE[frontend:3000]
    BE[backend:4000]
    DB[(postgres:5432)]
  end
  FE <---> BE
  BE <---> DB
```
