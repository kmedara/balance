# Regional disaster recovery (DR) plan

Cold **backup-restore** plan for a **full `us-east-1` regional impairment** (or equivalent loss of the primary Balance footprint in that region).

Aligned with [requirements.md](./requirements.md): **S1** strategy, **RTO ≤ 12 hours**, **RPO ≈ 7 days**, priority path **login + calendar**.

This is an operational runbook outline for a solo operator—not an AWS SLA claim.

---

## Objectives

| Metric | Target (v1) | Source |
|--------|-------------|--------|
| **RTO** | ≤ **12 hours** (when operator is available) | DR-1 |
| **RPO** | Up to ~**7 days** | Weekly on-demand DynamoDB backup, retain **1**; PITR off |
| **Strategy** | Backup-restore (cold); no warm standby | DR-2 / DR-6 |
| **Priority after restore** | Cognito/login → calendar read/write | DR-3 |
| **Defer after restore** | Plaid sync, Stripe, ads, FX refresh, reports, attachments | DR-3 |

---

## Scope

**In scope**

- Loss or prolonged unavailability of Balance workloads in **`us-east-1`**
- Corruption/loss of the primary DynamoDB table requiring restore from on-demand backup
- Need to rebuild API/PWA/auth edge in the **same** region after recovery, or in a **secondary region** if `us-east-1` remains unusable

**Out of scope for v1**

- Active-active multi-region
- Pilot light / warm standby
- Guaranteed RTO if the operator is unreachable
- Zero data loss (PITR off)

---

## Roles

| Role | Who | Authority |
|------|-----|-----------|
| Declare disaster | Sole developer | DR-8 |
| Authorize restore / redeploy | Sole developer | DR-8 |
| Execute runbook | Sole developer | — |
| Communicate to users | Sole developer | Status note / email if SES available elsewhere |

---

## Prerequisites (maintain continuously)

- [ ] Weekly DynamoDB **on-demand** backup job succeeding; **1** backup retained
- [ ] Backup ARN / name recorded (password manager or ops note)
- [ ] CDK app can deploy Auth, API, Database, Client, DNS stacks
- [ ] Secrets in **SSM Parameter Store** (or export/document how to re-create in a new region)
- [ ] Domain (`app.` / `gateway.`) DNS controllable via Route 53
- [ ] Pre-launch **restore test** completed once; **annual** drill scheduled
- [ ] Pre-launch **game day (R2)** completed
- [ ] Plaid/Stripe/Cognito console access independent of the app

**Secondary region (decide at drill time):** prefer **`us-east-2`** or **`us-west-2`** if `us-east-1` is unusable. Cognito and some configs are regional—plan to **recreate** user pool or restore from documented export if cross-region user migration is required.

---

## Decision tree

1. **Is only one service impaired** (e.g. Lambda throttle, brief API GW issue)?  
   → Wait for AWS / fix config. **Not** a regional DR. Use normal incident response.
2. **Is DynamoDB data suspect but region healthy?**  
   → Same-region **restore backup to new table** → cut app to new table → verify login + calendar → retire bad table.
3. **Is `us-east-1` broadly unavailable for hours?**  
   → Declare regional disaster → follow **Regional recovery** below.
4. **Are third parties down** (Plaid/Stripe) but AWS up?  
   → Not regional DR; show errors; manual sync later.

---

## Regional recovery (target ≤ 12 hours)

Times are aspirational for a practiced solo operator.

### Phase 0 — Declare (0–30 min)

- [ ] Confirm regional impact via AWS Health Dashboard + failed health checks
- [ ] Declare disaster (personal log: time, evidence)
- [ ] Post user-facing notice if possible (social / status page / email from non-region-dependent channel)
- [ ] Choose target region: recover in `us-east-1` when healthy, else **failover region**

### Phase 1 — Data (1–4 h)

- [ ] Identify latest good **on-demand backup** (accept up to ~7 days data loss)
- [ ] Restore DynamoDB table from backup in the **target region**
- [ ] Verify row counts / spot-check a known user and calendar entities
- [ ] Note: in-flight Plaid state may be stale after restore—acceptable under RPO

