# Architecture Requirements Checklist

Normative SHALL/MUST statements for Balance v1. All IDs below are **`accepted`** except explicitly deferred items (see capture log).  
Decision rationale and tradeoffs: [decisions-and-tradeoffs.md](./decisions-and-tradeoffs.md).

## Cross-cutting (answer first)

- [x] Problem and audience
  - **CX-1** (`accepted`): The product SHALL help consumers in the **US, Canada, and EU** track budgets, expenses, and spending in one place.
- [x] First-release scope boundary
  - **CX-2** (`accepted`): The first release MUST include:
    1. Public consumer signup and authenticated login (anyone can sign up without assistance) for users in the US, Canada, and EU.
    2. A PWA client (installable web; no native iOS/Android app required for v1).
    3. A current-month calendar as the primary view, with a side or top bar showing: (a) account balances for Plaid-synced accounts (paid), and (b) net income for the current calendar month (free; available without Plaid from manual/recurring data).
    4. Manual expense/budget entry (free).
    5. Recurring planned items such as rent and paycheck (free).
    6. Category caps: free tier MUST allow at most 10 categories; paid MUST allow **unlimited** categories.
    7. Free users MUST NOT link bank accounts via Plaid at all.
    8. Paid users MUST be able to use Plaid bank transaction sync, see synced account balances, and use **Plaid auto-categorization**.
    9. Shared household budgets as a paid feature with full invite/share UX and a multi-user data model in v1. Household invites MUST notify via **email** and **in-app realtime** (WebSocket) when the invitee has the app open.
    10. Stripe-paid subscription from day one, including a **7-day trial** of paid features: trial MUST start when the user **hits a paid gate** (**T2**); **card on file REQUIRED** to start trial (**C1**); on trial end MUST **auto-convert to paid** with clear consent/ToS (**E1**); **one trial per account ever**.
    11. Advertising to monetize **free** users only (paid subscribers MUST NOT see ads), with GDPR-compliant consent / cookie banners. **Live ads MUST work on public launch day.** The first ad adapter MUST target **Google**; the ad network MUST remain **replaceable via configuration** (adapter/slot abstraction — not vendor UI coupling).
    12. Realtime in-app events via **API Gateway WebSocket** for at least: `plaid.sync.completed|failed` and `invite.received` (target delivery **within 1–2 seconds** while connected). Plaid sync UI MUST show a loader until done/failed. Live collaborative editing MUST NOT be required for v1.
    13. Additional **v1 paid** capabilities: CSV export; over-budget email alerts; reports/charts beyond the calendar; expense attachments/receipts; **multi-currency with live FX conversion**.
    14. The HTTP/WebSocket API MUST be used only by the **first-party PWA** (plus signed vendor webhooks); it MUST NOT be a public or third-party API product.
  - **CX-3** (`accepted`): The first release MUST NOT include investments or net-worth tracking. Native mobile apps are out of v1 (PWA only). Public/third-party API access is out of v1.
- [x] Cloud and account model
  - **CX-4** (`accepted`): The workload MUST run on AWS in a **single-account CDK-managed** footprint for v1. Multi-account AWS Organizations MUST NOT be required for v1 (deferred until revenue/team warrants it). Client and API infra MUST be expressible in **one CDK app/stack family** (not a separate Amplify/Vercel host).
- [x] Environments and promotion
  - **CX-5** (`accepted`): Environments MUST be **local development** + **one AWS account (production)** (**E1**)—no separate cloud staging account/stack required for v1. Production deploys MUST be driven by **version tags** on releases from **`main`** (PRs merge to `main`, then a version tag triggers CI → build → S3 sync → CloudFront invalidation / API deploy as applicable).
- [x] Ownership
  - **CX-6** (`accepted`): The sole developer SHALL build, deploy, operate, and support the workload.
- [x] Hard constraints
  - **CX-7** (`accepted`): There is no hard deadline. The workload MUST run on AWS, MUST prefer the lowest-cost architecture that meets requirements, and MUST remain able to scale for future demand.
- [x] Third-party dependencies
  - **CX-8** (`accepted`): The system MUST integrate with Plaid for paid bank linking/sync/balances, Stripe for subscriptions/trial/gating, Amazon SES for transactional email, Frankfurter for indicative FX (cached in DynamoDB), and Cognito (Google/Apple + custom magic link) with a BFF HttpOnly session cookie. Free users MUST be blocked from Plaid link. When Plaid or Stripe is unavailable, the system MUST show an error only.
- [x] Requirements-complete definition
  - **CX-9** (`accepted`): All checklist IDs in [requirements.md](./requirements.md) are **`accepted`** (except explicitly deferred items such as DNS-8 IPv6). Decision rationale is recorded in [decisions-and-tradeoffs.md](./decisions-and-tradeoffs.md). Implementation planning MAY proceed.
  - **CX-10** (`accepted`): Billing trial MUST: start at first paid-feature gate; require card; auto-convert to paid after 7 days per consented ToS; allow **at most one trial per account**.

---

## 1. Organization-Based Strategies

- [x] Key business goals and how this workload supports them
  - **ORG-1** (`accepted`): The workload SHALL advance the goal of giving consumers a single place to track budgets, expenses, and spending — calendar-first PWA, with public self-serve signup.
  - **ORG-2** (`accepted`): Success of the first release SHALL include that a stranger can sign up and get value without builder intervention. Additional quantitative KPIs MUST NOT be required for v1 (deferred).
- [x] Organizational standards or mandates
  - **ORG-3** (`accepted`): There are no enterprise organizational mandates beyond: AWS-only, cost-minimizing, and scalable for future demand.
- [x] Primary stakeholders and decision-makers
  - **ORG-4** (`accepted`): The sole developer SHALL be the decision-maker for architecture, budget, and product scope.
- [x] Existing enterprise architectures or patterns
  - **ORG-5** (`accepted`): The solution is greenfield; it MUST NOT be required to align with pre-existing enterprise architecture patterns.
- [x] Dependencies on other internal systems or business units
  - **ORG-6** (`accepted`): The workload MUST NOT depend on other internal systems or business units.
