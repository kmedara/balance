# Balance — Cost Estimate

Rough **order-of-magnitude** estimates for the architecture locked in [requirements.md](./requirements.md).  
**Not a quote.** Verify Plaid/Stripe/Google in their dashboards; verify AWS with Cost Explorer after deploy.

**Assumptions (from requirements)**

- Region: `us-east-1`
- Stack: Lambda + API Gateway (HTTP + WebSocket), DynamoDB on-demand, S3 + CloudFront, Cognito, SES, EventBridge, SNS, SSM SecureString, Route 53 (after domain purchase)
- PITR **off** (supported but disabled)
- Weekly on-demand DynamoDB backup (retain 1)
- Plaid: Transactions + Balances, **webhooks only** + manual sync (paid users)
- Stripe subscriptions + 7-day trial (card required)
- Frankfurter FX (free) + DynamoDB daily cache
- Ads: Google adapter on free tier (revenue, not infra cost)
- Solo operator; idle → slow growth

---

## Traffic scenarios

| Scenario | MAU | DAU (approx) | Paid share | Plaid Items (banks linked) | Notes |
|----------|-----|--------------|------------|----------------------------|-------|
| **S0 Solo / friends** | 1–20 | 1–5 | 0–5 | 0–10 | Dev + soft launch |
| **S1 Early public** | ~200 | ~40 | ~20% (40 paid) | ~60 (1.5 Items/paid) | Quiet launch |
| **S2 Slow growth** | ~2,000 | ~400 | ~25% (500 paid) | ~750 | Still “small” |
| **S3 Modest** | ~10,000 | ~2,000 | ~30% (3,000 paid) | ~4,500 | Quotas matter |

**Request sketch (API)** — calendar-heavy PWA:

| Scenario | API requests/day (order of mag.) | WebSocket | Notes |
|----------|----------------------------------|-----------|-------|
| S0 | hundreds | rare | Cold starts dominate latency, not cost |
| S1 | ~5k–20k | low | |
| S2 | ~50k–200k | moderate | |
| S3 | ~0.5M–2M | higher | Watch CW logs + WS connection-minutes |

---

## AWS monthly estimate (USD)

Ranges are **inclusive of typical quiet prod**; CloudWatch log volume is the usual surprise.

| Component | S0 | S1 | S2 | S3 |
|-----------|----|----|----|----|
| Lambda | $0–2 | $1–5 | $5–25 | $25–100 |
| API Gateway HTTP | $0–2 | $1–8 | $8–40 | $40–150 |
| API Gateway WebSocket | $0–2 | $1–10 | $10–40 | $40–150 |
| DynamoDB on-demand + 1 weekly backup | $0–3 | $1–10 | $10–40 | $40–150 |
| S3 + CloudFront | $0–3 | $1–8 | $5–25 | $20–80 |
| Cognito | $0* | $0* | $0* | $0–50† |
| SES | $0–1 | $0–3 | $2–15 | $10–50 |
| EventBridge + SNS + SSM | $0–1 | $0–2 | $1–5 | $2–10 |
| CloudWatch logs/alarms | $1–5 | $2–15 | $10–40 | $30–120 |
| Route 53 hosted zone | $0.50 | $0.50 | $0.50 | $0.50 |
| **AWS subtotal (rough)** | **~$3–20** | **~$10–60** | **~$50–230** | **~$200–800** |

\* Cognito free tier often covers first **~10k MAU** (Lite/Essentials; confirm current AWS pricing).  
† Above free tier, Cognito is per-MAU.

**Temporary AWS Budgets alert:** $50/month (see requirements COST-6) — likely fine for S0–S1; revisit before S2.

**Not included above:** Data transfer spikes, CloudFront invalidation storms, accidental DEBUG logging, multi-env duplicate stacks (dev+prod ≈ 1.5–2×).

---

## Non-AWS recurring / annual fees

### Always / almost always

| Item | Estimate | Notes |
|------|----------|-------|
| Domain name | ~$10–20 / year | Registrar-dependent |
| Apple Developer Program (Sign in with Apple) | **$99 / year** | Required for Apple social login |
| Google Cloud / OAuth client | $0 | OAuth client for Google sign-in |
| Frankfurter FX | $0 | Daily cache in DynamoDB |

### Plaid (often the largest variable)

