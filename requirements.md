# Architecture Requirements Checklist

## Cross-cutting (answer first)

- [x] Problem and audience
  - **CX-1** (`draft`): The product SHALL help consumers in the **US, Canada, and EU** track budgets, expenses, and spending in one place.
- [x] First-release scope boundary
  - **CX-2** (`draft`): The first release MUST include:
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
  - **CX-3** (`draft`): The first release MUST NOT include investments or net-worth tracking. Native mobile apps are out of v1 (PWA only).
- [ ] Cloud and account model
  - **CX-4** (`draft`): The workload MUST run on AWS in a **single-account CDK-managed** footprint for v1. Multi-account AWS Organizations MUST NOT be required for v1 (deferred until revenue/team warrants it). Client and API infra MUST be expressible in **one CDK app/stack family** (not a separate Amplify/Vercel host).
- [ ] Environments and promotion
  - **CX-5** (`draft`): Environments MUST be **local development** + **one AWS account (production)** (**E1**)—no separate cloud staging account/stack required for v1. Production deploys MUST be driven by **version tags** on releases from **`main`** (PRs merge to `main`, then a version tag triggers CI → build → S3 sync → CloudFront invalidation / API deploy as applicable).
- [x] Ownership
  - **CX-6** (`draft`): The sole developer SHALL build, deploy, operate, and support the workload.
- [x] Hard constraints
  - **CX-7** (`draft`): There is no hard deadline. The workload MUST run on AWS, MUST prefer the lowest-cost architecture that meets requirements, and MUST remain able to scale for future demand.
- [ ] Third-party dependencies
  - **CX-8** (`draft`): The system MUST integrate with Plaid for paid bank linking/sync/balances, Stripe for subscriptions/trial/gating, Amazon SES for transactional email, Frankfurter for indicative FX (cached in DynamoDB), and Cognito (Google/Apple + custom magic link) with a BFF HttpOnly session cookie. Free users MUST be blocked from Plaid link. When Plaid or Stripe is unavailable, the system MUST show an error only.
- [ ] Requirements-complete definition
  - **CX-9** (`draft`): Requirements are **draft-complete** for v1 architecture decisions once remaining open IDs in the capture log are resolved or explicitly deferred. Formal “accepted” promotion and any extra cross-category exit checklist MAY follow separately; they MUST NOT block implementation planning.
  - **CX-10** (`draft`): Billing trial MUST: start at first paid-feature gate; require card; auto-convert to paid after 7 days per consented ToS; allow **at most one trial per account**.

---

## 1. Organization-Based Strategies

- [x] Key business goals and how this workload supports them
  - **ORG-1** (`draft`): The workload SHALL advance the goal of giving consumers a single place to track budgets, expenses, and spending — calendar-first PWA, with public self-serve signup.
  - **ORG-2** (`draft`): Success of the first release SHALL include that a stranger can sign up and get value without builder intervention. Additional quantitative KPIs MUST NOT be required for v1 (deferred).
- [ ] Organizational standards or mandates
  - **ORG-3** (`draft`): There are no enterprise organizational mandates beyond: AWS-only, cost-minimizing, and scalable for future demand. *(confirm or amend)*
- [x] Primary stakeholders and decision-makers
  - **ORG-4** (`draft`): The sole developer SHALL be the decision-maker for architecture, budget, and product scope.
- [x] Existing enterprise architectures or patterns
  - **ORG-5** (`draft`): The solution is greenfield; it MUST NOT be required to align with pre-existing enterprise architecture patterns.
- [x] Dependencies on other internal systems or business units
  - **ORG-6** (`draft`): The workload MUST NOT depend on other internal systems or business units.
- [x] Timelines or milestones
  - **ORG-7** (`draft`): No fixed milestone dates are defined.
- [ ] Future plans that could impact this workload
  - **ORG-8** (`draft`): Architecture decisions MUST preserve the ability to scale for future demand and MUST implement a multi-user budget data model with invite/share for paid household budgets in v1. Quantitative “future demand” targets MUST NOT be required for v1 (deferred; serverless autoscaling is the mechanism).

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
| API access | **Not in v1** |
| Investments / net worth | **Never for v1** (CX-3) |

---

## 2. Security

- [ ] Security and privacy requirements
  - **SEC-1** (`draft`): Sensitive data MUST include:
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
  - **SEC-2** (`draft`): Data in transit MUST use TLS. Data at rest MUST use encryption; keys MUST be **AWS-managed** unless later requirements demand customer-managed KMS.
  - **SEC-3** (`draft`): All application data for v1 MUST be stored and processed in **AWS `us-east-1`**. Multi-region MUST NOT be required for v1. EU personal data transfers MUST rely on **Standard Contractual Clauses (SCCs)** and privacy disclosures.
- [ ] Identity and access management approach
  - **SEC-4** (`draft`): End-user auth MUST support social login and passwordless magic link. MFA MUST be available as a user profile setting (not mandatory for all users at signup). Operator access MUST be the **sole developer** via AWS console/SSO plus **GitHub OIDC deploy role** (AUTH-6); contractors MUST NOT have standing prod access. A documented break-glass admin path for the sole operator is acceptable for v1.
- [ ] Threat models or known risks
  - **SEC-5** (`draft`): A **STRIDE threat model** MUST exist for v1 (see [threat-model-stride.md](./threat-model-stride.md)). Design and reviews MUST address the threats listed there; the model MUST be updated when major features ship.
