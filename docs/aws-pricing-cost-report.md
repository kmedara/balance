# Balance — AWS Price List Cost Report

[Source](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/using-the-aws-price-list-api.html)

OnDemand list prices from the **Amazon Web Services (AWS) Price List API** (`us-east-1`, retrieved 2026-08-17 via the
AWS Pricing Model Context Protocol (MCP)). Cloud Development Kit (CDK) inventory came from `infrastructure/`. This is a
**planning estimate**, not a bill. Non-AWS fees stay in [cost-estimate.md](./cost-estimate.md).

**Pricing model:** OnDemand only (COST-5: no Savings Plans / Reserved Instances for v1).

---

## Headline

| Scenario                         | Monthly Active Users (MAU) | Application Programming Interface (API) req / mo | **AWS / month** |
|----------------------------------|---------|--------------|-----------------|
| **S0** Solo / friends            | 10      | 15,000       | **$1.83**       |
| **S1** Early public              | 200     | 375,000      | **$6.50**       |
| **S2** Slow growth               | 2,000   | 3,750,000    | **$46.83**      |
| **S3** Modest                    | 10,000  | 37,500,000   | **$310.09**     |

The **$50/month** AWS Budget (COST-6) covers S0–S1 with room, sits on S2 (~$47), and misses S3.

Workshop ranges in [cost-estimate.md](./cost-estimate.md) were **$10–60** (S1) and **$50–230** (S2). Price List
midpoints land at the **low end** of those bands because HTTP API, ARM Lambda, and DynamoDB on-demand are cheap at
this volume. **Plaid Items** are still the line that can dwarf AWS.

---

## Assumptions

- Region **`us-east-1`**, 30-day month, ARM (Graviton) Lambda **512 MB**, **300 ms** average duration
- API midpoints from the cost-estimate request sketch: S0 500/day ? S1 12,500/day ? S2 125k/day ? S3 1.25M/day
- Calendar-heavy reads: **8 DynamoDB Read Request Units (RRU)** per API request; **~100 Write Request Units (WRU)** per
  MAU/month
- Progressive Web App (PWA) via Amazon CloudFront US: S0 **5 MB** / 40 HTTPS per Daily Active User (DAU); S1–S3 **8 MB** /
  80 HTTPS per DAU
- **Amazon Cognito Lite** list price **$0.0055/MAU** with **no** 50k MAU free credit applied (Stock Keeping Unit (SKU)
  starts at the first MAU)
- Amazon CloudWatch: S0 0.5 GB ? S1 2 GB ? S2 15 GB ? S3 80 GB ingest; **8** standard alarms in every scenario
- Point-in-Time Recovery (PITR) **off**; weekly on-demand Amazon DynamoDB backup retain **1**
- Amazon EventBridge schedules and Amazon Simple Notification Service (SNS) API calls stay inside published free quantities
- Single production account; staging duplicate not included
- CloudFront **OnDemand** (not the Free/Pro/Business monthly plans)

---

## Unit prices (`us-east-1`, OnDemand)