Plaid bills by **plan + product model** (subscription per Item for Transactions is common). **Exact USD is not public** — see [Plaid Pricing](https://plaid.com/pricing/) and your Dashboard → Billing.

| Stage | Illustrative posture | Notes |
|-------|----------------------|-------|
| Sandbox | $0 | Development |
| Production **Trial** (US/CA; check eligibility) | **$0** up to a small Item cap (e.g. ~10 Production Items on Trial — confirm current offer) | Enough for S0; not for S2+ |
| Pay-as-you-go / Growth | **Confirm in Dashboard** | Typically scales with **linked Items** (paid users × banks). Can **dwarf AWS** by S2–S3 |

**Rule of thumb for planning:** treat **Plaid as TBD line-item #1**. Do not greenlight S2 marketing until you have a written per-Item quote.

**Balance-specific:** only **paid** users link banks → Plaid cost ≈ f(paid users × Items), not total MAU. Free users (ads) do not create Plaid Items.

### Stripe

| Fee | Typical (US cards; confirm) | Notes |
|-----|----------------------------|-------|
| Card processing | ~**2.9% + $0.30** per successful charge | On subscription invoices |
| Billing / Tax / Radar extras | Optional add-ons | Check Stripe pricing page |
| Trial with card | Usually $0 until conversion | Failed cards / auth holds: monitor |

**Example only:** 100 subscribers × $8/mo = $800 revenue → Stripe ~$23–30 fees (illustrative).

### Google ads (free tier)

| Item | Estimate | Notes |
|------|----------|-------|
| AdSense/Ad Manager | $0 infra; **revenue share** to you | Approval risk for finance UIs |
| CMP / consent tooling | $0–50/mo if using a paid CMP | Can start with a lightweight CMP |

Ads are **monetization**, not a fixed AWS-like bill—budget time for policy/compliance, not just $.

### Compliance / launch one-offs (easy to forget)

| Item | Ballpark | Notes |
|------|----------|-------|
| Domain + DNS setup | low | |
| GuardDuty + IAM Access Analyzer | Low–mid when **on** | CDK flag; **off to start**; **on before public launch** |
| **SAST** (Semgrep) + **DAST** (ZAP/Nuclei) + SCA (npm audit + Trivy/OSV) | **Time** (CI minutes) | SAST/SCA on every PR **to `main`**; DAST weekly + pre-launch; local/ephemeral **and** prod (safe ruleset on prod; no cloud staging — E1) |
| External **pen test** | **$2k–15k+** one-time | **Deferred** until later (e.g. pre–Type II / when revenue allows) |
| **SOC 2 Type I** | **$5k–25k+** first year typical (audit + tools) | Still targeted before public launch; confirm auditor accepts no pre-launch external pen test |
| Privacy/ToS legal review | **$500–5k+** | Strongly recommended for US/CA/EU + Plaid/Stripe |
| Apple Developer | $99/yr | Above |

These can exceed **years** of S0 AWS spend.

---

## Combined monthly picture (illustrative)

| Scenario | AWS | Plaid | Stripe fees | Other recurring | **Total (excl. one-offs)** |
|----------|-----|-------|-------------|-----------------|----------------------------|
| S0 | $3–20 | $0 (sandbox/trial) | ~$0 | ~$1–10 (domain amortized) | **~$5–30** |
| S1 | $10–60 | Trial or low paid Items — **confirm** | Low | ~$10 | **AWS + Plaid-dominated** |
| S2 | $50–230 | **Likely >> AWS** | Scales with MRR | ~$10–20 | **Plan with Plaid quote** |
| S3 | $200–800 | **Primary cost center** | Scales with MRR | ~$20+ | **Revisit architecture/budgets** |

Apple Developer ≈ **$8/mo** amortized.

---

## What moves the needle (priority order)

1. **Plaid linked Items** (paid conversion × banks per user)  
2. **CloudWatch log retention/volume**  
3. **WebSocket connection-minutes** (users leaving PWA open)  
4. **API Gateway + Lambda** request volume  
5. **Stripe %** (success problem to have)  
6. **Duplicate environments** (dev+staging+prod)

---

## Suggested monitoring

| Control | Setting |
|---------|---------|
| AWS Budgets | Alert at **$50/mo** (temporary), revise after baseline |
| Weekly review | Cost Explorer by tag `Service`, `Env` |
| Plaid | Dashboard usage/Items weekly once in Production |
| SNS→email | Budget + Plaid webhook health + backup failures |

---

## Revision log

| Date | Change |
|------|--------|
| 2026-08-05 | Initial estimate from requirements workshop |
| 2026-08-05 | PT2: self OSS assessment pre-launch; external pen test deferred |
| 2026-08-05 | SAST/DAST/SCA cadence C1; prod DAST safe ruleset |
| 2026-08-05 | GuardDuty+Access Analyzer flaggable; off to start |

When Plaid production pricing is known, add a row with **$/Item/month** and recompute S1–S3.