- [ ] Centralized vs decentralized security controls
  - **SEC-6** (`draft`): Security controls MUST be **centralized in the single AWS account** (IAM, Cognito, SSM, CloudWatch, optional GuardDuty/Access Analyzer)—not a multi-account org/SCP model for v1 (**C1**).
- [ ] Vulnerability management and patching
  - **SEC-7** (`draft`): Findings from SAST/SCA/DAST MUST be triaged with SLA **Critical/High ≤ 7 days** (fix or recorded risk-accept); **Medium ≤ 30 days**. Dependency and Lambda runtime updates MUST follow the same spirit when advisories apply. Patching for v1 means dependency/runtime updates (no self-managed OS fleet).
- [ ] Secrets management
  - **SEC-8** (`draft`): Secrets MUST be stored in **AWS Systems Manager Parameter Store SecureString** (AWS-managed KMS). Secrets MUST NOT be committed to source control. Secrets MUST be **reviewed at least every 90 days** (**R90**)—confirm still needed and rotate when the vendor supports it or after any suspected leak. Immediate rotation MUST occur on suspected compromise regardless of cadence.
- [ ] Security assessments / penetration testing
  - **SEC-9** (`draft`): Before public launch, the sole developer MUST complete a **self security assessment using maintained open-source tools** (at least **OWASP ZAP** and/or **Nuclei**, plus manual checks for auth/session, webhooks, and entitlement gates), with findings tracked to remediation. An **external penetration test** MUST be scheduled for a **later phase** (e.g. before SOC 2 Type II or when revenue allows)—not a gate on first public launch (**PT2**). Marketing MUST NOT claim “externally pen tested” until that engagement completes.
  - **SEC-9a** (`draft`): The project MUST run **SAST** and **DAST** using open-source tooling:
    - **SAST:** **Semgrep** on TypeScript/Node (additional maintained OSS SAST MAY be added).
    - **DAST:** **OWASP ZAP** and/or **Nuclei**.
    - **SCA:** **npm audit** plus **Trivy** or **OSV-Scanner**.
    - **Cadence (C1, refined):** SAST and SCA on **every pull request targeting `main`**; DAST **weekly** and **before public launch**.
    - **DAST targets:** **local/ephemeral test targets and production**, with a **strict safe ruleset** on production (non-destructive checks only). No dedicated cloud staging environment in v1 (**E1**).
    - Findings MUST be triaged; launch-blocking severities MUST be remediated or explicitly risk-accepted by the sole developer with a recorded rationale.
- [ ] Mandated AWS security services
  - **SEC-10** (`draft`): CDK MUST support **IAM Access Analyzer** and **GuardDuty** with an **enable/disable flag** (same pattern as PITR). They MAY be **off to start** (dev/early). They MUST be **turned on before public launch** (**S3** posture). AWS Config / Security Hub MUST NOT be required for v1 unless later added.

### Degraded third-party behavior

- **CX-8a** (`draft`): When Plaid or Stripe is unavailable, the system MUST surface an error only (no read-only/cached degraded mode required for v1).

---

## 3. Storage Needs

- [ ] Types of data stored
  - **STO-1** (`draft`): The system MUST store structured application data in DynamoDB (users, budgets/expenses, recurring rules, categories, household membership, Plaid-linked data, entitlements, consent records) plus operational logs. Object storage for static PWA assets and **paid expense attachments/receipts**. 
- [ ] Durability, availability, latency
  - **STO-2** (`draft`): Primary datastore MUST rely on **DynamoDB’s managed multi-AZ durability and availability** (AWS published characteristics). No separate custom durability/availability contract beyond that. Interactive read latency MUST align with the soft calendar target in PERF-5 (warm p95 &lt; 1s); no additional custom latency SLA.
- [ ] Access frequency (hot / warm / cold)
  - **STO-3** (`draft`): Interactive calendar/user data MUST be treated as **hot**. CloudWatch **log retention MUST be 7 days** for v1 (cost control). Compact **audit events** MUST be retained **30 days** (AUTH-5).
- [ ] Retention and archival
  - **STO-4** (`draft`): User-initiated deletes MUST be **hard deletes** (no soft-delete / TTL tombstone flow for app data). Account deletion MUST **immediately purge** user-owned primary data (see DATA-12). Backup residual retention MUST still be disclosed.
- [ ] Storage modality
  - **STO-5** (`draft`): Primary datastore MUST be **DynamoDB**. **S3** MUST store static PWA build artifacts served via **CloudFront**. Block/file storage MUST NOT be required for v1 app data. Paid attachments/receipts MUST be deleted when the owning expense or account is purged.
- [ ] Backup
  - **STO-6** (`draft`): Infrastructure MUST **support DynamoDB PITR** but PITR MUST be **off for v1**. Active v1 backups MUST be **weekly on-demand** snapshots, retaining **1** backup (replace each week). A **restore test MUST run once before public launch** (e.g. restore to a scratch table). Privacy disclosures MUST describe residual retention for that on-demand backup. Enabling PITR later MUST be config-only.
- [ ] Cross-region replication / multi-AZ
  - **STO-7** (`draft`): Storage MUST use DynamoDB’s managed multi-AZ behavior in `us-east-1`. Cross-region replication MUST NOT be required for v1.
- [ ] Deletion and lifecycle
  - **STO-8** (`draft`): User-initiated delete of an expense/item MUST **hard-delete immediately** (no soft-delete). Account deletion MUST follow **HP1**: immediate external cleanup (Cognito / Plaid / Stripe / sessions) + **immediate hard delete** of user-owned DynamoDB items and attachment objects, plus a **daily EventBridge → Lambda** sweeper only to **retry/orphan-clean** partial failures. Backup residual retention MUST be disclosed.
