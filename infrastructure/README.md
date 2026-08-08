# Balance Infrastructure

AWS CDK app for the Balance platform. Provisions Cognito auth, DynamoDB, the API (Lambda + HTTP API), static client hosting (S3 + CloudFront), optional custom DNS, and a GitHub Actions OIDC deploy role.

The Angular client does **not** talk to Cognito directly. OAuth callback URLs must point at the **API** (`/auth/callback`), not the frontend.

## Stacks

| Stack | Purpose |
|-------|---------|
| `BalanceAuthStack` | Cognito user pool, public OAuth client, hosted UI domain |
| `BalanceDatabaseStack` | Single-table DynamoDB (`balance`) with GSIs |
| `BalanceApiStack` | Lambda (Fastify) + HTTP API Gateway |
| `BalanceClientStack` | Private S3 bucket + CloudFront distribution |
| `BalanceDnsStack` | Route 53 + ACM certificates (when `ROOT_DOMAIN_NAME` is set) |
| `BalanceGitHubOidcStack` | IAM OIDC provider + GitHub deploy role (optional, context-gated) |

Entry point: [`bin/balance.ts`](bin/balance.ts).

## Prerequisites

- **Node.js 22+**
- **AWS CLI** with deploy permissions (CloudFormation, Cognito, DynamoDB, Lambda, IAM, S3, CloudFront)
- **CDK bootstrap** in the target account/region (once)

All npm commands assume a root install:

```bash
cd ..   # repo root
npm install
```

## Local setup

Compile and synthesize templates:

```bash
npm run build -w balance-infrastructure
npm run synth -w balance-infrastructure
```

Deploy auth + API + database (typical first deploy):

```bash
cd infrastructure
npx cdk bootstrap
npm run deploy
```

This runs `cdk deploy BalanceDatabaseStack BalanceAuthStack BalanceApiStack`.

### Region and account

[`lib/stack-env.ts`](lib/stack-env.ts) resolves:

- **Region:** `CDK_DEFAULT_REGION` → `AWS_REGION` → `us-east-1`
- **Account:** `CDK_DEFAULT_ACCOUNT` or from active AWS credentials

During `cdk synth`, account may show as `undefined` — that is normal.

### Config sources

Each concern has **one** source — no env ↔ context fallbacks. See the table at the top of [`bin/balance.ts`](bin/balance.ts).

| Concern | Source | Keys |
|---------|--------|------|
| Cognito OAuth URLs | CDK context | `callbackUrls`, `logoutUrls` |
| Domain / CORS / DNS | Env vars | `ROOT_DOMAIN_NAME`, `HOSTED_ZONE_ID`, `CLIENT_ORIGIN`, `CLIENT_DOMAIN_NAME`, `CLIENT_CERTIFICATE_ARN` |
| GitHub OIDC | CDK context | `githubOrg`, `githubRepo`, `githubBranches`, `githubEnvironments` |
| API Lambda secrets / IDs | Env vars | see [`lib/api-env.ts`](lib/api-env.ts) |
| Client CSP / DNS labels | CDK context | `clientCsp`, `apiSubdomain`, `appSubdomain` |

### OAuth URLs

Defaults in [`cdk.json`](cdk.json):

```json
{
  "callbackUrls": ["http://localhost:3000/auth/callback"],
  "logoutUrls": ["http://localhost:4200/", "http://localhost:4200/login"]
}
```

| URL type | Must point to |
|----------|----------------|
| **Callback** | API route `GET /auth/callback` |
| **Logout** | Client page after sign-out (e.g. `/login`) |

Override at deploy time with CDK context:

```bash
npx cdk deploy BalanceAuthStack \
  -c callbackUrls='["https://api.example.com/auth/callback"]' \
  -c logoutUrls='["https://app.example.com/login"]'
```

### Wire Cognito outputs to the app

Copy `BalanceAuthStack` outputs into [`.env.local.secrets`](../.env.local.secrets):

