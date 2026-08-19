# Product and Security Requirements

Required SHALL/MUST statements for **Balance v1**. Describes **what the product must do** and **what security, privacy,
and operations must guarantee**.

All IDs below are `accepted` except explicitly deferred items (see capture log).

## Cross-cutting (answer first)

- [x] Problem and audience
  - **CX-1** (`accepted`): The product SHALL help consumers in the **United States, Canada, and the EU** track budgets,
    expenses, and spending in one place.
- [x] First-release scope boundary
  - **CX-2** (`accepted`): The first release MUST include:
    1. Public consumer signup and authenticated login (anyone can sign up without assistance) for users in the US,
       Canada, and EU.
    2. An installable website (Progressive Web App (PWA)); no native iOS/Android app required for v1.
    3. A current-month **calendar** as the primary view, with a side or top bar showing: (a) account balances for
       Plaid-synced accounts (paid), and (b) **net income** for the current calendar month (free; available without
       Plaid from manual and repeating items).
    4. Manual expense/budget entry (free).
    5. Repeating planned items such as rent and paycheck (free).
    6. Category caps: free MUST allow at most **10** categories; paid MUST allow **unlimited** categories.
    7. Free users MUST NOT link bank accounts via Plaid at all.
    8. Paid users MUST be able to use Plaid bank transaction sync, see synced account balances, and use **Plaid
       auto-categorization**.
    9. Shared household budgets as a paid feature with full invite/share UX and a multi-user data model in v1.
       Household invites MUST notify via **email** and **in-app live notice** when the invitee has the app open.
    10. Stripe-paid subscription from day one, including a **7-day trial** of paid features: trial MUST start when the
        account **hits a paid gate** (**T2**); **card on file REQUIRED** to start trial (**C1**); on trial end MUST
        **auto-convert to paid** with clear consent / Terms of Service (ToS) (**E1**); **one trial per account ever**.
    11. Advertising to monetize **free** accounts only (paid subscribers MUST NOT see ads), with General Data Protection
        Regulation (GDPR)-compliant consent / cookie banners. **Live ads MUST work on public launch day.** The first ad
        provider MUST be **Google**; the ad network MUST remain **replaceable in configuration** (swap the provider
        without rewriting the website UI).
    12. In-app live notices for at least Plaid sync completed/failed and household invite received (target delivery
        **within 1–2 seconds** while the app is open). Plaid sync UI MUST show a loader until done/failed. Live
        collaborative editing MUST NOT be required for v1.
    13. Additional **v1 paid** capabilities: Comma-Separated Values (CSV) export; over-budget email alerts;
        reports/charts beyond the calendar; expense attachments/receipts; **multi-currency with live Foreign Exchange
        (FX) conversion**.
    14. The website Application Programming Interface (API) MUST be used only by the **first-party PWA** (plus signed
        vendor webhooks); it MUST NOT be a public or third-party API product.
  - **CX-3** (`accepted`): The first release MUST NOT include investments or net-worth tracking. Native mobile apps are
    out of v1 (PWA only). Public/third-party API access is out of v1.
- [x] Cloud and account model
  - **CX-4** (`accepted`): The product MUST run on Amazon Web Services (AWS) for v1. Production infrastructure MUST be
    defined in code (not assembled by clicking in the console). One AWS account MUST NOT hold both staging and
    production. Multi-account AWS Organizations MUST NOT be required for v1 (deferred until revenue or a team warrants
    it). The website and API MUST be released from the **same** infrastructure project (not a separate hosted-frontend
    vendor).
- [x] Environments and promotion
  - **CX-5** (`accepted`): Environments MUST be **local development** + **AWS staging** + **AWS production** (separate
    accounts). Production deploys MUST be driven by **version tags** (`v`\*) on commits reachable from `main`. Merges
    to `main` MUST deploy to **staging**. Pull requests MUST run Continuous Integration (CI) only (no deploy).
- [x] Ownership
  - **CX-6** (`accepted`): The sole developer SHALL build, deploy, operate, and support the product.
- [x] Hard constraints
  - **CX-7** (`accepted`): There is no hard deadline. The product MUST run on AWS, MUST prefer the lowest-cost
    architecture that meets these requirements, and MUST remain able to scale for future demand.
- [x] Third-party dependencies
  - **CX-8** (`accepted`): The product MUST integrate with **Plaid** for paid bank linking/sync/balances, **Stripe** for
    subscriptions/trial/gating, **transactional email** for magic links and household invites, **Frankfurter** for
    indicative FX, and **Google + Apple login** plus a **passwordless magic-link email**. Free accounts MUST be blocked
    from Plaid link. When Plaid or Stripe is unavailable, the product MUST show an error only.
- [x] Requirements-complete definition
  - **CX-9** (`accepted`): All checklist IDs in this file are `accepted` (except explicitly deferred items such as
    DNS-8 IPv6). Implementation planning MAY proceed.
  - **CX-10** (`accepted`): Billing trial MUST: start at first paid-feature gate; require card; auto-convert to paid
    after 7 days per consented ToS; allow **at most one trial per account**.

---

## 1. Organization-Based Strategies

- [x] Key business goals and how this workload supports them
  - **ORG-1** (`accepted`): The product SHALL give consumers a single place to track budgets, expenses, and spending —
    calendar-first installable website, with public self-serve signup.
  - **ORG-2** (`accepted`): Success of the first release SHALL include that a stranger can sign up and get value without builder intervention. Additional quantitative Key Performance Indicators (KPIs) for v1 (deferred).
- [x] Organizational standards or mandates
  - **ORG-3** (`accepted`): There are no enterprise organizational mandates beyond: AWS-only, cost-minimizing, and
    scalable for future demand.
- [x] Primary stakeholders and decision-makers
  - **ORG-4** (`accepted`): The sole developer SHALL be the decision-maker for architecture, budget, and product scope.
- [x] Existing enterprise architectures or patterns
  - **ORG-5** (`accepted`): The solution is new (no existing company AWS setup); it MUST NOT be required to align with
    pre-existing enterprise architecture patterns.
- [x] Dependencies on other internal systems or business units
  - **ORG-6** (`accepted`): The product MUST NOT depend on other internal systems or business units.
