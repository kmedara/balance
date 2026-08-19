# Balance — STRIDE threat model (v1)

Living threat model for the architecture in [requirements.md](./requirements.md).
**TM2:** full Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege
(STRIDE) pass for v1; update when major features ship.

**System (v1):** TypeScript Progressive Web App (PWA) (Amazon Simple Storage Service (S3) / Amazon CloudFront) →
Backend for Frontend (BFF) (AWS Lambda + Amazon API Gateway HTTP + WebSocket) → Amazon DynamoDB; Amazon Cognito
(Google/Apple + custom magic link); Plaid; Stripe; Amazon Simple Email Service (SES); Frankfurter Foreign Exchange
(FX); Google ads (free tier only).

**Trust boundaries:** Browser ↔ CloudFront/API; API ↔ Cognito/DynamoDB/SSM; API ↔ Plaid/Stripe/SES/Frankfurter; Webhooks → API.

---

## STRIDE summary

| Category | Priority threats (v1) | Main mitigations |
|----------|----------------------|------------------|
| **S** Spoofing | Stolen session; forged webhooks; fake Open Authorization (OAuth) | HttpOnly secure cookie + session epoch; verify Plaid/Stripe signatures; Cognito OAuth / Proof Key for Code Exchange (PKCE) |
| **T** Tampering | Insecure Direct Object Reference (IDOR) on events/household; entitlement bypass | AuthZ on every query (user/household); server-side entitlement checks; hybrid Role-Based Access Control (RBAC) / Attribute-Based Access Control (ABAC) |
| **R** Repudiation | “I didn’t change that” / billing disputes | Audit-relevant logs (auth, entitlement, admin-like actions); Stripe as billing SoR |
| **I** Info disclosure | Cross-user data; Plaid tokens; logs with secrets | Partition by user; encrypt tokens; 7d log retention; no transaction payloads in analytics |
| **D** DoS | API flood; webhook flood; expensive calendar expand | API Gateway throttling; idempotent webhooks; bound expand window; L1 errors under load |
| **E** Elevation | Free→paid feature without pay; household privilege climb | Entitlements from Stripe; Owner/Editor/Viewer checks; paid-only Plaid |

---

## S — Spoofing identity

| ID | Threat | Impact | Mitigations | Status |
|----|--------|--------|-------------|--------|
| S1 | Attacker steals BFF session cookie (Cross-Site Scripting (XSS)/malware) | Full account access | HttpOnly Secure cookie; Content Security Policy (CSP); no tokens in JS; revoke-all + session epoch; Multi-Factor Authentication (MFA) optional | Required |
| S2 | Magic-link token replay / leak via Referer | Account takeover | One-time links; short TTL; HTTPS only; don’t log full tokens | Required |
| S3 | Forged Plaid/Stripe webhooks | False sync/billing state | Signature verification; reject invalid; idempotency keys | Required |
| S4 | OAuth redirect / mix-up | Login as wrong user | Cognito + registered redirect URIs; state/PKCE | Required |
| S5 | WebSocket connect as another user | Cross-user realtime events | Auth on connect; authorize subscriptions by user id | Required |

---

## T — Tampering with data

| ID | Threat | Impact | Mitigations | Status |
|----|--------|--------|-------------|--------|
| T1 | IDOR: read/write another user’s events | Data breach / fraud feel | Every data access scoped by authenticated user (or household membership) | Required |
| T2 | Escalate household role (Viewer→Owner) | Unauthorized sharing | Server-side role checks; only paid Owner invites | Required |
| T3 | Client toggles `adsEnabled` / plan locally | Free access to paid features | Entitlements only from server/Stripe; never trust client | Required |
| T4 | Tamper with delete/purge APIs | Data retention / incomplete wipe | Server-only delete APIs; HP1 hard purge; sweeper validates ownership | Required |
| T5 | Mutate FX rates client-side for display fraud | Misleading UI (low $ impact) | Server ratesAsOf; treat client cache as untrusted for authoritative convert | Required |

---

## R — Repudiation

