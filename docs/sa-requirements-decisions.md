# Architecture decisions for Balance v1

[Source](https://drive.google.com/file/d/1KTnjgJ-EIan_ym8ioK5v1M0WOffv55hf/view)

Each heading is a question from Amazon Web Services (AWS)’s **Requirements Checklist** (Advanced Architecting
resources, © 2025 Amazon Web Services). Under every question: the **v1 decision**, the **reasoning**, and **tradeoffs**
against other technology or product options.

Requirement IDs such as **ORG-1** come from the product checklist
[requirements.md](../../../balance/docs/requirements.md). Technology names (Lambda, DynamoDB, Cognito, and the rest)
are the stack already defined in Cloud Development Kit (CDK) under `infrastructure/`, not new guesses.

**Open on purpose** (not filled in here): the public domain name (**DNS-2**); extra numeric success metrics beyond
stranger signup (**ORG-2**); Internet Protocol version 6 (**DNS-8**); AWS Organizations (**CX-4**).

---

## How to read an entry

- **Decision** — what is locked for v1.
- **Reasoning** — why that meets the requirement.
- **Tradeoffs** — what was rejected and what it costs.

---

## 1. Organization-Based Strategies

### What are your key business goals and how does this workload support them?

**Decision:** Balance v1 is a public, calendar-first personal finance Progressive Web App (PWA) for consumers in the
United States, Canada, and the EU. It is one place for budgets, expenses, and spending (**ORG-1**, **CX-1**). Free
accounts use manual and repeating items plus ads. Paid accounts get Plaid bank sync, household share, and the rest of
the paid matrix (**CX-2**).

**Reasoning:** The product identity is the current month on a calendar, not a dashboard copy of other finance apps.
Public self-serve signup is the first-release bar: a stranger must get value without the operator (**ORG-2**).

**Tradeoffs:**

- **Calendar-first vs dashboard-first.** Clearer product vs a layout users already know from Mint or You Need A Budget
  (YNAB).
- **Public signup vs invite-only.** Meets the stranger-gets-value goal vs a smaller, safer early user set.
- **Paid Plaid from day one vs a long free bank-sync period.** Protects the largest variable cost vs faster top-of-funnel
  growth.

### Are there any organizational standards or mandates (e.g., approved regions, architectures)?

**Decision:** No enterprise mandates. Constraints are AWS-only, lowest cost that still meets requirements, and a path to
scale (**ORG-3**, **CX-4**, **CX-7**). Region is **`us-east-1`**. Website and API ship from the same CDK project.

**Reasoning:** There is no company landing zone, service catalog, or approved-region list. `us-east-1` is the cheapest
region with the broadest service set. One CDK app keeps the PWA and API from drifting onto two vendors.

**Tradeoffs:**

- **`us-east-1` vs `eu-west-1` / `eu-central-1`.** Lower AWS list prices and simpler operations vs a stronger EU data
  residency story (v1 uses Standard Contractual Clauses (SCCs) instead — **SEC-3**, **CMP-4**).
- **Single CDK app vs Amplify / Vercel for the website.** One Identity and Access Management (IAM) model and one bill vs
  a faster static-host setup that splits frontend ownership (**CPU-2a**).
- **AWS-only vs multi-cloud.** One IAM and billing story vs lock-in to one vendor’s outage profile.

### Who are the primary stakeholders and decision-makers for this workload?

**Decision:** The sole developer is the decision-maker for architecture, budget, and product scope, and also builds,
deploys, operates, and supports the product (**ORG-4**, **CX-6**).

**Reasoning:** There is no product manager, security team, or change board. Choices have to be operable by one person
(email alerts, cold regional restore, no on-call rotation).

**Tradeoffs:**

- **One operator vs a team with separated duties.** Fast decisions vs a single person who can change production.
- **Operator-as-approver vs an architecture review board.** Fits a solo product vs weaker independent challenge.

### Are there any existing enterprise architectures or patterns this solution must align with?

**Decision:** None. The workload is new and MUST NOT be required to match a pre-existing company pattern (**ORG-5**).

**Reasoning:** There is no inherited Virtual Private Cloud (VPC) template, Control Tower landing zone, or internal API
gateway to plug into.

**Tradeoffs:**

- **Greenfield serverless vs copying an employer VPC + Elastic Kubernetes Service (EKS) pattern.** Lower idle cost vs
  looking “enterprise” in an interview diagram that would not match this product.
- **No landing zone vs AWS Organizations from day one.** Less setup vs no organization-wide Service Control Policies
  (SCPs) until revenue or a team warrants it (**CX-4**).

### How is success measured for this workload?

**Decision:** v1 success is that a stranger can sign up and get value without help (**ORG-2**). Additional quantitative
Key Performance Indicators (KPIs) are **deferred**.

**Reasoning:** Launch volume is unknown (**CAP-1**). Inventing a Monthly Active Users (MAU) or conversion target would
drive the wrong reservations and the wrong scale story.

**Tradeoffs:**

- **Qualitative launch bar vs a numeric MAU/KPI set now.** Honest until traffic exists vs nothing to put on a dashboard
  besides “did a stranger finish signup.”
- **Defer KPIs vs locking conversion or paid-attach rates.** Avoids fake targets vs slower later instrumentation.

### Are there dependencies on other internal systems or business units?

**Decision:** None. The product MUST NOT depend on other internal systems or business units (**ORG-6**). External
dependencies are Plaid, Stripe, transactional email, Frankfurter, Google and Apple login, and Google ads (**CX-8**).

**Reasoning:** This is a consumer product, not an internal line-of-business app. There is no corporate directory, data
warehouse, or ticketing system to integrate.

**Tradeoffs:**

- **Standalone SaaS vs an internal finance tool on company SSO.** Public internet and consumer identity vs free
  enterprise identity and a captive user base.
- **Vendor SaaS (Plaid/Stripe) vs building bank sync and billing.** Faster launch and less Payment Card Industry (PCI)
  scope vs vendor outages that the app can only surface as errors (**CX-8a**).

### Are there timelines or milestones we should be aware of?

**Decision:** No fixed milestone dates (**ORG-7**, **CX-7**). Public launch still has evidence gates: self open-source
security assessment and System and Organization Controls 2 (SOC 2) Type I before launch; external penetration test later
(**CMP-1b**, **SEC-9**).

**Reasoning:** A hard date would force cutting security evidence or inflating AWS spend to look “ready.” The gates that
matter are evidence, not a calendar.

**Tradeoffs:**

- **No hard date vs a public launch date.** Room to finish SOC 2 Type I vs weaker external pressure to ship.
- **Type I before launch vs Type II as a launch gate.** Type II needs an observation period, so it cannot be the first
  public-launch certificate.

### Are there future plans (e.g., migrations, upgrades, product launches) that could impact this workload?

**Decision:** v1 must keep a path to scale and must ship a multi-user household data model with invite/share for paid
budgets now (**ORG-8**). Native apps, a public API, investments, and net worth are out of v1 (**CX-3**). Quantitative
“future demand” targets are deferred.

**Reasoning:** Turning a single-user table into family share later is a migration project. Native apps and a public API
would change session shape and threat surface.

**Tradeoffs:**

- **Household model in v1 vs single-user now, family later.** More version-conflict work now vs a painful data migration.
- **PWA-only vs native iOS/Android in v1.** One client and one session cookie vs App Store work and a different token
  shape (**SESS-2**).
- **No public API vs opening the HTTP API.** Smaller attack surface vs no third-party ecosystem.

---

## 2. Security

### What are your security and privacy requirements (e.g., encryption, data residency)?

**Decision:** Transport Layer Security (TLS) in transit. Encryption at rest. All v1 application data in **`us-east-1`**.
EU personal data transfers use SCCs and privacy disclosures. Customer-managed Key Management Service (KMS) keys are not
required for v1 (**SEC-2**, **SEC-3**). Sensitive classes are listed in **SEC-1** (profile, sessions, budgets, Plaid
tokens, Stripe ids, consent, audit logs).

**Reasoning:** SOC 2 and finance data expect encryption at rest. AWS-managed keys are the default on managed services and
avoid a key-admin job for one operator. A second region for EU residency would double cost and disaster-recovery work.

**Tradeoffs:**

- **AWS-managed keys vs customer-managed KMS keys.** Less rotation work vs finer key policy and bring-your-own-key
  stories some auditors prefer.
- **One region plus SCCs vs storing EU data in the EU.** Cheaper and simpler vs a stronger residency claim.
- **Encrypt-everything-at-rest vs plaintext DynamoDB for “non-sensitive” fields.** One rule vs a classification
  scheme the solo operator would have to keep honest.

### How do you currently manage identity and access?

**Decision:** End users: Amazon Cognito user pool, Google and Apple social login, custom magic-link email, optional
Multi-Factor Authentication (MFA) in profile — not mandatory at signup (**SEC-4**, **AUTH-2**, **AUTH-8**). Operator:
AWS console / Single Sign-On (SSO) for the sole developer; GitHub OpenID Connect (OIDC) to an IAM deploy role; no
standing contractor production access; documented break-glass admin for the operator (**AUTH-6**).

**Reasoning:** Cognito stays in the same AWS account as the API. Magic link is extra code compared with a hosted
passwordless vendor, but it avoids a second identity bill. A leaked static deploy key can take the account; OIDC issues
a role for one job run.

**Tradeoffs:**

- **Cognito vs Auth0 or Clerk.** AWS-native bill and IAM vs faster hosted passwordless and enterprise SSO extras v1
  does not need.
- **Google + Apple vs email/password only.** Expected on mobile vs Apple Developer Program cost and extra IdP setup.
- **GitHub OIDC vs long-lived access keys in GitHub secrets.** Audit-friendly vs faster to paste and easier to leak.
- **Optional MFA vs mandatory MFA at signup.** Lower signup friction vs weaker default account protection.

### Are there specific threat models or known risks for this workload?

**Decision:** A living Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of
privilege (STRIDE) model is required and must be updated when major features ship (**SEC-5**). The written model is
[threat-model-stride.md](../../../balance/docs/threat-model-stride.md). Known product risks include Plaid token theft,
session cookie theft, webhook forgery, paid-feature gate bypass, and household privilege escalation.

**Reasoning:** A finance app that never models threats ships guesswork. STRIDE is the checklist language the AWS
workshop uses, so the same model works for design reviews and interviews.

**Tradeoffs:**

- **STRIDE living doc vs no written model.** Reviewable threats vs relying on memory.
- **STRIDE vs PASTA / attack trees only.** Workshop-aligned and lightweight vs deeper process a solo operator will not
  run every sprint.

### Do you require centralized or decentralized security controls?

**Decision:** Controls live in the **single production AWS account** — not a multi-account organization policy model
(**SEC-6**, **C1**). Staging is a **separate account** from production (**CX-4**, **AUTH-4**) so staging IAM cannot
reach prod data.

**Reasoning:** AWS Organizations and SCPs are an organization feature this solo product does not need yet. Two accounts
still separate blast radius without a full landing zone.

**Tradeoffs:**

- **Two accounts (staging + prod) vs one account with `Env` tags only.** Safer promotion vs more IAM and CDK bootstrap.
- **Account-local controls vs Organizations + SCPs.** Less governance machinery vs no org-wide preventative guardrail.
- **Decentralized-per-account vs a dedicated security tooling account.** Fits one operator vs the pattern large AWS
  orgs use for GuardDuty aggregation.

### What is your approach to vulnerability management and patching?

**Decision:** Static Application Security Testing (SAST) with Semgrep, Software Composition Analysis (SCA) with npm
audit plus Trivy or OSV-Scanner on every pull request to `main`. Dynamic Application Security Testing (DAST) with OWASP
ZAP and/or Nuclei weekly and before public launch, including a strict safe ruleset on production. Critical/High findings
in ≤ 7 days (fix or recorded risk-accept); Medium in ≤ 30 days (**SEC-7**, **SEC-9a**). Patching means dependency and
runtime updates — there is no self-managed server fleet.

**Reasoning:** Lambda and DynamoDB remove OS patching. The remaining work is application dependencies and the PWA.
Paid scanners are later-phase cash.

**Tradeoffs:**

- **Open-source SAST/DAST/SCA vs Snyk / Wiz / a paid DAST.** Dollar cost near zero vs more noise for one person to
  triage.
- **7-day Critical SLA vs “fix when possible.”** Forces a recorded accept vs slipping finance-app holes.
- **DAST on production with a safe ruleset vs staging-only DAST.** Finds real config vs risk of noisy or unsafe probes.

### How do you handle secrets management (API keys, credentials)?

**Decision:** Secrets encrypted at rest, never in git, reviewed at least every 90 days, rotated on suspected leak
(**SEC-8**). v1 store is AWS Systems Manager Parameter Store **SecureString** (AWS-managed KMS). Secrets Manager
auto-rotation is not required in v1.

**Reasoning:** The secret set is a handful of vendor keys (Plaid, Stripe, OAuth). Parameter Store is enough. Plaid and
Stripe keys are rotated in those dashboards, so AWS auto-rotation would not be the source of truth.

**Tradeoffs:**

- **Parameter Store vs Secrets Manager.** Lower cost and enough for a few keys vs native rotation and more audit
  integrations.
- **90-day review vs monthly.** Matches slow-changing vendor keys vs busywork.
- **SSM vs git-crypt / `.env` in CI secrets.** Encrypted in AWS vs easier leaks from logs and forks.

### Do you conduct regular security assessments or penetration testing?

**Decision:** Before public launch: documented **self** assessment with maintained open-source tools (ZAP and/or Nuclei,
plus manual auth/session, webhook, and paid-gate checks) (**SEC-9**, **CMP-1b**). **External penetration test is later**
(before SOC 2 Type II or when revenue allows) — not a gate on first public launch (**PT2**). Marketing must not claim an
external pen test until that engagement completes.

**Reasoning:** An external pen test is cash and calendar. Type I plus a recorded self-assessment is the launch evidence
bar; the operator must confirm the auditor accepts that.

**Tradeoffs:**

- **Self OSS assessment at launch vs paid pen test as a launch gate.** Ships sooner vs a claim marketing cannot make.
- **Pen test before Type II vs skipping it.** Stronger Type II package vs more cost.

### Are specific AWS services (e.g., KMS, IAM Access Analyzer, GuardDuty) already in use?

**Decision:** Encryption uses **AWS-managed KMS** on managed services (no customer-managed keys in v1). **IAM Access
Analyzer** (unused-permission findings) and **GuardDuty** (threat detection) are in CDK, **off in early development,
on before public launch** (**SEC-10**). AWS Config and a security-findings hub are not required for v1.

**Reasoning:** GuardDuty through empty development burns money before there is traffic. Analyzer and GuardDuty are the
workshop **S3** pair and match SOC 2 “threat detection is on at launch.”

**Tradeoffs:**

- **Flag off until launch vs GuardDuty on from the first deploy.** Saves cost vs missing early-account reconnaissance.
- **AWS-managed KMS vs customer-managed keys.** See encryption question.
- **GuardDuty + Analyzer vs Security Hub + Config.** Two services vs a findings warehouse this account does not staff.

---

## 3. Storage Needs

### What types of data will you store (structured, unstructured, media, logs)?

**Decision:** Structured records in DynamoDB: profiles, budgets, expenses, repeating rules, categories, household
membership, paid-plan status, consent, and (paid) Plaid transactions and balances (**STO-1**, **DATA-1**). Files in
Amazon Simple Storage Service (S3): PWA build and paid receipt photos. Operational logs in CloudWatch (7 days). Compact
audit events 30 days (**STO-3**, **AUTH-5**).

**Reasoning:** Calendar access is keyed by user/household and month, not ad-hoc SQL. Photos would blow DynamoDB item
size limits. Logs are not the system of record for budgets.

**Tradeoffs:**

- **DynamoDB items + S3 objects vs Postgres + disk.** Matches access patterns and idle cost vs easier ad-hoc reporting.
- **Receipts in S3 vs Base64 in the expense item.** Extra delete paths vs huge items and messy purges.
- **Logs in CloudWatch vs a log SaaS.** Already in the account vs another bill.

### What are your requirements for data durability, availability, and latency?

**Decision:** Primary records must survive loss of one Availability Zone (AZ) via managed copies. Interactive calendar
reads follow the soft target: after the API is warm, 95th percentile under 1 second (**STO-2**, **PERF-5**). No extra
custom latency Service Level Agreement (SLA).

**Reasoning:** DynamoDB, S3, and Lambda already replicate inside the region. A custom multi-AZ scheme would mean
self-managed servers.

**Tradeoffs:**

- **Managed multi-AZ vs self-managed Postgres with replicas.** No server to patch vs SQL and a replica to fail over.
- **Soft 1-second calendar vs a hard SLA including cold starts.** Honest for Lambda vs forcing always-on compute.
- **Single-region durability vs cross-region replication.** Lower cost vs surviving a regional event without restore.

### How frequently is the data accessed (hot, warm, cold)?

**Decision:** Interactive calendar and user data are **hot** (used constantly). Verbose logs **7 days**. Compact audit
events **30 days**. No Glacier-style archive for app data (**STO-3**, **STO-4**).

**Reasoning:** Users open “this month” every session. Archiving live budget rows would fight immediate-delete privacy
and calendar load. Log retention is the first AWS line that jumps with traffic.

**Tradeoffs:**

- **Hot DynamoDB vs S3 Intelligent-Tiering for records.** Millisecond calendar vs cheaper cold storage that is wrong
  for interactive reads.
- **7-day logs vs 30/90-day logs.** Cost control vs longer debug windows (audit events already keep 30 days).
- **No archive vs Glacier for old months.** Simpler deletes vs restoring a year of expenses from tape-like storage.

### Are there retention policies or archival needs?

**Decision:** User-initiated deletes remove data **immediately**. Account delete purges login / Plaid / Stripe /
sessions and user-owned data in the same request (**HP1**). No “marked deleted, remove later” for app data. Weekly
backup residual retention must be disclosed (**STO-4**, **DATA-12**).

**Reasoning:** Immediate delete is the privacy story users understand (GDPR erasure). A lingering tombstone row would
undermine that story even if the UI hid it.

**Tradeoffs:**

- **Immediate purge vs soft-delete + 30-day hold.** Clearer privacy vs undo and easier support restores.
- **Disclose weekly backup residue vs turning backups off.** Honest GDPR vs no recovery if the table is destroyed.
- **No legal hold archive vs a compliance vault.** Fits v1 vs e-discovery requirements this product does not have.

### Do you require object storage, block storage, or file systems—or a combination?

**Decision:** **Object storage (S3)** for the PWA and receipts, plus a **managed database (DynamoDB)** for records.
Block storage (Elastic Block Store) and a shared file system (Elastic File System) MUST NOT be required (**STO-5**).
CloudFront reads the website bucket through Origin Access Control so the bucket is not a public dump.

**Reasoning:** There is no server disk. A file system would require a VPC and a runtime that mounts it. S3 + CloudFront
is the static-PWA pattern already in CDK.

**Tradeoffs:**

- **S3 + CloudFront vs EFS mounted on containers.** No mount, no NFS vs a POSIX disk the PWA does not need.
- **S3 vs stuffing files in DynamoDB.** Item-size and delete hygiene vs one store.
- **Origin Access Control vs a public website bucket.** Extra CDK vs open enumeration of objects.

### How do you back up data today?

**Decision:** Weekly on-demand DynamoDB backup, retain **1**. Point-in-Time Recovery (PITR) is supported in CDK but
**off** for v1. A restore test MUST run once before public launch (**STO-6**, **DR-4**).

**Reasoning:** PITR is the main backup bill and would shrink data-loss from ~7 days to minutes. v1 accepts Recovery
Point Objective (RPO) ~7 days (**DR-1**). Turning PITR on later is a flag, not a rewrite.

**Tradeoffs:**

- **Weekly snapshot vs PITR on.** Dollars saved vs losing up to about a week of data.
- **Retain 1 vs retain 4.** Lower backup storage vs more undo after a bad week.
- **DynamoDB on-demand backup vs dumping the table to S3 yourself.** Managed restore vs extra jobs to maintain.

### Are there cross-region replication or multi-AZ storage requirements?

**Decision:** Managed multi-AZ in `us-east-1`. Copies in a second region MUST NOT be required (**STO-7**, **DATA-4**).

**Reasoning:** Cross-region replication is a continuous bill and a second privacy/residency story. Regional loss uses
cold restore (**DR-2**).

**Tradeoffs:**

- **In-region multi-AZ vs DynamoDB global tables.** Survives one AZ vs surviving a region at idle cost and conflict
  complexity.
- **No CRR vs S3 Cross-Region Replication for receipts.** Simpler vs receipts available in a second region before the
  table is restored.

### How do you plan to handle data deletion or lifecycle transitions?

**Decision:** Expense/item delete removes the record immediately. Account deletion follows **HP1**: immediate external
cleanup + immediate removal of user-owned records and receipt files, plus a **daily retry** only for leftover partial
failures (**STO-8**, **CPU-11**). S3 lifecycle is for leftover incomplete uploads if needed, not for hiding deleted
budgets.

**Reasoning:** A daily EventBridge job can retry Plaid/Stripe/Cognito leftovers without keeping a “marked deleted” row
that still contains finance data.

**Tradeoffs:**

- **HP1 immediate vs delayed purge (30 days).** Stronger erasure vs easier “undo account delete.”
- **Daily retry Lambda vs Step Functions saga with waits.** One schedule vs more orchestration for a rare path.
- **S3 lifecycle vs application deletes only.** Catches orphans vs two sources of truth for “is this file gone.”

---

## 4. Monitoring and Alerting

### What operational metrics do you need to monitor (e.g., latency, error rates)?

**Decision:** API latency and 5xx (including calendar load), Lambda errors/throttles, DynamoDB throttles, live-notice
failures, Plaid webhook failures, backup job success/fail, and email bounce/complaint rates (**MON-1**). Request ID on
every API log line (**CMP-7**).

**Reasoning:** Those series drive the only alarms a solo operator will actually answer. Tracing every DynamoDB call does
not explain “who deleted this household”; audit events and a request ID do.

**Tradeoffs:**

- **Short AWS-native metric set vs full Application Performance Monitoring (APM).** Actionable vs drowning in spans.
- **Request ID vs AWS X-Ray in v1.** Cheap correlation vs a trace product (**CMP-7**).

### What is your incident response process?

**Decision:** Solo process. **Sev1** = login/calendar down or data-loss risk. **Sev2** = Plaid/Stripe/email degraded.
**Sev3** = ads/FX/non-critical. The sole developer owns response; no on-call rotation (**MON-2**).

**Reasoning:** There is nobody else to page. Severity that matches user-visible finance failure keeps email from treating
an ad-script miss like a database outage.

**Tradeoffs:**

- **Three-level solo IR vs a full incident-command process.** Fits one person vs theater.
- **Login/calendar as Sev1 vs treating Plaid as Sev1.** Honest product core vs paging on a vendor the UI already shows
  as an error.

### Who should receive alerts and how (email, SMS, Slack)?

**Decision:** The sole developer, **email only**, via Amazon Simple Notification Service (SNS) (**MON-3**).

**Reasoning:** Email is the channel that will actually be read. SMS and PagerDuty still page one person and add a vendor.

**Tradeoffs:**

- **Email vs PagerDuty / SMS.** Zero extra vendor vs faster wake-up at night.
- **SNS vs Slack webhooks.** Stays in AWS vs depending on Slack uptime for production pages.
- **Email vs in-app operator console.** Uses a path that works when the PWA is down vs a console that is also down.

### Do you require centralized observability across teams?

**Decision:** No. Multi-team centralized observability MUST NOT be required. One AWS-native logs/metrics/alarms system
is enough (**MON-4**).

**Reasoning:** There are no teams. A shared Grafana org would be an empty seat.

**Tradeoffs:**

- **CloudWatch in the prod account vs an org-wide observability account.** Less plumbing vs the pattern a later team
  would want.
- **One operator dashboard vs per-team views.** Matches staffing vs useless until there are teams.

### Do you use existing observability tools (e.g., Datadog, Splunk, CloudWatch)?

**Decision:** **CloudWatch** (logs, metrics, alarms, one dashboard). No Datadog, Splunk, or X-Ray required for v1
(**MON-5**).

**Reasoning:** CloudWatch is already in the account. A second agent and ingest bill would dominate S0–S1 AWS spend.

**Tradeoffs:**

- **CloudWatch vs Datadog / Splunk.** Lower cost vs nicer query UX and APM.
- **No X-Ray vs X-Ray on.** Fewer traces to ignore vs easier Lambda→DynamoDB latency splits later.

### What are your SLIs (Service Level Indicators) and SLOs (Objectives)?

**Decision:** Soft Service Level Indicator / Objective: current-month calendar, after the API is warm, 95th percentile
under 1 second (**MON-6**, **PERF-5**). No hard customer-facing availability SLO for v1. Live notices 1–2 seconds while
the app is open (**CPU-10**).

**Reasoning:** A hard uptime percent would contradict cold regional restore and a 12-hour Recovery Time Objective
(RTO). The calendar is what users feel.

**Tradeoffs:**

- **Soft calendar SLO vs 99.9% uptime SLA.** Honest vs a contract Lambda cold starts and single-region DR cannot keep.
- **Warm p95 vs p99 including cold starts.** Designable vs forcing provisioned concurrency.

### Do you need custom dashboards or visualization for different teams?

**Decision:** One operator dashboard: API 5xx/latency, compute errors/throttles, Plaid webhook health, backup job status
(**MON-7**). No per-team views.

**Reasoning:** Extra dashboards become stale. One screen matches one on-call.

**Tradeoffs:**

- **One CloudWatch dashboard vs Grafana / QuickSight.** Included vs another product to keep alive.
- **Operator-only vs customer-facing status page.** Less toil vs users guessing during an outage.

### How is alert noise or false positives currently handled?

**Decision:** Alarms prefer **sustained** conditions (multi-minute windows) over single datapoints. Channel remains
email only (**MON-8**).

**Reasoning:** A single 5xx from a cold start should not page. If email is noisy, the operator will mute everything.

**Tradeoffs:**

- **Sustained windows vs page-on-one-error.** Fewer false positives vs slower detection of a true hard down.
- **Email-only vs ChatOps with auto-ack.** Simpler vs richer noise-control tooling.

---

## 5. Resilience

### Do you require multi-AZ or multi-region deployment?

**Decision:** **Single region (`us-east-1`)**, AWS-managed **multi-AZ** for API, database, and website files. Two live
regions MUST NOT be required (**RES-1**).

**Reasoning:** Managed services already run in more than one AZ. A second live region is the largest idle AWS bill and
conflicts with COST-8.

**Tradeoffs:**

- **Multi-AZ single region vs active-active two regions.** Survives one building vs double cost, session, and data
  replication work.
- **Lambda + DynamoDB + CloudFront vs EC2 in three AZs.** No fleet vs instances to patch and balance.

### How is application state handled during failover events?

**Decision:** Lasting data lives in DynamoDB. Login is an HttpOnly cookie plus a per-user **session version** in
DynamoDB. Lambda memory is thrown away after each run. In-region failover MUST NOT pin a user to one server (**RES-2**,
**SESS-1**).

**Reasoning:** A new Lambda instance appears on every burst. Sticky sessions would break. The session version makes
“log out everywhere” work on every instance.

**Tradeoffs:**

- **DynamoDB session version vs Redis / sticky load balancing.** Extra read on auth vs pinning or another cluster.
- **Stateless Lambda vs in-memory sessions on a box.** Survives deploy vs everyone logged out on every release.

### Are there critical downstream dependencies that affect availability?

**Decision:** Critical: login (Cognito), DynamoDB, API (Lambda + API Gateway), website files (S3 + CloudFront), Plaid,
Stripe, transactional email. On Plaid/Stripe failure the app shows **errors only**. Login/database/API outage **stops
signed-in features** rather than showing stale data (**RES-3**, **CX-8a**). Email, Frankfurter, and ads are Sev2/Sev3.

**Reasoning:** A cached calendar or balance that is wrong is worse than an error for a finance app. That is an explicit
product lock.

**Tradeoffs:**

- **Errors-only vs stale-balance read-only mode.** Honest vs looking “up” with wrong numbers.
- **Cognito as critical vs a local fallback user store.** Correct vs a second identity system.
- **Email as Sev2 vs Sev1.** Magic-link outages hurt signup vs paging like a database outage.

### How often do you perform resilience or failure mode testing?

**Decision:** Before public launch, a **simple failure drill (R2)** (prod-safe failure, webhook failure, backup restore
path). Ongoing automated chaos testing MUST NOT be required (**RES-4**).

**Reasoning:** Chaos Monkey on a solo serverless stack is entertainment. The restore path is the drill that matters.

**Tradeoffs:**

- **One pre-launch drill vs continuous chaos.** Cheap vs finding AZ failures the managed service already claims to
  handle.
- **Manual R2 vs GameDay with a team.** Matches staffing vs unused ceremony.

### What is your tolerance for downtime or degraded performance?

**Decision:** Disaster-class recovery aligns with **RTO ≤ 12 hours**. Routine short faults MAY show clear errors with
**no pledged uptime SLA** (**RES-5**, **DR-5**).

**Reasoning:** Twelve hours is what one person can actually do. Selling 99.9% would be fiction under cold regional
restore.

**Tradeoffs:**

- **Best-effort 24/7 vs a customer uptime SLA.** Honest vs refunds and a second region.
- **Clear errors vs degraded stale UI.** See downstream-dependencies question.

### What failure scenarios are critical to recover from?

**Decision:** Documented paths for: in-region service impairment (rely on AWS), database loss/corruption (weekly backup
restore), and full **regional** impairment (cold rebuild in another region) (**RES-6**).

**Reasoning:** Those are the three ways the product actually dies. Vendor (Plaid/Stripe) failures are errors-in-app, not
region failover.

**Tradeoffs:**

- **Backup restore vs always-on replica.** RPO ~7 days vs idle replica cost.
- **Documented regional rebuild vs never planning regional loss.** 12-hour hole vs pretending `us-east-1` cannot fail.

### Do you need automatic failover or just manual recovery?

**Decision:** **In-region automatic** (managed AWS). **Regional disaster recovery manual**, declared and executed by the
sole developer (**RES-7**, **DR-8**).

**Reasoning:** API Gateway, Lambda, DynamoDB, and CloudFront already fail over inside the region. Automatic regional
failover needs global tables, replicated sessions, and DNS health checks v1 explicitly rejected.

**Tradeoffs:**

- **Manual regional vs Route 53 failover to a hot standby.** $0 idle DR vs a 12-hour hole if the operator is
  unreachable.
- **Managed in-region vs self-managed failover scripts.** Less to test vs more control.

---

## 6. Disaster Recovery (DR) and Business Continuity (BC)

### What are your RTO (Recovery Time Objective) and RPO (Recovery Point Objective)?

**Decision:** **RPO** up to ~**7 days** (weekly backup, retain 1, PITR off). **RTO** ≤ **12 hours** for regional recovery
when the sole developer is available (**DR-1**).

**Reasoning:** PITR and a second region would buy a better RPO/RTO at a standing cost that contradicts COST-8. Twelve
hours is a human restore, not an automated cutover.

**Tradeoffs:**

- **RPO ~7 days vs PITR (minutes) or continuous replica (seconds).** Cost vs data loss.
- **RTO 12 hours vs RTO minutes.** Solo-operable vs warm/hot standby spend.

### What DR strategies do you currently use or plan to use (e.g., pilot light, warm standby)?

**Decision:** **Restore from backup with nothing running in a second region (cold / S1)**. Pilot light and warm standby
rejected (**DR-2**).

**Reasoning:** A tiny always-on spare still bills 24/7 and still needs data replication to be useful. Cold matches no
customer SLA.

**Tradeoffs:**

- **Cold vs pilot light.** $0 idle vs a small footprint that is stale unless data is copied.
- **Cold vs warm/hot standby.** Largest savings vs near-zero RTO.
- **Backup-restore vs multi-region active-active.** Simple vs conflict resolution on household edits.

### Are there business-critical systems that must remain available at all times?

**Decision:** During a regional disaster, **no** capability is required to stay online. After restore, priority is
**login + calendar** read/write first; Plaid, Stripe, ads, FX, reports, and attachments MAY lag (**DR-3**).

**Reasoning:** “Always available” would force hot standby. Login + calendar is the product; bank sync can wait.

**Tradeoffs:**

- **Nothing always-on vs keeping CloudFront + a read replica up.** Honest outage vs a stale public website.
- **Calendar-first restore vs restoring Plaid tokens first.** Users can budget manually vs a longer outage for paid
  users who only care about the bank feed.

### Do you test your DR plan regularly? If so, how often?

**Decision:** Database **restore test once before public launch**, then **annually**, owned by the sole developer
(**DR-4**).

**Reasoning:** Annual is the lightest cadence that still proves the snapshot format and IAM restore role work.

**Tradeoffs:**

- **Annual vs quarterly.** Less toil vs more chance the runbook rots.
- **Restore test vs tabletop-only.** Proves the backup vs a document nobody has executed.

### Are there specific business hours when availability is critical?

**Decision:** Treat availability as **24/7 best-effort** with no customer-facing uptime SLA (**DR-5**).

**Reasoning:** Consumers open a budget calendar at night and on weekends. Privileging 9–5 Eastern would be arbitrary.

**Tradeoffs:**

- **24/7 best-effort vs business-hours-only RTO.** Matches consumer use vs a written excuse to delay restore.
- **No SLA vs paid SLA tiers.** No refunds vs a product the architecture cannot sell.

### Do you need cold, warm, or hot standby environments?

**Decision:** **Cold** only (**DR-6**). Staging is for promotion, not a DR spare.

**Reasoning:** Staging is a separate account with different data. Using it as hot standby would mix prod restore with
test traffic.

**Tradeoffs:**

- **Cold vs warm staging-as-DR.** Cleaner accounts vs a tempting “already running” spare with the wrong data.
- **Cold vs hot prod clone.** See DR strategy question.

### Are third-party dependencies (e.g., SaaS, other cloud providers, etc.) included in DR planning?

**Decision:** Yes. DR planning documents Cognito, Plaid, Stripe, email, Frankfurter, and Google ads. When they are down
the app shows an error, offers manual sync, or shows a dated currency rate as applicable. Regional AWS loss follows the
same cold restore path (**DR-7**).

**Reasoning:** Plaid and Stripe cannot be failed over into a second AWS region. Pretending otherwise hides the real
outage mode.

**Tradeoffs:**

- **Document vendor outages vs building a second bank-sync vendor.** Honest errors vs years of dual-Plaid work.
- **Manual Plaid re-link after restore vs replicating Plaid Item state cross-region.** Simpler vs storing more token
  copies.

---

## 7. Performance

### Do you have requirements around startup time or cold starts?

**Decision:** Occasional slow first API run after idle is **acceptable**. Keeping functions warm MAY be deferred until
measured. Soft latency targets **exclude** that first-run delay (**PERF-1**, **CPU-9**). The PWA HTML/JS is on CloudFront
so the UI does not wait on Lambda to send the page (**CPU-2a**).

**Reasoning:** Lowest idle cost (**COST-8**, **SCALE-8**). A hard 1-second SLA including cold starts would force
provisioned concurrency or always-on containers.

**Tradeoffs:**

- **Accept cold starts vs provisioned concurrency / a min-1 Lambda.** Near $0 idle vs a slow first login on a quiet
  morning.
- **Static PWA vs server-rendered HTML on Lambda.** CloudFront can serve the shell while the API is cold vs every page
  wait on a cold function.

### Are there known performance pain points or complaints from users?

**Decision:** Design MUST watch turning repeating rules into calendar days on load, and a month of Plaid transactions in
one query. No other known pain points recorded yet. There are no production users to complain (**PERF-2**).

**Reasoning:** Those two paths are the CPU and item-count cliffs on a calendar-first product. Inventing other pain
points would be fiction.

**Tradeoffs:**

- **Expand-on-load vs pre-materializing a year of rent rows.** CPU on read vs 365 deletes on purge (**DATA-9**).
- **One month query vs fetching a year of Plaid rows.** Bound payload vs “infinite scroll history” cost.

### Do you benchmark performance against competitors or internal standards?

**Decision:** Formal competitor benchmarking MUST NOT be required for v1 (**PERF-3**).

**Reasoning:** There is no internal latency standard. Copying YNAB’s feel would not change the Lambda/DynamoDB budget.

**Tradeoffs:**

- **No competitor bench vs a synthetic “beat Mint.”** Less theater vs no marketing performance claim.
- **CI tests on own critical paths vs third-party monitoring of competitors.** Actionable vs legal/ToS noise.

### How do you differentiate between acceptable vs unacceptable performance?

**Decision:** Current-month calendar load is unacceptable if, after the API is warm, the 95th percentile **regularly**
exceeds 1 second (**PERF-4**, **PERF-5**). Live notices outside 1–2 seconds while open are also unacceptable
(**PERF-6**).

**Reasoning:** “Regularly” avoids paging on a single noisy interval. The calendar is the product.

**Tradeoffs:**

- **Warm p95 vs mean latency.** Captures the tail users feel vs a number cold starts would wreck.
- **Soft internal target vs contractual SLA.** Can evolve after measurement vs refunds.

### What are your latency and throughput requirements?

**Decision:** Calendar warm p95 < 1 second (soft). Live notice 1–2 seconds while connected. Explicit throughput targets
beyond managed autoscaling defaults are deferred until measured load (**PERF-5**).

**Reasoning:** There is no year-1 request-per-second number that is not a guess (**SCALE-1**). Throughput is “what
Lambda, API Gateway, and DynamoDB on-demand already give.”

**Tradeoffs:**

- **Soft latency + managed throughput vs reserved capacity for N RPS.** Honest vs paying for a made-up peak.
- **WebSocket 1–2s vs HTTP polling every 5s.** Feels live vs simpler but chatty.

### Are there peak usage times or performance SLAs?

**Decision:** No customer-facing hard latency SLA. No named peak window. No planned marketing burst (**PERF-6**,
**SCALE-7**).

**Reasoning:** Consumer traffic may cluster evenings; that is not an SLA. A Black Friday-style event is not in v1
scope.

**Tradeoffs:**

- **No peak SLA vs “month-end is the SLA.”** Avoids a fake busy hour vs no extra capacity plan on payday.
- **No hard SLA vs paid uptime.** Matches DR.

### How do you currently measure performance?

**Decision:** API latency metrics in CloudWatch and **CI performance tests** for critical paths (**PERF-7**).

**Reasoning:** CI catches calendar-expand regressions before they ship. CloudWatch is what alarms already use.

**Tradeoffs:**

- **CI + CloudWatch vs RUM / Lighthouse-only.** Server path vs only the browser.
- **No Datadog APM vs APM.** See monitoring tooling question.

---

## 8. Scaling

### Do you expect workload usage to fluctuate (daily, seasonally, or due to events)?

**Decision:** Early load is assumed **idle with slow growth**. Quantitative MAU is **unknown** (**SCALE-1**). No planned
marketing burst (**SCALE-7**).

**Reasoning:** A seasonal story (tax time, January budgets) is plausible later but is not a v1 capacity commitment.

**Tradeoffs:**

- **Idle-first vs sizing for a launch spike.** Matches COST-8 vs being wrong about day-one traffic.
- **Unknown MAU vs a year-1 user target.** Avoids Reserved Instances vs weaker investor-style forecasts.

### What are your scale-out/scale-in triggers (e.g., CPU, queue length)?

**Decision:** Managed serverless defaults — **no custom Auto Scaling Group** of servers (**SCALE-2**). Lambda
concurrency, API Gateway, DynamoDB on-demand, and CloudFront each scale on their own.

**Reasoning:** There is no CPU-on-a-box to threshold. A queue in front of HTTP would make the PWA feel hung.

**Tradeoffs:**

- **Managed defaults vs ASG on CPU / queue depth.** Less control vs no guesswork on a fleet that does not exist.
- **Direct HTTP vs SQS in front of the calendar API.** Honest latency vs a waiting room.

### Do you need horizontal, vertical, or both types of scaling?

**Decision:** Prefer **more small API instances** (horizontal). Raising Lambda memory MAY be used for latency
(**SCALE-3**). No vertical “bigger VM” story.

**Reasoning:** Lambda concurrency is horizontal. Memory is the vertical knob that also buys CPU on Lambda.

**Tradeoffs:**

- **Horizontal Lambda vs one big EC2.** Scale to zero vs idle RAM.
- **Memory tune vs always adding provisioned concurrency.** Cheaper latency knob vs standing cost.

### What happens today when you hit capacity limits?

**Decision:** Interactive API/user actions **fail with clear errors (L1)**. Non-critical background work (email,
cleanup, FX refresh) MAY **retry/queue (L2)** (**SCALE-4**).

**Reasoning:** Hiding overload behind an unbounded queue looks like a hang. Finance writes should not sit invisibly in
SQS.

**Tradeoffs:**

- **L1 fail-fast vs waiting-room queue.** Honest 429/5xx vs extra latency and duplicate-submit risk.
- **L2 retry for email vs failing invites immediately.** Eventual delivery vs “invite never arrived” support.

### Do you anticipate long-term growth in users, data, or requests?

**Decision:** Architecture MUST remain able to scale for future demand **without** a fixed year-1 MAU commitment
(**SCALE-5**, **ORG-8**). Price List midpoints at S3-like 10k MAU are still on-demand Lambda/DynamoDB, not a rewrite.

**Reasoning:** The path is more of the same services, not a secret EKS migration. Plaid Item count is the growth that
can dwarf AWS.

**Tradeoffs:**

- **Serverless path vs “we will move to EKS at scale.”** Avoids a two-architecture story vs less control at huge
  steady load.
- **On-demand DynamoDB vs provisioned + autoscaling later.** Idle-friendly vs cheaper unit cost after S2-like load.

### Do you need different scaling policies per component (e.g., API vs DB)?

**Decision:** API, live notices, database, and website files MUST be able to scale independently (**SCALE-6**).

**Reasoning:** Receipt photos on S3 should not grow the Lambda fleet. WebSocket connection-minutes should not grow
DynamoDB storage.

**Tradeoffs:**

- **Independent services vs one scaled ECS service that does API+files+sockets.** Isolation vs operational simplicity
  of “one service.”
- **HTTP API vs WebSocket on the same Lambda.** Separate connection cost vs one binary to deploy (v1 still uses API
  Gateway for both).

### Are burst traffic scenarios (marketing events, product launches, etc.) expected?

**Decision:** No planned marketing burst (**B3**). Before public launch, a **quota sanity check** (API, login, email
production access); raise limits only if defaults are insufficient (**SCALE-7**). Interactive overload stays L1.

**Reasoning:** A Product Hunt spike without quota headroom fails at IAM/API limits, not at “CPU 80%.”

**Tradeoffs:**

- **Quota check vs buying burst capacity now.** Cheap vs paying for a launch that may not happen.
- **No marketing burst vs planning a launch event.** Less architecture theater vs being unready if one is added later.

---

## 9. Cost Optimization

### What is your budget for this workload?

**Decision:** Temporary soft alert at **$50/month AWS** until a Cost Explorer baseline exists (then ceilings MAY be
revised after 2–4 weeks) (**COST-1**). Plaid, Stripe, Apple Developer, and ads sit **outside** that number.
Price List midpoints: S0 ~$2, S1 ~$7, S2 ~$47, S3 ~$310
([aws-pricing-cost-report.md](../../../balance/docs/aws-pricing-cost-report.md)).

**Reasoning:** Early traffic is unknown. A fake annual AWS budget would not survive first contact with Plaid Items. $50
is a tripwire, not a committed spend.

**Tradeoffs:**

- **$50 tripwire vs a $X/year AWS budget.** Honest vs a number nobody can defend.
- **AWS-only budget vs blending Plaid into AWS Budgets.** Actionable vs a mixed alarm that fires on bank links.

### Are you open to using spot instances or serverless to reduce cost?

**Decision:** API and jobs MUST run only when needed (**serverless**). Spot virtual machines MUST NOT be required —
there is no EC2 web tier (**COST-2**).

**Reasoning:** Spot is for fleets. This workload waits on DynamoDB, Plaid, and Stripe, not on a 24/7 VM.

**Tradeoffs:**

- **Lambda vs Spot EC2 / Fargate Spot.** Scale to zero vs interruptible servers this API shape does not need.
- **Serverless vs always-on containers “because Spot is cheap.”** Idle cost vs a discount on the wrong compute model.

### Do you monitor and optimize cost regularly?

**Decision:** The sole developer reviews cost **weekly** and via **email budget alerts** (**COST-3**).

**Reasoning:** Weekly matches the same cadence as usage review (**CAP-2**). Daily cost theater would not change S0
spend.

**Tradeoffs:**

- **Weekly vs continuous FinOps tooling.** Enough vs another SaaS.
- **Email budget vs Cost Anomaly Detection only.** Simple threshold vs ML noise on a tiny bill.

### Are you using any cost allocation tags or AWS Budgets?

**Decision:** Yes. Tags: `Project`, `Env`, `ManagedBy`, `Service`, `Owner`, `DataClassification`. AWS Budgets alert at
**$50/month** via email (**COST-4**).

**Reasoning:** Tags are how Cost Explorer splits API vs data vs auth. Budgets is the tripwire without a third-party
FinOps product.

**Tradeoffs:**

- **AWS Budgets vs Cost Anomaly + Slack.** Included vs extra channels.
- **Required tags vs untagged CDK.** Explains the bill vs cheaper-to-write stacks.

### Do you want to reserve capacity (Savings Plans, RIs) for predictable workloads?

**Decision:** Savings Plans / Reserved Instances MUST NOT be used for v1 (**COST-5**).

**Reasoning:** Predictable would mean a known MAU. A 1-year commitment would lock in a guess. On-demand Lambda and
DynamoDB already have no idle server.

**Tradeoffs:**

- **On-demand vs Compute Savings Plans.** Flexibility vs ~20–30% off after traffic is real (revisit at S2-like load).
- **No RIs vs DynamoDB reserved capacity.** Idle-friendly vs cheaper WRU/RRU at high steady load.

### Is there a threshold at which cost becomes unacceptable?

**Decision:** AWS spend at or above **$50/month** MUST trigger the budget alert until revised post-baseline (**COST-6**).
That is an **alert**, not an automatic shutdown.

**Reasoning:** S2 Price List midpoint (~$47) sits on this line. S3 (~$310) would force a revision. Unacceptable
**Plaid** spend is a separate vendor conversation, not this AWS threshold.

**Tradeoffs:**

- **Alert vs hard spend cap that stops the API.** Operator can decide vs taking production down automatically.
- **$50 AWS vs including Plaid.** See budget question.

### Who is responsible for cost governance or approval?

**Decision:** The sole developer approves cost exceptions (**COST-7**) and owns the weekly review.

**Reasoning:** There is no FinOps team or CFO sign-off chain.

**Tradeoffs:**

- **Operator-as-approver vs a budget committee.** Fast vs no independent check.
- **Weekly human review vs auto-remediation (delete idle NAT, etc.).** Safer on a tiny account vs surprise deletions.

Until further notice, optimize for lowest steady-state AWS cost while keeping a path to scale (**COST-8**).

---

## 10. Access, Authorization, and Authentication

### Who needs access to this system, and what level of access is appropriate?

**Decision:** End users on shared budgets: **Owner**, **Editor**, and **Viewer**, with a hybrid Role-Based Access
Control (RBAC) / Attribute-Based Access Control (ABAC) model (**AUTH-1**, **M1**). Only a **paid Owner** invites;
invitees must be paid (**AUTH-1a**). Standing unrestricted admin for end users is not allowed (**AUTH-3**). Operator
access is the sole developer only.

**Reasoning:** A flat “member” cannot express “can view but not delete rent.” Free-rider households would bypass the
paid Plaid gate.

**Tradeoffs:**

- **Three roles vs a flat member.** Expresses share vs a simpler model that cannot sell Viewer.
- **Paid-only invite vs viral free households.** Protects Plaid cost vs slower household growth.
- **Hybrid RBAC/ABAC vs RBAC-only.** Encodes “paid + owner” vs exploding role names (`PaidOwner`, `FreeViewer`, …).

### What identity providers (IdPs) do you use (e.g., Active Directory, SSO)?

**Decision:** End users: **Google** and **Apple** social login, plus passwordless **magic-link email** hosted on
Cognito — not a second identity vendor. No Active Directory, no workforce SSO, no extra enterprise IdPs (**AUTH-2**,
**AUTH-7**). Operator: AWS console / SSO.

**Reasoning:** Consumers are not employees. SAML to Okta would be unused. Apple is expected on iOS even for a PWA.

**Tradeoffs:**

- **Cognito social + magic link vs Auth0 / Clerk as the IdP.** AWS-native vs hosted passwordless speed.
- **Google + Apple vs Google-only.** Covers iPhone users vs skipping Apple Developer Program ($99/year).
- **Consumer IdPs vs Entra ID / AD.** Fits the product vs an enterprise pattern this audience does not have.

### Do you use roles or policies to enforce least privilege?

**Decision:** Yes. Smallest permissions that work, hybrid RBAC/ABAC for households, IAM least privilege for the operator
and the GitHub deploy role (**AUTH-3**, **AUTH-6**).

**Reasoning:** An unrestricted end-user admin would delete someone else’s household. A wide deploy user would turn a
CI leak into account takeover.

**Tradeoffs:**

- **Least privilege IAM vs a single `AdministratorAccess` deploy user.** Audit-friendly vs faster CDK bootstrap.
- **Policy-on-each-API vs a gateway plugin only.** Defense in the API vs trusting CORS alone.

### Are different environments (dev/test/prod) managed separately or together?

**Decision:** **Local development** + **AWS staging** + **AWS production** in **separate accounts**. Login and data
stores are per account. No extra cloud QA account. Merges to `main` deploy staging; version tags deploy production
(**AUTH-4**, **CX-5**).

**Reasoning:** One account with `Env=prod|dev` tags still shares IAM blast radius. A third “QA” account would be another
bill without a QA team.

**Tradeoffs:**

- **Two AWS accounts vs one account + prefixes.** Safer vs cheaper and simpler CDK.
- **No dedicated QA account vs four-account org (sandbox/dev/test/prod).** Less cost vs more promotion theater.
- **Tag-driven prod deploys vs clicking in the console.** Repeatable vs faster emergencies (break-glass is documented).

### How is access revoked or audited?

**Decision:** **Log out everywhere** takes effect **immediately** (session version). Account deletion follows **HP1**.
Compact audit events (login, logout-all, paid-plan, household invite/accept/revoke, account delete, Plaid link/unlink,
Stripe changes, failed auth) retained **≥ 30 days**. Verbose app logs **7 days** (**AUTH-5**, **CMP-2**).

**Reasoning:** A JSON Web Token (JWT) that cannot be revoked until expiry fails “log out everywhere.” Thirty days of
compact events is the forensic floor without storing bank memos in logs.

**Tradeoffs:**

- **Immediate revoke vs JWT-until-expiry.** Extra DynamoDB read vs stolen tokens that work for hours.
- **30-day audit vs 1-year audit lake.** Cost and privacy vs some auditor preferences.
- **Compact events vs full request bodies in logs.** Safer vs easier debugging of payload bugs.

### Do you need temporary credentials (e.g., for CI/CD, contractors)?

**Decision:** CI/CD uses **short-lived GitHub OIDC** credentials (**G1**). Long-lived AWS access keys for deploy MUST
NOT be used. Contractors MUST NOT have standing production access (**AUTH-6**).

**Reasoning:** The only machine identity is GitHub Actions in this repo. Contractors are out of v1 staffing.

**Tradeoffs:**

- **OIDC vs access keys in GitHub secrets.** See identity-and-access question.
- **No contractor IAM vs a time-boxed IAM Identity Center user.** Matches solo vs slower if a contractor is hired.
- **GitHub as CI vs GitLab / CodePipeline.** Already where the code lives vs another identity to federate.

### Do you integrate with external IdPs?

**Decision:** Yes — **Google** and **Apple** only. Additional enterprise IdPs MUST NOT be required (**AUTH-7**). The
HTTP API is **first-party PWA only**; no end-user API keys; CORS allowlist is the PWA origin; Plaid/Stripe webhooks are
server-to-server with signatures (**AUTH-9**).

**Reasoning:** External consumer IdPs are the signup path. A public developer API would be a new product and a new
threat model.

**Tradeoffs:**

- **Two social IdPs vs also Microsoft / Facebook.** Covers the v1 audience vs more app-review work.
- **PWA-only API vs a public REST API.** Smaller surface vs no integrations marketplace.

---

## 11. Connectivity

### Will the system be accessed over the internet, VPN, or AWS Direct Connect?

**Decision:** **Public internet** only. VPN and Direct Connect MUST NOT be required (**NET-1**). CloudFront serves the
website; API Gateway serves the API. Webhooks arrive on public HTTPS with **signature checks**.

**Reasoning:** A consumer PWA cannot sit behind a VPN. Plaid and Stripe do not deliver webhooks into a private subnet.

**Tradeoffs:**

- **Public internet vs Site-to-Site VPN / Direct Connect.** Reaches users vs a pattern for office-only apps.
- **Signature-checked public webhooks vs PrivateLink to Plaid.** Fits how those vendors work vs a private path they
  do not offer.

### Are there latency or bandwidth requirements for connectivity?

**Decision:** No special bandwidth or network-path latency requirements beyond public-internet access, calendar warm
p95 < 1 second, and live notices 1–2 seconds (**NET-2**).

**Reasoning:** This is not a trading floor or a 4K media pipeline. Receipt photos are files, not a streaming SLA.

**Tradeoffs:**

- **Public-internet latency vs Direct Connect / Global Accelerator.** No extra network product vs microseconds this
  app would not notice.
- **Soft app targets vs a network SLA.** Measurable in CloudWatch vs blaming the user’s mobile ISP.

### Do you require private connectivity between AWS services?

**Decision:** A required VPC MUST NOT be required for v1 (**NET-3**). Lambda talks to DynamoDB and Cognito on AWS public
service endpoints. No NAT Gateway as a default.

**Reasoning:** A VPC plus NAT Gateway is an idle bill for a compliance checkbox nobody has issued. IAM and resource
policies already restrict who can call what.

**Tradeoffs:**

- **Public AWS endpoints + IAM vs PrivateLink / VPC.** Lower cost vs an auditor story some enterprises demand
  (documented fork, not built now).
- **No NAT vs Lambda-in-VPC for “security.”** Avoids a ~$32/month floor vs looking like a three-tier diagram.

### Are there systems that require hybrid connectivity with on-premise?

**Decision:** No (**NET-4**).

**Reasoning:** There is no datacenter, no on-prem Active Directory, no corporate file share.

**Tradeoffs:**

- **Cloud-only vs hybrid.** Matches the product vs unused Direct Connect / Storage Gateway.

### What network segmentation or isolation is required (e.g., public/private subnets)?

**Decision:** Custom VPC / public-private subnet isolation MUST NOT be required. Access is enforced by **login and
IAM**, not by which subnet a packet came from (**NET-5**).

**Reasoning:** Subnets do not stop a stolen session cookie. Cognito and API authorization do.

**Tradeoffs:**

- **Identity-centric vs subnet-centric isolation.** Correct for a PWA vs a familiar enterprise diagram that would not
  enforce the real control.
- **No private subnet vs putting API Gateway in a VPC.** Simpler vs extra endpoints.

### Are VPC peering or Transit Gateway already in use?

**Decision:** Connecting VPCs together MUST NOT be required (**NET-6**). Not in use.

**Reasoning:** There is no second VPC to peer. Transit Gateway is a hub for many networks this account does not have.

**Tradeoffs:**

- **No peering vs TGW “for later.”** $0 vs a monthly attachment fee for zero attachments.

### Do you require low-latency inter-region connectivity?

**Decision:** No (**NET-7**). Until domain cutover, default AWS hostnames MAY be used; public launch SHOULD use `app.` /
`gateway.` once the domain is purchased (**NET-9**).

**Reasoning:** Single-region data. Inter-region links would only matter for active-active, which v1 rejected.

**Tradeoffs:**

- **No inter-region network vs peering `us-east-1` to `eu-west-1`.** Matches residency vs a path for a region that
  does not serve users yet.

---

## 12. Name Resolution

### Do you use internal or external DNS?

**Decision:** **External public DNS** for the website and API. Internal-only DNS MUST NOT be required (**DNS-1**).

**Reasoning:** Users are on the public internet. Route 53 private hosted zones would answer nothing they can query.

**Tradeoffs:**

- **Public DNS vs split private+public zones.** One set of records vs unused internal names.

### Are there custom domain requirements for your services?

**Decision:** Infrastructure MUST be ready for **`app.<domain>`** (website) and **`gateway.<domain>`** (API and live
notices). The **root domain name is undecided** (to be purchased). Until cutover, default AWS hostnames MAY be used
(**DNS-2**). IPv4 only for v1; IPv6 deferred (**DNS-8**).

**Reasoning:** Two names keep static files and the API from sharing one origin (cookies and caching stay sane). The
registrar choice is still open.

**Tradeoffs:**

- **Two hostnames vs one origin for PWA+API.** Cleaner cookies/CORS vs one certificate and simpler local config.
- **Undecided domain vs locking a name now.** Avoids a wrong purchase vs no public URL yet.
- **IPv4 only vs dual-stack.** Less certificate/edge work vs IPv6-only networks that cannot connect.

### Do you manage DNS records centrally or by workload?

**Decision:** The sole developer owns DNS when the domain is connected, defined in CDK where practical (**DNS-3**,
**D3**).

**Reasoning:** There is no central DNS team. Records next to the CloudFront and API Gateway resources stay in review
with the rest of infrastructure.

**Tradeoffs:**

- **DNS-in-CDK vs clicking in the registrar UI.** Reviewable vs faster one-off TXT records.
- **Workload-owned vs a shared org DNS account.** Fits solo vs unused enterprise governance.

### Are there naming conventions or DNS governance policies?

**Decision:** Hostnames MUST follow `app.<domain>` for the client and `gateway.<domain>` for the API (and live-notice
endpoints as designed) (**DNS-4**). No further naming committee.

**Reasoning:** Two names are the convention. Extra environment prefixes (`staging.app.`) can wait until the domain
exists.

**Tradeoffs:**

- **`app` / `gateway` vs `www` + `api`.** Explicit vs more familiar names.
- **No extra governance vs a DNS style guide.** Less paper vs inconsistency if a second product appears.

### Do you require split-horizon DNS (different resolution internally vs externally)?

**Decision:** No (**DNS-5**).

**Reasoning:** There is no internal network that should see different IPs. Split-horizon would imply a VPC the product
does not require.

**Tradeoffs:**

- **One public view vs split-horizon.** Simpler vs a pattern for corporate split-brain DNS.

### Will services be exposed using AWS Route 53 or another provider?

**Decision:** Public DNS MUST be managed in the **same AWS account family** after domain purchase. The **registrar** MAY
be AWS or external with nameservers delegated to Route 53 (**DNS-6**). HTTPS terminates at CloudFront and API Gateway
— no third-party proxy.

**Reasoning:** Route 53 stays in the same CDK and IAM boundary. Cloudflare-as-proxy would add a second CDN in front of
CloudFront.

**Tradeoffs:**

- **Route 53 vs Cloudflare DNS+proxy.** One AWS bill vs extra DDoS/WAF features and another outage domain.
- **Registrar-undecided vs Amazon Registrar only.** Lets the operator pick price vs locking registrar now.

### Are health checks or failover configurations part of your DNS usage?

**Decision:** Multi-region DNS failover MUST NOT be required (**DNS-7**). CloudFront and API Gateway have their own
origin health; that is not Route 53 failover to a second region.

**Reasoning:** Failover DNS without a second stack is a dangling CNAME. Cold DR does not keep a target to fail over to.

**Tradeoffs:**

- **No DNS failover vs Route 53 active-active health checks.** Matches cold DR vs implying a hot spare that does not
  exist.

---

## 13. Compliance

### What regulatory standards must this workload comply with (e.g., GDPR, HIPAA, SOC 2)?

**Decision:** Users in the **US, Canada, and EU**. Align with **GDPR**, **California Consumer Privacy Act / California
Privacy Rights Act (CCPA/CPRA)**, and a path to **SOC 2** (Type I at/before public launch; Type II after observation)
(**CMP-1**). **Not HIPAA** — this is consumer budgeting, not a covered entity’s Protected Health Information. Cards:
**Stripe Checkout** + **Customer Portal**; raw card data MUST NOT be stored (**CMP-1a**). Launch artifacts: Privacy
Policy, Terms of Service, cookie/consent banners, SCC disclosures (**CMP-9**). Users can delete and export (**CMP-10**).
Ads only with recorded consent; first-party analytics only — no bank memos in third-party analytics (**CMP-12**).

**Reasoning:** Cards on this stack would expand PCI scope. HIPAA would imply a healthcare product this is not. Type II
cannot be a launch gate because it needs an observation period.

**Tradeoffs:**

- **Stripe Checkout vs storing cards / Stripe Elements on-site.** Less checkout UX control vs PCI questionnaire surface
  staying with Stripe.
- **SOC 2 Type I at launch vs Type II at launch.** Achievable vs impossible without prior observation.
- **GDPR+CCPA vs “US only, skip GDPR.”** Larger market vs skipping SCCs and EU rights.
- **Not HIPAA vs treating budgets as PHI.** Correct classification vs extra controls for the wrong law.

### Do you need audit trails, logging, and access reports?

**Decision:** Yes. Compact audit events as listed in **CMP-2** / **AUTH-5**, retained ≥ 30 days. CloudTrail management
events plus a request ID on every API log line (**CMP-7**).

**Reasoning:** SOC 2 and household disputes need “who invited whom,” not a warehouse of every calendar GET.

**Tradeoffs:**

- **Compact audit vs log-everything.** Cheaper and safer vs richer forensics.
- **30 days vs 365 days.** Privacy/cost vs some auditor templates.

### Who is responsible for governance and compliance verification?

**Decision:** The sole developer owns verification and will engage external auditors and penetration testers as needed
(**CMP-3**).

**Reasoning:** There is no compliance officer or legal department on staff. Lawyer review of Privacy Policy / ToS is
still recommended (the checklist is not legal advice).

**Tradeoffs:**

- **Operator-owned vs a hired CISO/vCISO from day one.** Cost vs independent challenge.
- **External auditor at Type I vs self-attestation only.** Stronger launch claim vs cheaper and weaker.

### Do you require data sovereignty or residency in specific jurisdictions?

**Decision:** All v1 data remains in **AWS `us-east-1`**. EU personal data transfers covered by **SCCs** and privacy
disclosures (**CMP-4**, **SEC-3**). No in-country Canadian or EU replica in v1.

**Reasoning:** A second region for sovereignty is a second live stack. SCCs are the v1 transfer mechanism, not Schrems
theater in CDK.

**Tradeoffs:**

- **US region + SCCs vs EU-only storage.** Cost and simplicity vs a stronger EU residency claim.
- **One region vs per-country shards.** Operable vs a data-residency product this stage cannot staff.

### Are there internal audits or governance boards to report to?

**Decision:** No internal audit board. Pre-launch evidence: self open-source assessment + SOC 2 Type I. External pen
test evidence follows **PT2** timing (**CMP-5**, **CMP-8**).

**Reasoning:** A board with one member is the operator. Inventing a committee would not add a review.

**Tradeoffs:**

- **No board vs a paper steering committee.** Honest vs unused ceremony.
- **Type I + self-assess vs board-mandated pen test at launch.** Matches **PT2** vs extra cash.

### How is compliance enforcement automated (e.g., AWS Config, SCPs)?

**Decision:** AWS Config / SCPs MUST NOT be required for v1 (**C0**). Controls are enforced via **CDK + IAM + written
process** (**CMP-6**).

**Reasoning:** Config rules and SCPs are organization-scale. CDK already prevents clicking a public bucket if the stack
defines Origin Access Control.

**Tradeoffs:**

- **IaC + IAM vs Config + Security Hub + SCPs.** Less noise vs continuous drift recording some auditors like.
- **Written process vs automated evidence collection.** Human vs a GRC tool this stage would not feed.

### Do you require data access logging or forensic traceability?

**Decision:** Yes: CloudTrail **management** events, compact audit events (actor + action + time), and a **request ID**
on every API log line so one user action can be followed across log lines (**F2**). Distributed tracing MUST NOT be
required (**CMP-7**).

**Reasoning:** Data-plane “every GetItem” logs would be expensive and would capture finance payloads. Management events
plus app audit cover “who changed IAM” and “who deleted the household.”

**Tradeoffs:**

- **F2 vs X-Ray / data-plane DynamoDB logging.** Enough forensics vs cost and PII in traces.
- **Request ID vs no correlation.** Supportable vs grepping timestamps.

---

## 14. Capacity Management

### What is the expected volume of requests, storage, and compute?

**Decision:** Launch volume is **unknown**. Plan with low early traffic (tens to a few hundred MAU) until measured
(**CAP-1**). Planning sketches: S0 ~10 MAU / 15k API req/month; S1 ~200 / 375k; S2 ~2k / 3.75M; S3 ~10k / 37.5M. Those
are sensitivity cases, not commitments.

**Reasoning:** A made-up MAU would drive the wrong reservations. S0–S1 is the planning band until Cost Explorer exists.

**Tradeoffs:**

- **Unknown + scenarios vs a committed year-1 volume.** Honest vs a number that would justify Savings Plans.
- **S0–S1 plan vs sizing for S3 now.** Matches COST-8 vs overbuying quotas.

### How do you forecast usage and plan for growth?

**Decision:** Usage and cost MUST be reviewed **weekly** by the sole developer (**CAP-2**, **COST-3**). No separate
capacity meeting.

**Reasoning:** Weekly is frequent enough to see Plaid Item growth and log ingest, rare enough to actually happen.

**Tradeoffs:**

- **Weekly human forecast vs a capacity model in a spreadsheet that is never updated.** Habit vs false precision.
- **Same cadence as cost review vs a dedicated capacity ritual.** One habit vs two skipped meetings.

### Are there resource limits or quotas you need to account for?

**Decision:** Before public launch, a **quota sanity check** covering API concurrency, login, and email production
access; raise only if defaults are insufficient (**CAP-3**, **SCALE-7**). Treat **Plaid linked-bank count** as a vendor
quota and cost, not an AWS quota.

**Reasoning:** SES sandbox and Cognito SMS/email limits strand a launch more often than Lambda’s default concurrency.

**Tradeoffs:**

- **Check-then-raise vs requesting large quotas now.** Avoids unused quota vs paperwork before there are users.
- **Plaid as vendor quota vs treating Items like DynamoDB WCU.** Correct cost owner vs hiding the real ceiling.

### Are autoscaling policies defined per environment?

**Decision:** The same **on-demand** model across environments; no env-specific server groups (**CAP-4**).

**Reasoning:** Staging should not have a min-2 ASG “because it is staging.” That would train the operator on a fleet
production does not use.

**Tradeoffs:**

- **Same serverless model vs larger staging “to look like prod.”** Cheaper vs a staging bill that rivals prod.
- **On-demand everywhere vs provisioned prod / on-demand staging.** One mental model vs cheaper prod unit cost later.

### What are your usage growth projections (quarterly or yearly)?

**Decision:** No fixed quarterly/yearly growth projection is required for v1 architecture (**CAP-5**).

**Reasoning:** S2/S3 in the cost report are what-ifs. Treating them as a forecast would justify warm DR and Savings
Plans the requirements forbid.

**Tradeoffs:**

- **No projection vs a 3-year CAGR.** Avoids fake charts vs weaker board-style planning (there is no board).

### Do you have any buffer or overprovisioning strategies?

**Decision:** Capacity buffer MUST be **none** — on-demand only (**CAP-6**).

**Reasoning:** A buffer of idle servers contradicts COST-8 and SCALE-8.

**Tradeoffs:**

- **No buffer vs 20% extra Lambda provisioned concurrency.** $0 idle vs headroom for a burst that is not planned.
- **On-demand vs reserved headroom in DynamoDB.** Pays per request vs paying for unused WCU.

### How is underutilization identified and addressed?

**Decision:** During the weekly cost review; remove unused paid extras if any appear (**CAP-7**). Examples: GuardDuty
left on in an empty account, CloudFront Pro, provisioned concurrency, extra log retention.

**Reasoning:** Underutilization on Lambda is the desired state (scale to zero). The waste to hunt is **paid add-ons**,
not idle vCPU.

**Tradeoffs:**

- **Weekly scan vs Compute Optimizer as a process.** Enough on a tiny account vs a tool aimed at EC2 fleets.
- **Hunt add-ons vs “right-size the server.”** Correct compute model vs an EC2 habit.

---

## 15. Compute Needs

### What are the compute requirements (e.g., CPU-intensive, GPU, memory)?

**Decision:** Interactive API work mostly **waits** on DynamoDB, Cognito, Plaid, and Stripe. Live notices are bound by
open connections. GPU MUST NOT be required (**CPU-1**, **CPU-7**). v1 Lambda is **512 MB**, ARM, Node.js 22, 29-second
timeout (CDK). Memory MAY be raised for calendar-expand latency (**SCALE-3**).

**Reasoning:** This is I/O-bound personal finance, not ML training or video encode. GPU would be unused spend.

**Tradeoffs:**

- **I/O-bound Lambda vs compute-optimized EC2 / GPU.** Correct vs paying for cores the calendar does not use.
- **512 MB vs 1024+ MB from day one.** Cheaper GB-seconds vs fewer cold-start surprises on expand-on-load.

### Do you require containerization (ECS, EKS) or serverless (Lambda)?

**Decision:** **Serverless.** Website API runs only when requests arrive — **Lambda + API Gateway HTTP API**. Live
notices: **API Gateway WebSocket + Lambda** (**A-full**). PWA is a **static** Single-Page Application on **S3 +
CloudFront**, not server-rendered, not Amplify/Vercel as a second host (**CPU-2**, **CPU-2a**). Local **Docker Compose**
is for laptop/CI, not production containers.

**Reasoning:** Always-on ECS/EKS would idle 24/7 for unknown MAU. WebSocket on API Gateway avoids running a socket
server. A static PWA means CloudFront can serve the UI when Lambda is cold.

**Tradeoffs:**

- **Lambda vs ECS/Fargate or EKS.** Scale to zero vs always-on and cluster ops.
- **HTTP API vs REST API (API Gateway v1).** Lower request price vs older features v1 does not need.
- **API Gateway WebSocket vs AppSync or a container socket server.** Managed fan-out vs another runtime.
- **Static SPA vs Next.js SSR on Lambda.** Cold-start isolation vs SEO/SSR complexity this app does not need.
- **CDK-hosted S3/CloudFront vs Vercel/Netlify.** One AWS account vs a split frontend vendor (**CX-4**).

### Are there specific OS or runtime dependencies?

**Decision:** API and jobs: **Node.js + TypeScript**. PWA: **TypeScript**. Shared request/response types in a **shared
schemas package** consumed by API and client (**CPU-3**). No Windows runtime.

**Reasoning:** One language across API and PWA. Shared schemas stop the calendar payload from drifting.

**Tradeoffs:**

- **Node everywhere vs Python API + TypeScript PWA.** One hiring/runtime story vs splitting the repo.
- **Shared schemas package vs OpenAPI-only.** Compile-time checks vs a spec the client might ignore.
- **Node 22 on Lambda vs containers for a custom OS.** Managed runtime vs patching a base image.

### Are you currently using EC2, Lambda, ECS, or EKS? Any plans to migrate?

**Decision:** **Lambda** (and API Gateway) for v1. No existing compute estate (**CPU-4**). No plan to migrate to EC2,
ECS, or EKS unless calendar-expand CPU or WebSocket connection cost explodes — that would be a measured revisit, not a
roadmap promise.

**Reasoning:** There is nothing to migrate from. Promising EKS “at scale” would create a two-architecture story the
requirements do not ask for.

**Tradeoffs:**

- **Stay on Lambda vs a scheduled ECS migration.** Avoids dual-running vs more control if connection-minutes dominate.
- **No EC2 web tier vs a small t-instance “for simplicity.”** Idle cost and patching vs a familiar SSH box.

### Do your workloads benefit from specific instance types (e.g., compute-optimized)?

**Decision:** Specialized instance types MUST NOT be required (**CPU-5**). ARM Lambda is the cost/perf default already
in CDK.

**Reasoning:** Instance families apply to EC2/ECS. On Lambda the knobs are memory, architecture (ARM vs x86), and
timeout.

**Tradeoffs:**

- **ARM Lambda vs x86 Lambda.** Lower GB-second price vs a rare native-module incompatibility.
- **No C/G/R families vs pinning a compute-optimized instance.** Correct vs an unused EC2 SKU.

### Are there licensing requirements (e.g., Windows, Oracle)?

**Decision:** None for compute. Apple Developer Program cost for Sign in with Apple is separate from compute (**CPU-6**).
No Oracle database.

**Reasoning:** Node on Lambda has no Windows/Oracle license line. Apple’s $99/year is an IdP tax, not a vCPU tax.

**Tradeoffs:**

- **Managed Linux runtime vs Windows on EC2.** No license vs Active Directory-shaped compute this product does not need.
- **DynamoDB vs Oracle/SQL Server.** No license vs a database this access pattern does not need.

### Do you need GPU-based compute (e.g., for ML or graphics)?

**Decision:** No (**CPU-7**). Plaid auto-categorization is a Plaid product, not a self-hosted model.

**Reasoning:** Running a categorizer GPU would duplicate a paid vendor feature and add ML ops.

**Tradeoffs:**

- **Plaid auto-categorize vs SageMaker / Bedrock on receipts.** Vendor cost vs GPU/token bills and a new threat surface.
- **No GPU vs “AI features” on always-on instances.** Matches v1 vs a demo that would dominate AWS spend.

Workloads that do run: HTTP, WebSocket, Plaid/Stripe webhooks, SES email, daily leftover account-delete retry, daily
Frankfurter FX refresh, paid over-budget emails. No Plaid catch-up cron (**CPU-8**, **DATA-14**).

---

## 16. Data Needs and Databases

### What types of data do you manage (transactional, analytical, time series)?

**Decision:** Day-to-day **transactional** consumer finance data: users, budgets/expenses, repeating rules, categories,
household membership, Plaid transactions/balances (paid), subscriptions, consent (**DATA-1**). Calendar presentation is
“events on days,” not a time-series database. Analytics in v1 is **first-party** signup/usage events, not a warehouse
(**DATA-6**). FX rates are a **daily indicative** series in DynamoDB, not a trading feed (**DATA-10**).

**Reasoning:** Users edit rent and split groceries. That is OLTP keyed by household/month, not ClickHouse.

**Tradeoffs:**

- **OLTP in DynamoDB vs a time-series store (Timestream) for expenses.** Correct vs a database aimed at metrics.
- **First-party events vs a warehouse (Redshift / Snowflake).** Privacy and cost vs BI this stage does not operate.
- **Daily FX rows vs a market-data time series.** Good enough for display vs trade-execution accuracy this product
  disclaims.

### What are your requirements for consistency, availability, and partition tolerance?

**Decision:** Under conflict, **latest write** (strong DynamoDB reads) for session, paid-plan, household membership, and
get-before-edit. **Slightly stale** reads MAY be used for list/calendar (**D2-A**). Edits use **version checks**; silent
last-write-wins MUST NOT be the default (**DATA-2**, **DATA-5**). Single-region: availability of one AZ is managed by
AWS; a regional partition is a disaster, not an active-active CAP choice.

**Reasoning:** A stale paid-plan read can show Plaid to a free user. A household member seeing last month’s calendar
100ms late is acceptable.

**Tradeoffs:**

- **Strong reads on auth/paid paths vs eventual everywhere.** ~2× read cost on those paths vs gate bugs.
- **Versioned 409 vs last-write-wins.** Client must refresh vs silent household overwrites.
- **Single-region CP-ish vs multi-region AP.** Correct money/membership vs surviving a region without restore.

### Are you currently using relational, NoSQL, or other types of databases?

**Decision:** **NoSQL — DynamoDB on-demand**, single table, as the primary store (**DATA-3**). Fits per-user /
per-household calendar access (keyed lookups, not ad-hoc reporting SQL). Cheap when idle; no reserved server.
Relational reporting MUST NOT be required for v1.

**Reasoning:** Calendar and household reads are “get this user’s month / this household’s members.” Aurora or Postgres
would need a minimum size and a capacity plan this product does not have.

**Tradeoffs:**

- **DynamoDB vs Aurora Serverless v2 / RDS Postgres.** Idle ~$0 and managed multi-AZ vs SQL, joins, and a floor price.
- **Single-table vs one-table-per-entity in DynamoDB.** Fewer hot-partition surprises vs more familiar tables.
- **NoSQL now vs “add Postgres for reports later.”** Avoids two sources of truth in v1 vs a later sync job.
- **On-demand vs provisioned DynamoDB.** Unknown load vs cheaper unit cost at high steady load.

### Do you require multi-region database replication or failover?

**Decision:** No. Database copies in a second region MUST NOT be required (**DATA-4**).

**Reasoning:** Global tables would force conflict rules on household version checks and a standing replica bill.

**Tradeoffs:**

- **Single-region vs DynamoDB global tables.** Simpler conflicts vs regional RTO minutes.
- **Cold restore vs Aurora global database.** Matches DR-2 vs a relational stack v1 did not pick.

### How often is your data updated, and by how many concurrent users?

**Decision:** Household entities MUST support on the order of **≤ ~5 concurrent writers**. Saves **fail if someone else
wrote first** (DynamoDB condition) and return HTTP **409** so the client can refresh (**D5-A**). Locks that block other
writers MUST NOT be required. Live collaborative editing MUST NOT be required (**CX-2**).

**Reasoning:** A household is a family, not a thousand-writer auction. Optimistic versioning keeps the calendar usable
when two people edit rent.

**Tradeoffs:**

- **Optimistic 409 vs pessimistic locks.** No frozen calendar vs more client UX on conflict.
- **~5 writers vs unbounded collaboration (OT/CRDT).** Fits paid share vs a realtime-edit product.
- **Webhook-driven Plaid updates vs a poll every minute.** Fewer Item calls vs fresher balances when webhooks fail
  (manual sync remains).

### Do you need analytics or business intelligence integration?

**Decision:** **First-party only (A1)**: signup and usage steps in DynamoDB and/or CloudWatch metrics, internal user
ids — not raw emails. MUST NOT send bank amounts or memos to third-party analytics. Third-party product analytics MUST
NOT be required; event names SHOULD stay stable if a SaaS is added later (**DATA-6**, **CMP-12**).

**Reasoning:** Bank memos in Mixpanel are a privacy incident. A warehouse (Fivetran/dbt) is a second data plane.

**Tradeoffs:**

- **First-party vs Mixpanel/Amplitude.** Weaker product analytics vs not leaking finance payloads.
- **Stable event names vs rename-later.** A little discipline vs a migration if a SaaS is added.
- **No BI tool vs QuickSight on DynamoDB export.** Less toil vs reports the operator can already get from audit events.

### Are there migration plans for legacy databases?

**Decision:** No. New product; no existing users to import (**DATA-7**).

**Reasoning:** There is no Mint CSV import as a v1 requirement. Inventing a migration would be scope.

**Tradeoffs:**

- **Greenfield vs CSV import from other finance apps.** Faster v1 vs a parser/support surface.
- **No dual-write vs migrating from a prototype SQL dump.** One store vs a one-off ETL.

Repeating items are stored as **rules** and expanded when the calendar loads (**DATA-9**). Paid users see a **combined
timeline** of manual + Plaid; free users see manual/repeating only (**DATA-8**). FX: Frankfurter daily → DynamoDB; PWA
may cache locally ≤ 24 hours; **no Redis** (**DATA-10**, **DATA-16**). Plaid: Transactions + Balances, **webhooks only**
plus obvious **manual sync** (**DATA-11**, **DATA-14**). Email: managed service with bounce/complaint handling — Amazon
Simple Email Service (SES) (**DATA-13**).

**Tradeoffs (data paths):**

- **Expand-on-load vs materializing occurrences.** See performance pain points.
- **Frankfurter + DynamoDB vs Redis or a paid FX API.** One less cluster vs sub-minute rates this product disclaims.
- **Webhook-only Plaid vs a catch-up cron.** Lower Item cost vs missed events if webhooks are unhealthy (alarms +
  in-app message + manual sync cover that).
- **SES vs SendGrid / Postmark.** AWS-native bounce metrics vs easier inbox placement as a new domain.

---

## 17. Session and State Management

### Do you need to persist user sessions across services or deployments?

**Decision:** Yes. Authenticated sessions MUST survive redeploys and MUST work on any API instance without pinning a
user to one server (**SESS-1**).

**Reasoning:** Lambda instances are replaced on every deploy and scale event. In-memory sessions would log everyone out.

**Tradeoffs:**

- **Durable session vs memory on the instance.** Survives deploy vs simpler until the first release.
- **One session story for HTTP + WebSocket vs binding login to the socket.** Phone lock should not log people out.

### How do you currently manage state (e.g., cookies, databases, caching)?

**Decision:** The website API sets an **HttpOnly secure cookie** (JavaScript cannot read the session). Browser-readable
access tokens MUST NOT be the primary session (**SESS-2**). Lasting budget data is in DynamoDB. UI calendar state MAY be
client-side (**SESS-5**). FX may cache in the PWA ≤ 24 hours, not tied to the 30-day auth session (**DATA-10**).

**Reasoning:** A token JavaScript can read is stolen by Cross-Site Scripting (XSS). A Backend-for-Frontend cookie is
the PWA pattern. Caching the calendar as “truth” was rejected (**CX-8a**).

**Tradeoffs:**

- **HttpOnly cookie vs access token in `localStorage`.** Harder XSS theft vs easier native/mobile later.
- **Server budget data vs local-only PWA cache as source of truth.** Correct vs offline-first that can lie about money.
- **No Redis cache vs ElastiCache in front of DynamoDB.** One less cluster vs shaving milliseconds at S0.

### Is session affinity or sticky sessions a requirement?

**Decision:** Pinning a user to one server MUST NOT be required (**SESS-3**).

**Reasoning:** There is no stable server. Stickiness would fight Lambda.

**Tradeoffs:**

- **No affinity vs ALB sticky sessions to ECS tasks.** Correct vs a container world this stack is not.
- **Session version in DynamoDB vs stickiness + memory.** Extra read vs pinning.

### Are user sessions expected to persist across regions?

**Decision:** Copying sessions to a second region MUST NOT be required (**SESS-4**). After regional restore, people MAY
need to sign in again.

**Reasoning:** Sessions in a second region are unused while the database is single-region. Restoring login+calendar
first does not require cloning cookies.

**Tradeoffs:**

- **Re-login after DR vs replicating session records.** Simpler restore vs “still logged in” after a regional disaster.
- **No global session store vs Cognito in two regions.** Matches SEC-3 vs dual user pools.

### Will this application rely on server-side or client-side state?

**Decision:** Auth session is **server-issued** (HttpOnly cookie). Lasting expense and budget data is **server-side** in
DynamoDB. UI calendar layout/filters MAY be client-side (**SESS-5**). WebSocket is a **notice pipe**; it can drop
without killing the HTTP cookie.

**Reasoning:** Binding login to a WebSocket would log people out on every phone lock. Client-side-only budgets would
fail household share and delete-everywhere.

**Tradeoffs:**

- **Server-side records vs local-first CRDT.** Household share and purge work vs offline edit conflicts.
- **Cookie + optional UI state vs Redux-as-source-of-truth.** Refreshable vs stale money on disk.

### How long should session data be retained?

**Decision:** Absolute lifetime **30 days**. Idle timeout MUST NOT be required (absolute expiry only) (**SESS-6**). No
anonymous server session (**SESS-8**).

**Reasoning:** A 15-minute idle timeout is bank-like and fights “remember me” on a PWA people open daily. Thirty days
is the remember-me window; sensitive events still revoke other sessions.

**Tradeoffs:**

- **30-day absolute vs idle-15-minute bank UX.** Less annoying vs stolen laptop stays signed in longer.
- **No idle timeout vs idle + absolute.** Simpler vs more session records to explain.
- **No anonymous session vs pre-signup cookie.** Less tracking vs easier funnel analytics.

### Do you require shared session stores (e.g., Redis, DynamoDB)?

**Decision:** Session payload MAY be in an encrypted cookie and/or referenced server-side. A **per-user session version**
(or equivalent) in **DynamoDB** MUST support log-out-everywhere and selective invalidation. **Redis MUST NOT** be
required (**SESS-7**). Normal new login MUST NOT invalidate other sessions; MFA enable, recovery, email/IdP change, and
explicit secure-account actions MUST (**SESS-8**).

**Reasoning:** Redis would be a second cluster only for sessions. The version number makes revoke work on every Lambda
instance without storing a full session blob if the cookie already carries it.

**Tradeoffs:**

- **DynamoDB session version vs ElastiCache Redis.** No extra cluster vs a familiar session store.
- **Cookie + version vs server-only session table.** Fewer round trips vs all session data always in DynamoDB.
- **Revoke on sensitive events vs revoke on every new login.** Multi-device stays signed in vs “one device only” like
  some banks.

---

## Choice index (services)

| Need                           | Choice                                     | IDs                 |
| ------------------------------ | ------------------------------------------ | ------------------- |
| Primary records                | DynamoDB on-demand                         | STO-1, DATA-3       |
| Website files + receipt photos | S3 + CloudFront (Origin Access Control)    | STO-5, CPU-2a       |
| Website API                    | Lambda + API Gateway HTTP API              | CPU-2               |
| Live notices                   | API Gateway WebSocket + Lambda             | CPU-2, CPU-10       |
| Login                          | Cognito + Google + Apple + magic link      | AUTH-2              |
| Session                        | HttpOnly cookie + DynamoDB session version | SESS-2, SESS-7      |
| Email                          | SES                                        | DATA-13             |
| Secrets                        | SSM Parameter Store SecureString           | SEC-8               |
| Logs / metrics / alarms        | CloudWatch + SNS email                     | MON-5, MON-3        |
| Infra                          | CDK; staging + production accounts         | CX-4, CX-5          |
| DNS                            | Route 53; `app.` / `gateway.`              | DNS-2, DNS-6        |
| Cards                          | Stripe Checkout + Customer Portal          | CMP-1a              |
| Bank sync                      | Plaid webhooks + manual sync               | DATA-14             |
| FX                             | Frankfurter → daily DynamoDB + 24h PWA cache | DATA-10, DATA-16  |
| DR                             | Weekly snapshot; PITR off; cold restore    | STO-6, DR-2         |
| Compute architecture           | ARM Lambda; no EC2/ECS/EKS/GPU             | CPU-2, CPU-4, CPU-7 |