- [x] Timelines or milestones
  - **ORG-7** (`accepted`): No fixed milestone dates are defined.
- [x] Future plans that could impact this workload
  - **ORG-8** (`accepted`): Architecture MUST preserve the ability to scale for future demand and MUST implement a
    multi-user budget data model with invite/share for paid household budgets in v1. Quantitative “future demand”
    targets MUST NOT be required for v1 (deferred).

### Free vs paid (v1)

| Capability                                      | Tier                             | Notes                                                                       |
| ----------------------------------------------- | -------------------------------- | --------------------------------------------------------------------------- |
| Public signup + login                           | Free                             | US + Canada + EU                                                            |
| PWA (web + installable)                         | Free                             | No native apps in v1                                                        |
| Current-month calendar                          | Free                             | Primary view                                                                |
| Manual expense/budget entry                     | Free                             |                                                                             |
| Repeating planned items                         | Free                             |                                                                             |
| Net income (current month) in balances bar      | Free                             | Works without Plaid                                                         |
| Ads (with consent where required)               | Free tier only                   | Paid MUST NOT see ads; launch-day live ads; **Google** first; swappable     |
| Category caps                                   | Free ≤ 10; **unlimited on paid** |                                                                             |
| Plaid auto-categorize                           | Paid                             |                                                                             |
| CSV export                                      | Paid                             |                                                                             |
| Over-budget email alerts                        | Paid                             |                                                                             |
| Reports/charts beyond calendar                  | Paid                             |                                                                             |
| Attachments / receipts on expenses              | Paid                             | Files, not rows in the budget record                                        |
| Multi-currency with indicative FX (Frankfurter) | Paid                             | Daily indicative rates; UI MUST show when rates were fetched                |
| Link bank accounts (Plaid)                      | Paid                             | Free users cannot link at all                                               |
| Plaid sync + synced account balances in bar     | Paid                             |                                                                             |
| Shared household budgets (invite/share UX)      | Paid                             | Full functionality in v1                                                    |
| 7-day trial of paid features                    | Trial                            | Starts at paid gate; card required; auto-convert; **one trial per account** |

### Paid-feature candidates

| Candidate                                       | v1 status                    |
| ----------------------------------------------- | ---------------------------- |
| Unlimited categories                            | **v1 paid**                  |
| Plaid auto-categorization                       | **v1 paid**                  |
| CSV export                                      | **v1 paid**                  |
| Over-budget email alerts                        | **v1 paid**                  |
| Reports/charts beyond calendar                  | **v1 paid**                  |
| Attachments/receipts                            | **v1 paid**                  |
| Multi-currency with indicative FX (Frankfurter) | **v1 paid**                  |
| API access                                      | **Not in v1** — website only |
| Investments / net worth                         | **Never for v1** (CX-3)      |

---

## 2. Security

- [x] Security and privacy requirements
  - **SEC-1** (`accepted`): Sensitive data MUST include:
    - Account/profile personal data (e.g. email, display name)
    - Authentication secrets and session material (magic-link tokens, session cookies/tokens)
    - Budget/expense records and category data
    - Household membership and invite tokens
    - Plaid access tokens; bank transaction and balance data from Plaid
    - Stripe customer/subscription identifiers
    - Advertising/consent records (cookie consent choices, ad IDs / click identifiers if used)
    - Security and access audit logs
    - IP address and user-agent in logs (with retention limits)
    - Magic-link and household-invite email/token material (must not be over-retained in logs)
    - Analytics events (page views, signup and usage steps) if analytics is enabled
    - Approximate location derived from IP if used for ads or fraud
    - Support tickets / contact messages if support is offered
    - Device push endpoints if PWA push is enabled
  - **SEC-2** (`accepted`): Data in transit MUST use Transport Layer Security (TLS). Data at rest MUST be encrypted.
    Customer-managed encryption keys MUST NOT be required for v1 unless a later requirement demands them.
  - **SEC-3** (`accepted`): All application data for v1 MUST be stored and processed in a **single AWS region
    (**`us-east-1`**)**. Multi-region MUST NOT be required for v1. EU personal data transfers MUST rely on **Standard
    Contractual Clauses (SCCs)** and privacy disclosures.
- [x] Identity and access management approach
  - **SEC-4** (`accepted`): End-user auth MUST support social login and passwordless magic link. Multi-Factor
    Authentication (MFA) MUST be available as a profile setting (not mandatory for all accounts at signup). Operator
    access MUST be the **sole developer** via AWS console / Single Sign-On (SSO) plus a **short-lived GitHub deploy
    role** (AUTH-6); contractors MUST NOT have standing production access. A documented break-glass admin path for the
    sole operator is acceptable for v1.
- [x] Threat models or known risks
  - **SEC-5** (`accepted`): A **Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of
    privilege (STRIDE) threat model** MUST exist for v1. Design and reviews MUST address the threats in that model; the
    model MUST be updated when major features ship.
- [x] Centralized vs decentralized security controls
  - **SEC-6** (`accepted`): Security controls MUST live in the **single production AWS account** for v1 — not a
    multi-account organization policy model (**C1**).
- [x] Vulnerability management and patching
  - **SEC-7** (`accepted`): Findings from Static Application Security Testing (SAST) / Software Composition Analysis
    (SCA) / Dynamic Application Security Testing (DAST) MUST be triaged with Service Level Agreement (SLA)
    **Critical/High ≤ 7 days** (fix or recorded risk-accept); **Medium ≤ 30 days**. Dependency and runtime updates MUST
    follow the same spirit when advisories apply. Patching for v1 means dependency/runtime updates (no self-managed
    server fleet).
- [x] Secrets management
  - **SEC-8** (`accepted`): Secrets MUST be encrypted at rest and MUST NOT be committed to source control. Secrets MUST
    be **reviewed at least every 90 days** (**R90**) — confirm still needed and rotate when the vendor supports it or
    after any suspected leak. Immediate rotation MUST occur on suspected compromise regardless of cadence.
