# Balance

Personal finance calendar — budgets, Plaid transactions, and subscriptions in one view. The repo is an **npm workspaces monorepo**: Angular client, Fastify API, shared domain types, and AWS CDK infrastructure.

## Repository layout

| Path | Package | Purpose |
|------|---------|---------|
| [`client/`](client/) | `balance` | Angular 21 SPA |
| [`api/`](api/) | `node` | Fastify API (local dev + Lambda) |
| [`packages/schemas/`](packages/schemas/) | `@balance/schemas` | Shared TypeBox schemas and wire types |
| [`packages/domain/`](packages/domain/) | `@balance/domain` | Persistence models and runtime utilities |
| [`infrastructure/`](infrastructure/) | `balance-infrastructure` | AWS CDK stacks |

## Prerequisites

- **Node.js 22+**
- **Docker** (recommended for local dev — API, client, and DynamoDB Local)
- **Plaid** sandbox credentials
- **AWS CLI** (for CDK deploys only)

## Quick start (Docker)

1. Create [`.env.local.secrets`](.env.local.secrets) at the repo root (see [Environment configuration](#environment-configuration)).
2. Install dependencies and start the stack:

```bash
npm install
./deploy.sh
```

`deploy.sh` loads `.env.local.secrets`, validates required variables, and runs `docker compose up --build --watch`.

| Service | URL |
|---------|-----|
| Client | http://localhost:4200 |
| API | http://localhost:3000 |
| Swagger UI | http://localhost:3000/docs |
| DynamoDB Local | http://localhost:8000 |

3. On a **fresh volume** (first run or after `docker compose down -v`), create tables and optionally seed sample data:

```bash
npm run db:create-tables -w node
npm run db:seed -w node
```

After that, normal restarts (`./deploy.sh` or `docker compose up`) keep your data — no re-seed required.

### DynamoDB persistence

DynamoDB Local stores data in a named Docker volume (`dynamodb-data`). Table definitions and items survive `docker compose down` / `up`. Cognito users keep profiles and events created via the API; seed data belongs to the dev user id (`aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa`), not your Cognito account.

| Scenario | Command |
|----------|---------|
| First time / fresh volume | `npm run db:create-tables -w node` then `npm run db:seed -w node` (optional) |
| Normal restart | `./deploy.sh` or `docker compose up` — **no** re-seed required |
| Wipe all local DB data | `docker compose down -v` then recreate tables + optional seed |
| Re-seed sample budgets only | `npm run db:seed:reset -w node` (scoped to the seed user) |

`db:create-tables` is idempotent — it skips creation when the table already exists.

## Local development (without Docker)

From the repo root:

```bash
npm install
npm run build:schemas
npm run build:domain
```

**Terminal 1 — DynamoDB Local** (or use the `dynamodb` service from Docker Compose):

```bash
docker compose up dynamodb
```

**Terminal 2 — API:**

```bash
cd api
export DYNAMODB_ENDPOINT=http://localhost:8000
export BALANCE_TABLE=balance
npm run dev
```

**Terminal 3 — Client:**

```bash
cd client
export GATEWAY=http://localhost:3000
export AUTH_DISABLED=true
npm start
```

See [`api/README.md`](api/README.md) and [`client/README.md`](client/README.md) for workspace-specific details.

## Environment configuration

All local secrets and integration keys live in **`.env.local.secrets`** at the repo root. This file is gitignored — never commit it.

Docker Compose passes it to the API and client containers. `deploy.sh` also `source`s it before starting Compose.

### Minimum variables for `./deploy.sh`

| Variable | Description |
|----------|-------------|
| `GATEWAY` | API base URL the client calls (e.g. `http://localhost:3000`) |
| `PLAID_*` | Plaid client id, secret, env, host, products, country codes, client name, redirect URI |
| `ACCESS_TOKEN_ENCRYPTION_*` | AES-GCM settings for encrypted Plaid access tokens |

`deploy.sh` also requires Cognito vars when `AUTH_DISABLED` is not `true` — see [Authentication](#authentication).

### Authentication

Local dev usually sets `AUTH_DISABLED=true`, which bypasses Cognito and uses the seed user.

For real Cognito auth locally:

| Variable | Description |
|----------|-------------|
| `AUTH_DISABLED` | Set to `false` |
| `COGNITO_USER_POOL_ID` | From `BalanceAuthStack` output |
| `COGNITO_CLIENT_ID` | From `BalanceAuthStack` output |
| `COGNITO_REGION` | AWS region of the user pool |
| `COGNITO_HOSTED_UI_DOMAIN` | Cognito hosted UI domain |
| `COGNITO_AUTHORITY` | Issuer URL (`https://cognito-idp.<region>.amazonaws.com/<pool-id>`) |
| `AUTH_CALLBACK_URL` | API callback — must be `http://localhost:3000/auth/callback` locally |
| `CLIENT_ORIGIN` | Angular origin — `http://localhost:4200` |
| `SESSION_SECRET` | 32+ random characters for session cookies |

Sign-in starts at `GET /auth/login` on the API. The Angular app has no Cognito config — the API is the BFF and sets HttpOnly session cookies.

See [`infrastructure/README.md`](infrastructure/README.md) for Cognito stack setup.

### Billing (optional)

Stripe variables are documented in [`api/.env.stripe.example`](api/.env.stripe.example). Forward webhooks locally with:

```bash
stripe listen --forward-to localhost:3000/billing/webhooks/stripe
```

## Shared packages

| Package | Role |
|---------|------|
| [`@balance/schemas`](packages/schemas/) | TypeBox schemas and HTTP wire types (API + client) |
| [`@balance/domain`](packages/domain/) | Persistence models, guards, and client-safe helpers |

```bash
npm run build:schemas   # after editing packages/schemas/src
npm run build:domain    # after editing packages/domain/src
```

Docker Compose watch syncs `packages/domain` into the containers. Schema changes need a rebuild (`npm run build:schemas`) — they are not live-synced.

Client code imports `@balance/schemas/client` and `@balance/domain/client` directly (no app-level re-export shim).

See [`packages/schemas/README.md`](packages/schemas/README.md) and [`packages/domain/README.md`](packages/domain/README.md) for package details.

## Deployment

| Component | How | Docs |
|-----------|-----|------|
| Cognito + API + DynamoDB | GitHub Actions → CDK | [`infrastructure/README.md`](infrastructure/README.md) |
| Angular client | GitHub Actions → S3 + CloudFront | [`client/README.md`](client/README.md#deployment) |
| API details | Lambda env vars, Swagger, seeding | [`api/README.md`](api/README.md) |

**CI workflows:**

- [`.github/workflows/ci.yml`](.github/workflows/ci.yml) — PR checks (build, CDK synth, npm audit, Semgrep); never deploys
- [`.github/workflows/deploy-staging.yml`](.github/workflows/deploy-staging.yml) — push to `main` → staging account
- [`.github/workflows/release.yml`](.github/workflows/release.yml) — tag `v*` on `main` → production account

**Runbook:** [docs/deployment](docs/deployment/README.md)

## Testing and lint

From the repo root:

```bash
npm run lint                              # all workspaces
npm run lint -w node                      # API only
npm run lint -w balance                   # client only
npm run test -w balance                   # client unit tests (Vitest)
npm run build                             # domain + API + client
```

The API has no automated test suite yet — use Swagger at `/docs` and the seed scripts for manual verification.

## NPM scripts (root)

| Script | Description |
|--------|-------------|
| `npm install` | Install all workspaces; builds `@balance/schemas` and `@balance/domain` via `prepare` |
| `npm run build` | Build schemas, domain, API, and client |
| `npm run build:schemas` | Rebuild shared schemas only |
| `npm run build:domain` | Rebuild persistence/runtime package only |
| `npm run lint` | ESLint across workspaces |

Workspace-specific scripts use `-w <package>` — see [`api/README.md`](api/README.md) and [`client/README.md`](client/README.md).