- [x] Timelines or milestones
  - **ORG-7** (`accepted`): No fixed milestone dates are defined.
- [x] Future plans that could impact this workload
  - **ORG-8** (`accepted`): Architecture decisions MUST preserve the ability to scale for future demand and MUST implement a multi-user budget data model with invite/share for paid household budgets in v1. Quantitative “future demand” targets MUST NOT be required for v1 (deferred; serverless autoscaling is the mechanism).

### Free vs paid (v1)

| Capability | Tier | Notes |
|------------|------|-------|
| Public signup + login | Free | US + Canada + EU |
| PWA (web + installable) | Free | No native apps in v1 |
| Current-month calendar | Free | Primary view |
| Manual expense/budget entry | Free | |
| Recurring planned items | Free | |
| Net income (current month) in balances bar | Free | Works without Plaid |
| Ads (with consent where required) | Free tier only | Paid MUST NOT see ads; launch-day live ads; **Google** first adapter; swappable via config |
| Category caps | Free ≤ 10; **unlimited on paid** | |
| Plaid auto-categorize | Paid | |
| CSV export | Paid | |
| Over-budget email alerts | Paid | SES |
| Reports/charts beyond calendar | Paid | |
| Attachments / receipts on expenses | Paid | Object storage |
| Multi-currency with indicative FX (Frankfurter) | Paid | Daily DynamoDB cache; PWA cache ≤24h / ratesAsOf |
| Link bank accounts (Plaid) | Paid | Free users cannot link at all |
| Plaid sync + synced account balances in bar | Paid | |
| Shared household budgets (invite/share UX) | Paid | Full functionality in v1 |
| 7-day trial of paid features | Trial | Starts at paid gate; card required; auto-convert; **one trial per account** |

### Paid-feature candidates

| Candidate | v1 status |
|-----------|-----------|
| Unlimited categories | **v1 paid** |
| Plaid auto-categorization | **v1 paid** |
| CSV export | **v1 paid** |
| Over-budget email alerts | **v1 paid** |
| Reports/charts beyond calendar | **v1 paid** |
| Attachments/receipts | **v1 paid** |
| Multi-currency with indicative FX (Frankfurter) | **v1 paid** |
| API access | **Not in v1** | BFF exists for the first-party PWA only — not a public/third-party API |
| Investments / net worth | **Never for v1** (CX-3) |

---

## 2. Security

- [x] Security and privacy requirements
  - **SEC-1** (`accepted`): Sensitive data MUST include:
    - Account/profile PII (e.g. email, display name)
    - Authentication secrets and session material (magic-link tokens, session cookies/tokens)
    - Budget/expense records and category data
    - Household membership and invite tokens
    - Plaid access tokens; bank transaction and balance data from Plaid
    - Stripe customer/subscription identifiers
    - Advertising/consent records (cookie consent choices, ad IDs / click identifiers if used)
    - Security and access audit logs
    - IP address and user-agent in logs (with retention limits to be defined)
    - Magic-link and household-invite email/token material (must not be over-retained in logs)
    - Analytics events (page views, funnels) if analytics is enabled
    - Approximate location derived from IP if used for ads or fraud
    - Support tickets / contact messages if support is offered
    - Device push endpoints if PWA push is enabled
  - **SEC-2** (`accepted`): Data in transit MUST use TLS. Data at rest MUST use encryption; keys MUST be **AWS-managed** unless later requirements demand customer-managed KMS.
  - **SEC-3** (`accepted`): All application data for v1 MUST be stored and processed in **AWS `us-east-1`**. Multi-region MUST NOT be required for v1. EU personal data transfers MUST rely on **Standard Contractual Clauses (SCCs)** and privacy disclosures.
- [x] Identity and access management approach
  - **SEC-4** (`accepted`): End-user auth MUST support social login and passwordless magic link. MFA MUST be available as a user profile setting (not mandatory for all users at signup). Operator access MUST be the **sole developer** via AWS console/SSO plus **GitHub OIDC deploy role** (AUTH-6); contractors MUST NOT have standing prod access. A documented break-glass admin path for the sole operator is acceptable for v1.
- [x] Threat models or known risks
  - **SEC-5** (`accepted`): A **STRIDE threat model** MUST exist for v1 (see [threat-model-stride.md](./threat-model-stride.md)). Design and reviews MUST address the threats listed there; the model MUST be updated when major features ship.
- [x] Centralized vs decentralized security controls
  - **SEC-6** (`accepted`): Security controls MUST be **centralized in the single AWS account** (IAM, Cognito, SSM, CloudWatch, optional GuardDuty/Access Analyzer)—not a multi-account org/SCP model for v1 (**C1**).
- [x] Vulnerability management and patching
  - **SEC-7** (`accepted`): Findings from SAST/SCA/DAST MUST be triaged with SLA **Critical/High ≤ 7 days** (fix or recorded risk-accept); **Medium ≤ 30 days**. Dependency and Lambda runtime updates MUST follow the same spirit when advisories apply. Patching for v1 means dependency/runtime updates (no self-managed OS fleet).
- [x] Secrets management
  - **SEC-8** (`accepted`): Secrets MUST be stored in **AWS Systems Manager Parameter Store SecureString** (AWS-managed KMS). Secrets MUST NOT be committed to source control. Secrets MUST be **reviewed at least every 90 days** (**R90**)—confirm still needed and rotate when the vendor supports it or after any suspected leak. Immediate rotation MUST occur on suspected compromise regardless of cadence.