---

## 4. Monitoring and Alerting

- [ ] Operational metrics
  - **MON-1** (`draft`): The system MUST emit operational metrics for: API latency and error/5xx rates (including calendar load), Lambda errors/throttles, DynamoDB throttles, WebSocket failures, Plaid webhook failures, backup job success/fail, and SES bounce/complaint rates—sufficient to drive CloudWatch alarms and the operator dashboard.
- [ ] Incident response process
  - **MON-2** (`draft`): Solo incident process: **Sev1** = login/calendar down or data-loss risk; **Sev2** = Plaid/Stripe/email degraded; **Sev3** = ads/FX/non-critical. Sole developer receives SNS→email and owns response; no on-call rotation.
- [ ] Alert recipients and channels
  - **MON-3** (`draft`): Operational alerts (including Plaid webhook health, backup failures, API 5xx spikes, Lambda throttles, DynamoDB throttles) MUST go to the sole developer via **SNS → email**.
- [ ] Centralized observability
  - **MON-4** (`draft`): Multi-team centralized observability MUST NOT be required (single operator). CloudWatch is the system of record.
- [ ] Required observability tooling
  - **MON-5** (`draft`): The workload MUST use **CloudWatch** (logs, metrics, alarms) for v1. Additional APM tools MUST NOT be required for v1.
- [ ] SLIs and SLOs
  - **MON-6** (`draft`): Soft SLI/SLO: current-month calendar warm **p95 &lt; 1s** (PERF-5). No hard customer-facing availability SLO for v1.
- [ ] Dashboards
  - **MON-7** (`draft`): One CloudWatch dashboard MUST show API 5xx/latency, Lambda errors/throttles, Plaid webhook health, and backup job status for the sole developer.
- [ ] Alert noise handling
  - **MON-8** (`draft`): Alarms MUST prefer sustained conditions (e.g. multi-minute windows) over single datapoints to limit false positives. Channel is SNS→email only for v1.
- [ ] Plaid webhook health
  - **MON-9** (`draft`): CloudWatch alarms MUST alert when Plaid webhook processing is unhealthy (e.g. elevated 4xx/5xx or failure rate). In-app messaging MUST inform users when webhook sync is having issues.

---

## 5. Resilience

- [ ] Multi-AZ / multi-region
  - **RES-1** (`draft`): The workload MUST run in a **single region (`us-east-1`)** using **AWS-managed multi-AZ** for Lambda, API Gateway, DynamoDB, and CloudFront. Multi-region active deployment MUST NOT be required for v1.
- [ ] Application state during failover
  - **RES-2** (`draft`): In-region failover MUST NOT require sticky sessions. Durable state MUST live in DynamoDB; auth via BFF cookie + per-user session epoch. Local Lambda memory MUST be treated as ephemeral.
- [ ] Critical downstream dependencies
  - **RES-3** (`draft`): Critical deps include Cognito, DynamoDB, API Gateway, CloudFront, Plaid, Stripe, SES. On Plaid/Stripe failure the app MUST show **errors only** (already locked). Cognito/DynamoDB/API outage MUST fail closed for authenticated features.
- [ ] Resilience / failure-mode testing
  - **RES-4** (`draft`): Before public launch, a **simple game day (R2)** MUST be run (e.g. local/prod-safe failure drill, webhook failure, backup restore path). Ongoing chaos automation MUST NOT be required for v1.
- [ ] Downtime / degradation tolerance
  - **RES-5** (`draft`): For disaster-class events, maximum acceptable recovery time MUST align with **RTO ≤ 12 hours**. Routine transient faults MAY degrade to clear errors without a pledged uptime SLA.
- [ ] Critical failure scenarios
  - **RES-6** (`draft`): The system MUST have a documented recovery path for: in-region service impairment (rely on AWS), DynamoDB data loss/corruption (backup restore), and full **regional** impairment (see [regional-DR.md](./regional-DR.md)).
- [ ] Automatic vs manual failover
  - **RES-7** (`draft`): In-region failover MUST be **automatic** (managed AWS). Regional disaster recovery MUST be **manual**, declared and executed by the sole developer.

---

## 6. Disaster Recovery (DR) and Business Continuity (BC)

- [ ] RTO and RPO
  - **DR-1** (`draft`): **RPO** MUST be up to ~**7 days** for v1 (weekly on-demand backup, retain 1; PITR off). **RTO** MUST be ≤ **12 hours** for regional recovery when the sole developer is available. See [regional-DR.md](./regional-DR.md).
- [ ] DR strategy
  - **DR-2** (`draft`): DR strategy MUST be **backup-restore (cold) / S1** — no pilot light or warm standby required for v1.
- [ ] Always-available business-critical systems
  - **DR-3** (`draft`): During a regional disaster, no capability is required to stay online. After restore, priority MUST be **login + calendar** read/write first; Plaid, Stripe, ads, FX, reports, and attachments MAY lag.
- [ ] DR plan testing
  - **DR-4** (`draft`): A DynamoDB **restore test MUST run once before public launch**. An **annual** restore drill MUST run thereafter, owned by the sole developer.
- [ ] Critical business hours
  - **DR-5** (`draft`): Availability MUST be treated as **24/7 best-effort** with no customer-facing uptime SLA for v1.
