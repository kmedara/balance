# Balance — incremental plan

Single roadmap for API, client, database, billing, and infra. Phases are ordered: each phase should be shippable before moving on.

**Architecture**

```
Angular client  →  Fastify API (Lambda)  →  DynamoDB (single table)
                        ↓
        Cognito OAuth (BFF sessions) · Plaid · Stripe webhooks
```

**Auth model:** the API is a BFF. Client redirects to `GET /auth/login` (Cognito hosted UI + PKCE); the API exchanges the code and sets an encrypted `balance_session` cookie. Protected routes accept the session cookie **or** an `Authorization: Bearer <Cognito access token>`.

**Domain model:** budgets and bank transactions are unified **events** in one DynamoDB table.

- Recurring events (`EVT#<type>#<id>`) store an `rrule`; occurrences are **expanded at read time** (no occurrence rows).
- Plaid transactions (`EVD#<YYYY-MM-DD>#<id>`) are date-anchored single events.
- Client calendar loads `GET /events/calendar`; create uses `POST /events`.

---

## Done (baseline)

Cross-cutting capabilities already in the repo.

### API (`api/`)

- [x] Fastify 5 + TypeBox, CORS (credentials), `/ping`, dev Docker (`Dockerfile.dev`, `tsx watch`)
- [x] Deployable as Node (`src/index.ts`) or Lambda (`src/lambda.ts` via `@fastify/aws-lambda`)
- [x] DynamoDB single-table layer (`src/dynamo/*`): keys, entities, query/cursor, batch write
- [x] Cognito OAuth + PKCE + AES-256-GCM session cookie (`auth/*`); `AUTH_DISABLED` for local dev
- [x] Bearer access-token verification as alternative to session cookie
- [x] User upsert on authenticated requests (`USER#<sub>` / `PROFILE`)
- [x] RFC 9457 Problem Details error handling (`errors/*`; `application/problem+json`)
- [x] Swagger UI at `/docs` with route schemas
- [x] **Events:** `POST /events`, `GET /events/calendar`, `GET /events/:id`, `PATCH /events/:id` (rrule expansion, budget + plaid types)
- [x] **Categories:** `GET /categories` from `CONFIG`/`CATEGORIES` item
- [x] **Plaid:** `POST /plaid/link-token`, `POST /plaid/exchange-token`, `POST /plaid/transactions/sync`
- [x] Encrypted Plaid access tokens; items/accounts/sync-cursor persisted per user
- [x] Plaid transactions → date-anchored `plaid_transaction` events (inverted `TXN#` ref, soft-delete + TTL)
- [x] **Billing:** `GET /billing/subscription`, `POST /billing/checkout`, `POST /billing/portal`, `POST /billing/webhooks/stripe`
- [x] `requireEntitlement()` / `hasEntitlement()` helpers (`billing/entitlements.ts`) — defined, not yet wired to routes
- [x] Scripts: `db:create-tables`, `db:seed`, `db:seed:reset`

### Client (`client/`)

- [x] Angular 21 zoneless, PrimeNG + Tailwind, gateway HTTP client (base URL + `withCredentials`)
- [x] BFF auth: `APP_INITIALIZER` → `GET /auth/me`; login/logout via full-page redirect to API
- [x] `authGuard` on app layout; `AUTH_DISABLED` dev bypass
- [x] Calendar month grid; loads `GET /events/calendar` via NgRx Signal Store (`withResource`)
- [x] Renders `budget` + `plaid_transaction` events; month income/expense/net summary
- [x] Generic modal system (NgRx Signal Store) on PrimeNG `Dialog`
- [x] Add-budget modal → `POST /events`; edit budget from calendar item → `PATCH /events/:id`
- [x] Plaid Link connect + manual sync (service level)

### Database (DynamoDB)

- [x] Local DynamoDB in Docker Compose (`amazon/dynamodb-local`, `DYNAMODB_ENDPOINT`)
- [x] Single table `balance`: `PK`/`SK`, `entityType`, TTL on `ttl`
- [x] Entities: user profile, recurring/dated events, Plaid item/account, txn ref, categories config
- [x] GSIs: `StripeCustomerIndex`, `PlaidItemIndex`, `EventIdIndex`
- [x] `create-tables.ts` (local parity) + `seed.ts` (categories + budget events)

### Infrastructure

