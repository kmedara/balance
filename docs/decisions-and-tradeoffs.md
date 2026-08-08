# Requirements Decisions and Tradeoffs

Record of choices made while filling [requirements.md](./requirements.md).  
Normative SHALL/MUST language lives in that checklist; this file explains **what was considered** and **why the accepted option won**.

Related artifacts: [cost-estimate.md](./cost-estimate.md) · [regional-DR.md](./regional-DR.md) · [threat-model-stride.md](./threat-model-stride.md)

**Status:** All checklist IDs are `accepted` as of acceptance promotion (2026-08). **DNS-8** (IPv6) remains explicitly deferred.

---

## How decisions were made

- Guided Q&A against the AWS Solutions Architect Requirements Checklist
- Explicit option codes (e.g. **T2**, **S1**, **HP1**) — no silent defaults
- Prefer cheapest path that can scale; solo operator; AWS; PWA first
- Conflicts called out and resolved before lock (e.g. soft-delete vs hard purge; staging vs single account)

---

## 1. Product and scope

| Decision | Chosen | Alternatives considered | Why |
|----------|--------|-------------------------|-----|
| Audience | US + Canada + EU | US-only (early answer), worldwide | Builder expanded geography; GDPR + CCPA + SCCs required |
| Client | **PWA only** | Native iOS/Android in v1 | Cost and shipping speed; native deferred |
| Primary UX | Current-month **calendar** + balances/net-income bar | Dashboard-first | Product identity |
| Signup | **Public** from day one | Invite-only / allowlist | Success = stranger gets value without help |
| Out of v1 | Investments / net worth; **public/third-party API**; Redis for FX | Include early | Scope control; BFF is first-party PWA only |

### Free vs paid (locked matrix)

| Area | Choice | Tradeoff |
|------|--------|----------|
| Free core | Signup, calendar, manual entry, recurring, net income, ≤10 categories, ads | Monetize free with ads; paid never sees ads / never loads ad scripts |
| Paid | Plaid link/sync/balances + auto-categorize; unlimited categories; household; CSV; alerts; reports; attachments; multi-currency FX | Plaid Item cost is the main variable fee — see cost estimate |
| Household | Paid Owner invites; invitees must be paid; roles Owner/Editor/Viewer (**M1**) | Hybrid RBAC/ABAC; not free sharing |
| Ads | Launch-day live; **Google** first adapter; **swappable** via slot/adapter (**N3**) | CMP/consent separate; paid never loads ads |

### Trial and billing codes

| Code | Meaning | Rejected | Why chosen |
|------|---------|----------|------------|
| **T2** | Trial starts at **paid gate**, not signup | Start-at-signup | Avoid burning trial for users who stay free |
| **C1** | **Card required** to start trial | Cardless trial | Reduces abuse; Stripe Checkout handles collection |
| **E1** (trial end) | **Auto-convert** to paid with clear ToS consent | Soft end / manual convert | Predictable revenue; must disclose clearly |
| One trial / account | Forever | Resettable trials | Abuse control |
| **S1** | **Stripe Checkout** + **Customer Portal** | **S2** Elements embedded | Lowest PCI surface, fastest for solo SaaS; entitlements from webhooks either way |

---

## 2. Cloud, environments, and delivery

| Code / topic | Chosen | Alternatives | Why |
|--------------|--------|--------------|-----|
| Account model | **Two AWS accounts** (staging + production) under the org | Single account only | Staging for pre-prod; prod for live |
| **E1** (env) | **Local + AWS staging + AWS production** | Dedicated third “QA” account | No always-on duplicate of full product beyond staging/prod |
| Deploy trigger | Merge to `main` → **staging**; **`v*` tag on main** → **production** | Deploy every push to prod | Explicit prod releases; continuous staging |
| CI auth **G1** | **GitHub OIDC → IAM role** (per account; no long-lived keys) | Long-lived AWS keys | No standing deploy secrets |
| Hosting | PWA **S3 + CloudFront** (OAC); API **Lambda + HTTP API**; realtime **API Gateway WebSocket** (**A-full**) | Amplify/Vercel; always-on containers | Same CDK family; scale-to-zero; cheapest at low traffic |
| API audience | **First-party PWA only** (+ signed vendor webhooks) | Public REST for third parties / API keys | Product is the site; `gateway.` is not a developer platform |
| Region | `us-east-1` only | Multi-region | Cost; SCCs for EU data transfers |
| DNS **D3** | `app.` + `gateway.` ready in CDK; domain TBD | Buy domain day one | Infra ready; purchase before public cutover |
| **DNS-8** | **IPv4 only** (IPv6 deferred) | Dual-stack now | Defer complexity |