- [ ] Standby posture
  - **DR-6** (`draft`): Standby MUST be **cold** (none warm/hot) for v1.
- [ ] Third parties in DR
  - **DR-7** (`draft`): DR planning MUST document Cognito, Plaid, Stripe, SES, Frankfurter, and Google ads; degraded modes remain error/manual-sync/stale-FX as applicable. Regional AWS loss is covered in [regional-DR.md](./regional-DR.md).
- [ ] Declaration and authority
  - **DR-8** (`draft`): The sole developer SHALL declare a disaster and SHALL authorize regional recovery actions.

---

## 7. Performance

- [ ] Startup / cold-start requirements
  - **PERF-1** (`draft`): Occasional Lambda cold starts are acceptable for v1; cold-start mitigation MAY be deferred until measured. Soft latency targets below **exclude** cold starts.
- [ ] Known pain points to design against
  - **PERF-2** (`draft`): Design MUST watch calendar expand-on-read and Plaid-sized month queries as primary risk areas. No other known pain points recorded yet.
- [ ] Benchmarking baseline
  - **PERF-3** (`draft`): Formal competitor benchmarking MUST NOT be required for v1.
- [ ] Acceptable vs unacceptable performance
  - **PERF-4** (`draft`): Current-month calendar load is unacceptable if warm p95 regularly exceeds the soft target in PERF-5.
- [ ] Latency and throughput
  - **PERF-5** (`draft`): Current-month calendar load MUST target warm **p95 &lt; 1s** (soft target, excluding cold starts). Explicit throughput targets beyond **serverless autoscaling defaults** MUST NOT be required for v1 (deferred until measured load).
- [ ] Peak usage and SLAs
  - **PERF-6** (`draft`): No customer-facing hard latency SLA for v1 beyond soft internal targets. WebSocket invite/Plaid completion notify MUST remain within **1–2s** while connected (already locked).
- [ ] How performance is measured
  - **PERF-7** (`draft`): Performance MUST be measured via API/CloudWatch latency metrics and **CI performance tests** for critical paths in v1.

---

## 8. Scaling

- [ ] Usage fluctuation
  - **SCALE-1** (`draft`): Early load MUST be assumed **idle with slow growth**; quantitative MAU target is **unknown**.
- [ ] Scale-out / scale-in triggers
  - **SCALE-2** (`draft`): Scaling MUST rely on **managed serverless defaults** (Lambda concurrency, API Gateway, DynamoDB on-demand, CloudFront)—no custom ASG.
- [ ] Horizontal vs vertical scaling
  - **SCALE-3** (`draft`): Scaling MUST prefer **horizontal** serverless scale-out for API/realtime; vertical tuning (Lambda memory) MAY be used for latency.
- [ ] Behavior at capacity limits
  - **SCALE-4** (`draft`): Interactive API/user actions at capacity MUST **fail with clear errors** (**L1**). Non-critical async work (e.g. email, scheduled sweepers, FX refresh) MAY **retry/queue** (**L2**).
- [ ] Long-term growth
  - **SCALE-5** (`draft`): Architecture MUST remain able to scale for future demand without a fixed year-1 MAU commitment.
- [ ] Per-component scaling policies
  - **SCALE-6** (`draft`): API, WebSocket, DynamoDB, and CloudFront MUST scale independently via their managed models.
- [ ] Burst traffic
  - **SCALE-7** (`draft`): No planned marketing burst is required in v1 requirements (**B3**). Before public launch, the sole developer MUST perform a **quota sanity check** (e.g. Lambda concurrency, API Gateway, Cognito, SES production access) and raise limits only if defaults are insufficient. Interactive overload behavior remains L1; async remains L2.
- [ ] Scale-to-zero
  - **SCALE-8** (`draft`): Scale-to-zero MUST be allowed for Lambda (no always-on minimum capacity required for v1).

---

## 9. Cost Optimization

- [ ] Budget
  - **COST-1** (`draft`): Temporary soft alert threshold is **$50/month** AWS spend until a baseline is established; soft/hard ceilings MAY be revised after 2–4 weeks of Cost Explorer data.
- [ ] Spot / serverless acceptability
  - **COST-2** (`draft`): Serverless MUST be used for API/jobs as locked. Spot EC2 MUST NOT be required for v1 (no EC2 web tier).
- [ ] Cost monitoring ownership
  - **COST-3** (`draft`): The sole developer SHALL review cost **weekly** and via **SNS→email alerts**.
- [ ] Tags and budgets
  - **COST-4** (`draft`): Resources MUST carry tags `Project`, `Env`, `ManagedBy`, `Service`, `Owner`, and `DataClassification` where applicable. **AWS Budgets** MUST alert at **$50/month** (temporary) via SNS→email.
- [ ] Reserved capacity
  - **COST-5** (`draft`): Savings Plans / Reserved Instances MUST NOT be used for v1.
- [ ] Unacceptable cost threshold
  - **COST-6** (`draft`): AWS spend at or above **$50/month** MUST trigger budget alert until revised post-baseline.
- [ ] Cost governance approver
  - **COST-7** (`draft`): The sole developer SHALL approve cost exceptions.
- [ ] Optimization priority
  - **COST-8** (`draft`): Until further notice, optimize for lowest steady-state AWS cost while preserving a path to scale for future demand.

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