- [x] Security assessments / penetration testing
  - **SEC-9** (`accepted`): Before public launch, the sole developer MUST complete a **self security assessment using
    maintained open-source tools** (at least **Open Web Application Security Project (OWASP) ZAP** and/or **Nuclei**,
    plus manual checks for auth/session, webhooks, and paid-feature gates), with findings tracked to remediation. An
    **external penetration test** MUST be scheduled for a **later phase** (e.g. before System and Organization Controls
    2 (SOC 2) Type II or when revenue allows) — not a gate on first public launch (**PT2**). Marketing MUST NOT claim an
    **external penetration test** until that engagement completes.
  - **SEC-9a** (`accepted`): The project MUST run **SAST** and **DAST** using open-source tooling:
    - **SAST:** **Semgrep** on TypeScript/Node (additional maintained open-source SAST MAY be added).
    - **DAST:** **OWASP ZAP** and/or **Nuclei**.
    - **SCA:** **npm audit** plus **Trivy** or **OSV-Scanner**.
    - **Cadence (C1, refined):** SAST and SCA on **every pull request targeting** `main`; DAST **weekly** and **before
      public launch**.
    - **DAST targets:** **local or short-lived**, **staging**, and **production**, with a **strict safe ruleset** on
      production (non-destructive checks only).
    - Findings MUST be triaged; launch-blocking severities MUST be remediated or explicitly risk-accepted by the sole
      developer with a recorded rationale.
- [x] Mandated AWS security services
  - **SEC-10** (`accepted`): Before public launch the account MUST run **unused-permission findings** and **threat
    detection** (workshop code **S3**). Those controls MAY be **off in early development**. Continuous account-config
    recording and a security-findings hub MUST NOT be required for v1 unless later added.

### Degraded third-party behavior

- **CX-8a** (`accepted`): When Plaid or Stripe is unavailable, the product MUST **show an error only** (no read-only or
  cached fallback required for v1).

---

## 3. Storage Needs

- [x] Types of data stored
  - **STO-1** (`accepted`): The product MUST persist user profiles, budgets, expenses, repeating rules, categories,
    household membership, paid-plan status, consent records, and (for paid users) bank-linked transactions and balances.
    Operational logs MUST exist for debugging. Receipt photos and the website files MUST be stored as **files**,
    separate from those records.
- [x] Durability, availability, latency
  - **STO-2** (`accepted`): Primary records MUST survive loss of one Availability Zone (AZ) in the region (managed
    copies, not a custom copy scheme). Interactive calendar reads MUST align with the soft target in PERF-5 (after the
    API is warm, 95th percentile under 1 second). No additional custom latency Service Level Agreement (SLA).
- [x] Access frequency (hot / warm / cold)
  - **STO-3** (`accepted`): Interactive calendar and user data MUST be treated as **used constantly**. Detailed **logs
    MUST be retained 7 days** for v1 (cost control). Compact **audit events** MUST be retained **30 days** (AUTH-5).
- [x] Retention and archival
  - **STO-4** (`accepted`): User-initiated deletes MUST **remove data immediately** (no “marked deleted, remove later”
    flow for app data). Account deletion MUST **immediately purge** user-owned primary data (see DATA-12). Backup
    residual retention MUST still be disclosed.
- [x] Storage modality
  - **STO-5** (`accepted`): Primary records MUST live in a **managed database**. Website files and paid receipt photos
    MUST live in **file storage** served to browsers without exposing the files as a public dump. A disk attached to a
    server MUST NOT be required for v1 app data. Paid attachments MUST be deleted when the owning expense or account is
    purged.
- [x] Backup
  - **STO-6** (`accepted`): The database MUST **support restore to any second in a window** (Point-in-Time Recovery
    (PITR)) but that capability MUST be **off for v1**. Active v1 backups MUST be **weekly**, retaining **1** backup
    (replace each week). A **restore test MUST run once before public launch**. Privacy disclosures MUST describe
    residual retention for that backup. Turning PITR on later MUST be a configuration change, not a rewrite.
- [x] Cross-region replication / multi-AZ
  - **STO-7** (`accepted`): Storage MUST use managed multi-AZ behavior in `us-east-1`. Copies in a second region MUST
    NOT be required for v1.
- [x] Deletion and lifecycle
  - **STO-8** (`accepted`): User-initiated delete of an expense/item MUST **remove the record immediately**. Account
    deletion MUST follow **HP1**: immediate external cleanup (login provider / Plaid / Stripe / sessions) + **immediate
    removal** of user-owned records and attachment files, plus a **daily retry** only for leftover partial failures.
    Backup residual retention MUST be disclosed.

---

## 4. Monitoring and Alerting

- [x] Operational metrics
  - **MON-1** (`accepted`): The product MUST emit operational metrics for: API latency and error/5xx rates (including
    calendar load), compute errors/throttles, database throttles, live-notice failures, Plaid webhook failures, backup
    job success/fail, and email bounce/complaint rates — enough to drive alarms and an operator dashboard.
- [x] Incident response process
  - **MON-2** (`accepted`): Solo incident process: **Sev1** = login/calendar down or data-loss risk; **Sev2** =
    Plaid/Stripe/email degraded; **Sev3** = ads/FX/non-critical. The sole developer receives email and owns response; no
    on-call rotation.
- [x] Alert recipients and channels
  - **MON-3** (`accepted`): Operational alerts (including Plaid webhook health, backup failures, API 5xx spikes, compute
    throttles, database throttles) MUST go to the sole developer via **email**.
- [x] Centralized observability
  - **MON-4** (`accepted`): Multi-team centralized observability MUST NOT be required (single operator). One AWS-native
    logs/metrics/alarms system is enough.
- [x] Required observability tooling
  - **MON-5** (`accepted`): v1 MUST use AWS-native logs, metrics, and alarms. Extra paid tracing products MUST NOT be
    required for v1.
- [x] Service Level Indicators (SLIs) and Service Level Objectives (SLOs)
  - **MON-6** (`accepted`): Soft Service Level Indicator (SLI) / Service Level Objective (SLO): current-month calendar,
    after the API is warm, 95th percentile under 1 second (PERF-5). No hard customer-facing availability SLO for v1.
- [x] Dashboards
  - **MON-7** (`accepted`): One operator dashboard MUST show API 5xx/latency, compute errors/throttles, Plaid webhook
    health, and backup job status.
- [x] Alert noise handling
  - **MON-8** (`accepted`): Alarms MUST prefer sustained conditions (e.g. multi-minute windows) over single datapoints to
    limit false positives. Channel is email only for v1.
