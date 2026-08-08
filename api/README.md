# Balance API

Fastify 5 API for the Balance app. Handles authentication (Cognito BFF + session cookies), calendar events, Plaid linking, Stripe billing, and DynamoDB persistence. Runs locally with `tsx` and in AWS as a Lambda behind API Gateway HTTP API.

## Stack

- **Runtime:** Node.js 22, TypeScript, ESM
- **Framework:** Fastify + TypeBox validation + Swagger UI at `/docs`
- **Database:** DynamoDB (single-table design; local dev uses DynamoDB Local)
- **Auth:** Cognito OAuth via API routes; `AUTH_DISABLED=true` for local bypass
- **Integrations:** Plaid, Stripe
- **Shared packages:** [`@balance/schemas`](../packages/schemas) (wire types), [`@balance/domain`](../packages/domain) (persistence models)

## Local setup

### With Docker (recommended)

From the repo root, use [`deploy.sh`](../deploy.sh) — see the [root README](../readme.md). The API container:

- Listens on port **3000**
- Connects to DynamoDB Local at `http://dynamodb:8000`
- Loads env from [`.env.local.secrets`](../.env.local.secrets)

### On the host

```bash
# from repo root
npm install
npm run build:schemas
npm run build:domain

cd api
export DYNAMODB_ENDPOINT=http://localhost:8000
export BALANCE_TABLE=balance
# load remaining vars from ../.env.local.secrets (or use dotenv-compatible export)
npm run dev
```

Swagger UI: http://localhost:3000/docs

## Environment variables

Set these in [`.env.local.secrets`](../.env.local.secrets) for Docker/local dev. For AWS, CDK forwards the same keys to the Lambda — see [`infrastructure/lib/api-env.ts`](../infrastructure/lib/api-env.ts).

### Core

| Variable | Required | Description |
|----------|----------|-------------|
| `DYNAMODB_ENDPOINT` | Local only | e.g. `http://localhost:8000` — omit in Lambda (uses AWS endpoint) |
| `BALANCE_TABLE` | Yes | DynamoDB table name (default `balance`) |
| `CLIENT_ORIGIN` | Yes | First-party PWA origin allowlist for CORS, auth redirects, and Stripe return URLs. Prefer **one origin per environment** (e.g. local `http://localhost:4200`, prod `https://app.example.com`). Comma-separated list allowed only if multiple first-party origins share the same API. Must be exact `http(s)` origins — no paths, no `*`. |
| `API_PUBLIC_URL` | Production | Public API base URL (e.g. API Gateway URL) |

### Authentication

| Variable | Required | Description |
|----------|----------|-------------|
| `AUTH_DISABLED` | Yes | `true` to skip Cognito locally |
| `SESSION_SECRET` | Production | 32+ characters for signed session cookies |
| `COGNITO_USER_POOL_ID` | When auth enabled | Cognito user pool ID |
| `COGNITO_CLIENT_ID` | When auth enabled | App client ID |
| `COGNITO_REGION` | When auth enabled | AWS region |
| `COGNITO_HOSTED_UI_DOMAIN` | When auth enabled | Hosted UI domain (no scheme) |
| `COGNITO_AUTHORITY` | When auth enabled | JWT issuer URL |
| `AUTH_CALLBACK_URL` | When auth enabled | Must be `{API_URL}/auth/callback` |

### Plaid

| Variable | Description |
|----------|-------------|
| `PLAID_CLIENT_ID` | Plaid client ID |
| `PLAID_SECRET` | Plaid secret |
| `PLAID_ENV` | `sandbox`, `development`, or `production` |
| `PLAID_HOST` | e.g. `https://sandbox.plaid.com` |
| `PLAID_PRODUCTS` | Comma-separated product list |
| `PLAID_COUNTRY_CODES` | e.g. `US` |
| `PLAID_CLIENT_NAME` | Display name in Link |
| `PLAID_REDIRECT_URI` | OAuth redirect (typically the client origin) |
| `ACCESS_TOKEN_ENCRYPTION_KEY` | Base64 AES key |
| `ACCESS_TOKEN_ENCRYPTION_ALGORITHM` | e.g. `aes-256-gcm` |
| `ACCESS_TOKEN_ENCRYPTION_KEY_VERSION` | Key version string |
| `ACCESS_TOKEN_ENCRYPTION_IV_LENGTH` | IV length (e.g. `12`) |

### Stripe