- [ ] Who needs access and at what level
  - **AUTH-1** (`draft`): Household budget roles MUST be **Owner**, **Editor**, and **Viewer**, enforced with a **hybrid RBAC/ABAC** model (roles plus attributes/policies). Permission matrix (**M1**):
    - **Viewer:** view calendar and (when paid) balances; no create/edit/delete.
    - **Editor:** Viewer permissions plus create/edit/delete expenses and manage categories/caps.
    - **Owner:** Editor permissions plus invite/remove members, change roles, delete household / transfer ownership, and household billing / Plaid link.
  - **AUTH-1a** (`draft`): Only a **paid Owner** MUST be able to invite members. Invitees MUST also be **paid** members to join a household budget.
- [ ] Identity providers
  - **AUTH-2** (`draft`): End-user identity MUST use **Amazon Cognito** with **Google** and **Apple** social login. Passwordless **magic link MUST be custom-engineered** on Cognito (not a separate IdP). MFA MUST be optional via profile settings.
- [ ] Least privilege via roles/policies
  - **AUTH-3** (`draft`): Access MUST be granted via least-privilege hybrid RBAC/ABAC; standing unrestricted admin for end users MUST NOT be allowed.
- [ ] Environment separation
  - **AUTH-4** (`draft`): Identity and data planes MUST be separated as **local dev** vs **single AWS production account** (**E1**). No dedicated cloud staging account for v1.
- [ ] Access revoke and audit
  - **AUTH-5** (`draft`): User **revoke-all sessions** MUST take effect **immediately** (session epoch). Account deletion MUST hard-purge per **HP1**. Compact audit events (login, logout-all, entitlement changes, household invite/accept/revoke) MUST be retained **≥ 30 days**. Verbose app logs remain **7 days**.
- [ ] Temporary credentials (CI/CD, contractors)
  - **AUTH-6** (`draft`): CI/CD MUST use **GitHub Actions OIDC → IAM role** temporary credentials (**G1**). Long-lived AWS access keys for deploy MUST NOT be used. Contractors MUST NOT have standing prod access in v1 (solo operator).
- [ ] External IdP integration
  - **AUTH-7** (`draft`): External social IdPs for v1 MUST include Google and Apple. Additional enterprise IdPs MUST NOT be required for v1.
- [ ] MFA
  - **AUTH-8** (`draft`): MFA MUST be available as a profile setting; MFA MUST NOT be mandatory at signup for v1.
- [ ] Machine-to-machine access
  - **AUTH-9** (`draft`): End-user API keys / public M2M API access MUST NOT be in scope for v1.

---

## 11. Connectivity

- [ ] Access path (internet / VPN / Direct Connect)
  - **NET-1** (`draft`): Clients MUST access the system over the **public internet** (PWA via CloudFront; API via API Gateway). VPN/Direct Connect MUST NOT be required for v1.
- [ ] Latency / bandwidth requirements
  - **NET-2** (`draft`): No special bandwidth or network-path latency requirements beyond public-internet access and the soft application latency targets in PERF-5 / WebSocket 1–2s notify.
- [ ] Private connectivity between AWS services
  - **NET-3** (`draft`): Lambda-to-DynamoDB/Cognito/etc. MAY use AWS public service endpoints for v1 (no required VPC). Private-only networking MUST NOT be required unless later mandated.
- [ ] Hybrid / on-premises connectivity
  - **NET-4** (`draft`): Hybrid connectivity to on-premises MUST NOT be required.
- [ ] Network segmentation
  - **NET-5** (`draft`): Network segmentation MUST NOT require a custom VPC / public-private subnet model for v1. Workloads MAY run without a VPC (Lambda + managed AWS endpoints) consistent with NET-3.
- [ ] VPC peering / Transit Gateway
  - **NET-6** (`draft`): Peering / Transit Gateway MUST NOT be required for v1.
- [ ] Inter-region connectivity
  - **NET-7** (`draft`): Low-latency inter-region connectivity MUST NOT be required for v1.
- [ ] Edge / CDN
  - **NET-9** (`draft`): Until custom-domain cutover, default CloudFront / API Gateway hostnames MAY be used for non-production or pre-cutover testing. Public launch SHOULD use `app.` / `gateway.` once the domain is purchased and wired (**D3**).

---

## 12. Name Resolution

- [ ] Internal vs external DNS
  - **DNS-1** (`draft`): The workload MUST use **external public DNS** for the PWA and API. Internal-only DNS MUST NOT be required for v1.
- [ ] Custom domains
  - **DNS-2** (`draft`): CDK MUST provision custom-domain support for **`app.<domain>`** (CloudFront/PWA) and **`gateway.<domain>`** (API Gateway HTTP + WebSocket as designed). The root domain name is **undecided** (will be purchased). Until DNS cutover, default AWS hostnames MAY be used for development/testing.
- [ ] DNS ownership model
  - **DNS-3** (`draft`): DNS for the product domain MUST be managed in **Route 53** (when the domain is purchased/connected) by the sole developer, via CDK where practical (**D3**: ready in infra, cut over when domain exists).
- [ ] Naming conventions / governance
  - **DNS-4** (`draft`): Hostnames MUST follow `app.<domain>` for the client and `gateway.<domain>` for the BFF/API (and associated realtime endpoints as designed).
- [ ] Split-horizon DNS
  - **DNS-5** (`draft`): Split-horizon DNS MUST NOT be required.
- [ ] DNS provider
  - **DNS-6** (`draft`): Public DNS MUST use **Route 53** after domain purchase (registrar may be Route 53 or external with NS delegated).
- [ ] Health checks and DNS failover
  - **DNS-7** (`draft`): Multi-region DNS failover MUST NOT be required for v1. CloudFront/API Gateway health is sufficient.
