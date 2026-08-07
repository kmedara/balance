# Balance Client

Angular 21 single-page app for the Balance calendar. Talks to the API over HTTP with credentials (session cookies). No direct Cognito or Plaid server configuration — auth and Link token creation happen on the API.

## Stack

- **Angular 21** with standalone components, signals, and SSR
- **PrimeNG** + **Tailwind CSS** for UI
- **NgRx Signals** for calendar state
- **Vitest** for unit tests
- **Shared types:** [`@core/domain`](src/app/core/domain.ts) re-exports `@balance/schemas/client` + `@balance/domain/client`

## Local setup

### With Docker (recommended)

From the repo root:

```bash
npm install
./deploy.sh
```

The client container serves at http://localhost:4200 with file sync for `client/` and `packages/domain/`. Schema package changes are not live-synced — rebuild with `npm run build:schemas` after editing [`packages/schemas`](../packages/schemas).

### On the host

```bash
# from repo root
npm install
npm run build:schemas
npm run build:domain

cd client
export GATEWAY=http://localhost:3000
export AUTH_DISABLED=true
npm start
```

`prestart` runs [`scripts/write-environment.mjs`](scripts/write-environment.mjs), which generates the active environment file from env vars.

## Environment configuration

The client reads **two env vars** at build/start time:

| Variable | Default | Description |
|----------|---------|-------------|
| `GATEWAY` | `http://localhost:3000` | API base URL baked into the app |
| `AUTH_DISABLED` | `false` in prod; from env in dev | When `true`, skips redirect to API login |

Generated files (do not edit by hand):

- **Development:** `src/environments/environment.development.ts`
- **Production:** `src/environments/environment.production.ts`

Type definition: [`src/environments/environment.types.ts`](src/environments/environment.types.ts).

### Docker / deploy.sh

Docker Compose passes [`.env.local.secrets`](../.env.local.secrets) to the client container. Ensure `GATEWAY` points at the API (`http://localhost:3000` locally).

### Production builds

`GATEWAY` is **required** when `BUILD_CONFIGURATION=production`:

```bash
GATEWAY=https://api.example.com npm run build -- --configuration production
```

## NPM scripts

Run from repo root with `-w balance`, or from `client/`:

| Script | Description |
|--------|-------------|
| `npm start` | Dev server on port 4200 (`prestart` writes environment) |
| `npm run build` | Production build → `dist/balance/` |
| `npm run watch` | Dev build in watch mode |
| `npm run lint` | ESLint (Angular + TypeScript) |
| `npm run test` | Vitest unit tests |
| `npm run serve:ssr:angular` | Run SSR server from build output |

## Shared types

Import wire types and helpers from `@core/domain`, not directly from the workspace packages:

```typescript
import type { CalendarEvent, Budget, CreateEventBody } from '@core/domain';
import { isBudget, budgetTypes } from '@core/domain';
```

[`@core/domain`](src/app/core/domain.ts) re-exports:

- **Wire types / constants** from `@balance/schemas/client` (TypeBox-derived shapes for HTTP)
- **Client-safe helpers** from `@balance/domain/client` (avoids pulling rrule into the Angular bundle)

After editing shared packages:

```bash
npm run build:schemas   # packages/schemas
npm run build:domain    # packages/domain
```
## Testing

Unit tests use **Vitest** with jsdom. Config: [`vitest.config.ts`](vitest.config.ts).

```bash
npm run test -w balance          # run once
npm run test -w balance -- --ui # Vitest UI (if installed)
```

Test files: `**/*.spec.ts` under `src/`.

```bash
npm run lint -w balance
npm run build -w balance
```

There is no e2e suite configured yet.

## Building

```bash
# development (default)
npm run build -w balance

# production
cd client
BUILD_CONFIGURATION=production GATEWAY=https://api.example.com npm run build -- --configuration production
```

Output: `client/dist/balance/browser/` (static assets) and `client/dist/balance/server/` (SSR).

## Deployment

Production hosting is **S3 + CloudFront**, provisioned by CDK (`BalanceClientStack`). The built SPA is uploaded by GitHub Actions — the CDK stack does not embed build artifacts.

### CI workflow

[`.github/workflows/client.yml`](../.github/workflows/client.yml):

| Trigger | Action |
|---------|--------|
| Push to `master` (client/domain changes) | Build production client, deploy stack, sync to S3, invalidate CloudFront |
| Manual `workflow_dispatch` | Same, with optional `api_base_url` input |

**Required GitHub configuration:**

| Type | Name | Description |
|------|------|-------------|
| Secret | `AWS_DEPLOY_ROLE_ARN` | OIDC deploy role from `BalanceGitHubOidcStack` |
| Variable | `API_BASE_URL` | Production API URL baked into `GATEWAY` |
| Variable | `AWS_REGION` | Deploy region (default `us-east-1`) |

Environment: **`development`** (must match OIDC trust policy).

### Manual deploy

```bash
# from repo root
npm ci
BUILD_CONFIGURATION=production GATEWAY=https://api.example.com npm run build -w balance

cd infrastructure
npm run deploy:client
# sync dist/balance/browser to the stack's S3 bucket + invalidate CloudFront
```

See [`infrastructure/README.md`](../infrastructure/README.md) for stack outputs (`BucketName`, `DistributionId`).

### Docker production image

[`Dockerfile.prod`](Dockerfile.prod) builds the Angular app and serves static files with nginx on port 8080. Build context is the **repo root** (monorepo workspace).

```bash
docker build -f client/Dockerfile.prod -t balance-client .
```

## Project structure

| Path | Purpose |
|------|---------|
| `src/app/core/` | Auth, gateway HTTP, guards, layout |
| `src/app/modules/calendar/` | Calendar view and event items |
| `src/app/modules/modal/` | Add/edit event modals |
| `src/app/modules/plaid/` | Plaid Link integration |
| `src/app/routes/` | Route definitions |

## Additional resources

- [Angular CLI documentation](https://angular.dev/tools/cli)
- [Root README](../readme.md) — monorepo setup and secrets
- [API README](../api/README.md) — auth flow and API routes