- [x] Plaid webhook health
  - **MON-9** (`accepted`): Alarms MUST fire when Plaid webhook processing is unhealthy (e.g. elevated 4xx/5xx or
    failure rate). In-app messaging MUST inform users when webhook sync is having issues.

---

## 5. Resilience

- [x] Multi-AZ / multi-region
  - **RES-1** (`accepted`): The product MUST run in a **single region (**`us-east-1`**)** using **AWS-managed multi-AZ** for
    the API, database, and website files. Two live regions MUST NOT be required for v1.
- [x] Application state during failover
  - **RES-2** (`accepted`): In-region failover MUST NOT require pinning a user to one server. Lasting data MUST live in
    the database; login MUST work on any API instance (cookie plus a per-user session version). Local compute memory
    MUST be treated as thrown away after each run.
- [x] Critical downstream dependencies
  - **RES-3** (`accepted`): Critical dependencies include login, the database, the API, the website files, Plaid, Stripe,
    and transactional email. On Plaid/Stripe failure the app MUST show **errors only**. Login/database/API outage MUST
    **stop signed-in features** rather than show stale data.
- [x] Resilience / failure-mode testing
  - **RES-4** (`accepted`): Before public launch, a **simple failure drill (R2)** MUST be run (e.g. local/prod-safe
    failure, webhook failure, backup restore path). Ongoing automated chaos testing MUST NOT be required for v1.
- [x] Downtime / degradation tolerance
  - **RES-5** (`accepted`): For disaster-class events, maximum acceptable recovery time MUST align with **Recovery Time
    Objective (RTO) ≤ 12 hours** (how long restore may take). Routine short faults MAY show clear errors without a
    pledged uptime SLA.
- [x] Critical failure scenarios
  - **RES-6** (`accepted`): The product MUST have a documented recovery path for: in-region service impairment (rely on
    AWS), database loss/corruption (backup restore), and full **regional** impairment.
- [x] Automatic vs manual failover
  - **RES-7** (`accepted`): In-region failover MUST be **automatic** (managed AWS). Regional disaster recovery MUST be
    **manual**, declared and executed by the sole developer.

---

## 6. Disaster Recovery (DR) and Business Continuity (BC)

- [x] Recovery Time Objective (RTO) and Recovery Point Objective (RPO)
  - **DR-1** (`accepted`): **Recovery Point Objective (RPO)** — how much data may be lost — MUST be up to ~**7 days**
    for v1 (weekly backup, retain 1; PITR off). **RTO** MUST be ≤ **12 hours** for regional recovery when the sole
    developer is available.
- [x] DR strategy
  - **DR-2** (`accepted`): Disaster recovery MUST be **restore from backup with nothing running in a second region
    (cold / S1)** — no small always-on spare or half-running spare required for v1.
- [x] Always-available business-critical systems
  - **DR-3** (`accepted`): During a regional disaster, no capability is required to stay online. After restore, priority
    MUST be **login + calendar** read/write first; Plaid, Stripe, ads, FX, reports, and attachments MAY lag.
- [x] DR plan testing
  - **DR-4** (`accepted`): A database **restore test MUST run once before public launch**. An **annual** restore drill
    MUST run thereafter, owned by the sole developer.
- [x] Critical business hours
  - **DR-5** (`accepted`): Availability MUST be treated as **24/7 best-effort** with no customer-facing uptime SLA for
    v1.
- [x] Standby posture
  - **DR-6** (`accepted`): Standby MUST be **cold** (no warm or hot spare) for v1.
- [x] Third parties in DR
  - **DR-7** (`accepted`): DR planning MUST document login, Plaid, Stripe, email, Frankfurter, and Google ads; when they
    are down the app MUST show an error, offer manual sync, or show a dated currency rate as applicable. Regional AWS
    loss MUST follow the same cold restore path as DR-2.
- [x] Declaration and authority
  - **DR-8** (`accepted`): The sole developer SHALL declare a disaster and SHALL authorize regional recovery actions.

---

## 7. Performance

- [x] Startup / cold-start requirements
  - **PERF-1** (`accepted`): Occasional slow first API run after idle is acceptable for v1; keeping functions warm MAY
    be deferred until measured. Soft latency targets below **exclude** that first-run delay.
- [x] Known pain points to design against
  - **PERF-2** (`accepted`): Design MUST watch turning repeating rules into calendar days on load, and a month of Plaid
    transactions in one query, as primary risk areas. No other known pain points recorded yet.
- [x] Benchmarking baseline
  - **PERF-3** (`accepted`): Formal competitor benchmarking MUST NOT be required for v1.
- [x] Acceptable vs unacceptable performance
  - **PERF-4** (`accepted`): Current-month calendar load is unacceptable if, after the API is warm, the 95th percentile
    regularly exceeds the soft target in PERF-5.
- [x] Latency and throughput
  - **PERF-5** (`accepted`): Current-month calendar load MUST target, after the API is warm, **95th percentile under 1
    second** (soft target; first-run-after-idle excluded). Explicit throughput targets beyond managed autoscaling
    defaults MUST NOT be required for v1 (deferred until measured load).
- [x] Peak usage and SLAs
  - **PERF-6** (`accepted`): No customer-facing hard latency SLA for v1 beyond soft internal targets. Live invite/Plaid
    completion notice MUST remain within **1–2s** while the app is open (already locked).
- [x] How performance is measured
  - **PERF-7** (`accepted`): Performance MUST be measured via API latency metrics and **CI performance tests** for
    critical paths in v1.

---

## 8. Scaling

- [x] Usage fluctuation
  - **SCALE-1** (`accepted`): Early load MUST be assumed **idle with slow growth**; quantitative Monthly Active Users
    (MAU) target is **unknown**.
- [x] Scale-out / scale-in triggers
  - **SCALE-2** (`accepted`): Scaling MUST rely on **managed serverless defaults** — no custom Auto Scaling Group
    (ASG) of servers.
- [x] Horizontal vs vertical scaling
  - **SCALE-3** (`accepted`): Scaling MUST prefer **more small API instances** over bigger servers; raising memory on a
    function MAY be used for latency.