- [ ] IP version
  - **DNS-8** (`draft`): Dual-stack IPv6 MUST NOT be required for v1 (**IPv4 only**). IPv6 MAY be added later at domain cutover or after launch.

---

## 13. Compliance

- [ ] Regulatory standards
  - **CMP-1** (`draft`): The workload MUST support users in the **United States, Canada, and the EU** for v1, and MUST align with **GDPR**, **CCPA/CPRA**, and a path to **SOC 2** (Type I at/before public launch; Type II after an observation period).
  - **CMP-1a** (`draft`): Card payments MUST use **Stripe Checkout** for trial/subscribe and **Stripe Customer Portal** for manage/cancel/update payment method (**S1**). Raw card data MUST NOT be stored by this workload. Entitlements MUST update from **Stripe webhooks**. Embedded Stripe Elements MUST NOT be required for v1.
  - **CMP-1b** (`draft`): Public launch MUST be preceded by a **documented self OSS security assessment** (SEC-9) and a **SOC 2 Type I** report. An **external pen test** is **deferred (PT2)** and MUST occur before or as part of preparing **SOC 2 Type II** (or earlier if budget allows). **SOC 2 Type II** MUST follow after a control observation period (not a gate on first public launch). Confirm with the auditor that self-assessment + Type I is acceptable without a pre-launch external pen test.
- [ ] Audit trails, logging, access reports
  - **CMP-2** (`draft`): Compact audit events MUST capture at least: login, logout-all, entitlement changes, household invite/accept/revoke, **account delete**, **Plaid link/unlink**, **Stripe subscription changes**, and **failed auth** (rate-limited). Retention MUST be **≥ 30 days** (AUTH-5).
- [ ] Governance ownership
  - **CMP-3** (`draft`): The sole developer SHALL own compliance verification (and will engage external auditors/pen-testers as needed).
- [ ] Data sovereignty / residency
  - **CMP-4** (`draft`): All v1 data MUST remain in **AWS `us-east-1`**. Transfers of EU personal data MUST be covered by **SCCs** and privacy disclosures.
- [ ] Internal audits / boards
  - **CMP-5** (`draft`): No internal audit board. Pre-launch evidence MUST include self OSS assessment + SOC 2 Type I. External pen-test evidence MUST be produced per PT2 timing (SEC-9).
- [ ] Automated enforcement
  - **CMP-6** (`draft`): Automated compliance enforcement via **AWS Config / SCPs MUST NOT** be required for v1 (**C0**). Controls MUST be enforced via CDK + IAM + documented process.
- [ ] Forensic traceability
  - **CMP-7** (`draft`): Forensic traceability MUST include **CloudTrail** (management events), **CMP-2 compact audit events** (actor + action + time), and a **request ID** on every API log line so CloudWatch Logs can correlate a single request (**F2**). X-Ray MUST NOT be required for v1.
- [ ] Timing of compliance evidence
  - **CMP-8** (`draft`): Self OSS security assessment and SOC 2 Type I MUST complete before public launch. External pen test MUST follow later (PT2). SOC 2 Type II MUST be pursued after observation.
- [ ] Privacy / legal artifacts
  - **CMP-9** (`draft`): Launch MUST include: Privacy Policy, Terms of Service, **GDPR-oriented** disclosures/DPA posture as applicable, **cookie/consent banners**, CCPA/CPRA disclosures (may be inside Privacy Policy), and SCC-related disclosures for US processing of EU data. Advertising on free tier MUST only run under recorded consent where required.
- [ ] Data subject rights
  - **CMP-10** (`draft`): Users MUST be able to delete their account and export their data in v1.
- [ ] Advertising / consent
  - **CMP-12** (`draft`): First-party product analytics events MUST be limited to funnel/engagement steps needed for product decisions; financial transaction contents MUST NOT be used as analytics properties. Consent/notice MUST cover analytics as required by GDPR/CCPA posture.

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

- [ ] Expected volume
  - **CAP-1** (`draft`): Launch volume is **unknown**; plan using cost-estimate scenarios S0–S1 until measured.
- [ ] Forecasting and growth planning
  - **CAP-2** (`draft`): Usage/cost MUST be reviewed **weekly** by the sole developer (alongside cost review).
- [ ] Quotas and limits
  - **CAP-3** (`draft`): Before public launch, a **quota sanity check** MUST cover Lambda concurrency, API Gateway, Cognito, and SES production access (B3); raise only if defaults are insufficient.
- [ ] Autoscaling per environment
  - **CAP-4** (`draft`): Autoscaling MUST use the same serverless/on-demand model across environments; no env-specific ASG policies.
- [ ] Growth projections
  - **CAP-5** (`draft`): No fixed quarterly/yearly growth projection is required for v1 architecture.
- [ ] Buffer / overprovisioning
  - **CAP-6** (`draft`): Capacity buffer MUST be **none** — on-demand only.
- [ ] Underutilization handling
  - **CAP-7** (`draft`): Underutilization MUST be reviewed during the weekly cost review; remove unused paid extras if any appear.

---

## 15. Compute Needs

- [ ] Compute profile
  - **CPU-1** (`draft`): Interactive API workloads are **I/O-bound** (DynamoDB, Cognito, Plaid, Stripe). Realtime fan-out is connection/message-bound via API Gateway WebSocket. GPU MUST NOT be required.
