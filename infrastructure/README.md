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

This runs `cdk deploy BalanceAuthStack BalanceApiStack` (database is a dependency of the API stack).

### Region and account

[`lib/stack-env.ts`](lib/stack-env.ts) resolves:

- **Region:** `CDK_DEFAULT_REGION` → `AWS_REGION` → `us-east-1`
- **Account:** `CDK_DEFAULT_ACCOUNT` or from active AWS credentials

During `cdk synth`, account may show as `undefined` — that is normal.

### OAuth URLs

Defaults in [`cdk.json`](cdk.json):

```json
{
  "callbackUrls": ["http://localhost:3000/auth/callback"],
  "logoutUrls": ["http://localhost:4200/"]
}
```

| URL type | Must point to |
|----------|----------------|
| **Callback** | API route `GET /auth/callback` |
| **Logout** | Client page after sign-out (e.g. `/login`) |

Override at deploy time:

```bash
npx cdk deploy BalanceAuthStack \
  -c callbackUrls='["https://api.example.com/auth/callback"]' \
  -c logoutUrls='["https://app.example.com/login"]'
```

Or set env vars before deploy:

```bash
export COGNITO_CALLBACK_URLS='["https://api.example.com/auth/callback"]'
export COGNITO_LOGOUT_URLS='["https://app.example.com/login"]'
npm run deploy
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

Set `ROOT_DOMAIN_NAME` (env or CDK context) to synthesize `BalanceDnsStack` and attach custom domains to API and client stacks. Subdomains default to `api` and `app`.

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
| `npm run deploy` | Deploy `BalanceAuthStack` + `BalanceApiStack` |
| `npm run deploy:ci` | Deploy + write `cdk-outputs.json` |
| `npm run deploy:database` | Deploy `BalanceDatabaseStack` only |
| `npm run deploy:api` | Deploy `BalanceApiStack` only |
| `npm run deploy:client` | Deploy `BalanceClientStack` + `cdk-outputs.client.json` |
| `npm run deploy:oidc` | Deploy `BalanceGitHubOidcStack` |

## Deployment

### What each pipeline deploys

| Workflow | Stacks / artifacts |
|----------|-------------------|
| [`infrastructure.yml`](../.github/workflows/infrastructure.yml) | `BalanceAuthStack`, `BalanceApiStack` (+ database via dependency) |
| [`client.yml`](../.github/workflows/client.yml) | `BalanceClientStack`, then uploads `client/dist/balance/browser` to S3 |

### GitHub Actions — infrastructure

[`.github/workflows/infrastructure.yml`](../.github/workflows/infrastructure.yml):

| Event | Behavior |
|-------|----------|
| PR (infra/api/domain changes) | `npm ci`, build, `cdk synth` |
| Push to `master` | Validate, then deploy to **`development`** environment |
| Manual dispatch | Deploy with optional callback/logout URL overrides |

### GitHub Actions — client

[`.github/workflows/client.yml`](../.github/workflows/client.yml) builds the Angular app with `GATEWAY=$API_BASE_URL`, deploys `BalanceClientStack`, syncs to S3, and invalidates CloudFront.

### One-time OIDC setup

Deploy the GitHub OIDC stack with admin credentials:

```bash
cd infrastructure
npx cdk bootstrap
npm run deploy:oidc -- \
  -c githubOrg=YOUR_GITHUB_USER \
  -c githubRepo=balance \
  -c githubBranches=master \
  -c githubEnvironments=development
```

Copy output **`DeployRoleArn`** → GitHub secret `AWS_DEPLOY_ROLE_ARN`.

`BalanceGitHubOidcStack` is only synthesized when CDK context includes `githubOrg` and `githubRepo`.

### GitHub configuration

Create a **`development`** environment (Settings → Environments) if using protection rules.

| Type | Name | Example |
|------|------|---------|
| Secret | `AWS_DEPLOY_ROLE_ARN` | `arn:aws:iam::123456789012:role/balance-github-cdk-deploy` |
| Variable | `AWS_REGION` | `us-east-1` |
| Variable | `API_BASE_URL` | `https://xxxx.execute-api.us-east-1.amazonaws.com` (client builds) |
| Variable | `COGNITO_CALLBACK_URLS` | `["https://api.example.com/auth/callback"]` |
| Variable | `COGNITO_LOGOUT_URLS` | `["https://app.example.com/login"]` |

The deploy job uses `environment: development`, so the OIDC trust policy must include `repo:OWNER/REPO:environment:development`.

**Fallback (not recommended):** repository secrets `AWS_ACCESS_KEY_ID` + `AWS_SECRET_ACCESS_KEY` when `AWS_DEPLOY_ROLE_ARN` is unset.

### After deploy

Download artifact **`cdk-outputs`** or read job logs for:

- Cognito pool/client IDs → API Lambda env
- **`ApiUrl`** → `AUTH_CALLBACK_URL`, `API_BASE_URL`, client `GATEWAY`
- Client **`BucketName`** / **`DistributionId`** → S3 sync target

Update Cognito callback URLs in AWS to match the deployed API URL.

## Testing

Validate changes before merge:

```bash
# from repo root
npm ci
npm run build -w balance-infrastructure
npm run synth -w balance-infrastructure
npm run lint -w balance-infrastructure
```

PRs to `master` run synth automatically. Full deploy runs only on push to `master` (not on PRs).

## Troubleshooting

### Credentials could not be loaded (CI)

1. Set `AWS_DEPLOY_ROLE_ARN` (deploy OIDC stack first).
2. Match secret scope: environment vs repository — an empty environment secret overrides the repo secret.
3. Confirm the role exists in the same AWS account as the deploy target.

### `Not authorized to perform sts:AssumeRoleWithWebIdentity`

The IAM role trust policy `sub` claim does not match what GitHub sends.

| GitHub sends | When |
|--------------|------|
| `repo:OWNER/REPO:environment:development` | Job has `environment: development` |
| `repo:OWNER/REPO:ref:refs/heads/master` | Push without environment |

**Fix:** match `githubOrg` / `githubRepo` exactly, redeploy the OIDC stack, verify `AWS_DEPLOY_ROLE_ARN`.

### CI succeeded but nothing in the console

Cognito is **regional**. Check the account and region from the deploy log:

`Deploying BalanceAuthStack to account … in …`

| Look here | Not here |
|-----------|----------|
| Cognito → User pools (`balance-users`) | IAM roles (OIDC stack only) |
| CloudFormation `BalanceAuthStack` | Local `cdk.out/` templates |

### Lambda bundling / monorepo

`BalanceApiStack` bundles from the **repo root** lockfile so workspace packages (`@balance/domain`) resolve correctly. Entry: [`api/src/lambda.ts`](../api/src/lambda.ts).

## Adding resources

New stacks belong in `lib/`, registered from [`bin/balance.ts`](bin/balance.ts). Extend [`github-deploy-policy.ts`](lib/github-deploy-policy.ts) when CI needs new IAM permissions.

## Related docs

- [Root README](../readme.md) — local dev and secrets
- [API README](../api/README.md) — Lambda env vars and routes
- [Client README](../client/README.md) — client deploy workflow