- [x] Security assessments / penetration testing
  - **SEC-9** (`accepted`): Before public launch, the sole developer MUST complete a **self security assessment using maintained open-source tools** (at least **OWASP ZAP** and/or **Nuclei**, plus manual checks for auth/session, webhooks, and entitlement gates), with findings tracked to remediation. An **external penetration test** MUST be scheduled for a **later phase** (e.g. before SOC 2 Type II or when revenue allows)—not a gate on first public launch (**PT2**). Marketing MUST NOT claim “externally pen tested” until that engagement completes.
  - **SEC-9a** (`accepted`): The project MUST run **SAST** and **DAST** using open-source tooling:
    - **SAST:** **Semgrep** on TypeScript/Node (additional maintained OSS SAST MAY be added).
    - **DAST:** **OWASP ZAP** and/or **Nuclei**.
    - **SCA:** **npm audit** plus **Trivy** or **OSV-Scanner**.
    - **Cadence (C1, refined):** SAST and SCA on **every pull request targeting `main`**; DAST **weekly** and **before public launch**.
    - **DAST targets:** **local/ephemeral test targets and production**, with a **strict safe ruleset** on production (non-destructive checks only). No dedicated cloud staging environment in v1 (**E1**).
    - Findings MUST be triaged; launch-blocking severities MUST be remediated or explicitly risk-accepted by the sole developer with a recorded rationale.
- [x] Mandated AWS security services
  - **SEC-10** (`accepted`): CDK MUST support **IAM Access Analyzer** and **GuardDuty** with an **enable/disable flag** (same pattern as PITR). They MAY be **off to start** (dev/early). They MUST be **turned on before public launch** (**S3** posture). AWS Config / Security Hub MUST NOT be required for v1 unless later added.

### Degraded third-party behavior

- **CX-8a** (`accepted`): When Plaid or Stripe is unavailable, the system MUST surface an error only (no read-only/cached degraded mode required for v1).

---

## 3. Storage Needs

- [x] Types of data stored
  - **STO-1** (`accepted`): The system MUST store structured application data in DynamoDB (users, budgets/expenses, recurring rules, categories, household membership, Plaid-linked data, entitlements, consent records) plus operational logs. Object storage for static PWA assets and **paid expense attachments/receipts**. 
- [x] Durability, availability, latency
  - **STO-2** (`accepted`): Primary datastore MUST rely on **DynamoDB’s managed multi-AZ durability and availability** (AWS published characteristics). No separate custom durability/availability contract beyond that. Interactive read latency MUST align with the soft calendar target in PERF-5 (warm p95 &lt; 1s); no additional custom latency SLA.
- [x] Access frequency (hot / warm / cold)
  - **STO-3** (`accepted`): Interactive calendar/user data MUST be treated as **hot**. CloudWatch **log retention MUST be 7 days** for v1 (cost control). Compact **audit events** MUST be retained **30 days** (AUTH-5).
- [x] Retention and archival
  - **STO-4** (`accepted`): User-initiated deletes MUST be **hard deletes** (no soft-delete / TTL tombstone flow for app data). Account deletion MUST **immediately purge** user-owned primary data (see DATA-12). Backup residual retention MUST still be disclosed.
- [x] Storage modality
  - **STO-5** (`accepted`): Primary datastore MUST be **DynamoDB**. **S3** MUST store static PWA build artifacts served via **CloudFront**. Block/file storage MUST NOT be required for v1 app data. Paid attachments/receipts MUST be deleted when the owning expense or account is purged.
- [x] Backup
  - **STO-6** (`accepted`): Infrastructure MUST **support DynamoDB PITR** but PITR MUST be **off for v1**. Active v1 backups MUST be **weekly on-demand** snapshots, retaining **1** backup (replace each week). A **restore test MUST run once before public launch** (e.g. restore to a scratch table). Privacy disclosures MUST describe residual retention for that on-demand backup. Enabling PITR later MUST be config-only.
- [x] Cross-region replication / multi-AZ
  - **STO-7** (`accepted`): Storage MUST use DynamoDB’s managed multi-AZ behavior in `us-east-1`. Cross-region replication MUST NOT be required for v1.
- [x] Deletion and lifecycle
  - **STO-8** (`accepted`): User-initiated delete of an expense/item MUST **hard-delete immediately** (no soft-delete). Account deletion MUST follow **HP1**: immediate external cleanup (Cognito / Plaid / Stripe / sessions) + **immediate hard delete** of user-owned DynamoDB items and attachment objects, plus a **daily EventBridge → Lambda** sweeper only to **retry/orphan-clean** partial failures. Backup residual retention MUST be disclosed.
---

## 4. Monitoring and Alerting

- [x] Operational metrics
  - **MON-1** (`accepted`): The system MUST emit operational metrics for: API latency and error/5xx rates (including calendar load), Lambda errors/throttles, DynamoDB throttles, WebSocket failures, Plaid webhook failures, backup job success/fail, and SES bounce/complaint rates—sufficient to drive CloudWatch alarms and the operator dashboard.
- [x] Incident response process
  - **MON-2** (`accepted`): Solo incident process: **Sev1** = login/calendar down or data-loss risk; **Sev2** = Plaid/Stripe/email degraded; **Sev3** = ads/FX/non-critical. Sole developer receives SNS→email and owns response; no on-call rotation.
- [x] Alert recipients and channels
  - **MON-3** (`accepted`): Operational alerts (including Plaid webhook health, backup failures, API 5xx spikes, Lambda throttles, DynamoDB throttles) MUST go to the sole developer via **SNS → email**.
- [x] Centralized observability
  - **MON-4** (`accepted`): Multi-team centralized observability MUST NOT be required (single operator). CloudWatch is the system of record.
- [x] Required observability tooling
  - **MON-5** (`accepted`): The workload MUST use **CloudWatch** (logs, metrics, alarms) for v1. Additional APM tools MUST NOT be required for v1.
- [x] SLIs and SLOs
  - **MON-6** (`accepted`): Soft SLI/SLO: current-month calendar warm **p95 &lt; 1s** (PERF-5). No hard customer-facing availability SLO for v1.
- [x] Dashboards
  - **MON-7** (`accepted`): One CloudWatch dashboard MUST show API 5xx/latency, Lambda errors/throttles, Plaid webhook health, and backup job status for the sole developer.
- [x] Alert noise handling
  - **MON-8** (`accepted`): Alarms MUST prefer sustained conditions (e.g. multi-minute windows) over single datapoints to limit false positives. Channel is SNS→email only for v1.
- [x] Plaid webhook health
  - **MON-9** (`accepted`): CloudWatch alarms MUST alert when Plaid webhook processing is unhealthy (e.g. elevated 4xx/5xx or failure rate). In-app messaging MUST inform users when webhook sync is having issues.