- [ ] Compute platform
  - **CPU-2** (`draft`): HTTP BFF MUST run on **AWS Lambda + API Gateway HTTP API**. Realtime MUST use **API Gateway WebSocket API + Lambda** (A-full). Always-on containers MUST NOT be required for v1.
  - **CPU-2a** (`draft`): The PWA MUST be a **static SPA** hosted on **S3 + CloudFront** (private bucket + OAC). SSR MUST NOT be required for v1. Hosting MUST be managed via the same CDK app family as the API (not Amplify Hosting / Vercel / Netlify for v1).
- [ ] OS / runtime dependencies
  - **CPU-3** (`draft`): API and job runtimes MUST be **Node.js** with **TypeScript**. The PWA MUST be **TypeScript**. Shared request/response types MUST live in a **shared schemas/types package** consumed by API and client. No separate OS dependency beyond the Lambda Node runtime.
- [ ] Existing compute estate / migration
  - **CPU-4** (`draft`): No existing compute estate constrains v1 (greenfield).
- [ ] Instance type needs
  - **CPU-5** (`draft`): Specialized instance types MUST NOT be required for v1.
- [ ] Licensing
  - **CPU-6** (`draft`): No Windows/Oracle-style license constraints for compute. Apple Developer Program cost for Sign in with Apple is separate from compute.
- [ ] GPU
  - **CPU-7** (`draft`): GPU compute MUST NOT be required for v1.
- [ ] Workload shape
  - **CPU-8** (`draft`): Workloads MUST include: request/response HTTP (BFF), WebSocket connect/message/disconnect, **Plaid webhooks**, Stripe webhooks, SES sends, **EventBridge-scheduled** Lambda for the daily **orphan/retry sweeper (HP1)** and **daily Frankfurter → DynamoDB FX refresh**, and paid over-budget email alerts as designed. Plaid MUST NOT require a scheduled catch-up job in v1.
  - **CPU-9** (`draft`): Occasional Lambda cold starts are acceptable for v1; mitigation MAY be deferred until measured.
  - **CPU-10** (`draft`): Household invites MUST be delivered by **email** and by **in-app WebSocket** (`invite.received`) when the invitee is connected. Plaid sync MUST notify `plaid.sync.completed` or `plaid.sync.failed` over the same WebSocket channel within **1–2 seconds** while connected; HTTP status poll MAY be used as fallback. Live multi-user editing MUST NOT be required for v1.
  - **CPU-11** (`draft`): Account deletion MUST use pattern **HP1**: immediate external cleanup + **immediate hard delete** of user-owned data (no soft-delete / TTL delay). Item deletes MUST hard-delete immediately. Daily EventBridge sweeper MUST only retry/orphan-clean partial failures.

---

## 16. Data Needs and Databases

- [ ] Data types managed
  - **DATA-1** (`draft`): The system MUST manage transactional consumer finance data: users/profiles, budgets/expenses (manual), recurring planned items, categories, household membership, Plaid transactions/balances (paid), subscriptions/entitlements, consent/ad preferences.
- [ ] Consistency / availability / partition tolerance
  - **DATA-2** (`draft`): Under partition/conflict, the system MUST use **strong consistency** for session/entitlement checks, single-item get-before-edit, and household membership reads; **eventually consistent** reads are acceptable for list/calendar queries (**D2-A**). Conflicting edits MUST resolve with **condition expressions / optimistic concurrency** (see DATA-5); silent last-write-wins without version checks MUST NOT be the default for user-edited entities.
- [ ] Database paradigm
  - **DATA-3** (`draft`): Primary datastore MUST be **Amazon DynamoDB** (on-demand billing preferred for cost + scale unless later changed).
- [ ] Multi-region database replication / failover
  - **DATA-4** (`draft`): Database multi-region replication/failover MUST NOT be required for v1 (`us-east-1` only).
- [ ] Update frequency and concurrency
  - **DATA-5** (`draft`): Household entities MUST support on the order of **≤ ~5 concurrent writers**. Updates to user-edited items MUST use **optimistic concurrency** (version attribute + DynamoDB condition expressions); conflicts MUST return **409** (or equivalent) so the client can refresh (**D5-A**). CRDTs and pessimistic locks MUST NOT be required for v1.
- [ ] Analytics / BI
  - **DATA-6** (`draft`): Product analytics in v1 MUST be **first-party only (A1)**: funnel/step events stored in the app’s own systems (e.g. DynamoDB and/or CloudWatch metrics), using internal user ids—not raw emails. MUST NOT send bank amounts, transaction memos, or other financial payload contents to third-party analytics. Third-party product analytics SaaS MUST NOT be required for v1 (MAY be added later without redesigning event names if kept stable).
- [ ] Legacy database migration
  - **DATA-7** (`draft`): Legacy data migration MUST NOT occur (greenfield).