- [x] Behavior at capacity limits
  - **SCALE-4** (`accepted`): Interactive API/user actions at capacity MUST **fail with clear errors** (**L1**).
    Non-critical background work (e.g. email, scheduled cleanup jobs, currency-rate refresh) MAY **retry/queue**
    (**L2**).
- [x] Long-term growth
  - **SCALE-5** (`accepted`): Architecture MUST remain able to scale for future demand without a fixed year-1 MAU
    commitment.
- [x] Per-component scaling policies
  - **SCALE-6** (`accepted`): API, live notices, the database, and website files MUST be able to scale independently.
- [x] Burst traffic
  - **SCALE-7** (`accepted`): No planned marketing burst is required in v1 (**B3**). Before public launch, the sole
    developer MUST perform a **quota sanity check** (API, login, email production access) and raise limits only if
    defaults are insufficient. Interactive overload behavior remains L1; background work remains L2.
- [x] Scale-to-zero
  - **SCALE-8** (`accepted`): The API MUST be allowed to scale to zero (no always-on minimum capacity required for v1).

---

## 9. Cost Optimization

- [x] Budget
  - **COST-1** (`accepted`): Temporary soft alert threshold is **$50/month** AWS spend until a baseline is established;
    soft/hard ceilings MAY be revised after 2–4 weeks of Cost Explorer data.
- [x] Spot / serverless acceptability
  - **COST-2** (`accepted`): The API and jobs MUST run only when needed (serverless). Discounted spare virtual machines
    (Spot) MUST NOT be required for v1 (no virtual-machine web servers).
- [x] Cost monitoring ownership
  - **COST-3** (`accepted`): The sole developer SHALL review cost **weekly** and via **email budget alerts**.
- [x] Tags and budgets
  - **COST-4** (`accepted`): Resources MUST carry tags `Project`, `Env`, `ManagedBy`, `Service`, `Owner`, and
    `DataClassification` where applicable. **AWS Budgets** MUST alert at **$50/month** (temporary) via email.
- [x] Reserved capacity
  - **COST-5** (`accepted`): Savings Plans / Reserved Instances MUST NOT be used for v1.
- [x] Unacceptable cost threshold
  - **COST-6** (`accepted`): AWS spend at or above **$50/month** MUST trigger a budget alert until revised post-baseline.
- [x] Cost governance approver
  - **COST-7** (`accepted`): The sole developer SHALL approve cost exceptions.
- [x] Optimization priority
  - **COST-8** (`accepted`): Until further notice, optimize for lowest steady-state AWS cost while preserving a path to
    scale for future demand.

### Recommended cost allocation tags (v1)

| Tag                  | Example                            | Why                                                |
| -------------------- | ---------------------------------- | -------------------------------------------------- |
| `Project`            | `Balance`                          | Required — rollup                                  |
| `Env`                | `prod` / `dev`                     | Required — separate noise from prod                |
| `ManagedBy`          | `cdk`                              | What was created by code vs clicked in the console |
| `Service`            | `api` / `client` / `data` / `auth` | See which layer costs                              |
| `Owner`              | `solo` or handle                   | SOC 2 / accountability                             |
| `DataClassification` | `sensitive`                        | Marks stores that hold finance or personal data    |

---

## 10. Access, Authorization, and Authentication

- [x] Who needs access and at what level
  - **AUTH-1** (`accepted`): Household budget roles MUST be **Owner**, **Editor**, and **Viewer**, enforced with a
    **hybrid Role-Based Access Control (RBAC) / Attribute-Based Access Control (ABAC)** model (roles plus
    attributes/policies). Permission matrix (**M1**):
    - **Viewer:** view calendar and (when paid) balances; no create/edit/delete.
    - **Editor:** Viewer permissions plus create/edit/delete expenses and manage categories/caps.
    - **Owner:** Editor permissions plus invite/remove members, change roles, delete household / transfer ownership, and
      household billing / Plaid link.
  - **AUTH-1a** (`accepted`): Only a **paid Owner** MUST be able to invite members. Invitees MUST also be **paid**
    members to join a household budget.
- [x] Identity providers
  - **AUTH-2** (`accepted`): End-user identity MUST support **Google** and **Apple** social login. Passwordless **magic
    link MUST be available** (email, not a second identity vendor). MFA MUST be optional via profile settings.
- [x] Least privilege via roles/policies
  - **AUTH-3** (`accepted`): Access MUST be granted with the **smallest permissions that work** (least privilege) using
    hybrid RBAC/ABAC; standing unrestricted admin for end users MUST NOT be allowed.
- [x] Environment separation
  - **AUTH-4** (`accepted`): Login and data stores MUST be separated as **local dev** vs **AWS staging** vs **AWS
    production** (separate accounts). Controls are applied per account; no additional cloud QA account is required for
    v1.
- [x] Access revoke and audit
  - **AUTH-5** (`accepted`): **Log out everywhere** MUST take effect **immediately**. Account deletion MUST purge per
    **HP1**. Compact audit events (login, logout-all, paid-plan changes, household invite/accept/revoke) MUST be
    retained **≥ 30 days**. Verbose app logs remain **7 days**.
- [x] Temporary credentials (Continuous Integration / Continuous Delivery (CI/CD), contractors)
  - **AUTH-6** (`accepted`): CI/CD MUST use **short-lived credentials from GitHub** (**G1**). Long-lived AWS access keys
    for deploy MUST NOT be used. Contractors MUST NOT have standing production access in v1 (solo operator).
- [x] External IdP integration
  - **AUTH-7** (`accepted`): External social Identity Providers (IdPs) for v1 MUST include Google and Apple. Additional
    enterprise IdPs MUST NOT be required for v1.
- [x] MFA
  - **AUTH-8** (`accepted`): MFA MUST be available as a profile setting; MFA MUST NOT be mandatory at signup for v1.
- [x] Machine-to-machine access
  - **AUTH-9** (`accepted`): The HTTP/live-notice API MUST be for the **Balance PWA only**. It MUST NOT be offered as a
    public or third-party developer API. End-user API keys MUST NOT be in scope for v1. Browser calls MUST be
    restricted to the first-party app origin (Cross-Origin Resource Sharing (CORS) allowlist — only listed website
    origins may call the API). Server-to-server webhook endpoints (Plaid, Stripe) are not end-user API access and remain
    in scope.

---

## 11. Connectivity