---

## 5. Resilience

- [x] Multi-AZ / multi-region
  - **RES-1** (`accepted`): The workload MUST run in a **single region (`us-east-1`)** using **AWS-managed multi-AZ** for Lambda, API Gateway, DynamoDB, and CloudFront. Multi-region active deployment MUST NOT be required for v1.
- [x] Application state during failover
  - **RES-2** (`accepted`): In-region failover MUST NOT require sticky sessions. Durable state MUST live in DynamoDB; auth via BFF cookie + per-user session epoch. Local Lambda memory MUST be treated as ephemeral.
- [x] Critical downstream dependencies
  - **RES-3** (`accepted`): Critical deps include Cognito, DynamoDB, API Gateway, CloudFront, Plaid, Stripe, SES. On Plaid/Stripe failure the app MUST show **errors only** (already locked). Cognito/DynamoDB/API outage MUST fail closed for authenticated features.
- [x] Resilience / failure-mode testing
  - **RES-4** (`accepted`): Before public launch, a **simple game day (R2)** MUST be run (e.g. local/prod-safe failure drill, webhook failure, backup restore path). Ongoing chaos automation MUST NOT be required for v1.
- [x] Downtime / degradation tolerance
  - **RES-5** (`accepted`): For disaster-class events, maximum acceptable recovery time MUST align with **RTO ≤ 12 hours**. Routine transient faults MAY degrade to clear errors without a pledged uptime SLA.
- [x] Critical failure scenarios
  - **RES-6** (`accepted`): The system MUST have a documented recovery path for: in-region service impairment (rely on AWS), DynamoDB data loss/corruption (backup restore), and full **regional** impairment (see [regional-DR.md](./regional-DR.md)).
- [x] Automatic vs manual failover
  - **RES-7** (`accepted`): In-region failover MUST be **automatic** (managed AWS). Regional disaster recovery MUST be **manual**, declared and executed by the sole developer.

---

## 6. Disaster Recovery (DR) and Business Continuity (BC)

- [x] RTO and RPO
  - **DR-1** (`accepted`): **RPO** MUST be up to ~**7 days** for v1 (weekly on-demand backup, retain 1; PITR off). **RTO** MUST be ≤ **12 hours** for regional recovery when the sole developer is available. See [regional-DR.md](./regional-DR.md).
- [x] DR strategy
  - **DR-2** (`accepted`): DR strategy MUST be **backup-restore (cold) / S1** — no pilot light or warm standby required for v1.
- [x] Always-available business-critical systems
  - **DR-3** (`accepted`): During a regional disaster, no capability is required to stay online. After restore, priority MUST be **login + calendar** read/write first; Plaid, Stripe, ads, FX, reports, and attachments MAY lag.
- [x] DR plan testing
  - **DR-4** (`accepted`): A DynamoDB **restore test MUST run once before public launch**. An **annual** restore drill MUST run thereafter, owned by the sole developer.
- [x] Critical business hours
  - **DR-5** (`accepted`): Availability MUST be treated as **24/7 best-effort** with no customer-facing uptime SLA for v1.
- [x] Standby posture
  - **DR-6** (`accepted`): Standby MUST be **cold** (none warm/hot) for v1.
- [x] Third parties in DR
  - **DR-7** (`accepted`): DR planning MUST document Cognito, Plaid, Stripe, SES, Frankfurter, and Google ads; degraded modes remain error/manual-sync/stale-FX as applicable. Regional AWS loss is covered in [regional-DR.md](./regional-DR.md).
- [x] Declaration and authority
  - **DR-8** (`accepted`): The sole developer SHALL declare a disaster and SHALL authorize regional recovery actions.

---

## 7. Performance

- [x] Startup / cold-start requirements
  - **PERF-1** (`accepted`): Occasional Lambda cold starts are acceptable for v1; cold-start mitigation MAY be deferred until measured. Soft latency targets below **exclude** cold starts.
- [x] Known pain points to design against
  - **PERF-2** (`accepted`): Design MUST watch calendar expand-on-read and Plaid-sized month queries as primary risk areas. No other known pain points recorded yet.
- [x] Benchmarking baseline
  - **PERF-3** (`accepted`): Formal competitor benchmarking MUST NOT be required for v1.
- [x] Acceptable vs unacceptable performance
  - **PERF-4** (`accepted`): Current-month calendar load is unacceptable if warm p95 regularly exceeds the soft target in PERF-5.
- [x] Latency and throughput
  - **PERF-5** (`accepted`): Current-month calendar load MUST target warm **p95 &lt; 1s** (soft target, excluding cold starts). Explicit throughput targets beyond **serverless autoscaling defaults** MUST NOT be required for v1 (deferred until measured load).
- [x] Peak usage and SLAs
  - **PERF-6** (`accepted`): No customer-facing hard latency SLA for v1 beyond soft internal targets. WebSocket invite/Plaid completion notify MUST remain within **1–2s** while connected (already locked).
- [x] How performance is measured
  - **PERF-7** (`accepted`): Performance MUST be measured via API/CloudWatch latency metrics and **CI performance tests** for critical paths in v1.

---

## 8. Scaling

- [x] Usage fluctuation
  - **SCALE-1** (`accepted`): Early load MUST be assumed **idle with slow growth**; quantitative MAU target is **unknown**.
- [x] Scale-out / scale-in triggers
  - **SCALE-2** (`accepted`): Scaling MUST rely on **managed serverless defaults** (Lambda concurrency, API Gateway, DynamoDB on-demand, CloudFront)—no custom ASG.
- [x] Horizontal vs vertical scaling
  - **SCALE-3** (`accepted`): Scaling MUST prefer **horizontal** serverless scale-out for API/realtime; vertical tuning (Lambda memory) MAY be used for latency.
- [x] Behavior at capacity limits
  - **SCALE-4** (`accepted`): Interactive API/user actions at capacity MUST **fail with clear errors** (**L1**). Non-critical async work (e.g. email, scheduled sweepers, FX refresh) MAY **retry/queue** (**L2**).