- [ ] Access patterns
  - **DATA-8** (`draft`): Calendar MUST present a **combined timeline** of manual items and Plaid transactions for paid/Plaid users; **free users MUST see manual (and recurring) items only**.
  - **DATA-9** (`draft`): Recurring items MUST be stored as rules and **expanded on read** (not materialized as occurrence rows).
  - **DATA-10** (`draft`): Users MUST select a display **currency**. **Paid** users MUST support **multi-currency with indicative live FX** via **Frankfurter**, refreshed into **DynamoDB daily** (EventBridge → Lambda). Rates are **daily indicative**, not trade-execution quotes; UI MUST expose `ratesAsOf`. PWA MAY cache rates locally but MUST NOT tie that cache to the 30-day auth session; local FX cache MUST expire when `ratesAsOf` changes or within **24 hours**, whichever comes first.
  - **DATA-11** (`draft`): Plaid products in v1 MUST include **Transactions** and **Balances**.
  - **DATA-15** (`draft`): Machine-to-machine / public **API access for end users MUST NOT** be in scope for v1.
  - **DATA-16** (`draft`): Redis MUST NOT be required for FX caching in v1.
  - **DATA-12** (`draft`): After a validated account-deletion request, the system MUST **immediately** perform external cleanup (Cognito, Plaid, Stripe, sessions) and **immediately hard-delete** user-owned primary data and attachments (**HP1**). A **daily EventBridge → Lambda** sweeper MUST retry/orphan-clean failed cleanups only. Soft-delete/TTL tombstones MUST NOT be used for user-initiated deletes. Backup residual retention (weekly on-demand backup) MUST be documented in privacy disclosures.
  - **DATA-13** (`draft`): Transactional email (magic link, household invites) MUST use **Amazon SES**.
  - **DATA-14** (`draft`): Paid Plaid automatic sync MUST be **webhooks only** (no scheduled catch-up cron in v1). A **manual sync** control MUST remain obvious. If webhook delivery/processing is unhealthy, the system MUST inform the user and MUST raise **CloudWatch** alerts for operator visibility.

---

## 17. Session and State Management

- [ ] Persist sessions across services / deployments
  - **SESS-1** (`draft`): Authenticated sessions MUST survive redeploys and MUST work across API instances without sticky sessions.
- [ ] State management mechanism
  - **SESS-2** (`draft`): Auth MUST use a **BFF pattern** with an **HttpOnly secure cookie** session (not browser-accessible access tokens as the primary session mechanism).
- [ ] Session affinity
  - **SESS-3** (`draft`): Sticky sessions MUST NOT be required.
- [ ] Cross-region session persistence
  - **SESS-4** (`draft`): Cross-region session persistence MUST NOT be required for v1.
- [ ] Server-side vs client-side state
  - **SESS-5** (`draft`): Auth session MUST be server-issued (BFF cookie); UI calendar state MAY be client-side; durable domain data MUST be server-side in DynamoDB.
- [ ] Session retention
  - **SESS-6** (`draft`): Session absolute lifetime MUST be **30 days**. Idle timeout MUST NOT be required for v1 (absolute expiry only unless later added).
- [ ] Shared session store
  - **SESS-7** (`draft`): Session payload MAY be carried in an encrypted cookie and/or referenced server-side; a separate Redis session store MUST NOT be required for v1 unless later justified. Per-user **session epoch** (or equivalent) in DynamoDB MUST support revoke-all and selective invalidation.
- [ ] Anonymous sessions / revoke
  - **SESS-8** (`draft`): Anonymous sessions MUST NOT be required for v1. **Log out everywhere** (revoke all sessions) MUST be supported. Normal new login MUST NOT invalidate other sessions. Sensitive security events (e.g. MFA enable, account recovery, email/IdP change, explicit secure-account action) MUST invalidate other sessions. UX MAY show “signed in elsewhere” with one-tap revoke.

---

## Capture log

| ID | Status | Owner | Resolve by | Notes |
|----|--------|-------|------------|-------|
| STO-6 | draft | you | — | PITR off but supported; weekly on-demand keep 1; restore once pre-launch |
| MON-3, MON-5, MON-9 | draft | you | — | SNS→email; CloudWatch; Plaid webhook alarms |
| SESS-6..8 | draft | you | — | 30d absolute; revoke-all; hybrid (C) invalidation |
| DNS-1..7 | draft | you | — | D3 app.+gateway.; domain TBD |
| Step 4 | mostly draft | you | — | Compute/hosting/jobs/backups/DNS/sessions locked |
| Step 5 | mostly draft | you | — | Perf/scale/cost/resilience/DR/monitoring largely locked |
| Ads / CMP-11 | draft | you | — | Launch-day ads; Google first; N3 swappable adapters |
| AUTH-4..6, CX-5 | draft | you | — | E1 local+one AWS; version tags from main; OIDC; R1 audit |
| HP1 deletes | draft | you | — | No soft-delete; immediate hard purge on account delete |
| CMP-2, CMP-6 | draft | you | — | A2+ audit events 30d; C0 no Config/SCPs |
| CMP-7, SEC-8 | draft | you | — | F2 CloudTrail+audit+request ID; R90 secret review |
| DATA-2, DATA-5 | draft | you | — | D2-A strong where auth/edit; D5-A OCC + 409 |
| Batch A + M1 | draft | you | — | STO-2/NET/CX-4/SEC-4/ORG soft; AUTH-1 M1 matrix |
| DNS-8 | deferred | you | later | IPv4 only for v1; IPv6 optional later |
| CMP-1a Stripe | draft | you | — | S1 Checkout + Customer Portal; webhooks drive entitlements |
| Requirements walk-through | draft-complete | you | — | Open IDs resolved or deferred; promote to accepted when ready |

---

## How we will fill this out

1. Work in the **recommended fill order** above — do not jump to compute/storage until org, compliance, security, auth, and data are drafted.
2. Turn each answer into an **accepted** SHALL/MUST statement; never leave implied defaults.
3. If you do not know, set status `unknown`, assign an **owner**, and a **resolve-by** date in the capture log.
4. Architecture and implementation start only after critical IDs in Compliance, Security, Auth, Data, and Compute are `accepted` (or explicitly deferred with owner + date).