| Service                    | Meter                                              | Price                                      |
|----------------------------|----------------------------------------------------|--------------------------------------------|
| Lambda ARM                 | Duration (tier 1)                                  | **$0.0000133334** / GB-s                   |
| Lambda ARM                 | Requests                                           | **$0.0000002** / request                   |
| HTTP API                   | Requests (first 300M)                              | **$1.00** / million                        |
| WebSocket                  | Messages (first 1B)                                | **$1.00** / million                        |
| WebSocket                  | Connection-minutes                                 | **$0.25** / million                        |
| DynamoDB                   | RRU                                                | **$0.125** / million                       |
| DynamoDB                   | WRU                                                | **$0.625** / million                       |
| DynamoDB                   | Storage                                            | **$0** first 25 GB-mo, then **$0.25**/GB-mo |
| DynamoDB                   | On-demand backup                                   | **$0.10** / GB-mo                          |
| DynamoDB                   | PITR (off; listed for comparison)                  | **$0.20** / GB-mo                          |
| S3 Standard                | Storage (first 50 TB)                              | **$0.023** / GB-mo                         |
| CloudFront US              | Data transfer out (first 10 TB)                    | **$0.085** / GB                            |
| CloudFront US              | HTTPS requests                                     | **$0.01** / 10,000                         |
| Cognito Lite               | MAU (tier 1)                                       | **$0.0055** / MAU                          |
| SES                        | Recipients                                         | **$0.0001** / recipient                    |
| Route 53                   | Hosted zone (first 25)                             | **$0.50** / zone-mo                        |
| CloudWatch                 | Standard log ingest                                | **$0.50** / GB                             |
| CloudWatch                 | Standard alarm                                     | **$0.10** / alarm-mo                       |
| EventBridge                | Scheduled invocations                              | **$0** first 14M, then **$1** / million    |
| SNS                        | API requests                                       | **$0** first 1M, then **$0.50** / million  |
| CloudFront Plans           | Free / Pro / Business (alternative SKUs)           | **$0** / **$15** / **$200** / mo           |

Lambda Price List SKUs have **no** $0 first tier. AWS also publishes a perpetual **1M requests + 400k GB-s**
always-free allowance that is **not** in those SKUs — see the footnote under the scenario table.

---

## S1 calculation (early public, 200 MAU)

| Service                         | Usage                                              | Calculation                                      | Cost     |
|---------------------------------|----------------------------------------------------|--------------------------------------------------|----------|
| Lambda ARM                      | 375,000 inv, 56,250 GB-s                           | 375k – $0.0000002 + 56,250 – $0.0000133334       | **$0.83** |
| HTTP API                        | 375,000 requests                                   | 375,000 – $0.000001                              | **$0.38** |
| WebSocket                       | 12,000 messages + 24,000 minutes                   | 12k – $1/M + 24k – $0.25/M                       | **$0.02** |
| DynamoDB                        | 3.0M RRU, 20k WRU, 5 GB store, 5 GB backup         | 3.0M – $0.125/M + 20k – $0.625/M + $0 + 5 – $0.10 | **$0.89** |
| S3 Standard                     | ~2 GB (PWA + receipts)                             | 2 – $0.023                                       | **$0.05** |
| CloudFront                      | ~9.4 GB US out + 96,000 HTTPS                      | 9.4 – $0.085 + 96k – $0.000001                   | **$0.89** |
| Cognito Lite                    | 200 MAU                                            | 200 – $0.0055                                    | **$1.10** |
| SES                             | 400 emails                                         | 400 – $0.0001                                    | **$0.04** |
| Route 53                        | 1 hosted zone                                      | 1 – $0.50                                        | **$0.50** |
| CloudWatch                      | 2 GB ingest + 8 alarms                             | 2 – $0.50 + 8 – $0.10                            | **$1.80** |
| EventBridge                     | ~1,440 scheduled invocations                       | Inside 14M free                                  | **$0.00** |
| SNS                             | < 1,000 API requests                               | Inside 1M free                                   | **$0.00** |
| **Total**                       |                                                    |                                                  | **$6.50** |

---

## Monthly cost by scenario (USD)

Rounded to cents. EventBridge and SNS stay **$0** in all four rows.

| Component          | S0     | S1     | S2      | S3       |
|--------------------|--------|--------|---------|----------|
| Lambda ARM         | $0.03  | $0.83  | $8.25   | $82.50   |
| HTTP API           | $0.02  | $0.38  | $3.75   | $37.50   |
| WebSocket          | $0.00  | $0.02  | $0.18   | $0.90    |
| DynamoDB           | $0.12  | $0.89  | $5.38   | $45.88   |
| S3                 | $0.01  | $0.05  | $0.14   | $0.37    |
| CloudFront         | $0.04  | $0.89  | $8.93   | $44.64   |
| Cognito Lite       | $0.05  | $1.10  | $11.00  | $55.00   |
| SES                | $0.01  | $0.04  | $0.40   | $2.00    |
| Route 53           | $0.50  | $0.50  | $0.50   | $0.50    |
| CloudWatch         | $1.05  | $1.80  | $8.30   | $40.80   |
| **AWS total**      | **$1.83** | **$6.50** | **$46.83** | **$310.09** |