- [x] Long-term growth
  - **SCALE-5** (`accepted`): Architecture MUST remain able to scale for future demand without a fixed year-1 MAU commitment.
- [x] Per-component scaling policies
  - **SCALE-6** (`accepted`): API, WebSocket, DynamoDB, and CloudFront MUST scale independently via their managed models.
- [x] Burst traffic
  - **SCALE-7** (`accepted`): No planned marketing burst is required in v1 requirements (**B3**). Before public launch, the sole developer MUST perform a **quota sanity check** (e.g. Lambda concurrency, API Gateway, Cognito, SES production access) and raise limits only if defaults are insufficient. Interactive overload behavior remains L1; async remains L2.
- [x] Scale-to-zero
  - **SCALE-8** (`accepted`): Scale-to-zero MUST be allowed for Lambda (no always-on minimum capacity required for v1).

---

## 9. Cost Optimization

- [x] Budget
  - **COST-1** (`accepted`): Temporary soft alert threshold is **$50/month** AWS spend until a baseline is established; soft/hard ceilings MAY be revised after 2–4 weeks of Cost Explorer data.
- [x] Spot / serverless acceptability
  - **COST-2** (`accepted`): Serverless MUST be used for API/jobs as locked. Spot EC2 MUST NOT be required for v1 (no EC2 web tier).
- [x] Cost monitoring ownership
  - **COST-3** (`accepted`): The sole developer SHALL review cost **weekly** and via **SNS→email alerts**.
- [x] Tags and budgets
  - **COST-4** (`accepted`): Resources MUST carry tags `Project`, `Env`, `ManagedBy`, `Service`, `Owner`, and `DataClassification` where applicable. **AWS Budgets** MUST alert at **$50/month** (temporary) via SNS→email.
- [x] Reserved capacity
  - **COST-5** (`accepted`): Savings Plans / Reserved Instances MUST NOT be used for v1.
- [x] Unacceptable cost threshold
  - **COST-6** (`accepted`): AWS spend at or above **$50/month** MUST trigger budget alert until revised post-baseline.
- [x] Cost governance approver
  - **COST-7** (`accepted`): The sole developer SHALL approve cost exceptions.
- [x] Optimization priority
  - **COST-8** (`accepted`): Until further notice, optimize for lowest steady-state AWS cost while preserving a path to scale for future demand.

### Recommended cost allocation tags (v1)

| Tag | Example | Why |
|-----|---------|-----|
| `Project` | `Balance` | Required — rollup |
| `Env` | `prod` / `dev` | Required — separate noise from prod |
| `ManagedBy` | `cdk` | Know what’s IaC vs console |
| `Service` | `api` / `client` / `data` / `auth` | See which layer costs |
| `Owner` | `solo` or handle | SOC 2 / accountability |
| `DataClassification` | `sensitive` | Marks finance/PII stores |

See also: [cost-estimate.md](./cost-estimate.md) for traffic scenarios and non-AWS fees.

---

## 10. Access, Authorization, and Authentication

- [x] Who needs access and at what level
  - **AUTH-1** (`accepted`): Household budget roles MUST be **Owner**, **Editor**, and **Viewer**, enforced with a **hybrid RBAC/ABAC** model (roles plus attributes/policies). Permission matrix (**M1**):
    - **Viewer:** view calendar and (when paid) balances; no create/edit/delete.
    - **Editor:** Viewer permissions plus create/edit/delete expenses and manage categories/caps.
    - **Owner:** Editor permissions plus invite/remove members, change roles, delete household / transfer ownership, and household billing / Plaid link.
  - **AUTH-1a** (`accepted`): Only a **paid Owner** MUST be able to invite members. Invitees MUST also be **paid** members to join a household budget.
- [x] Identity providers
  - **AUTH-2** (`accepted`): End-user identity MUST use **Amazon Cognito** with **Google** and **Apple** social login. Passwordless **magic link MUST be custom-engineered** on Cognito (not a separate IdP). MFA MUST be optional via profile settings.
- [x] Least privilege via roles/policies
  - **AUTH-3** (`accepted`): Access MUST be granted via least-privilege hybrid RBAC/ABAC; standing unrestricted admin for end users MUST NOT be allowed.
- [x] Environment separation
  - **AUTH-4** (`accepted`): Identity and data planes MUST be separated as **local dev** vs **single AWS production account** (**E1**). No dedicated cloud staging account for v1.
- [x] Access revoke and audit
  - **AUTH-5** (`accepted`): User **revoke-all sessions** MUST take effect **immediately** (session epoch). Account deletion MUST hard-purge per **HP1**. Compact audit events (login, logout-all, entitlement changes, household invite/accept/revoke) MUST be retained **≥ 30 days**. Verbose app logs remain **7 days**.
- [x] Temporary credentials (CI/CD, contractors)
  - **AUTH-6** (`accepted`): CI/CD MUST use **GitHub Actions OIDC → IAM role** temporary credentials (**G1**). Long-lived AWS access keys for deploy MUST NOT be used. Contractors MUST NOT have standing prod access in v1 (solo operator).
- [x] External IdP integration
  - **AUTH-7** (`accepted`): External social IdPs for v1 MUST include Google and Apple. Additional enterprise IdPs MUST NOT be required for v1.
- [x] MFA
  - **AUTH-8** (`accepted`): MFA MUST be available as a profile setting; MFA MUST NOT be mandatory at signup for v1.
- [x] Machine-to-machine access
  - **AUTH-9** (`accepted`): The HTTP/WebSocket API MUST be a **first-party BFF for the Balance PWA only**. It MUST NOT be offered as a public or third-party developer API. End-user API keys / public M2M client access MUST NOT be in scope for v1. Browser calls MUST be restricted to the first-party app origin (e.g. CORS allowlist for `app.<domain>` / local dev origins). Server-to-server webhook endpoints (Plaid, Stripe) are not end-user API access and remain in scope.

---

## 11. Connectivity

- [x] Access path (internet / VPN / Direct Connect)
  - **NET-1** (`accepted`): Clients MUST access the system over the **public internet** (PWA via CloudFront; API via API Gateway). VPN/Direct Connect MUST NOT be required for v1.