- [x] Access path (internet / VPN / Direct Connect)
  - **NET-1** (`accepted`): Clients MUST access the product over the **public internet**. A Virtual Private Network
    (VPN) or Direct Connect MUST NOT be required for v1.
- [x] Latency / bandwidth requirements
  - **NET-2** (`accepted`): No special bandwidth or network-path latency requirements beyond public-internet access and
    the soft application latency targets in PERF-5 / live-notice 1–2s.
- [x] Private connectivity between AWS services
  - **NET-3** (`accepted`): Private-only networking (a required Virtual Private Cloud (VPC)) MUST NOT be required for
    v1 unless later mandated.
- [x] Hybrid / on-premises connectivity
  - **NET-4** (`accepted`): Hybrid connectivity to on-premises MUST NOT be required.
- [x] Network segmentation
  - **NET-5** (`accepted`): Network segmentation MUST NOT require a custom VPC / public-private subnet model for v1.
    Access is enforced by **login and Identity and Access Management (IAM)**, not by subnets.
- [x] VPC peering / Transit Gateway
  - **NET-6** (`accepted`): Connecting VPCs together MUST NOT be required for v1.
- [x] Inter-region connectivity
  - **NET-7** (`accepted`): Low-latency inter-region connectivity MUST NOT be required for v1.
- [x] Edge / CDN
  - **NET-9** (`accepted`): Until custom-domain cutover, default AWS hostnames MAY be used for non-production or
    pre-cutover testing. Public launch SHOULD use `app.` / `gateway.` once the domain is purchased and wired (**D3**).

---

## 12. Name Resolution

- [x] Internal vs external DNS
  - **DNS-1** (`accepted`): The product MUST use **external public Domain Name System (DNS)** for the website and API.
    Internal-only DNS MUST NOT be required for v1.
- [x] Custom domains
  - **DNS-2** (`accepted`): Infrastructure MUST be ready for `app.<domain>` (website) and `gateway.<domain>`
    (API and live notices). The root domain name is **undecided** (will be purchased). Until DNS cutover, default AWS
    hostnames MAY be used for development/testing.
- [x] DNS ownership model
  - **DNS-3** (`accepted`): DNS for the product domain MUST be managed by the sole developer (when the domain is
    purchased/connected), defined in code where practical (**D3**: ready in infra, cut over when domain exists).
- [x] Naming conventions / governance
  - **DNS-4** (`accepted`): Hostnames MUST follow `app.<domain>` for the client and `gateway.<domain>` for the API (and
    associated live-notice endpoints as designed).
- [x] Split-horizon DNS (different answers inside a private network vs on the public internet)
  - **DNS-5** (`accepted`): Split-horizon DNS MUST NOT be required.
- [x] DNS provider
  - **DNS-6** (`accepted`): Public DNS MUST be managed in the **same AWS account family** as the rest of the product
    after domain purchase (registrar may be AWS or external with nameservers delegated).
- [x] Health checks and DNS failover
  - **DNS-7** (`accepted`): Multi-region DNS failover MUST NOT be required for v1.
- [x] IP version
  - **DNS-8** (`accepted`): Dual-stack Internet Protocol version 6 (IPv6) MUST NOT be required for v1 (**IPv4 only**).
    IPv6 MAY be added later at domain cutover or after launch.

---

## 13. Compliance

- [x] Regulatory standards
  - **CMP-1** (`accepted`): The product MUST support users in the **United States, Canada, and the EU** for v1, and MUST
    align with **GDPR**, **California Consumer Privacy Act / California Privacy Rights Act (CCPA/CPRA)**, and a path to
    **SOC 2** (Type I at/before public launch; Type II after an observation period).
  - **CMP-1a** (`accepted`): Card payments MUST use **Stripe Checkout** for trial/subscribe and **Stripe Customer Portal**
    for manage/cancel/update payment method (**S1**). Raw card data MUST NOT be stored by this product. Paid-plan status
    MUST update from **Stripe webhooks**. Embedded Stripe Elements MUST NOT be required for v1. Payment Card Industry
    (PCI) scope stays with Stripe.
  - **CMP-1b** (`accepted`): Public launch MUST be preceded by a **documented self open-source security assessment**
    (SEC-9) and a **SOC 2 Type I** report. An **external penetration test** is **deferred (PT2)** and MUST occur before
    or as part of preparing **SOC 2 Type II** (or earlier if budget allows). **SOC 2 Type II** MUST follow after a
    control observation period (not a gate on first public launch). The sole developer MUST confirm with the auditor that
    self-assessment plus Type I is acceptable without a pre-launch external penetration test.
- [x] Audit trails, logging, access reports
  - **CMP-2** (`accepted`): Compact audit events MUST capture at least: login, logout-all, paid-plan changes, household
    invite/accept/revoke, **account delete**, **Plaid link/unlink**, **Stripe subscription changes**, and **failed auth**
    (rate-limited). Retention MUST be **≥ 30 days** (AUTH-5).
- [x] Governance ownership
  - **CMP-3** (`accepted`): The sole developer SHALL own compliance verification (and will engage external auditors and
    penetration testers as needed).
- [x] Data sovereignty / residency
  - **CMP-4** (`accepted`): All v1 data MUST remain in **AWS** `us-east-1`. Transfers of EU personal data MUST be
    covered by **SCCs** and privacy disclosures.
- [x] Internal audits / boards
  - **CMP-5** (`accepted`): No internal audit board. Pre-launch evidence MUST include self open-source assessment + SOC 2
    Type I. External penetration-test evidence MUST be produced per PT2 timing (SEC-9).
- [x] Automated enforcement
  - **CMP-6** (`accepted`): Automated compliance enforcement via **AWS Config / Service Control Policies MUST NOT** be
    required for v1 (**C0**). Controls MUST be enforced via infrastructure-as-code + IAM + documented process.
- [x] Forensic traceability
  - **CMP-7** (`accepted`): Forensic traceability MUST include **account API-call history** (management events),
    **CMP-2 compact audit events** (actor + action + time), and a **request ID** on every API log line so one user
    action can be followed across log lines (**F2**). Distributed tracing MUST NOT be required for v1.