See [`.env.stripe.example`](.env.stripe.example). Required for checkout and webhooks:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_PLUS_MONTHLY`, `STRIPE_PRICE_PLUS_ANNUAL`
- `STRIPE_PRICE_PRO_MONTHLY`, `STRIPE_PRICE_PRO_ANNUAL`
- `STRIPE_TRIAL_PERIOD_DAYS` (optional)

Local webhook forwarding:

```bash
stripe listen --forward-to localhost:3000/billing/webhooks/stripe
```

## First-party API (AUTH-9)

The HTTP API is a **BFF for the Balance PWA only** — not a public or third-party developer API.

- **Browser traffic:** CORS and post-login redirects are restricted to `CLIENT_ORIGIN`. Credentialed calls from other origins are rejected by the browser.
- **Webhooks (exception):** Stripe (and later Plaid) webhook routes are **server-to-server**. They are not browser CORS clients. Access is gated by **signature verification** (e.g. `Stripe-Signature`), not by Cognito session cookies or the origin allowlist. That does not make the API a public product API.

## NPM scripts

Run from repo root with `-w node`, or from `api/` directly:

| Script | Description |
|--------|-------------|
| `npm run dev` | Start with hot reload (`tsx watch`) |
| `npm run build` | Compile to `dist/` |
| `npm run start` | Run compiled `dist/index.js` |
| `npm run lint` | ESLint |
| `npm run db:create-tables` | Create DynamoDB Local tables |
| `npm run db:seed` | Seed categories and budget events |
| `npm run db:seed:reset` | Drop user events and re-seed |
| `npm run test` | Vitest unit tests with coverage (once) |
| `npm run test:watch` | Vitest in watch mode (no coverage by default) |

### Testing

```bash
npm run test -w node          # from repo root (prints coverage + writes coverage/)
npm run test:watch -w node    # watch mode
```

Co-located `*.test.ts` files under `src/` (e.g. billing entitlements). HTML report: `api/coverage/index.html`. Seed data: [`__data__/seed.data.ts`](__data__/seed.data.ts).

## Database

Single-table DynamoDB design. Key layout and GSIs: [`src/dynamo/keys.ts`](src/dynamo/keys.ts).

### DynamoDB persistence (local)

DynamoDB Local uses file storage in a named Docker volume (`dynamodb-data`), not in-memory mode. Data survives container restarts. Cognito users retain profiles and events created via `upsertUserFromAuth`; seed data belongs to the dev user id (`aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa`), not your Cognito account.

| Scenario | Command |
|----------|---------|
| First time / fresh volume | `npm run db:create-tables -w node` then `npm run db:seed -w node` (optional) |
| Normal restart | `./deploy.sh` or `docker compose up` — **no** re-seed required |
| Wipe all local DB data | `docker compose down -v` then recreate tables + optional seed |
| Re-seed sample budgets only | `npm run db:seed:reset -w node` (scoped to the seed user) |

`db:create-tables` is idempotent — [`ensureLocalTables`](scripts/create-tables.ts) skips creation when the table already exists.

**First-time setup** (DynamoDB Local must be running on port 8000):

```bash
npm run db:create-tables -w node
npm run db:seed -w node
```

From inside the API container:

```bash
docker compose exec node npm run db:seed
```

## API routes (overview)

There is **no** generic paged `GET /events` list. Use the calendar endpoint for month views and `GET /events/:id` for a single budget.

| Method | Path | Notes |
|--------|------|-------|
| `GET` | `/ping` | Health check (public) |
| `GET` | `/auth/login` | Start Cognito sign-in (or redirect when `AUTH_DISABLED`) |
| `GET` | `/auth/callback` | OAuth callback; sets session cookie |
| `GET` | `/auth/me` | Current user |
| `GET` | `/auth/logout` | Clear session and Cognito logout |
| `GET` | `/profile` | Get profile (protected) |
| `POST` | `/profile` | Create profile (protected; 409 if exists) |
| `PATCH` | `/profile` | Update email / displayName (protected; syncs Cognito email) |
| `POST` | `/events` | Create budget event |
| `GET` | `/events/calendar` | Month grid with expanded recurrence |
| `GET` | `/events/:id` | Single event by id |
| `PATCH` | `/events/:id` | Update budget event |
| `DELETE` | `/events/:id` | Hard-delete budget event (HP1); Plaid txns rejected |
| `GET` | `/categories` | Category display names from config item |
| `POST` | `/plaid/link-token` | Create Plaid Link token (**paid**: plus+; 403 if free) |
| `POST` | `/plaid/exchange-token` | Exchange public token; persist item (**paid**) |
| `POST` | `/plaid/transactions/sync` | Sync transactions → dated events (**paid**) |
| `GET` | `/billing/subscription` | Current subscription |
| `POST` | `/billing/checkout` | Stripe Checkout session |
| `POST` | `/billing/portal` | Stripe Customer Portal |
| `POST` | `/billing/webhooks/stripe` | Stripe webhooks (public; signature-verified) |
| `DELETE` | `/account` | Hard-delete account (HP1; external cleanup stubs until P1/P3) |

Protected routes accept the `balance_session` cookie **or** `Authorization: Bearer <Cognito access token>`.

Full request/response schemas: http://localhost:3000/docs

## Testing

```bash
npm run test -w node
npm run lint -w node
npm run build -w node
```

Unit tests use Vitest (`src/**/*.test.ts`). Manual checks:

1. Seed the database (`npm run db:seed -w node`) with auth disabled
2. Hit `GET /events/calendar`, `POST /events`, `GET|PATCH|DELETE /events/:id` in Swagger UI
3. Run Plaid Link against sandbox credentials
4. Forward Stripe webhooks with the Stripe CLI

## Deployment

Production runs on **AWS Lambda** (Node 22, ARM64) behind **API Gateway HTTP API**, deployed by CDK as `BalanceApiStack`.

**From [`infrastructure/`](../infrastructure/):**

```bash
npm run deploy:ci    # BalanceDatabaseStack + Auth + Api, writes cdk-outputs.json
```

Lambda environment variables are picked from your shell/`process.env` at deploy time via [`pickApiLambdaEnvironment`](../infrastructure/lib/api-env.ts). Export secrets before deploying, or configure them in the GitHub Actions environment.

**GitHub Actions:** push to `main` deploys **staging**; tag `v*` on `main` deploys **production** ([`deploy-staging.yml`](../.github/workflows/deploy-staging.yml) / [`release.yml`](../.github/workflows/release.yml)). PRs run [`ci.yml`](../.github/workflows/ci.yml) only.

After deploy, set:

- `AUTH_CALLBACK_URL` → `{ApiGatewayUrl}/auth/callback`
- `API_PUBLIC_URL` → API Gateway URL
- Update Cognito callback URLs to match

Entry point for Lambda: [`src/lambda.ts`](src/lambda.ts).