- [x] CDK `BalanceAuthStack` (Cognito user pool, hosted UI, PKCE web client)
- [x] CDK `BalanceDatabaseStack` (DynamoDB table + 3 GSIs, on-demand, TTL)
- [x] CDK `BalanceApiStack` (HTTP API + Node 22 Lambda, DynamoDB grant)
- [x] CDK `BalanceClientStack` (S3 + CloudFront + OAC + security headers)
- [x] CDK `BalanceDnsStack` (Route 53 + ACM for `api.` / `app.`, conditional on `ROOT_DOMAIN_NAME`)
- [x] GitHub OIDC deploy role (scoped policy)
- [x] CI: validate + deploy auth / database / API (`.github/workflows/infrastructure.yml`)
- [x] CI: build + deploy client (`.github/workflows/client.yml`)

---

## Infrastructure

End-to-end AWS platform for Balance: org layout → runtime → secrets → CI/CD. Ordered roughly by dependency.

### AWS Organization & accounts

- [X] Create AWS Organization (management account for billing/org only — no workloads)
- [X] **Dev** workload account — experiments, localhost-parity deploys
- [ ] **Staging** workload account — pre-prod, Stripe test mode, Plaid sandbox
- [ ] **Production** workload account — real users, live Stripe/Plaid
- [X] IAM Identity Center (SSO) for human access; no long-lived IAM user keys
- [X] Service control policies: deny root usage, optional region lock, protect org CloudTrail
- [ ] CDK bootstrap once per account/region (`npx cdk bootstrap`)
- [ ] Document which GitHub environment maps to which AWS account

### Auth (Cognito)

- [x] `BalanceAuthStack` — user pool, PKCE web client, hosted UI domain
- [x] `BalanceGitHubOidcStack` — GitHub Actions OIDC deploy role
- [ ] Per-environment Cognito pools (separate dev / staging / prod — never share a pool)
- [ ] OAuth callback + logout URLs for staging API (`https://api.staging.<domain>/auth/callback`, client origin)
- [ ] OAuth callback + logout URLs for production API
- [ ] `SESSION_SECRET` stored in Secrets Manager; injected into API runtime (32+ chars)
- [ ] Production stack: `removalPolicy: RETAIN` on Cognito resources

### DNS & TLS — `BalanceDnsStack`

- [x] Route 53 hosted zone (create new, or import via `-c hostedZoneId=`)
- [x] ACM cert + API Gateway custom domain `api.<domain>` + `api` A/AAAA alias
- [x] ACM cert for `app.<domain>` (shared into `BalanceClientStack` for CloudFront)
- [x] `app` A/AAAA alias → CloudFront (created in `BalanceClientStack`)
- [x] Stack wiring behind `-c rootDomainName=` / `ROOT_DOMAIN_NAME` (API → DNS → Client)
- [ ] Register domain / point registrar at the zone name servers (`NameServers` output)
- [ ] Deploy `BalanceDnsStack` in **us-east-1** (CloudFront cert requirement)
- [ ] After cutover set `AUTH_CALLBACK_URL=https://api.<domain>/auth/callback`, client `GATEWAY=https://api.<domain>`, Cognito callback/logout URLs

### API runtime (API Gateway + Lambda)

- [x] `buildApp()` factory (`api/src/app.ts`) + Lambda handler (`api/src/lambda.ts`)
- [x] CDK `BalanceApiStack` — HTTP API `{proxy+}` + Node.js 22 Lambda (`balance-api`), CloudWatch log group
- [x] DynamoDB read/write grant + `BALANCE_TABLE` env wired to Lambda
- [x] CORS with credentials + `Stripe-Signature` header allowed
- [ ] Wire Lambda env from GitHub secrets / Secrets Manager (currently `pickApiLambdaEnvironment()` reads shell env at synth/deploy)
- [ ] CloudWatch alarms: Lambda errors, duration, throttles
- [ ] Confirm `CLIENT_ORIGIN` allowlist matches deployed Angular origin per environment

### Client (Angular static)

- [x] `client/Dockerfile.prod` + `nginx.conf` (local/prod image build exists)
- [x] Production `environment.production.ts` + config-aware `write-environment.mjs` (`BUILD_CONFIGURATION=production`, build-time `GATEWAY`)
- [x] S3 bucket for static assets (private; Block Public Access; SSL-only) — `BalanceClientStack`
- [x] CloudFront distribution in front of S3 (OAC) + HTTPS redirect + SPA 403/404 → `index.html`
- [x] Security response headers (HSTS, nosniff, frame-deny, referrer-policy) via CloudFront policy
- [x] Client deploy workflow: build → deploy stack → `s3 sync` → CloudFront invalidation (`.github/workflows/client.yml`)
- [ ] Set repo variable `API_BASE_URL` (client `GATEWAY`)
- [ ] Custom domain on CloudFront (`-c clientDomainName=` + `-c clientCertificateArn=` in `us-east-1`)
- [ ] Optional: tighten `Content-Security-Policy` (`-c clientCsp=`) once tested against PrimeNG/Tailwind
- [ ] Optional: AWS WAF on the CloudFront distribution