S3 DynamoDB storage is **15 GB over** the 25 GB free tier (40 GB table) ? **$3.75** of the $45.88 DDB line.
S0–S2 tables stay inside 25 GB.

**Lambda always-free footnote:** if the account still gets 1M requests + 400k GB-s, Lambda drops to **$0** at S0–S1,
about **$2.72** at S2, and about **$77** at S3. Totals would be ~**$1.80 / $5.67 / $41.30 / $305**.

**CloudWatch alarm footnote:** list price has no free tier. AWS often still grants **10 free** standard alarms; if
so, subtract **$0.80** from every scenario.

---

## What is *not* in these totals

- **Plaid** Item fees, **Stripe** processing, Apple Developer **$99/year**, domain registrar
- System and Organization Controls 2 (SOC 2), pen test, legal review
- **Amazon GuardDuty** (off until public launch; returned SKUs were AWS CloudTrail / Relational Database Service
  (RDS) / malware — not estimated)
- Identity and Access Management (IAM) Access Analyzer and AWS Certificate Manager (ACM) public certs (no charge)
- CloudWatch **dashboards** (SKU not returned this run; commonly **$3/month**)
- Staging account duplicate (~1.5–2× if always on)
- Data transfer beyond CloudFront US egress
- Network Address Translation (NAT) Gateway, Virtual Private Cloud (VPC), Elastic Container Service (ECS) /
  Elastic Kubernetes Service (EKS), Redis (none in the CDK stack — `analyze_cdk_project` listed `ec2` as a false
  positive)

---

## Alternatives considered

**CloudFront Plans** vs OnDemand: Free is **$0** with 100 GB + 1M requests; Pro is **$15**; Business is **$200**.
S0–S2 OnDemand CDN is **$0.04–$8.93**, so **stay OnDemand** (or enroll in Free if the account qualifies). Pro and
Business are overkill until transfer is well past 100 GB.

**PITR vs weekly on-demand backup:** PITR is **$0.20/GB-mo** vs backup **$0.10/GB-mo**. Keep PITR off.

---

## Recommendations

1. Keep CloudWatch log retention at **7 days** – ingest at **$0.50/GB** is the first AWS line that jumps at S2–S3.
2. Do **not** buy CloudFront Pro ($15) or Business ($200) for S0–S2.
3. Confirm Cognito MAU credit in the console; list price Lite is **$0.0055/MAU** from the first user.
4. Leave PITR off; on-demand backup is half the PITR GB-month rate.
5. Stay on **ARM Lambda** and **HTTP API** (already the cheaper SKUs).
6. Keep DynamoDB storage under **25 GB** so storage stays $0.
7. Turn GuardDuty on only before public launch.
8. Keep the **$50** AWS Budget until measured S2 traffic; raise it before a S3-scale push.
9. Tag `Env` / `Service` and review Cost Explorer weekly (COST-3).

---

## Methods

1. `analyze_cdk_project` on `infrastructure/` (Lambda, HTTP API, DynamoDB, S3, CloudFront, Cognito, SES, Route 53,
   EventBridge, SNS, CloudWatch; GuardDuty flagged off).
2. `get_pricing` for those services in **`us-east-1`**, OnDemand terms.
3. `generate_cost_report` for the S1 narrative; S0–S3 rows computed from the same unit prices and the traffic
   sketch in [cost-estimate.md](./cost-estimate.md).

Dashboard SKU query returned no usable product this run and is excluded. GuardDuty SKUs were not mapped to this
serverless stack and are excluded while the feature flag is off.