### Phase 2 — Identity & secrets (parallel where possible)

- [ ] Ensure Cognito user pool available in target region (recreate/redeploy via CDK; document user impact if pool cannot be preserved)
- [ ] Re-create/re-point **SSM SecureString** parameters (Stripe, Plaid, session secret, OAuth clients)
- [ ] Update OAuth redirect URIs / Plaid webhook URLs / Stripe webhook endpoints to new `gateway.` URLs when DNS cuts over

### Phase 3 — Compute & edge

- [ ] `cdk deploy` (or pipeline) for Database (if needed), Auth, API (HTTP + WebSocket), Client (S3/CloudFront)
- [ ] Wire env to restored table name and Cognito IDs
- [ ] Confirm CloudFront → S3 and API routes respond

### Phase 4 — DNS cutover

- [ ] Point `app.<domain>` → new CloudFront
- [ ] Point `gateway.<domain>` → new API (HTTP + WebSocket custom domains)
- [ ] Wait for DNS/TLS; smoke-test HTTPS

### Phase 5 — Priority verification (login + calendar)

- [ ] Magic link / Google / Apple sign-in works
- [ ] Session cookie set; `/auth/me` OK
- [ ] Current-month calendar loads; create/edit manual expense
- [ ] Recurring expand-on-read OK for a known rule

### Phase 6 — Secondary systems (may exceed RTO; OK)

- [ ] Stripe webhooks + subscription entitlement read
- [ ] Plaid webhook URL + one manual sync
- [ ] SES magic link / invite email
- [ ] Frankfurter FX daily job
- [ ] Ads slots (free tier)
- [ ] Attachments bucket if used

### Phase 7 — Close

- [ ] Write postmortem (timeline, data loss window, follow-ups)
- [ ] Schedule backup verification
- [ ] Consider enabling **PITR** after incident if cost allows (reduces RPO)

---

## Same-region data-only restore (shorter path)

Use when AWS region is healthy but the table is wrong/corrupt:

1. Restore on-demand backup to **`balance-restore-YYYYMMDD`**
2. Point API env `BALANCE_TABLE` (or equivalent) at restored table via deploy
3. Verify login + calendar
4. Keep old table quarantined until confident; then delete per policy

RTO for this path should be **well under 12 hours** if practiced.

---

## Communication template (short)

> Balance is experiencing a regional infrastructure incident. We are restoring from backup.  
> **Expected:** service back within 12 hours.  
> **Possible data loss:** changes since the last weekly backup (up to about 7 days) may not be present.  
> Priority restore: sign-in and calendar. Bank sync and billing features may return later.

---

## Test cadence

| Test | When | Pass criteria |
|------|------|----------------|
| On-demand backup job | Weekly (automated) | Backup exists; alarm on failure |
| Restore to scratch table | **Once before public launch**; **annually** after | Can read sample items; documented time taken |
| Game day (R2) | Once before public launch | Staging break + recovery notes captured |
| Regional tabletop | Optional annually | Walk this doc; update gaps |

---

## Dependencies cheat sheet

| Dependency | Regional AWS loss impact | Mitigation |
|------------|--------------------------|------------|
| DynamoDB | Data unavailable | Restore backup in target region |
| Cognito | Login down | Redeploy pool; users may need re-auth / re-signup if pool replaced |
| Lambda / API GW / CloudFront / S3 | App down | CDK redeploy in target region |
| SES | Email down | Recreate identity in region; DNS DKIM |
| Plaid / Stripe | Config/webhooks wrong after cutover | Update dashboard URLs; replay or manual sync |
| Frankfurter | FX stale | Job repopulates DynamoDB cache |
| Google ads | Free monetization down | Re-enable after app up |

---

## Relation to cheaper controls

- **In-region** resilience = AWS multi-AZ defaults (automatic).  
- **Regional** DR = this cold plan (manual).  
- Turning **PITR on** later improves RPO without changing RTO much.  
- External pen-test is unrelated to DR timing (PT2).

---

## Revision log

| Date | Change |
|------|--------|
| 2026-08-05 | Initial regional DR plan from requirements workshop |