**Tension resolved:** DAST targets **local/ephemeral + staging + prod (safe ruleset on prod)**.

---

## 3. Auth, sessions, and access

| Topic | Chosen | Alternatives | Why |
|-------|--------|--------------|-----|
| IdP | **Cognito** + Google + Apple + **custom magic link** | Supabase/Firebase/Clerk/Auth0 | AWS-native; magic link is more build work but keeps stack coherent |
| Session | **BFF HttpOnly cookie**; **30d absolute**; session epoch in DynamoDB | Browser-held access tokens; Redis sessions | XSS-resistant primary session; no Redis required |
| Session invalidation | **Hybrid (C):** normal login keeps other sessions; sensitive events + **logout everywhere** revoke others | Revoke-all on every login | Better UX for multi-device; hard revoke when needed |
| Household **M1** | Owner full; Editor mutate calendar/categories; Viewer read-only | Flat “member” only | Matches paid share product |
| Operator IAM | Solo console/SSO + OIDC deploy; break-glass OK | Multi-admin / SCPs | Matches solo ownership |

---

## 4. Data, deletes, and consistency

| Code / topic | Chosen | Alternatives | Why |
|--------------|--------|--------------|-----|
| Datastore | **DynamoDB on-demand** | RDS/Aurora | Serverless cost curve; calendar access patterns |
| Recurring | **Expand-on-read** | Materialize occurrence rows | Fewer writes; simpler purge |
| Calendar | Combined manual + Plaid for paid; manual/recurring only for free | Always show empty Plaid slots | Clear free/paid boundary |
| FX | **Frankfurter** → daily DynamoDB cache; PWA cache ≤24h / `ratesAsOf` | Redis; paid FX API | Free indicative rates; not trade execution |
| Plaid sync | **Webhooks only** + obvious manual sync + CW alarm + in-app notice | Scheduled catch-up cron | Cost and simplicity; operator visibility when webhooks fail |
| Soft-delete (earlier draft) | **Rejected** | Soft-delete + TTL 14d / account TTL 7d | Builder preference: when user deletes, **purge** |
| **HP1** | Immediate external cleanup + **immediate hard delete**; daily sweeper **only** for orphan retry | Soft-delete / delayed TTL purge | Clearer privacy story; backups may still retain until weekly rotate (must disclose) |
| **D2-A** | Strong reads for session/entitlement/membership/get-before-edit; eventual OK for list/calendar | Strong everywhere / eventual everywhere | Auth correctness without 2× RCU on every list |
| **D5-A** | Optimistic concurrency (version + condition) → **409** | **D5-B** last-write-wins; pessimistic locks | Avoid silent overwrite in household; DynamoDB-native |

---

## 5. Security and compliance

| Code / topic | Chosen | Alternatives | Why |
|--------------|--------|--------------|-----|
| Encryption | TLS + **at-rest AWS-managed** | No at-rest (early preference) | SOC 2 / financial data; usually negligible cost on managed services |
| Threat model | Full STRIDE doc (**TM2**) | Checklist-only | Required living artifact |
| Pen test **PT2** | Self OSS assessment pre-launch; **external pen deferred** | External pen as launch gate | Cost/timing; do not claim “externally pen tested” early |
| SAST/DAST/SCA | Semgrep + ZAP/Nuclei + npm audit + Trivy/OSV; SAST/SCA every PR to `main`; DAST weekly + pre-launch | None / paid scanners only | OSS-first; matches solo budget |
| GuardDuty / Access Analyzer | CDK flag; **off early**, **on before public launch** | Always on / never | Cost control then launch posture |
| Vuln SLA | Crit/High ≤7d; Medium ≤30d | Looser | Reasonable for SOC 2 story |
| Analytics **A1** | First-party funnel only; no financial payload properties | Third-party product analytics | Privacy + cost |
| Audit **A2+** | Login, logout-all, entitlement, invite, account delete, Plaid link/unlink, Stripe changes, failed auth; **≥30d** | Minimal A2 set only | Stronger SOC 2 evidence |
| Config/SCPs **C0** | **None** in v1 | Config recorder / org SCPs | Solo single-account; CDK + IAM + process |
| Forensics **F2** | CloudTrail + audit + **request ID** in logs | F1 without request ID; F3 + X-Ray | X-Ray helps latency debug, not “who did what”; request ID is cheap glue |
| Secrets **R90** | Review SSM secrets ≤**90 days**; rotate on leak always | R0 ad-hoc; R30 monthly | Auditor-friendly cadence without busywork |
| Privacy pack | Privacy Policy, ToS, cookie/consent, CCPA, GDPR/SCC disclosures | Minimal US-only | Matches EU + ads |
| SOC 2 | **Type I** before public launch; Type II after observation | Type II as launch gate | Type II needs time; confirm with auditor re PT2 |