- [x] Timing of compliance evidence
  - **CMP-8** (`accepted`): Self open-source security assessment and SOC 2 Type I MUST complete before public launch.
    External penetration test MUST follow later (PT2). SOC 2 Type II MUST be pursued after observation.
- [x] Privacy / legal artifacts
  - **CMP-9** (`accepted`): Launch MUST include: Privacy Policy, Terms of Service, **GDPR-oriented** disclosures and
    data-processing terms as applicable, **cookie/consent banners**, CCPA/CPRA disclosures (may be inside Privacy
    Policy), and SCC-related disclosures for US processing of EU data. Advertising on free tier MUST only run under
    recorded consent where required.
- [x] Data subject rights
  - **CMP-10** (`accepted`): Users MUST be able to delete their account and export their data in v1.
- [x] Advertising / consent
  - **CMP-12** (`accepted`): First-party product analytics events MUST be limited to signup and usage steps needed for
    product decisions; financial transaction contents MUST NOT be used as analytics properties. Consent/notice MUST cover
    analytics as required by GDPR and CCPA/CPRA.

### Privacy artifacts (accepted direction)

| Artifact                               | v1 status             |
| -------------------------------------- | --------------------- |
| Privacy Policy                         | Required              |
| Terms of Service                       | Required              |
| Cookie / consent banner                | Required (ads + GDPR) |
| CCPA disclosures                       | Required (US users)   |
| GDPR posture (incl. transfer + rights) | Required (EU users)   |

Templates + lawyer review recommended; this document is not legal advice.

---

## 14. Capacity Management

- [x] Expected volume
  - **CAP-1** (`accepted`): Launch volume is **unknown**; plan using low early traffic (on the order of tens to a few
    hundred Monthly Active Users) until measured.
- [x] Forecasting and growth planning
  - **CAP-2** (`accepted`): Usage/cost MUST be reviewed **weekly** by the sole developer (alongside cost review).
- [x] Quotas and limits
  - **CAP-3** (`accepted`): Before public launch, a **quota sanity check** MUST cover API concurrency, login, and email
    production access (B3); raise only if defaults are insufficient.
- [x] Autoscaling per environment
  - **CAP-4** (`accepted`): Autoscaling MUST use the same on-demand model across environments; no env-specific server
    groups.
- [x] Growth projections
  - **CAP-5** (`accepted`): No fixed quarterly/yearly growth projection is required for v1 architecture.
- [x] Buffer / overprovisioning
  - **CAP-6** (`accepted`): Capacity buffer MUST be **none** — on-demand only.
- [x] Underutilization handling
  - **CAP-7** (`accepted`): Underutilization MUST be reviewed during the weekly cost review; remove unused paid extras
    if any appear.

---

## 15. Compute Needs

- [x] Compute profile
  - **CPU-1** (`accepted`): Interactive API work mostly **waits on the database, login, Plaid, and Stripe**. Live
    notices are bound by open connections and messages. Graphics Processing Unit (GPU) MUST NOT be required.
- [x] Compute platform
  - **CPU-2** (`accepted`): The website API MUST run **only when requests arrive** (no always-on containers required for
    v1). Live notices MUST use a **long-lived connection** so the website can receive events without polling (**A-full**).
    The API MUST be consumed by the **first-party PWA** (and vendor webhooks), not as a public API (AUTH-9 / DATA-15).
  - **CPU-2a** (`accepted`): The PWA MUST be a **static Single-Page Application (SPA)** (HTML/JS files, not
    server-rendered pages). Server-Side Rendering (SSR) MUST NOT be required for v1. Website hosting MUST be managed in
    the same infrastructure project as the API (not a separate Amplify / Vercel / Netlify host for v1).
- [x] OS / runtime dependencies
  - **CPU-3** (`accepted`): API and job runtimes MUST be **Node.js** with **TypeScript**. The PWA MUST be **TypeScript**.
    Shared request/response types MUST live in a **shared schemas/types package** consumed by API and client.
- [x] Existing compute estate / migration
  - **CPU-4** (`accepted`): No existing compute estate constrains v1 (new product).
- [x] Instance type needs
  - **CPU-5** (`accepted`): Specialized instance types MUST NOT be required for v1.
- [x] Licensing
  - **CPU-6** (`accepted`): No Windows/Oracle-style license constraints for compute. Apple Developer Program cost for
    Sign in with Apple is separate from compute.
- [x] GPU
  - **CPU-7** (`accepted`): GPU compute MUST NOT be required for v1.
- [x] Workload shape
  - **CPU-8** (`accepted`): Workloads MUST include: request/response HTTP, live-notice connect/message/disconnect,
    **Plaid webhooks**, Stripe webhooks, transactional email, a **daily retry of leftover account-delete work (HP1)**,
    **daily Frankfurter currency-rate refresh**, and paid over-budget email alerts as designed. Plaid MUST NOT require a
    scheduled catch-up job in v1.
  - **CPU-9** (`accepted`): Occasional slow first API run after idle is acceptable for v1; mitigation MAY be deferred
    until measured.
  - **CPU-10** (`accepted`): Household invites MUST be delivered by **email** and by **in-app live notice**
    (`invite.received`) when the invitee is connected. Plaid sync MUST notify `plaid.sync.completed` or
    `plaid.sync.failed` over the same channel within **1–2 seconds** while connected; HTTP status poll MAY be used as
    fallback. Live multi-user editing MUST NOT be required for v1.
  - **CPU-11** (`accepted`): Account deletion MUST use pattern **HP1**: immediate external cleanup + **immediate
    removal** of user-owned data (no delayed “marked deleted”). Item deletes MUST remove the record immediately. A daily
    job MUST only retry leftover partial failures.

---

## 16. Data Needs and Databases

- [x] Data types managed
  - **DATA-1** (`accepted`): The product MUST manage day-to-day consumer finance data: users/profiles, budgets/expenses
    (manual), repeating planned items, categories, household membership, Plaid transactions/balances (paid),
    subscriptions/paid-plan status, consent/ad preferences.
- [x] Consistency / availability / partition tolerance
  - **DATA-2** (`accepted`): Under conflict, the product MUST use **the latest write** for session/paid-plan checks,
    single-item get-before-edit, and household membership reads; **slightly stale** reads are acceptable for
    list/calendar queries (**D2-A**). Conflicting edits MUST resolve with **version checks** (see DATA-5); silent
    last-write-wins without version checks MUST NOT be the default for user-edited entities.
