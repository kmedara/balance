# Client TODO

Angular 21 app (`/client`) for personal budget planning: calendar view, budgets, bank linking, and file import.

## Current state

- [x] Zoneless app with PrimeNG + Tailwind
- [x] Gateway HTTP client with base URL interceptor
- [x] Calendar month grid with budget items per day
- [x] Modal system (shell, context, NgRx Signal Store event log)
- [x] Add-budget modal (form, category autocomplete)
- [x] Budget Signal Store (category load + partial events)
- [x] Plaid Link flow (service-level)
- [x] User actions menu (add budget, connect bank)
- [x] Excel parse stub in file-upload service
- [ ] Budget list loaded from API into calendar
- [ ] Balances view (empty component)
- [ ] Persist create-budget through API

---

## Features

### Calendar & budgets

- [ ] Wire `BudgetStore` `load` event to `GET /budgets` and populate calendar
- [ ] Refresh calendar when modal submits (`BudgetEvents.create` → `created`)
- [ ] Edit budget from calendar item (open modal with existing data)
- [ ] Delete budget from calendar or detail view
- [ ] Filter calendar by income vs expense
- [ ] Navigate months without duplicating week rows (regenerate vs patch)
- [ ] Tooltip / detail panel for budget on hover (partially started)
- [ ] Color coding by category (partially in `budget-calendar-item`)

### Add / edit budget modal

- [ ] Complete `BudgetEvents.create` → API → `created` reducer flow
- [ ] Filter category suggestions by autocomplete query (client or API)
- [ ] Currency input component on amount field
- [ ] Optional end date and description fields in form
- [ ] Validation messages and disabled submit while saving
- [ ] Support edit mode via `MODAL_DATA`

### Balances & accounts

- [ ] Implement balances route and navigation entry
- [ ] Show Plaid-linked accounts and balances
- [ ] Compare budgeted vs actual spending
- [ ] Account-level drill-down

### Plaid integration

- [ ] Load Plaid Link script reliably (SSR-safe)
- [ ] Move Plaid state to Signal Store (replace `PlaidService` signals)
- [ ] Surface link errors in UI
- [ ] List and unlink connected institutions

### File upload

- [ ] Finish Excel import: map columns → `Budget`, dispatch create events
- [ ] Upload to `POST /upload` or batch create via store
- [ ] Preview imported rows before commit
- [ ] Import progress and per-row error display

### State management (NgRx Signal Store)

- [ ] Finish `BudgetStore`: load, create, filter, loading/error state
- [ ] Split API events (`budgetCreated`, `loadSucceeded`) from UI events
- [ ] Connect `ModalEvents.submitted` to budget create (or keep domain-only events)
- [ ] `CalendarEvents` for month navigation and date range filter
- [ ] Inject stores at app root where reducers must be active before first dispatch

### Routing & layout

- [ ] Add balances (and future) routes to `web.ts` / navigation resolver
- [ ] Fix wildcard redirect (`dashboard` → `calendar`)
- [ ] Mobile layout parity with web layout
- [ ] Premium guard wiring (`premium.canActivate`) if needed

### UX & polish

- [ ] Toast notifications for success/error (PrimeNG Toast + `ToastEvents`)
- [ ] Global loading indicator for store `isLoading`
- [ ] Empty states on calendar and balances
- [ ] Accessible modal focus trap and keyboard cancel
- [ ] Dark mode / theme tokens

### Testing & tooling

- [ ] Vitest coverage for `BudgetStore`, calendar utils, modal service
- [ ] Component tests for add-budget and calendar
- [ ] E2E smoke: open modal, create budget, see on calendar
- [ ] Environment config for production gateway URL

---

## Technical debt

- [ ] Use `GATEWAY_HTTP_TOKEN` consistently (remove raw `environment.GATEWAY` in file-upload)
- [ ] Consolidate modal token paths (`@modals/` vs `@modules/modal/`)
- [ ] Remove dead `BudgetService` if fully replaced by store
- [ ] Clean up add-budget template placeholders (autocomplete item template)
