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

CDK reads `CDK_DEFAULT_ACCOUNT` and `CDK_DEFAULT_REGION`. During **`cdk synth`**, account is often **undefined** — that is normal; CDK uses a CloudFormation token and resolves the account at **deploy** time from your AWS credentials.

Region defaults to `CDK_DEFAULT_REGION`, then `AWS_REGION`, then `us-east-1`.

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
| Push to `master` | Validate, then deploy `BalanceAuthStack` |
| Manual `workflow_dispatch` | Deploy with optional callback/logout URL overrides |

### Fix: "Credentials could not be loaded"

This error means the **Configure AWS credentials** step had nothing to use. Fix in order:

1. **Add a GitHub secret** (Settings → Secrets and variables → Actions):
   - Repository secret **or** environment secret named `AWS_DEPLOY_ROLE_ARN`
   - Value: IAM role ARN from `BalanceGitHubOidcStack` output (see below)

2. **Deploy the OIDC role stack once** (local admin credentials):

   ```bash
   cd infrastructure
   npx cdk bootstrap
   npm run deploy:oidc -- -c githubOrg=YOUR_GITHUB_USER -c githubRepo=balance -c githubBranches=master
   ```

   Copy output `DeployRoleArn` → GitHub secret `AWS_DEPLOY_ROLE_ARN`.

3. **Trust policy must match the workflow.** The deploy job uses `environment: development`, so the IAM role trust policy must allow:

   ```
   repo:OWNER/REPO:environment:development
   ```

   `BalanceGitHubOidcStack` configures this automatically. If you created the role manually, add that subject (not only `ref:refs/heads/main`).

4. **Secret scope:** If you use a GitHub Environment named `development`, add `AWS_DEPLOY_ROLE_ARN` under **Environment secrets** for `development`, not only repository secrets (environment secrets take precedence; an empty environment override blocks repo secrets).

**Fallback (not recommended):** Set repository secrets `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` instead of `AWS_DEPLOY_ROLE_ARN`. The workflow uses these only when the role ARN is unset.

### Fix: `Not authorized to perform sts:AssumeRoleWithWebIdentity`

The IAM role **trust policy `sub` claim** does not match what GitHub sends. Common mismatches:

| GitHub sends | When |
|---|---|
| `repo:OWNER/REPO:environment:development` | Deploy job has `environment: development` |
| `repo:OWNER/REPO:ref:refs/heads/master` | Push to `master` (no environment on job) |

**Fix:**

1. Confirm `githubOrg` / `githubRepo` match your repo exactly (case-sensitive):
   ```bash
   npm run deploy:oidc -- -c githubOrg=YOUR_USER -c githubRepo=balance -c githubBranches=master
   ```
2. **Redeploy the OIDC stack** after any trust policy change (updates the existing role):
   ```bash
   npm run deploy:oidc -- -c githubOrg=YOUR_USER -c githubRepo=balance -c githubBranches=master -c githubEnvironments=development
   ```
3. Ensure `AWS_DEPLOY_ROLE_ARN` is the **`DeployRoleArn`** output from that stack (same AWS account).
4. Default allowed subjects include **`main`**, **`master`**, and **`environment:development`**. Custom branches/environments:
   ```bash
   npm run deploy:oidc -c githubOrg=OWNER -c githubRepo=REPO -c githubBranches=main,master,develop
   ```

Check allowed subjects in the CloudFormation output **`TrustSubjects`** after deploy.

### One-time AWS setup (manual alternative)

If you prefer not to use `BalanceGitHubOidcStack`:

1. Bootstrap CDK (see above).
2. Create IAM OIDC provider `token.actions.githubusercontent.com` with audience `sts.amazonaws.com`.
3. Create a role with trust policy allowing:
   - `repo:OWNER/REPO:environment:development`
   - `repo:OWNER/REPO:ref:refs/heads/main`
   - `repo:OWNER/REPO:ref:refs/heads/master`
4. Attach scoped CDK + Cognito deploy permissions (see `lib/github-deploy-policy.ts`). Do **not** use `AdministratorAccess` on this role.
5. Set `AWS_DEPLOY_ROLE_ARN` in GitHub.

**Note:** `BalanceGitHubOidcStack` updates this role itself — redeploy that stack with a human admin/developer identity, not via the GitHub role.

### GitHub repository configuration

Create a **GitHub Environment** named `development` (Settings → Environments) if you use deployment protection rules.

| Type | Name | Example |
|---|---|---|
| Secret | `AWS_DEPLOY_ROLE_ARN` | `arn:aws:iam::123456789012:role/balance-github-cdk-deploy` |
| Variable | `AWS_REGION` | `us-east-1` |
| Variable | `COGNITO_CALLBACK_URLS` | `["https://app.example.com/auth/callback"]` |
| Variable | `COGNITO_LOGOUT_URLS` | `["https://app.example.com/"]` |

After a successful deploy, download the **`cdk-outputs`** workflow artifact or read the job log for Cognito values.

### CI outputs but nothing in the AWS console

CI deploy **did work** if the job log shows a real `UserPoolId` (e.g. `us-east-1_smK0IYHjx`). Cognito is regional — you must open the console in the **same account and region** as the deploy log.

| Look here | Not here |
|---|---|
| **Cognito → User pools** in region from `CognitoRegion` output (default `us-east-1`) | IAM → Roles (that is `BalanceGitHubOidcStack` only) |
| Pool name **`balance-users`** | Stack name `BalanceGitHubOidcStack` |
| CloudFormation stack **`BalanceAuthStack`** | `cdk.out/` templates (local synth only) |

Check the deploy job line **Deploying BalanceAuthStack to account … in …** and match that account in the AWS console account switcher. The **Verify Cognito resources** step prints a direct console link.

### Manual deploy from Actions

Actions → **Infrastructure** → **Run workflow**. Optionally override callback/logout URLs for that run.

## Customize OAuth URLs

Edit `cdk.json` context, set `COGNITO_CALLBACK_URLS` / `COGNITO_LOGOUT_URLS` env vars, or pass CDK context at deploy time:

```bash
npx cdk deploy -c callbackUrls='["https://app.example.com/auth/callback"]' -c logoutUrls='["https://app.example.com/"]'
```