- [x] Latency / bandwidth requirements
  - **NET-2** (`accepted`): No special bandwidth or network-path latency requirements beyond public-internet access and the soft application latency targets in PERF-5 / WebSocket 1–2s notify.
- [x] Private connectivity between AWS services
  - **NET-3** (`accepted`): Lambda-to-DynamoDB/Cognito/etc. MAY use AWS public service endpoints for v1 (no required VPC). Private-only networking MUST NOT be required unless later mandated.
- [x] Hybrid / on-premises connectivity
  - **NET-4** (`accepted`): Hybrid connectivity to on-premises MUST NOT be required.
- [x] Network segmentation
  - **NET-5** (`accepted`): Network segmentation MUST NOT require a custom VPC / public-private subnet model for v1. Workloads MAY run without a VPC (Lambda + managed AWS endpoints) consistent with NET-3.
- [x] VPC peering / Transit Gateway
  - **NET-6** (`accepted`): Peering / Transit Gateway MUST NOT be required for v1.
- [x] Inter-region connectivity
  - **NET-7** (`accepted`): Low-latency inter-region connectivity MUST NOT be required for v1.
- [x] Edge / CDN
  - **NET-9** (`accepted`): Until custom-domain cutover, default CloudFront / API Gateway hostnames MAY be used for non-production or pre-cutover testing. Public launch SHOULD use `app.` / `gateway.` once the domain is purchased and wired (**D3**).

---

## 12. Name Resolution

- [x] Internal vs external DNS
  - **DNS-1** (`accepted`): The workload MUST use **external public DNS** for the PWA and API. Internal-only DNS MUST NOT be required for v1.
- [x] Custom domains
  - **DNS-2** (`accepted`): CDK MUST provision custom-domain support for **`app.<domain>`** (CloudFront/PWA) and **`gateway.<domain>`** (API Gateway HTTP + WebSocket as designed). The root domain name is **undecided** (will be purchased). Until DNS cutover, default AWS hostnames MAY be used for development/testing.
- [x] DNS ownership model
  - **DNS-3** (`accepted`): DNS for the product domain MUST be managed in **Route 53** (when the domain is purchased/connected) by the sole developer, via CDK where practical (**D3**: ready in infra, cut over when domain exists).
- [x] Naming conventions / governance
  - **DNS-4** (`accepted`): Hostnames MUST follow `app.<domain>` for the client and `gateway.<domain>` for the BFF/API (and associated realtime endpoints as designed).
- [x] Split-horizon DNS
  - **DNS-5** (`accepted`): Split-horizon DNS MUST NOT be required.
- [x] DNS provider
  - **DNS-6** (`accepted`): Public DNS MUST use **Route 53** after domain purchase (registrar may be Route 53 or external with NS delegated).
- [x] Health checks and DNS failover
  - **DNS-7** (`accepted`): Multi-region DNS failover MUST NOT be required for v1. CloudFront/API Gateway health is sufficient.
- [x] IP version
  - **DNS-8** (`accepted`): Dual-stack IPv6 MUST NOT be required for v1 (**IPv4 only**). IPv6 MAY be added later at domain cutover or after launch.

---

## 13. Compliance

- [x] Regulatory standards
  - **CMP-1** (`accepted`): The workload MUST support users in the **United States, Canada, and the EU** for v1, and MUST align with **GDPR**, **CCPA/CPRA**, and a path to **SOC 2** (Type I at/before public launch; Type II after an observation period).
  - **CMP-1a** (`accepted`): Card payments MUST use **Stripe Checkout** for trial/subscribe and **Stripe Customer Portal** for manage/cancel/update payment method (**S1**). Raw card data MUST NOT be stored by this workload. Entitlements MUST update from **Stripe webhooks**. Embedded Stripe Elements MUST NOT be required for v1.
  - **CMP-1b** (`accepted`): Public launch MUST be preceded by a **documented self OSS security assessment** (SEC-9) and a **SOC 2 Type I** report. An **external pen test** is **deferred (PT2)** and MUST occur before or as part of preparing **SOC 2 Type II** (or earlier if budget allows). **SOC 2 Type II** MUST follow after a control observation period (not a gate on first public launch). Confirm with the auditor that self-assessment + Type I is acceptable without a pre-launch external pen test.
- [x] Audit trails, logging, access reports
  - **CMP-2** (`accepted`): Compact audit events MUST capture at least: login, logout-all, entitlement changes, household invite/accept/revoke, **account delete**, **Plaid link/unlink**, **Stripe subscription changes**, and **failed auth** (rate-limited). Retention MUST be **≥ 30 days** (AUTH-5).
- [x] Governance ownership
  - **CMP-3** (`accepted`): The sole developer SHALL own compliance verification (and will engage external auditors/pen-testers as needed).
- [x] Data sovereignty / residency
  - **CMP-4** (`accepted`): All v1 data MUST remain in **AWS `us-east-1`**. Transfers of EU personal data MUST be covered by **SCCs** and privacy disclosures.
- [x] Internal audits / boards
  - **CMP-5** (`accepted`): No internal audit board. Pre-launch evidence MUST include self OSS assessment + SOC 2 Type I. External pen-test evidence MUST be produced per PT2 timing (SEC-9).
- [x] Automated enforcement
  - **CMP-6** (`accepted`): Automated compliance enforcement via **AWS Config / SCPs MUST NOT** be required for v1 (**C0**). Controls MUST be enforced via CDK + IAM + documented process.
- [x] Forensic traceability
  - **CMP-7** (`accepted`): Forensic traceability MUST include **CloudTrail** (management events), **CMP-2 compact audit events** (actor + action + time), and a **request ID** on every API log line so CloudWatch Logs can correlate a single request (**F2**). X-Ray MUST NOT be required for v1.
- [x] Timing of compliance evidence
  - **CMP-8** (`accepted`): Self OSS security assessment and SOC 2 Type I MUST complete before public launch. External pen test MUST follow later (PT2). SOC 2 Type II MUST be pursued after observation.