```bash
COGNITO_USER_POOL_ID=<UserPoolId>
COGNITO_CLIENT_ID=<UserPoolClientId>
COGNITO_REGION=<CognitoRegion>
COGNITO_HOSTED_UI_DOMAIN=<HostedUiDomain>
COGNITO_AUTHORITY=https://cognito-idp.<region>.amazonaws.com/<UserPoolId>
AUTH_CALLBACK_URL=http://localhost:3000/auth/callback
CLIENT_ORIGIN=http://localhost:4200
SESSION_SECRET=<32+ random characters>
AUTH_DISABLED=false
```

Restart local services (`./deploy.sh`).

### Custom domain (optional)

Set env var `ROOT_DOMAIN_NAME` to synthesize `BalanceDnsStack` and attach custom domains to API and client stacks. Optional: `HOSTED_ZONE_ID`, `CLIENT_ORIGIN`. Subdomain labels default to `api` / `app` in the DNS stack (override with `-c apiSubdomain` / `-c appSubdomain`).

### API Lambda environment

At deploy time, [`pickApiLambdaEnvironment`](lib/api-env.ts) copies configured env vars from your shell into the Lambda. Export Plaid, Stripe, Cognito, and session secrets before `cdk deploy`:

```bash
export PLAID_CLIENT_ID=...
export PLAID_SECRET=...
# ... see api/README.md for the full list
npm run deploy:ci
```

In CI, configure these as GitHub environment secrets/variables.

## NPM scripts

Run from `infrastructure/` (or `npm run <script> -w balance-infrastructure`):

| Script | Description |
|--------|-------------|
| `npm run build` | Compile TypeScript |
| `npm run synth` | Synthesize CloudFormation templates |
| `npm run diff` | Diff auth + API stacks against deployed |
| `npm run deploy` | Deploy Database + Auth + API |
| `npm run deploy:ci` | Same + write `cdk-outputs.json` |
| `npm run deploy:database` | Deploy `BalanceDatabaseStack` only |
| `npm run deploy:api` | Deploy `BalanceApiStack` only |
| `npm run deploy:client` | Deploy `BalanceClientStack` + `cdk-outputs.client.json` |
| `npm run deploy:oidc` | Deploy `BalanceGitHubOidcStack` |

Runbook for operators: [docs/deployment](../docs/deployment/README.md).

## Deployment

### Pipeline overview

| Workflow | Trigger | Target | What it does |
|----------|---------|--------|--------------|
| [`ci.yml`](../.github/workflows/ci.yml) | PR → `main` | — | Build, CDK synth, **npm audit** (high+), **Semgrep** (blocking). Never deploys. |
| [`deploy-staging.yml`](../.github/workflows/deploy-staging.yml) | Push → `main` | GitHub env **`staging`** | Database + Auth + API, then client (OIDC) |
| [`release.yml`](../.github/workflows/release.yml) | Tag `v*` on `main` | GitHub env **`production`** | Same order after verifying the tag is on `main` |

Reusable units (not triggered directly):

- [`reusable-deploy-infra.yml`](../.github/workflows/reusable-deploy-infra.yml) — `BalanceDatabaseStack`, `BalanceAuthStack`, `BalanceApiStack`
- [`reusable-deploy-client.yml`](../.github/workflows/reusable-deploy-client.yml) — `BalanceClientStack` + S3 sync + CloudFront invalidation

Default branch is **`main`**. There is **no** `workflow_dispatch` prod deploy and **no** long-lived AWS access-key fallback (OIDC only).

### One-time OIDC setup (per AWS account)

Deploy the GitHub OIDC stack with admin credentials in **each** account:

```bash
# Staging account
cd infrastructure
npx cdk bootstrap
npm run deploy:oidc -- \
  -c githubOrg=YOUR_GITHUB_USER \
  -c githubRepo=balance \
  -c githubBranches=main \
  -c githubEnvironments=staging

# Production account
npm run deploy:oidc -- \
  -c githubOrg=YOUR_GITHUB_USER \
  -c githubRepo=balance \
  -c githubBranches=main \
  -c githubTags=v* \
  -c githubEnvironments=production
```

Copy each account’s **`DeployRoleArn`** into the matching GitHub **environment** secret `AWS_DEPLOY_ROLE_ARN`.

