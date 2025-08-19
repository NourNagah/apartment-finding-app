# Apartments Backend (NestJS + TypeORM)

## Scripts
- `npm run build` - build TypeScript to dist
- `npm run start` - start compiled server
- `npm run start:dev` - dev mode

## Env
- DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME
- JWT_SECRET, JWT_EXPIRES_IN
- CORS_ORIGIN

## Migrations
Compile first:
```
npm run build
```
Then run with TypeORM DataSource:
```
node --loader ts-node/esm ./node_modules/typeorm/cli.js -d dist/ormconfig.js migration:run
```

## API Docs
- Swagger UI served at `/docs` (e.g., `http://localhost:4000/docs`)
- Title: Apartments API, Version: 1.1

## Data
- Apartments table contains core fields (unit, project, description, beds/baths, area, price, images)
- A seed migration `1723795200004-seed-apartments.ts` inserts demo apartments with realistic data

## Architecture
- NestJS modules: `apartments` module with controller/service
- Postgres + TypeORM (migrations enabled, `migrationsRun: true`)