---

## 6. Resilience, DR, and ops

| Code / topic | Chosen | Alternatives | Why |
|--------------|--------|--------------|-----|
| Topology | Single-region multi-AZ managed | Multi-region active | Cost |
| DR **S1** | Cold **backup-restore**; weekly on-demand backup retain **1**; PITR **supported but off** | Pilot light / warm standby; PITR on | RPO ~7d / RTO 12h acceptable for v1 |
| Restore tests | Once pre-launch + **annual** | Never / quarterly | Evidence without constant cost |
| Critical path after restore | **Login + calendar** first | Everything immediately | Prioritize usable core |
| Game day **R2** | Simple pre-launch drill | Full chaos automation | Solo-appropriate |
| Alerts | SNS → email; CloudWatch only | PagerDuty / multi-APM | Solo operator |
| Log retention | Verbose logs **7d**; compact audit **30d** | Long verbose retention | Cost vs audit need |
| Burst **B3** | Quota sanity check pre-launch | Buy reserved capacity | On-demand first |
| Temp budget | ~$50/mo AWS Budgets (early) | No budget alarm | Early cost guardrail |
| Tags | Project, Env, ManagedBy, Service, Owner, DataClassification | Untagged | Cost attribution |

---

## 7. Performance and scale (accepted soft targets)

| Topic | Chosen | Notes |
|-------|--------|-------|
| Calendar latency | Warm **p95 &lt; 1s** (soft; excludes cold starts) | Cold starts acceptable initially |
| WebSocket notify | **1–2s** while connected (`plaid.sync.*`, `invite.received`) | HTTP poll fallback OK |
| Throughput KPIs | Deferred to measured load | Serverless autoscaling is the mechanism |
| Scale-to-zero | Acceptable | Matches cost goal |

---

## 8. Explicitly deferred or out of scope

| Item | Status | Revisit when |
|------|--------|--------------|
| IPv6 / dual-stack (**DNS-8**) | Deferred | Domain cutover or post-launch |
| Multi-account AWS Organizations | Deferred | Team or compliance mandate |
| External penetration test | Deferred (**PT2**) | Before SOC 2 Type II / revenue allows |
| AWS Config / SCPs | Not in v1 (**C0**) | Multi-account or auditor demand |
| X-Ray | Not required | Latency debugging pain |
| PITR enabled | Off (supported) | After launch if RPO must shrink |
| Cloud staging account | In use (merge to `main`) | — |
| Redis | Not for FX | If FX/rate limits force it |
| Native apps / investments / public end-user or third-party API | Out of v1 | Product decision later |
| Domain purchase | Open | Before public hostname cutover |

---

## 9. Decision code index

Quick lookup of workshop codes → outcome.

| Code | Outcome |
|------|---------|
| **T2** | Trial at paid gate |
| **C1** (card) | Card required for trial |
| **E1** (trial) | Auto-convert after 7 days |
| **E1** (env) | Local + AWS staging + AWS production |
| **S1** (Stripe) | Checkout + Customer Portal |
| **S1** (DR) | Cold backup-restore |
| **HP1** | Hard purge deletes (no soft-delete) |
| **G1** | GitHub OIDC deploy |
| **A-full** | HTTP API + WebSocket |
| **A1** (analytics) | First-party funnel only |
| **A2+** | Expanded audit event set, 30d |
| **C0** | No Config/SCPs |
| **F2** | CloudTrail + audit + request ID |
| **R90** | 90-day secret review |
| **D2-A** | Selective strong consistency |
| **D5-A** | Optimistic concurrency + 409 |
| **M1** | Owner/Editor/Viewer matrix |
| **PT2** | Self OSS pen now; external later |
| **N3** | Swappable ad adapters |
| **D3** | `app.` / `gateway.` DNS pattern |
| **R2** | Simple pre-launch game day |
| **B3** | Pre-launch quota sanity check |
| **TM2** | Full STRIDE document |

---

## 10. Acceptance

| Milestone | Date (approx) | Result |
|-----------|---------------|--------|
| Requirements walk-through draft-complete | 2026-08 | No unanswered checklist IDs |
| Critical IDs → `accepted` (CMP/SEC/AUTH/DATA/CPU) | 2026-08-07 | Architecture gate cleared |
| Remaining IDs → `accepted` | 2026-08-07 | Full checklist accepted; DNS-8 deferred |

Authoritative requirements: [requirements.md](./requirements.md).