`BalanceGitHubOidcStack` is only synthesized when CDK context includes `githubOrg` and `githubRepo`.

### GitHub configuration

Create environments **`staging`** and **`production`** (Settings → Environments). Prefer protection rules on `production` (required reviewers / wait timer).

Configure **per environment** (not only repo-level):

| Type | Name | Example |
|------|------|---------|
| Secret | `AWS_DEPLOY_ROLE_ARN` | Role ARN from that account’s OIDC stack |
| Variable | `AWS_REGION` | `us-east-1` |
| Variable | `COGNITO_CALLBACK_URLS` | `["https://api…/auth/callback"]` |
| Variable | `COGNITO_LOGOUT_URLS` | `["https://app…/login"]` |

Client `GATEWAY` comes from CDK **`ApiUrl`** via the infra workflow output `api_base_url` (not a GitHub Actions variable).

OIDC `sub` for deploy jobs is `repo:OWNER/REPO:environment:<name>` — trust must include `staging` / `production` accordingly.

### After deploy

Download artifact **`cdk-outputs-<environment>`** or read job logs for:

- Cognito pool/client IDs → API Lambda env
- **`ApiUrl`** → `AUTH_CALLBACK_URL` / `API_PUBLIC_URL`; also passed to the client job as `GATEWAY`
- Client **`BucketName`** / **`DistributionId`** → S3 sync target

Update Cognito callback URLs in AWS to match the deployed API URL.

### Branch rename checklist

If the repo still uses `master`:

1. Rename default branch to `main` in GitHub
2. Update local remotes: `git fetch origin && git checkout main`
3. Redeploy OIDC stacks with `githubBranches=main`

## Testing

Validate changes before merge:

```bash
# from repo root
npm ci
npm run build -w balance-infrastructure
npm run synth -w balance-infrastructure
npm run lint -w balance-infrastructure
```

PRs to `main` run [`ci.yml`](../.github/workflows/ci.yml) (build, synth, audit, Semgrep). Staging deploys on push to `main`; production on `v*` tags only.

## Troubleshooting

### Credentials could not be loaded (CI)

1. Set environment secret `AWS_DEPLOY_ROLE_ARN` (deploy OIDC stack in that AWS account first).
2. Match secret scope: environment vs repository — an empty environment secret overrides the repo secret.
3. Confirm the role exists in the **same AWS account** as the deploy target (staging role ≠ prod role).

### `Not authorized to perform sts:AssumeRoleWithWebIdentity`

The IAM role trust policy `sub` claim does not match what GitHub sends.

| GitHub sends | When |
|--------------|------|
| `repo:OWNER/REPO:environment:staging` | Job has `environment: staging` |
| `repo:OWNER/REPO:environment:production` | Job has `environment: production` |
| `repo:OWNER/REPO:ref:refs/heads/main` | Push without environment |
| `repo:OWNER/REPO:ref:refs/tags/v*` | Tag push (defense in depth) |

**Fix:** match `githubOrg` / `githubRepo` exactly, redeploy the OIDC stack, verify `AWS_DEPLOY_ROLE_ARN`.

### CI succeeded but nothing in the console

Cognito is **regional**. Check the account and region from the deploy log:

`Deploying BalanceAuthStack to account … in …`

| Look here | Not here |
|-----------|----------|
| Cognito → User pools (`balance-users`) | IAM roles (OIDC stack only) |
| CloudFormation `BalanceAuthStack` | Local `cdk.out/` templates |

### Lambda bundling / monorepo

`BalanceApiStack` bundles from the **repo root** lockfile so workspace packages (`@balance/schemas`, `@balance/domain`) resolve correctly. Entry: [`api/src/lambda.ts`](../api/src/lambda.ts).

## Adding resources

New stacks belong in `lib/`, registered from [`bin/balance.ts`](bin/balance.ts). Extend [`github-deploy-policy.ts`](lib/github-deploy-policy.ts) when CI needs new IAM permissions.

## Related docs

- [Root README](../readme.md) — local dev and secrets
- [API README](../api/README.md) — Lambda env vars and routes
- [Client README](../client/README.md) — client deploy workflow
