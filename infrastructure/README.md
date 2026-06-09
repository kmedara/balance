# Balance infrastructure (AWS CDK)

Provisions Cognito authentication for the Balance app.

## Prerequisites

- AWS CLI configured (`aws configure`)
- Node.js 20+

## Deploy locally

```bash
cd infrastructure
npm install
npx cdk bootstrap   # once per account/region (uses default AWS credentials)
npm run deploy
```

Copy stack outputs into the repo root `.env.local.secrets`:

```bash
COGNITO_USER_POOL_ID=<UserPoolId>
COGNITO_CLIENT_ID=<UserPoolClientId>
COGNITO_REGION=<CognitoRegion>
COGNITO_AUTHORITY=<CognitoAuthority>
```

Set `AUTH_DISABLED=false` (or remove it) after configuring Cognito.

## Deploy with GitHub Actions

Workflow: [`.github/workflows/infrastructure.yml`](../.github/workflows/infrastructure.yml)

| Event | Behavior |
|---|---|
| Pull request (infrastructure changes) | `npm ci`, build, `cdk synth` |
| Push to `main` | Validate, then deploy `BalanceAuthStack` |
| Manual `workflow_dispatch` | Deploy with optional callback/logout URL overrides |

### Fix: "Credentials could not be loaded"

This error means the **Configure AWS credentials** step had nothing to use. Fix in order:

1. **Add a GitHub secret** (Settings → Secrets and variables → Actions):
   - Repository secret **or** `production` environment secret named `AWS_DEPLOY_ROLE_ARN`
   - Value: IAM role ARN from `BalanceGitHubOidcStack` output (see below)

2. **Deploy the OIDC role stack once** (local admin credentials):

   ```bash
   cd infrastructure
   npx cdk bootstrap
   npm run deploy:oidc -- -c githubOrg=YOUR_GITHUB_USER -c githubRepo=balance
   ```

   Copy output `DeployRoleArn` → GitHub secret `AWS_DEPLOY_ROLE_ARN`.

3. **Trust policy must match the workflow.** The deploy job uses `environment: production`, so the IAM role trust policy must allow:

   ```
   repo:OWNER/REPO:environment:production
   ```

   `BalanceGitHubOidcStack` configures this automatically. If you created the role manually, add that subject (not only `ref:refs/heads/main`).

4. **Secret scope:** If you use a GitHub Environment named `production`, add `AWS_DEPLOY_ROLE_ARN` under **Environment secrets** for `production`, not only repository secrets (environment secrets take precedence; an empty environment override blocks repo secrets).

**Fallback (not recommended):** Set repository secrets `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` instead of `AWS_DEPLOY_ROLE_ARN`. The workflow uses these only when the role ARN is unset.

### One-time AWS setup (manual alternative)

If you prefer not to use `BalanceGitHubOidcStack`:

1. Bootstrap CDK (see above).
2. Create IAM OIDC provider `token.actions.githubusercontent.com` with audience `sts.amazonaws.com`.
3. Create a role with trust policy allowing:
   - `repo:OWNER/REPO:environment:production`
   - `repo:OWNER/REPO:ref:refs/heads/main`
4. Attach CDK deploy permissions (e.g. `AdministratorAccess` for personal projects).
5. Set `AWS_DEPLOY_ROLE_ARN` in GitHub.

### GitHub repository configuration

Create a **GitHub Environment** named `production` (Settings → Environments) if you use deployment protection rules.

| Type | Name | Example |
|---|---|---|
| Secret | `AWS_DEPLOY_ROLE_ARN` | `arn:aws:iam::123456789012:role/balance-github-cdk-deploy` |
| Variable | `AWS_REGION` | `us-east-1` |
| Variable | `COGNITO_CALLBACK_URLS` | `["https://app.example.com/auth/callback"]` |
| Variable | `COGNITO_LOGOUT_URLS` | `["https://app.example.com/"]` |

After a successful deploy, download the **`cdk-outputs`** workflow artifact or read the job log for Cognito values.

### Manual deploy from Actions

Actions → **Infrastructure** → **Run workflow**. Optionally override callback/logout URLs for that run.

## Customize OAuth URLs

Edit `cdk.json` context, set `COGNITO_CALLBACK_URLS` / `COGNITO_LOGOUT_URLS` env vars, or pass CDK context at deploy time:

```bash
npx cdk deploy -c callbackUrls='["https://app.example.com/auth/callback"]' -c logoutUrls='["https://app.example.com/"]'
```