- [x] Privacy / legal artifacts
  - **CMP-9** (`accepted`): Launch MUST include: Privacy Policy, Terms of Service, **GDPR-oriented** disclosures/DPA posture as applicable, **cookie/consent banners**, CCPA/CPRA disclosures (may be inside Privacy Policy), and SCC-related disclosures for US processing of EU data. Advertising on free tier MUST only run under recorded consent where required.
- [x] Data subject rights
  - **CMP-10** (`accepted`): Users MUST be able to delete their account and export their data in v1.
- [x] Advertising / consent
  - **CMP-12** (`accepted`): First-party product analytics events MUST be limited to funnel/engagement steps needed for product decisions; financial transaction contents MUST NOT be used as analytics properties. Consent/notice MUST cover analytics as required by GDPR/CCPA posture.

### Privacy artifacts (accepted direction)

| Artifact | v1 status |
|----------|-----------|
| Privacy Policy | Required |
| Terms of Service | Required |
| Cookie / consent banner (CMP) | Required (ads + GDPR) |
| CCPA disclosures | Required (US users) |
| GDPR posture (incl. transfer + rights) | Required (EU users) |

Templates + lawyer review recommended; this document is not legal advice.

---

## 14. Capacity Management

- [x] Expected volume
  - **CAP-1** (`accepted`): Launch volume is **unknown**; plan using cost-estimate scenarios S0–S1 until measured.
- [x] Forecasting and growth planning
  - **CAP-2** (`accepted`): Usage/cost MUST be reviewed **weekly** by the sole developer (alongside cost review).
- [x] Quotas and limits
  - **CAP-3** (`accepted`): Before public launch, a **quota sanity check** MUST cover Lambda concurrency, API Gateway, Cognito, and SES production access (B3); raise only if defaults are insufficient.
- [x] Autoscaling per environment
  - **CAP-4** (`accepted`): Autoscaling MUST use the same serverless/on-demand model across environments; no env-specific ASG policies.
- [x] Growth projections
  - **CAP-5** (`accepted`): No fixed quarterly/yearly growth projection is required for v1 architecture.
- [x] Buffer / overprovisioning
  - **CAP-6** (`accepted`): Capacity buffer MUST be **none** — on-demand only.
- [x] Underutilization handling
  - **CAP-7** (`accepted`): Underutilization MUST be reviewed during the weekly cost review; remove unused paid extras if any appear.

---

## 15. Compute Needs

- [x] Compute profile
  - **CPU-1** (`accepted`): Interactive API workloads are **I/O-bound** (DynamoDB, Cognito, Plaid, Stripe). Realtime fan-out is connection/message-bound via API Gateway WebSocket. GPU MUST NOT be required.
- [x] Compute platform
  - **CPU-2** (`accepted`): HTTP BFF MUST run on **AWS Lambda + API Gateway HTTP API**. Realtime MUST use **API Gateway WebSocket API + Lambda** (A-full). Always-on containers MUST NOT be required for v1. The API MUST be consumed by the **first-party PWA** (and vendor webhooks), not as a public API (AUTH-9 / DATA-15).
  - **CPU-2a** (`accepted`): The PWA MUST be a **static SPA** hosted on **S3 + CloudFront** (private bucket + OAC). SSR MUST NOT be required for v1. Hosting MUST be managed via the same CDK app family as the API (not Amplify Hosting / Vercel / Netlify for v1).
- [x] OS / runtime dependencies
  - **CPU-3** (`accepted`): API and job runtimes MUST be **Node.js** with **TypeScript**. The PWA MUST be **TypeScript**. Shared request/response types MUST live in a **shared schemas/types package** consumed by API and client. No separate OS dependency beyond the Lambda Node runtime.
- [x] Existing compute estate / migration
  - **CPU-4** (`accepted`): No existing compute estate constrains v1 (greenfield).
- [x] Instance type needs
  - **CPU-5** (`accepted`): Specialized instance types MUST NOT be required for v1.
- [x] Licensing
  - **CPU-6** (`accepted`): No Windows/Oracle-style license constraints for compute. Apple Developer Program cost for Sign in with Apple is separate from compute.
- [x] GPU
  - **CPU-7** (`accepted`): GPU compute MUST NOT be required for v1.
- [x] Workload shape
  - **CPU-8** (`accepted`): Workloads MUST include: request/response HTTP (BFF), WebSocket connect/message/disconnect, **Plaid webhooks**, Stripe webhooks, SES sends, **EventBridge-scheduled** Lambda for the daily **orphan/retry sweeper (HP1)** and **daily Frankfurter → DynamoDB FX refresh**, and paid over-budget email alerts as designed. Plaid MUST NOT require a scheduled catch-up job in v1.
  - **CPU-9** (`accepted`): Occasional Lambda cold starts are acceptable for v1; mitigation MAY be deferred until measured.
  - **CPU-10** (`accepted`): Household invites MUST be delivered by **email** and by **in-app WebSocket** (`invite.received`) when the invitee is connected. Plaid sync MUST notify `plaid.sync.completed` or `plaid.sync.failed` over the same WebSocket channel within **1–2 seconds** while connected; HTTP status poll MAY be used as fallback. Live multi-user editing MUST NOT be required for v1.
  - **CPU-11** (`accepted`): Account deletion MUST use pattern **HP1**: immediate external cleanup + **immediate hard delete** of user-owned data (no soft-delete / TTL delay). Item deletes MUST hard-delete immediately. Daily EventBridge sweeper MUST only retry/orphan-clean partial failures.

---

## 16. Data Needs and Databases

- [x] Data types managed
  - **DATA-1** (`accepted`): The system MUST manage transactional consumer finance data: users/profiles, budgets/expenses (manual), recurring planned items, categories, household membership, Plaid transactions/balances (paid), subscriptions/entitlements, consent/ad preferences.
- [x] Consistency / availability / partition tolerance
  - **DATA-2** (`accepted`): Under partition/conflict, the system MUST use **strong consistency** for session/entitlement checks, single-item get-before-edit, and household membership reads; **eventually consistent** reads are acceptable for list/calendar queries (**D2-A**). Conflicting edits MUST resolve with **condition expressions / optimistic concurrency** (see DATA-5); silent last-write-wins without version checks MUST NOT be the default for user-edited entities.
