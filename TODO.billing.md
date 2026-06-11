# Billing TODO

Monetization for Balance: freemium tiers, Stripe subscriptions, Cognito identity. Entitlements live in Mongo `users.subscription`; Stripe is payment source of truth synced via webhooks.

## Architecture

- **Cognito** — sign-up, login, JWT on API requests (existing).
- **Stripe** — Checkout, Customer Portal, subscriptions, trials, webhooks.
- **Mongo `users`** — `stripeCustomerId` + `subscription` (tier, status, period end). API enforces limits; never trust the client.

```
Cognito sub → users.cognitoSub → users.stripeCustomerId → Stripe Customer
Stripe webhook → API → users.subscription
```

See API stubs: `api/src/billing/`, `api/src/auth/user.repository.ts`.

---

## Tier table

| Capability | **Free** | **Plus** $6/mo · $60/yr | **Pro** $12/mo · $120/yr |
|---|---|---|---|
| Manual budgets (recurring events) | Up to 15 | Unlimited | Unlimited |
| Calendar view | Current + 1 past month | Unlimited history | Unlimited history |
| Categories | Default + custom | Custom | Custom |
| Income / expense summary | Current month only | All months | All months + trends |
| Bank linking (Plaid) | — | Up to 2 institutions | Unlimited institutions |
| Transaction sync | — | Daily | Daily + manual refresh |
| Planned vs actual on calendar | — | ✓ | ✓ |
| Transaction categorization | — | Auto + manual | Auto + rules (future) |
| CSV / Excel import | — | ✓ | ✓ |
| Export (CSV) | — | ✓ | ✓ |
| Alerts (overspend, low balance) | — | Email | Email + push (future) |
| Household / shared calendar | — | — | Up to 2 members (future) |
| API access | — | — | ✓ (future) |
| Support | Community | Email | Priority |

### Stripe products (to create)

| Product | Price IDs (env vars) |
|---|---|
| Plus monthly | `STRIPE_PRICE_PLUS_MONTHLY` |
| Plus annual | `STRIPE_PRICE_PLUS_ANNUAL` |
| Pro monthly | `STRIPE_PRICE_PRO_MONTHLY` |
| Pro annual | `STRIPE_PRICE_PRO_ANNUAL` |

Recommended: 14-day trial on Plus annual/monthly.

---

## Current state

- [x] `UserDocument` extended with `stripeCustomerId` + `subscription`
- [x] Billing route stubs (`GET /billing/subscription`, checkout/portal/webhook placeholders)
- [x] `requireEntitlement()` helper for route gating
- [x] Stripe SDK + env configuration (`billing/env.helper.ts`, `api/.env.stripe.example`)
- [x] Checkout and Customer Portal implementations (`billing/stripe.client.ts`)
- [x] Webhook signature verification + event handlers (`billing/webhook.handler.ts`)
- [ ] Client billing page and upgrade prompts
- [ ] Enforce limits on Free tier (budget count, history, Plaid)

---

## Phase 0 — Product readiness (before charging)

- [ ] **Budget vs actual** — Plaid transactions on calendar; monthly Income / Expenses / Net summary
- [ ] **Edit / delete budgets** from calendar
- [ ] **Plaid UX** — list institutions, unlink, link/sync error surfaces
- [ ] **Reliable create flow** — modal → `POST /events` → calendar refresh
- [ ] **Pricing page** — Free vs Plus vs Pro, even before live checkout

---

## Phase 1 — Billing foundation

### Stripe setup

- [ ] Create Stripe account + products/prices (see table above)
- [ ] Store `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, price IDs in Secrets Manager / `.env.local.secrets`
- [ ] Enable Stripe Customer Portal (cancel, update card, switch plan)
- [ ] Configure webhook endpoint: `POST /billing/webhooks/stripe`
- [ ] Handle events: `checkout.session.completed`, `customer.subscription.created|updated|deleted`, `invoice.payment_failed`

### API (`api/src/billing/`)

- [x] `GET /billing/subscription` — current tier/status for authenticated user
- [ ] `POST /billing/checkout` — body `{ priceId }` → Stripe Checkout Session URL
- [ ] `POST /billing/portal` — Stripe Customer Portal URL
- [ ] `POST /billing/webhooks/stripe` — raw body + signature verify → update `users.subscription`
- [ ] `npm install stripe` and wire `stripe.client.ts`
- [ ] Map Stripe Price ID → `plus` | `pro` in `billing/constants.ts`
- [ ] Create Stripe Customer on first checkout; persist `stripeCustomerId` on user
- [ ] Pass `cognitoSub` in Checkout Session `metadata` / `client_reference_id`

### Database

- [x] `users.subscription` shape + default `free` on insert
- [x] Index `{ stripeCustomerId: 1 }` (sparse)
- [ ] Migration script: backfill `subscription: { tier: 'free', status: 'none' }` for existing users

### Auth / infra

- [x] Exempt `POST /billing/webhooks/stripe` from Cognito JWT (signature auth instead)
- [ ] CDK / GitHub Actions: deploy webhook URL, inject Stripe secrets into API task

---

## Phase 2 — Enforce limits

- [ ] **Budget count** — reject `POST /events` with `eventType: budget` when Free user has ≥15 active budgets
- [ ] **Calendar history** — Free: clamp `GET /events/calendar` to current month + 1 prior
- [ ] **Plaid items** — `requireEntitlement('plus')` on `POST /plaid/link-token` and `exchange-token`
- [ ] **Plaid item count** — Plus: max 2 active `plaid_items`; Pro: unlimited
- [ ] **Sync** — Free: no sync; Plus: daily; Pro: daily + on-demand `POST /plaid/sync`
- [ ] **Import / export** — `requireEntitlement('plus')` on upload and export routes (when built)

---

## Phase 3 — Client

- [ ] `BillingService` + signal store (`tier`, `status`, `currentPeriodEnd`)
- [ ] `/settings/billing` — plan, upgrade buttons, “Manage subscription” → Portal
- [ ] Upgrade modals at limit surfaces (bank link, 16th budget, older months)
- [ ] Post-checkout: `success_url` → poll `GET /billing/subscription` until webhook lands
- [ ] Trial banner (“X days left”)
- [ ] Hide or disable Plaid menu items when tier &lt; Plus

---

## Phase 4 — Growth & Pro

- [ ] Annual plan emphasis on pricing page (2 months free)
- [ ] Trial expiration / payment failed emails (Stripe dunning + product emails)
- [ ] Usage metrics: link rate, budgets created, WAU
- [ ] Pro: household sharing, category rules, API keys

---

## Economics (sanity check)

| Tier | Price | Rough Plaid cost | Notes |
|---|---|---|---|
| Free | $0 | $0 | No bank linking |
| Plus | $6/mo | ~$1–2 (2 items) | Primary revenue tier |
| Pro | $12/mo | ~$2–4 | Higher limits + future features |

---

## Related docs

- `TODO.client.md` — balances, planned vs actual, premium guards
- `TODO.api.md` — Plaid, events, upload
- `TODO.database.md` — `users` collection
- `infrastructure/README.md` — Cognito CDK outputs
