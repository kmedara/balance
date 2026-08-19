# Balance Client

Angular 21 Single-Page Application (SPA) for the Balance calendar. Talks to the Application Programming Interface
(API) over HTTP with credentials (session cookies). No direct Amazon Cognito or Plaid server configuration —
authentication and Link token creation happen on the API.

## Stack

- **Angular 21** with standalone components, signals, and Server-Side Rendering (SSR)
- **PrimeNG** + **Tailwind CSS** for UI
- **NgRx Signals** for calendar state
- **Vitest** for unit tests
- **Shared types:** import from `@balance/schemas/client` and `@balance/domain/client` directly

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
| `npm run test` | Vitest via Angular unit-test builder with coverage (`--watch=false`) |
| `npm run test:watch` | Vitest in watch mode |
| `npm run serve:ssr:angular` | Run SSR server from build output |

### Testing

```bash
npm run test -w balance          # from repo root (prints coverage + writes coverage/)
npm run test:watch -w balance    # watch mode
```

Uses Angular’s `@angular/build:unit-test` runner (Vitest + jsdom). Specs are co-located as `*.spec.ts`. HTML report: `client/coverage/index.html`.

## Shared types

Import wire types and constants from `@balance/schemas/client`, and domain helpers from `@balance/domain/client`:

```typescript
import type { CreateEventBody, CalendarResponseWire } from '@balance/schemas/client';
import { budgetTypes, BUDGET_EVENT_TYPE } from '@balance/schemas/client';
import { isBudget } from '@balance/domain/client';
```

- **`@balance/schemas/client`** — TypeBox-derived wire shapes and constants (use `import type` where possible)
- **`@balance/domain/client`** — client-safe helpers (avoids pulling rrule into the Angular bundle)

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

Production hosting is **Amazon Simple Storage Service (S3) + Amazon CloudFront**, provisioned by Amazon Web Services
(AWS) Cloud Development Kit (CDK) (`BalanceClientStack`). The built SPA is uploaded by GitHub Actions — the CDK stack
does not embed build artifacts.

### CI workflow

Client deploys run as part of the shared release pipelines (not a standalone client-only workflow):

| Trigger | Workflow | Environment |
|---------|----------|-------------|
| Push to `main` | [`deploy-staging.yml`](../.github/workflows/deploy-staging.yml) | `staging` |
| Tag `v*` on `main` | [`release.yml`](../.github/workflows/release.yml) | `production` |

**Required GitHub configuration (per environment):**

| Type | Name | Description |
|------|------|-------------|
| Secret | `AWS_DEPLOY_ROLE_ARN` | OpenID Connect (OIDC) deploy role from that account’s `BalanceGitHubOidcStack` |
| Variable | `AWS_REGION` | Deploy region (default `us-east-1`) |

`GATEWAY` is passed from the infra job as CDK **`ApiUrl`** (`api_base_url` workflow output).

See [`infrastructure/README.md`](../infrastructure/README.md#deployment) for OIDC setup.

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
