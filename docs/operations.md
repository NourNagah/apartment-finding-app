# Operations

## Running
- Preferred: `docker compose up --build`
- Health: `GET /health` returns `{ ok: true }`
- Swagger: `http://localhost:4000/docs`

## Logs
- Docker: `docker compose logs -f backend` or `frontend`

## Database Backup
- The `db_data` volume persists data
- Example backup (local):
```bash
docker exec -t apartments_db pg_dump -U postgres apartments > backup.sql
```
- Restore:
```bash
docker exec -i apartments_db psql -U postgres -d apartments < backup.sql
```

## Migrations
- Auto-run on backend start (configured)
- Manual run steps in `docs/setup.md`

## Environment Changes
- Rebuild containers after updating env or dependencies:
```bash
docker compose up --build -d
```