- [x] Database paradigm
  - **DATA-3** (`accepted`): The primary store MUST fit **per-user / per-household calendar access** (keyed lookups, not
    ad-hoc reporting SQL). It MUST stay cheap when idle and scale without a reserved server. Relational reporting MUST
    NOT be required for v1.
- [x] Multi-region database replication / failover
  - **DATA-4** (`accepted`): Database copies in a second region MUST NOT be required for v1 (`us-east-1` only).
- [x] Update frequency and concurrency
  - **DATA-5** (`accepted`): Household entities MUST support on the order of **≤ ~5 concurrent writers**. Updates to
    user-edited items MUST **fail the save if someone else wrote first** (version check); conflicts MUST return **409**
    (or equivalent) so the client can refresh (**D5-A**). Types that merge automatically and locks that block other
    writers MUST NOT be required for v1.
- [x] Analytics / BI
  - **DATA-6** (`accepted`): Product analytics in v1 MUST be **first-party only (A1)**: signup and usage steps stored in
    the product’s own systems, using internal user ids — not raw emails. MUST NOT send bank amounts, transaction memos,
    or other financial payload contents to third-party analytics. Third-party product analytics software MUST NOT be
    required for v1 (MAY be added later without renaming events if names stay stable).
- [x] Legacy database migration
  - **DATA-7** (`accepted`): Legacy data migration MUST NOT occur (new product; no existing users to import).
- [x] Access patterns
  - **DATA-8** (`accepted`): Calendar MUST present a **combined timeline** of manual items and Plaid transactions for
    paid/Plaid users; **free users MUST see manual (and repeating) items only**.
  - **DATA-9** (`accepted`): Repeating items MUST be stored as **rules** and **turned into dates when the calendar
    loads** (not written as a row per occurrence).
  - **DATA-10** (`accepted`): Users MUST select a display **currency**. **Paid** users MUST support **multi-currency with
    indicative live FX** via **Frankfurter**, refreshed **daily**. Rates are **daily indicative**, not trade-execution
    quotes; UI MUST expose `ratesAsOf`. The PWA MAY cache rates locally but MUST NOT tie that cache to the 30-day auth
    session; local FX cache MUST expire when `ratesAsOf` changes or within **24 hours**, whichever comes first.
  - **DATA-11** (`accepted`): Plaid products in v1 MUST include **Transactions** and **Balances**.
  - **DATA-15** (`accepted`): The API MUST NOT be a public product. Interactive clients MUST be the **first-party PWA**
    only. Machine-to-machine / public **API access for end users or third parties MUST NOT** be in scope for v1.
    Documented exception: inbound **webhooks** from trusted vendors (Plaid, Stripe) with signature verification.
  - **DATA-16** (`accepted`): A separate in-memory cache cluster MUST NOT be required for FX rates in v1.
  - **DATA-12** (`accepted`): After a validated account-deletion request, the product MUST **immediately** perform
    external cleanup (login provider, Plaid, Stripe, sessions) and **immediately remove** user-owned primary data and
    attachments (**HP1**). A **daily job** MUST retry leftover failed cleanups only. Keeping a deleted copy for later
    removal MUST NOT be used for user-initiated deletes. Backup residual retention (weekly backup) MUST be documented in
    privacy disclosures.
  - **DATA-13** (`accepted`): Transactional email (magic link, household invites) MUST be sent by a managed email
    service that supports bounce/complaint handling.
  - **DATA-14** (`accepted`): Paid Plaid automatic sync MUST be **webhooks only** (no scheduled catch-up job in v1). A
    **manual sync** control MUST remain obvious. If webhook delivery/processing is unhealthy, the product MUST inform
    the user and MUST raise **alarms** for operator visibility.

---

## 17. Session and State Management

- [x] Persist sessions across services / deployments
  - **SESS-1** (`accepted`): Authenticated sessions MUST survive redeploys and MUST work across API instances without
    pinning a user to one server.
- [x] State management mechanism
  - **SESS-2** (`accepted`): Auth MUST use a **website API that sets an HttpOnly secure cookie** (JavaScript cannot read
    the session). Browser-readable access tokens MUST NOT be the primary session.
- [x] Session affinity
  - **SESS-3** (`accepted`): Pinning a user to one server MUST NOT be required.
- [x] Cross-region session persistence
  - **SESS-4** (`accepted`): Copying sessions to a second region MUST NOT be required for v1.
- [x] Server-side vs client-side state
  - **SESS-5** (`accepted`): Auth session MUST be server-issued (HttpOnly cookie); UI calendar state MAY be client-side;
    lasting expense and budget data MUST be server-side in the database.
- [x] Session retention
  - **SESS-6** (`accepted`): Session absolute lifetime MUST be **30 days**. Idle timeout MUST NOT be required for v1
    (absolute expiry only unless later added).
- [x] Shared session store
  - **SESS-7** (`accepted`): Session payload MAY be carried in an encrypted cookie and/or referenced server-side; a
    separate Redis session store MUST NOT be required for v1 unless later justified. A per-user **session version** (or
    equivalent) MUST support log-out-everywhere and selective invalidation.
- [x] Anonymous sessions / revoke
  - **SESS-8** (`accepted`): Anonymous sessions MUST NOT be required for v1. **Log out everywhere** (revoke all sessions)
    MUST be supported. Normal new login MUST NOT invalidate other sessions. Sensitive security events (e.g. MFA enable,
    account recovery, email/IdP change, explicit secure-account action) MUST invalidate other sessions. UX MAY show
    “signed in elsewhere” with one-tap revoke.

---

## Capture log

| ID                | Status   | Owner          | Resolve by    | Notes                                                              |
| ----------------- | -------- | -------------- | ------------- | ------------------------------------------------------------------ |
| All checklist IDs | accepted | sole developer | —             | Full promotion complete                                            |
| DNS-8 IPv6        | deferred | sole developer | later         | IPv4 only for v1; IPv6 optional later                              |
| Domain purchase   | open     | sole developer | before launch | `app.` / `gateway.` ready in infra (D3)                            |
| Decision log      | accepted | sole developer | —             | Architecture choices accepted with this checklist                  |