### Database (DynamoDB)

- [x] Single-table design + key catalog (`api/src/dynamo/keys.ts`)
- [x] `BalanceDatabaseStack` — table `balance`, on-demand billing, TTL on `ttl`, 3 GSIs
- [x] `db:create-tables` (local parity) + `db:seed` / `db:seed:reset`
- [x] Local DynamoDB via Docker Compose (`-inMemory -sharedDb`)
- [ ] Per-environment tables (dev / staging / prod) with retain policy on prod
- [ ] Point-in-time recovery (PITR) + on-demand backups for prod table
- [ ] CI: run `db:create-tables` / migrations against deployed table if schema evolves
- [ ] Document GSI cost/throughput expectations (KEYS_ONLY vs ALL projections)

### Secrets & configuration

- [ ] AWS Secrets Manager (or SSM SecureString) entries per environment:
  - [ ] `SESSION_SECRET`
  - [ ] `PLAID_CLIENT_ID`, `PLAID_SECRET`, `PLAID_ENV`, `PLAID_REDIRECT_URI`
  - [ ] `ACCESS_TOKEN_ENCRYPTION_KEY` (+ algorithm / IV metadata)
  - [ ] `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
  - [ ] Stripe price IDs (`STRIPE_PRICE_PLUS_MONTHLY`, etc.)
- [ ] CDK or Lambda: grant `secretsmanager:GetSecretValue`; load at cold start or inject via env
- [ ] Root `.env.local.secrets` template / docs for local-only vs pulled-from-AWS
- [ ] No secrets in GitHub vars except ARNs / non-sensitive config

### CI/CD — application deploy

- [x] Infrastructure workflow deploys `BalanceAuthStack` + `BalanceDatabaseStack` + `BalanceApiStack` (bundles `api/src` into Lambda on push)
- [x] Client workflow: build Angular → deploy `BalanceClientStack` → sync to S3 → CloudFront invalidation
- [x] `github-deploy-*.ts` statements cover CFN, Cognito, Lambda, API GW, DynamoDB, S3, CloudFront, Route53, ACM
- [ ] Pass API secrets (Stripe, Plaid, `SESSION_SECRET`, encryption key) as deploy-time env for Lambda configuration
- [ ] Separate OIDC deploy roles per AWS account (`balance-github-deploy-dev`, `-staging`, `-prod`)
- [ ] GitHub environments: `development`, `staging`, `production` with protection rules on prod
- [ ] Manual approval gate before production deploy

### Third-party webhooks & callbacks

- [ ] Stripe production webhook URL → `https://api.<domain>/billing/webhooks/stripe`
- [ ] Stripe webhook signing secret in Secrets Manager; rotate procedure documented
- [ ] Plaid production `PLAID_REDIRECT_URI` registered in Plaid dashboard
- [ ] Plaid webhook URL (when API endpoint exists) — public HTTPS, no auth guard
- [ ] Cognito allowed callback URLs match deployed API URLs only (not Angular dev server in prod pool)

### Observability & operations

- [ ] CloudWatch alarms: Lambda errors, throttles, p99 duration
- [ ] Structured API logs → CloudWatch (JSON); request id in logs
- [ ] Optional: error tracking (Sentry) DSN in Secrets Manager
- [ ] Runbook: deploy rollback (publish previous Lambda version / alias)
- [ ] Runbook: DynamoDB PITR restore

### Security & compliance

- [ ] AWS WAF on API Gateway or CloudFront (rate limit, AWS managed rule sets)
- [ ] GuardDuty + Security Hub in security/audit account (org-level)
- [ ] Organization CloudTrail → S3 log archive account
- [ ] Least-privilege Lambda execution role (DynamoDB + Secrets only; no IAM/CDK admin)
- [ ] Encrypt S3 buckets, Secrets Manager, DynamoDB (default KMS OK to start)

### Local dev parity

- [ ] `docker-compose.yml` healthcheck on `dynamodb`
- [ ] Note: local DynamoDB uses `-inMemory` — data is lost on restart; add persistent volume if needed
- [ ] Document env matrix: local Compose vs dev AWS vs staging vs prod
- [ ] `./deploy.sh` remains local-only; prod deploy never uses Compose on a server

