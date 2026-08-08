# `@balance/domain`

Shared **persistence models**, guards, and client-safe helpers for Balance. Wire types for HTTP live in [`@balance/schemas`](../schemas/) — keep those concerns separate.

## What lives here

| Area | Contents |
|------|----------|
| `data/` | Document shapes (budget, event, occurrence expansion) |
| `domain/` | Calendar types, Plaid models, pagination, user, guards |
| `crypto` | Encrypted value typing |
| `util` | Generic TypeScript utilities |
| `client` | Angular-safe exports (no rrule default import) |

## Usage

```typescript
// API / scripts
import type { EventDocument, BudgetDocument } from '@balance/domain';
import { expandOccurrenceDates } from '@balance/domain';

// Angular client
import type { CalendarEvent } from '@balance/domain/client';
import { isBudget } from '@balance/domain/client';
```

Build after editing `src/`:

```bash
npm run build:domain   # from repo root
# or
npm run build -w @balance/domain
```

`prepare` runs the build on `npm install`. Docker Compose watch syncs this package into the API and client containers.

## Related

- [`@balance/schemas`](../schemas/) — TypeBox wire schemas
- [API README](../../api/README.md) — DynamoDB entities and event expansion
- [Client README](../../client/README.md) — imports `@balance/domain/client` directly