| ID | Threat | Impact | Mitigations | Status |
|----|--------|--------|-------------|--------|
| R1 | User denies subscription change | Support/chargeback | Stripe Customer Portal + webhooks as source of truth; log entitlement changes | Required |
| R2 | User denies household invite/accept | Access disputes | Log invite send/accept/revoke with actor ids | Required |
| R3 | Operator denies production change | System and Organization Controls 2 (SOC 2) gap | Git + CI for deploys; no unsigned console changes as norm | Required |

---

## I — Information disclosure

| ID | Threat | Impact | Mitigations | Status |
|----|--------|--------|-------------|--------|
| I1 | Cross-tenant DynamoDB read | Severe Personally Identifiable Information (PII)/financial leak | Strict key design + authZ tests; Static Application Security Testing (SAST) / Dynamic Application Security Testing (DAST) | Required |
| I2 | Plaid access token in logs/errors | Bank link compromise | Never log tokens; SSM secrets; encrypt at rest | Required |
| I3 | Session secret / Stripe key in repo | Full compromise | AWS Systems Manager (SSM) SecureString; gitignore; Software Composition Analysis (SCA) | Required |
| I4 | Verbose errors leak stack/PII | Recon / privacy | Problem Details without internals in prod | Required |
| I5 | Analytics/ads exfiltrate finance data | General Data Protection Regulation (GDPR) / California Consumer Privacy Act (CCPA) risk | First-party funnel only; no amounts/memos; Consent Management Platform (CMP) for ads | Required |
| I6 | CloudFront/S3 listing or open bucket | Asset/source leak | Private bucket + Origin Access Control (OAC) | Required |

---

## D — Denial of service

| ID | Threat | Impact | Mitigations | Status |
|----|--------|--------|-------------|--------|
| D1 | Unauthenticated flood on API/login | Outage | API Gateway throttling; Cognito rate limits; Web Application Firewall (WAF) later optional | Required (throttle) |
| D2 | Webhook storm | Lambda cost / lag | Verify + idempotent short-circuit; alarm on volume | Required |
| D3 | Pathological calendar expand (huge rrule range) | CPU/timeout | Bound query window (e.g. month); validate rrule | Required |
| D4 | Attachment upload abuse (paid) | S3 cost | Size/type limits; authZ; quotas per user | Required |

---

## E — Elevation of privilege

| ID | Threat | Impact | Mitigations | Status |
|----|--------|--------|-------------|--------|
| E1 | Call Plaid link as free user | Unpaid bank access / Plaid Item cost | Server block free from Plaid; trial/paid entitlement | Required |
| E2 | Skip trial card / forge trial | Paid features free | Stripe trial with card (C1); webhook-driven entitlements | Required |
| E3 | Abuse one-trial-per-account via new accounts | Cost abuse | Monitor; device/email heuristics later; accept residual risk | Partial |
| E4 | Continuous Integration (CI) role too broad | Infra takeover | GitHub OpenID Connect (OIDC) least privilege; no long-lived AWS keys | Required |
| E5 | GuardDuty/Analyzer off forever | Missed detections | Flag supported; **on before public launch** | Required |

---

## Trusting third parties

| Party | Residual risk | Handling |
|-------|---------------|----------|
| Cognito | IdP outage / misconfig | Error; status page |
| Plaid | Bank data accuracy / their breach | Encrypt tokens; minimize scope; ToS |
| Stripe | Billing correctness | Webhooks + Customer Portal |
| SES | Phishing lookalike | SPF/DKIM/DMARC when domain live |
| Frankfurter | Stale/wrong FX | Indicative only; ratesAsOf disclosed |
| Google ads | Tracking / policy | CMP; adapter; paid = no ads |

---

## Validation mapping

| Control | Threats covered |
|---------|-----------------|
| Semgrep / SCA on PR to `main` | I3, E4 (deps), code smells → T/I |
| ZAP/Nuclei DAST | S/T/I classes on live app |
| PT2 self assessment | Breadth before launch |
| External pen test (later) | Independent validation |
| CloudWatch alarms | D1–D2 detection |
| Entitlement middleware | T3, E1–E2 |

---

## Revision log

| Date | Change |
|------|--------|
| 2026-08-05 | Initial STRIDE model (TM2) from requirements workshop |