- [x] Database paradigm
  - **DATA-3** (`accepted`): Primary datastore MUST be **Amazon DynamoDB** (on-demand billing preferred for cost + scale unless later changed).
- [x] Multi-region database replication / failover
  - **DATA-4** (`accepted`): Database multi-region replication/failover MUST NOT be required for v1 (`us-east-1` only).
- [x] Update frequency and concurrency
  - **DATA-5** (`accepted`): Household entities MUST support on the order of **≤ ~5 concurrent writers**. Updates to user-edited items MUST use **optimistic concurrency** (version attribute + DynamoDB condition expressions); conflicts MUST return **409** (or equivalent) so the client can refresh (**D5-A**). CRDTs and pessimistic locks MUST NOT be required for v1.
- [x] Analytics / BI
  - **DATA-6** (`accepted`): Product analytics in v1 MUST be **first-party only (A1)**: funnel/step events stored in the app’s own systems (e.g. DynamoDB and/or CloudWatch metrics), using internal user ids—not raw emails. MUST NOT send bank amounts, transaction memos, or other financial payload contents to third-party analytics. Third-party product analytics SaaS MUST NOT be required for v1 (MAY be added later without redesigning event names if kept stable).
- [x] Legacy database migration
  - **DATA-7** (`accepted`): Legacy data migration MUST NOT occur (greenfield).
- [x] Access patterns
  - **DATA-8** (`accepted`): Calendar MUST present a **combined timeline** of manual items and Plaid transactions for paid/Plaid users; **free users MUST see manual (and recurring) items only**.
  - **DATA-9** (`accepted`): Recurring items MUST be stored as rules and **expanded on read** (not materialized as occurrence rows).
  - **DATA-10** (`accepted`): Users MUST select a display **currency**. **Paid** users MUST support **multi-currency with indicative live FX** via **Frankfurter**, refreshed into **DynamoDB daily** (EventBridge → Lambda). Rates are **daily indicative**, not trade-execution quotes; UI MUST expose `ratesAsOf`. PWA MAY cache rates locally but MUST NOT tie that cache to the 30-day auth session; local FX cache MUST expire when `ratesAsOf` changes or within **24 hours**, whichever comes first.
  - **DATA-11** (`accepted`): Plaid products in v1 MUST include **Transactions** and **Balances**.
  - **DATA-15** (`accepted`): The API MUST NOT be a public product surface. Interactive clients MUST be the **first-party PWA** only (session cookie via BFF). Machine-to-machine / public **API access for end users or third parties MUST NOT** be in scope for v1. Documented exception: inbound **webhooks** from trusted vendors (Plaid, Stripe) with signature verification.
  - **DATA-16** (`accepted`): Redis MUST NOT be required for FX caching in v1.
  - **DATA-12** (`accepted`): After a validated account-deletion request, the system MUST **immediately** perform external cleanup (Cognito, Plaid, Stripe, sessions) and **immediately hard-delete** user-owned primary data and attachments (**HP1**). A **daily EventBridge → Lambda** sweeper MUST retry/orphan-clean failed cleanups only. Soft-delete/TTL tombstones MUST NOT be used for user-initiated deletes. Backup residual retention (weekly on-demand backup) MUST be documented in privacy disclosures.
  - **DATA-13** (`accepted`): Transactional email (magic link, household invites) MUST use **Amazon SES**.
  - **DATA-14** (`accepted`): Paid Plaid automatic sync MUST be **webhooks only** (no scheduled catch-up cron in v1). A **manual sync** control MUST remain obvious. If webhook delivery/processing is unhealthy, the system MUST inform the user and MUST raise **CloudWatch** alerts for operator visibility.

---

## 17. Session and State Management

- [x] Persist sessions across services / deployments
  - **SESS-1** (`accepted`): Authenticated sessions MUST survive redeploys and MUST work across API instances without sticky sessions.
- [x] State management mechanism
  - **SESS-2** (`accepted`): Auth MUST use a **BFF pattern** with an **HttpOnly secure cookie** session (not browser-accessible access tokens as the primary session mechanism).
- [x] Session affinity
  - **SESS-3** (`accepted`): Sticky sessions MUST NOT be required.
- [x] Cross-region session persistence
  - **SESS-4** (`accepted`): Cross-region session persistence MUST NOT be required for v1.
- [x] Server-side vs client-side state
  - **SESS-5** (`accepted`): Auth session MUST be server-issued (BFF cookie); UI calendar state MAY be client-side; durable domain data MUST be server-side in DynamoDB.
- [x] Session retention
  - **SESS-6** (`accepted`): Session absolute lifetime MUST be **30 days**. Idle timeout MUST NOT be required for v1 (absolute expiry only unless later added).
- [x] Shared session store
  - **SESS-7** (`accepted`): Session payload MAY be carried in an encrypted cookie and/or referenced server-side; a separate Redis session store MUST NOT be required for v1 unless later justified. Per-user **session epoch** (or equivalent) in DynamoDB MUST support revoke-all and selective invalidation.
- [x] Anonymous sessions / revoke
  - **SESS-8** (`accepted`): Anonymous sessions MUST NOT be required for v1. **Log out everywhere** (revoke all sessions) MUST be supported. Normal new login MUST NOT invalidate other sessions. Sensitive security events (e.g. MFA enable, account recovery, email/IdP change, explicit secure-account action) MUST invalidate other sessions. UX MAY show “signed in elsewhere” with one-tap revoke.

---

## Capture log

| ID | Status | Owner | Resolve by | Notes |
|----|--------|-------|------------|-------|
| All checklist IDs | accepted | you | — | Full promotion complete |
| DNS-8 IPv6 | deferred | you | later | IPv4 only for v1; IPv6 optional later |
| Domain purchase | open | you | before launch | `app.` / `gateway.` ready in CDK (D3) |
| Decision log | accepted | you | — | See [decisions-and-tradeoffs.md](./decisions-and-tradeoffs.md) |

---
