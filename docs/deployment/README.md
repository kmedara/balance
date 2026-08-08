# Deployment

Runbook for shipping Balance to **staging** and **production**. Day-to-day flow: PR → merge to `main` (staging) → tag `v*` (production).

Related detail: [infrastructure README](../../infrastructure/README.md#deployment) · workflows under [`.github/workflows/`](../../.github/workflows/).

---

## Environments

| Environment | AWS account | GitHub Environment | How it updates |
|-------------|-------------|--------------------|----------------|
| **Local** | — | — | Docker / host ([root README](../../readme.md)) |
| **Staging** | Staging account | `staging` | Push / merge to **`main`** |
| **Production** | Production account | `production` | Tag **`v*`** on a commit reachable from `main` |

Default branch is **`main`**. Deploys use **GitHub OIDC only** — no long-lived AWS access keys, no manual `workflow_dispatch` to prod.

Release order (same in staging and production):

1. **Database** → **Auth** → **API** ([`reusable-deploy-infra.yml`](../../.github/workflows/reusable-deploy-infra.yml))
2. **Client** (CDK stack + S3 sync + CloudFront invalidation) ([`reusable-deploy-client.yml`](../../.github/workflows/reusable-deploy-client.yml))

---

## One-time setup

Do this once per AWS account and once in GitHub before the first CI deploy.

### 1. Default branch

Repo default branch must be **`main`**. If it is still `master`, rename it in GitHub, then:

```bash
git fetch origin
git checkout main
```

Redeploy OIDC stacks with `githubBranches=main` after the rename.

### 2. Bootstrap + OIDC role (each AWS account)

With admin credentials for that account:

```bash
cd infrastructure
npx cdk bootstrap

# Staging account
npm run deploy:oidc -- \
  -c githubOrg=OWNER \
  -c githubRepo=balance \
  -c githubBranches=main \
  -c githubEnvironments=staging

# Production account
npm run deploy:oidc -- \
  -c githubOrg=OWNER \
  -c githubRepo=balance \
  -c githubBranches=main \
  -c githubTags=v* \
  -c githubEnvironments=production
```

Copy **`DeployRoleArn`** from each deploy into the matching GitHub environment secret (below).

### 3. GitHub Environments

Create **`staging`** and **`production`** under Settings → Environments. Prefer protection rules on `production` (required reviewers and/or wait timer).

Configure **per environment** (staging values ≠ production values):

| Type | Name | Purpose |
|------|------|---------|
| Secret | `AWS_DEPLOY_ROLE_ARN` | OIDC role ARN from that account |
| Variable | `AWS_REGION` | e.g. `us-east-1` |
| Variable | `COGNITO_CALLBACK_URLS` | Passed to CDK as `callbackUrls` |
| Variable | `COGNITO_LOGOUT_URLS` | Passed to CDK as `logoutUrls` |

Client `GATEWAY` is set automatically from CDK output **`BalanceApiStack.ApiUrl`** after the infra job (no GitHub `API_BASE_URL` variable required for staging/release pipelines).

API Lambda secrets (Plaid, Stripe, Cognito IDs, `SESSION_SECRET`, `CLIENT_ORIGIN`, etc.) must be present in the deploy environment that runs CDK — see [`api-env.ts`](../../infrastructure/lib/api-env.ts) and [api README](../../api/README.md#environment-variables).

### 4. First stack deploy (optional local)

If the account has never had Balance stacks, either let CI create them on the first `main` / `v*` run, or deploy once locally with the right account credentials and env vars (see [infrastructure README](../../infrastructure/README.md)).

---

## Day-to-day: change → staging

**Path:** feature branch → PR → merge to `main` → staging deploy.

### 1. Open a PR targeting `main`

[`ci.yml`](../../.github/workflows/ci.yml) must pass (blocking):

- Build (schemas, domain, API, client) + CDK synth
- `npm audit --audit-level=high`
- Semgrep (`semgrep scan --config auto --error`)

CI **never** deploys.

### 2. Merge to `main`

[`deploy-staging.yml`](../../.github/workflows/deploy-staging.yml) runs:

1. Infra to the **staging** GitHub Environment / AWS account  
2. Client build + deploy + S3 sync + CloudFront invalidation  

### 3. Smoke-check staging

After the workflow succeeds:

- [ ] `/ping` on the staging API returns OK  
- [ ] Sign-in / session cookie works against staging Cognito  
- [ ] Calendar loads; create or edit a budget event if the change touches events  
- [ ] Client is talking to the staging API (GATEWAY from CDK `ApiUrl`)  
- [ ] Cognito callback / logout URLs match the staging API and app origins  

Download artifact `cdk-outputs-staging` from the workflow run if Cognito or API URLs changed.

---

## Release: staging → production

Production only moves when a **version tag** is pushed. Tags must point at commits **on `main`** ([`release.yml`](../../.github/workflows/release.yml) verifies ancestry).

### 1. Confirm staging is good

Merge is on `main`, staging smoke checks passed, and the commit to ship is the one that will be tagged.

### 2. Tag and push

Use semver tags with a `v` prefix (`v*`):

```bash
git checkout main
git pull origin main
git tag v0.1.0
git push origin v0.1.0
```

Do **not** retag an old commit that is not what staging just validated unless that is intentional.

### 3. Watch production release

[`release.yml`](../../.github/workflows/release.yml):

1. Verify tag ⊆ `main`  
2. Deploy infra → **production**  
3. Deploy client → **production**  

### 4. Smoke-check production

Same checks as staging, against production URLs. Prefer a short checklist:

- [ ] Health / ping  
- [ ] Login  
- [ ] Calendar read  
- [ ] One write path touched by the release (if any)  
- [ ] Billing / Plaid only if those paths changed  

If the API URL changed, the next full pipeline (infra → client) rebuilds the SPA with the new `ApiUrl` automatically.

---

## Post-deploy wiring (when URLs or Cognito change)

After the first deploy or a domain cutover:

1. Set Lambda / env: `AUTH_CALLBACK_URL`, `API_PUBLIC_URL`, `CLIENT_ORIGIN` for that environment  
2. Align Cognito app client callback and logout URLs with the live API and PWA  
3. Confirm Stripe / Plaid webhook endpoints point at the correct environment’s API  

Client `GATEWAY` is refreshed automatically on the next infra→client pipeline from CDK `ApiUrl`.

Details: [api README — Deployment](../../api/README.md#deployment), [infrastructure README — After deploy](../../infrastructure/README.md#after-deploy).

---

## Rollback

There is no automated “rollback workflow.” Practical options:

| Situation | Action |
|-----------|--------|
| Bad **client-only** change | Ship a new `v*` from `main` that reverts or fixes the client; production client sync replaces objects in S3 |
| Bad **API / infra** change | Revert or fix on `main` → verify on staging → new `v*` to production |
| Need previous API revision immediately | Redeploy the last known-good commit via a new tag on that commit **only if** it is still on `main` (or merge the fix/revert to `main` first, then tag) |

Prefer **forward fix** + new tag over rewriting history or moving tags.

---

## Troubleshooting

| Symptom | Likely cause | What to do |
|---------|--------------|------------|
| `AWS_DEPLOY_ROLE_ARN` missing | Secret not set on that GitHub Environment | Add the role ARN from that account’s OIDC stack output |
| `Not authorized to perform sts:AssumeRoleWithWebIdentity` | OIDC `sub` mismatch | Trust must allow `repo:OWNER/REPO:environment:staging` or `…:production`; redeploy OIDC with matching `githubEnvironments` |
| Staging role used against prod (or reverse) | Wrong account’s ARN in the environment | Each GitHub Environment secret must be the **same account** as the deploy target |
| Tag release fails “not on main” | Tag pointed at a commit not reachable from `main` | Tag a commit that is on `main` |
| Client talks to wrong API | Stale SPA build or wrong env | Re-run full deploy (staging: push to `main`; prod: new `v*` tag) so client rebuilds with current `ApiUrl` |
| Cognito redirect errors | Callback / logout URL drift | Align Cognito console URLs with `COGNITO_*` vars and live origins |
| PR blocked on audit / Semgrep | New finding or dependency advisory | Fix or upgrade before merge; do not bypass required checks |

More OIDC notes: [infrastructure README — Troubleshooting](../../infrastructure/README.md#troubleshooting).

---

## Quick reference

| Goal | Command / action |
|------|------------------|
| Validate a change | Open PR → wait for [`ci.yml`](../../.github/workflows/ci.yml) |
| Deploy staging | Merge to `main` |
| Deploy production | `git tag vX.Y.Z && git push origin vX.Y.Z` (commit on `main`) |
| See what CI deploys | [Pipeline overview](../../infrastructure/README.md#pipeline-overview) |

**Do not**

- Deploy production from a branch other than via a `v*` tag on `main`  
- Put long-lived AWS keys in GitHub secrets for deploy  
- Point staging and production GitHub Environments at the same AWS account role unless that is an explicit temporary exception