---

## Phase 1 — Core product loop

**Goal:** reliable create → view → edit → delete for manual budgets on the calendar. No billing gates yet.

### API

- [x] `POST /events` — create budget (raw `rrule` or `frequency`/`interval`/`until`)
- [x] `GET /events/:id` — single event (via `EventIdIndex`)
- [x] `PATCH /events/:id` — update budget fields / recurrence (budget events only)
- [ ] `GET /events` — list events for the user (paged)
- [ ] `DELETE /events/:id` — soft-delete (`removed: true`, TTL) for budget events
- [ ] Skip / exception single occurrence of a recurring event (exception dates on the rrule)
- [ ] Remove leftover debug `console.log` in `auth/protected.ts`

### Client

- [x] Modal submit → `POST /events` → calendar refresh
- [x] Edit budget from calendar item (`MODAL_DATA`, `PATCH /events/:id`)
- [ ] Delete budget from calendar or detail view (needs API `DELETE`)
- [ ] Loading / error state on modal submit; disable Save while pending
- [ ] Toast notifications for success and failure
- [ ] Filter calendar by income vs expense (query param already supported server-side)
- [ ] Fix stray `aa` text in `default-calendar-item.html`
- [ ] Remove unused `ModalService` injection in `calendar.ts`

### Categories

- [ ] `GET /categories?prefix=` — autocomplete filter
- [ ] `POST /categories` — user-defined category (scoped by `userId`)
- [ ] Return category objects (color / type), not just display strings

### Database

- [ ] Decide user-defined category storage (per-user `CAT#` items vs shared `CONFIG`)
- [ ] Idempotent seed (safe re-run without duplicates)

### Quality

- [ ] Fix typo: `cateogoryRoutes` → `categoryRoutes`
- [ ] `/health` — DynamoDB reachability + dependency status
- [ ] Vitest: calendar/recurrence utils, event create validation
- [ ] E2E smoke: login → add budget → visible on calendar

---

## Phase 2 — Bank linking & planned vs actual

**Goal:** link institutions, sync transactions, show actuals alongside budgets on the calendar and summary views.

### API

- [x] `POST /plaid/exchange-token` — return `{ item_id, request_id }` after linking
- [ ] `GET /plaid/items` — list linked institutions (no access tokens)
- [ ] `DELETE /plaid/items/:itemId` — unlink + deactivate item
- [ ] Plaid webhook endpoint for transaction updates (reduce reliance on manual sync)
- [ ] Monthly summary endpoint or calendar aggregation (Income / Expenses / Net for a month)

### Client

- [ ] Refresh calendar after `fetchTransactions()` (call `reloadCalendar()`)
- [ ] List linked institutions; unlink with confirmation
- [ ] Surface link / sync errors in UI
- [ ] **Balances** route: linked accounts, balances, budgeted vs actual
- [ ] Show transaction list from `PlaidService.transactions` (currently populated, never rendered)
- [ ] Compare planned vs actual spending (month scope first)

### Database

- [ ] Document Plaid sync cursor / webhook idempotency handling
- [ ] Confirm TTL policy for soft-removed transaction events (currently 90 days)

### State management

- [ ] Plaid Signal Store (replace ad-hoc `PlaidService` signals)
- [ ] Split API event shape from UI event shape in stores

---

## Phase 3 — Billing & entitlements

**Goal:** Stripe subscriptions live; API enforces tier limits; client upgrade path.

### Tier reference

| Capability | **Free** | **Plus** $6/mo · $60/yr | **Pro** $12/mo · $120/yr |
|---|---|---|---|
| Manual budgets | Up to 25 | Unlimited | Unlimited |
| Calendar history | Current + 1 past month | Unlimited | Unlimited |
| Bank linking (Plaid) | — | Up to 2 institutions | Unlimited |
| Transaction sync | — | Daily | Daily + manual |
| Planned vs actual | — | ✓ | ✓ |
| CSV / Excel import | — | ✓ | ✓ |
| Export (CSV) | — | ✓ | ✓ |

Limits live in `api/src/billing/constants.ts`: `FREE_TIER_BUDGET_LIMIT = 25`, `PLUS_TIER_PLAID_ITEM_LIMIT = 2`.
Stripe env vars: `STRIPE_PRICE_PLUS_MONTHLY`, `STRIPE_PRICE_PLUS_ANNUAL`, `STRIPE_PRICE_PRO_MONTHLY`, `STRIPE_PRICE_PRO_ANNUAL`.

### Stripe & ops

