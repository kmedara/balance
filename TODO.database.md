# Database TODO

MongoDB 6 (`mongo` service in Docker Compose). Persistence layer for budgets, categories, Plaid tokens, and users.

## Current state

- [x] MongoDB 6 container with named volume `mongo_data`
- [x] `MONGO_URL` passed to API service in compose
- [x] `@fastify/mongodb` listed in API dependencies
- [ ] Fastify Mongo plugin registered in `index.ts`
- [ ] Collections, indexes, or seed scripts
- [ ] Migrations / schema versioning

---

## Features

### Connection & operations

- [ ] Register `@fastify/mongodb` with `MONGO_URL` at API startup
- [ ] Connection pooling and graceful shutdown on API stop
- [ ] Health check: API `/health` verifies Mongo ping
- [x] Local dev seed script (`npm run db:seed` in `api/`)
- [ ] Optional Mongo Express or Compass connection docs in README

### Collections & schema

#### `budgets`

- [ ] Document shape aligned with `@kmedara/balance-domain` `Budget`
- [ ] Fields: `resourceId`, `title`, `description`, `type`, `amount`, `category`, `frequency`, `startDate`, `endDate`, `userId`, `createdAt`, `updatedAt`
- [ ] Indexes: `{ userId: 1, startDate: 1 }`, unique `{ resourceId: 1 }`

#### `categories`

- [ ] Store user and system categories
- [ ] Unique compound index `{ userId: 1, name: 1 }` (normalized lowercase)
- [ ] Seed default categories (Food, Rent, Utilities, etc.)

#### `plaid_items`

- [ ] Store `item_id`, encrypted `access_token`, `institution_id`, `userId`, `status`, `lastSyncedAt`
- [ ] Index `{ userId: 1 }`, unique `{ item_id: 1 }`
- [ ] Never return access tokens to client

#### `plaid_transactions` (optional)

- [ ] Cache transactions for reconciliation with budgets
- [ ] Index `{ userId: 1, date: -1 }`, `{ accountId: 1 }`
- [ ] TTL or archive policy for old transactions

#### `users` (when auth exists)

- [ ] User profile and preferences (timezone, default currency, fiscal month start)
- [ ] Link all tenant data by `userId`

### Data access patterns

- [ ] Repository or data-access layer in API (keep routes thin)
- [ ] Date-range queries for calendar (`startDate` / `endDate` overlap logic)
- [ ] Category autocomplete via text index or prefix regex on normalized name
- [ ] Bulk write for Excel import with ordered=false and error collection

### Migrations & seeds

- [ ] Migration runner (e.g. `migrate-mongo` or custom scripts)
- [ ] Initial migration: create collections and indexes
- [x] Seed script from `api/__data__/seed.data.ts` for dev/demo
- [ ] Idempotent seeds (safe to re-run)

### Security & compliance

- [ ] Encrypt Plaid access tokens at rest (field-level or KMS)
- [ ] Audit fields on sensitive updates
- [ ] Backup strategy for `mongo_data` volume (dev vs prod documented)
- [ ] AuthZ: every query filtered by authenticated `userId`

### DevOps

- [ ] Compose healthcheck on `mongo` service
- [ ] Document connection string for host vs in-network (`mongo:27017`)
- [ ] Production: managed MongoDB (Atlas) env vars, no exposed `27017`
- [ ] Index creation verified in CI

---

## Suggested document examples

```js
// budgets
{
  resourceId: "uuid",
  userId: "uuid",
  title: "Rent",
  type: "Expense",
  amount: 1500,
  category: "Rent",
  frequency: "Monthly",
  startDate: ISODate("2026-06-01"),
  endDate: null,
  createdAt: ISODate(),
  updatedAt: ISODate()
}
```

```js
// categories
{
  userId: "uuid",
  name: "food",        // normalized
  displayName: "Food",
  createdAt: ISODate()
}
```

```js
// plaid_items
{
  userId: "uuid",
  itemId: "plaid-item-id",
  accessTokenEnc: "...",
  institutionName: "Chase",
  lastSyncedAt: ISODate()
}
```
