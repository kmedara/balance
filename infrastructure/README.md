# Balance infrastructure (AWS CDK)

Provisions Cognito authentication for the Balance app.

## Prerequisites

- AWS CLI configured (`aws configure`)
- Node.js 20+

## Deploy locally

```bash
cd infrastructure
npm install
npx cdk bootstrap   # once per account/region
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

### One-time AWS setup

1. **Bootstrap CDK** in your account/region (local or CloudShell):

   ```bash
   cd infrastructure
   npm install
   npx cdk bootstrap aws://ACCOUNT_ID/us-east-1
   ```

2. **Create an IAM role** for GitHub OIDC (replace `OWNER/REPO`):

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Principal": {
           "Federated": "arn:aws:iam::ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com"
         },
         "Action": "sts:AssumeRoleWithWebIdentity",
         "Condition": {
           "StringEquals": {
             "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
           },
           "StringLike": {
             "token.actions.githubusercontent.com:sub": "repo:OWNER/REPO:ref:refs/heads/main"
           }
         }
       }
     ]
   }
   ```

   Attach policies that allow CloudFormation and the services CDK manages (or start with `AdministratorAccess` for a personal project).

3. **Register the OIDC provider** in IAM if it does not exist yet (`token.actions.githubusercontent.com`).

### GitHub repository configuration

Add a **GitHub Environment** named `production` (Settings → Environments) if you want deployment protection rules.

| Type | Name | Example |
|---|---|---|
| Secret | `AWS_DEPLOY_ROLE_ARN` | `arn:aws:iam::123456789012:role/balance-github-deploy` |
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