- [x] Webhook handler: `checkout.session.completed`, `customer.subscription.*`, `invoice.payment_failed`
- [x] Subscription state persisted on user `PROFILE`; `StripeCustomerIndex` for webhook → user lookup
- [ ] Create Stripe products/prices; optional trial via `STRIPE_TRIAL_PERIOD_DAYS`
- [ ] Store `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, price IDs in `.env.local.secrets` / Secrets Manager
- [ ] Enable Customer Portal (cancel, update card, switch plan)
- [ ] Local webhook: `stripe listen --forward-to localhost:3000/billing/webhooks/stripe`
- [ ] Production webhook URL + secrets — see **Infrastructure → Third-party webhooks & Secrets**

### API enforcement

`entitlements.ts` helpers exist but are **not wired to any route** yet.

- [ ] Budget count — reject `POST /events` (budget) when Free user is at `FREE_TIER_BUDGET_LIMIT`
- [ ] Calendar history — clamp `GET /events/calendar` for Free tier
- [ ] `requireEntitlement('plus')` on Plaid link / exchange / sync
- [ ] Plaid item count — enforce `PLUS_TIER_PLAID_ITEM_LIMIT`; Pro unlimited
- [ ] Gate import/export routes when built (Phase 4)
- [ ] Backfill: existing users already default to `{ tier: 'free', status: 'none' }` — verify on migration

### Client

There is **no billing UI** in the client today.

- [ ] Pricing page (Free vs Plus vs Pro)
- [ ] `/settings/billing` — current plan, upgrade, Manage subscription → Portal
- [ ] `BillingService` + signal store (`tier`, `status`, `currentPeriodEnd`)
- [ ] Upgrade prompts at limit surfaces (budget cap, bank link, older months)
- [ ] Post-checkout poll `GET /billing/subscription` until webhook lands
- [ ] Trial banner; hide Plaid when tier < Plus
- [ ] Wire the stubbed `premium.canActivate` guard (currently always returns `true`)
- [ ] Finish `navigation-menu-resolver` paid-route filtering (commented out)

---

## Phase 4 — Import, export & polish

**Goal:** power-user workflows and production readiness.

### Import / export

- [ ] `POST /events/import` — bulk create from parsed rows; per-row errors
- [ ] Idempotency / duplicate detection on import
- [ ] Client: Excel/CSV column mapping, preview, progress UI
- [ ] `GET /events/export` — CSV for date range (Plus+)

### UX & layout

- [ ] Finish placeholder `currency-input` component (used on amount field)
- [ ] Calendar tooltip / detail panel; category color coding
- [ ] Empty states; global loading indicator
- [ ] Mobile layout parity (mobile layout scaffold exists but is unrouted); accessible modal focus trap
- [ ] Dark mode / theme tokens

### Platform

- [ ] `/health` — DynamoDB reachability + dependency status
- [ ] Integration tests: events, Plaid, billing webhook
- [ ] Table creation / GSI verification in CI

---

## Phase 5 — Growth & Pro

**Goal:** retention, analytics, and higher-tier features.

- [ ] Annual plan emphasis on pricing (2 months free)
- [ ] Trial expiration / payment-failed emails (Stripe dunning)
- [ ] Usage metrics: link rate, budgets created, WAU
- [ ] Alerts (overspend, low balance) — email, then push
- [ ] Pro: category rules, household sharing (up to 2 members)
- [ ] Pro: public API keys (future)

---

## Technical debt (ongoing)

Pick up alongside any phase; not blocking order.

| Area | Item |
|---|---|
| API | Remove debug `console.log` from `auth/protected.ts` |
| API | Fix `cateogoryRoutes` typo |
| API | Structured logging; request id in logs |
| API | Rename legacy `MongoTimestamps` type (`data/types.ts`) to a DB-agnostic name |
| Client | Remove unused `ModalService` injections; fix `default-calendar-item` stray text |
| Client | Wire or delete stubbed `premium.canActivate` guard |
| DB | Local DynamoDB is in-memory — document that seed must re-run after restart |
| Infra | Update `infrastructure/README.md` — it predates the DynamoDB / API / client / DNS stacks |
| Docs | Keep this file current; ensure no stale MongoDB / occurrence-row references |

---

## Related docs

- `infrastructure/README.md` — stale; describes only Cognito + OIDC (needs update)
- `TODO.md` → **Infrastructure** — full AWS platform checklist
- `api/src/dynamo/keys.ts` — DynamoDB key + GSI catalog
- `@balance/domain` (`packages/domain`) — shared event/budget/subscription types
