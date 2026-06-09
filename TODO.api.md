# API TODO

Fastify gateway for Balance (`/api`). Serves the Angular client and integrates with Plaid and MongoDB.

## Current state

- [x] Fastify server with CORS and `/ping`
- [x] Plaid: `POST /plaid/link-token`, `POST /plaid/exchange-token`
- [x] Categories: `GET /categories` (static seed list)
- [x] Dev Docker image with `tsx watch` hot reload
- [x] Env-driven Plaid configuration (`MONGO_URL` wired in compose, not used in code yet)
- [ ] Budget CRUD routes (client already calls `/budgets`)
- [ ] MongoDB plugin registration and persistence
- [ ] File upload endpoint (`/upload`)

---

## Features

### Budgets

- [ ] `GET /budgets` — list budgets filtered by `startDate` / `endDate` query params
- [ ] `GET /budgets/:id` — single budget by `resourceId`
- [ ] `POST /budgets` — create budget (validate against `@kmedara/balance-domain`)
- [ ] `PUT /budgets/:id` — update budget
- [ ] `DELETE /budgets/:id` — delete budget
- [ ] Recurring expansion helper (derive calendar occurrences from frequency + date range)

### Categories

- [ ] Persist categories in MongoDB (replace static array)
- [ ] `GET /categories?category=` — filter/autocomplete by query prefix
- [ ] `POST /categories` — add user-defined category
- [ ] Dedupe and normalize category names (case-insensitive)

### Plaid / bank linking

- [ ] Remove stub `GET /plaid/link-token` handler
- [ ] Persist `access_token`, `item_id`, and institution metadata per user
- [ ] `GET /plaid/items` — list linked accounts for user
- [ ] `DELETE /plaid/items/:itemId` — unlink institution
- [ ] Webhook endpoint for Plaid transaction updates
- [ ] Sync transactions into store (optional link to budget actuals)

### File import

- [ ] `POST /upload` — accept parsed budget rows from client (Excel/CSV)
- [ ] Bulk insert budgets with validation and error reporting per row
- [ ] Idempotency / duplicate detection on import

### Auth & users

- [ ] Authentication strategy (session, JWT, or OAuth)
- [ ] Scope all budget/plaid/category data by `userId`
- [ ] Replace hardcoded Plaid `client_user_id: "user_good"`

### Platform & quality

- [ ] Register `@fastify/mongodb` and health check including DB connectivity
- [ ] Request validation (JSON schema or Zod) on all write routes
- [ ] Centralized error handler and structured logging
- [ ] OpenAPI / route documentation
- [ ] Integration tests for budgets, categories, and Plaid flows
- [ ] Production Dockerfile (multi-stage build, non-root user)

---

## Technical debt

- [ ] Fix typo: `cateogoryRoutes` → `categoryRoutes`
- [ ] Align route prefixes with client gateway (`/categories`, `/budgets`, `/plaid`)
- [ ] Move seed data from `__data__/` into DB migrations or fixtures
- [ ] Use `created` / `createRequested` event pattern consistently with client stores
