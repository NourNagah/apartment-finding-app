# API Reference

Base URL (local): `http://localhost:4000`

Interactive API docs: `http://localhost:4000/docs`

## Auth
### POST /auth/register
Request:
```json
{ "email": "user@example.com", "password": "password123" }
```
Response 201:
```json
{ "user": {"id":"uuid","email":"user@example.com","role":"user"}, "token":"<jwt>" }
```
Errors: `409 Email already in use`, `400 Validation error`

### POST /auth/login
Request:
```json
{ "email": "user@example.com", "password": "password123" }
```
Response 200:
```json
{ "user": {"id":"uuid","email":"user@example.com","role":"user"}, "token":"<jwt>" }
```
Errors: `401 Invalid credentials`, `400 Validation error`

## Apartments
### GET /apartments (paginated)
Query params:
- `offset` (number, default 0)
- `limit` (number, default 20)
- `search` (string, optional; matches unitName/unitNumber/project)
- `project` (string, optional; filter by project)

Example:
```
GET /apartments?limit=20&offset=0
```

Response 200:
```json
{
  "data": [
    {
      "id": "uuid",
      "unitName": "Aurum Residence",
      "unitNumber": "12B",
      "project": "Aurum",
      "description": "...",
      "bedrooms": 2,
      "bathrooms": 1,
      "areaSqm": 85,
      "priceUsd": "120000.00",
      "images": ["https://..."],
      "createdAt": "...",
      "updatedAt": "..."
    }
  ],
  "total": 1
}
```

Next page:
```
GET /apartments?limit=20&offset=20
```

Notes:
- Use `limit` and `offset` for pagination. The frontend requests 20 at a time and lazy-loads as the user scrolls.

### GET /apartments/:id
Response 200: Apartment object

Example:
```
GET /apartments/5a4370cb-3c48-4c25-8e5d-b6d5b6f6a2dd
```
Errors: `404 Not Found`

### POST /apartments (auth required)
Headers: `Authorization: Bearer <token>`

Request body:
```json
{
  "unitName": "Aurum Residence",
  "unitNumber": "12B",
  "project": "Aurum",
  "description": "...",
  "bedrooms": 2,
  "bathrooms": 1,
  "areaSqm": 85,
  "priceUsd": "120000.00",
  "images": ["https://.../1.jpg"]
}
```
Response 201: Created apartment object
Errors: `401 Unauthorized`, `400 Validation error`

## cURL Examples
Register:
```bash
curl -X POST http://localhost:4000/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@example.com","password":"password123"}'
```

Login:
```bash
curl -X POST http://localhost:4000/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@example.com","password":"password123"}'
```

Create apartment:
```bash
TOKEN=... # paste JWT
curl -X POST http://localhost:4000/apartments \
  -H 'Authorization: Bearer '"$TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"unitName":"Aurum","unitNumber":"12B","project":"Aurum"}'
```

List apartments:
```bash
curl 'http://localhost:4000/apartments?limit=12&offset=0&search=aurum'
```