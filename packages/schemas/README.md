# `@balance/schemas`

Shared **TypeBox** schemas and HTTP wire types for the Balance API and client. This package is the source of truth for request/response shapes — not persistence models.

## What lives here

| Module | Contents |
|--------|----------|
| `common` | Problem Details, ping, security metadata |
| `auth` | Login/callback/logout query + `/auth/me` response |
| `events` | Create/patch/get event bodies, calendar wire types |
| `categories` | Category list response |
| `plaid` | Link token, exchange, sync payloads |
| `billing` | Checkout, subscription, webhook responses |
| `constants` | Budget types, recurrence frequencies |
| `client` | Client-safe re-exports (no server-only helpers) |

## Usage

```typescript
// API routes
import { createEventBodySchema, type CreateEventBody } from '@balance/schemas/events';

// Angular client (prefer @core/domain wrapper)
import type { CalendarEventWire } from '@balance/schemas/client';
```

Build after editing `src/`:

```bash
npm run build:schemas   # from repo root
# or
npm run build -w @balance/schemas
```

`prepare` runs the build on `npm install`.

## Related

- [`@balance/domain`](../domain/) — persistence models and runtime helpers
- [API README](../../api/README.md) — route schemas wired into Fastify/Swagger
- [Client README](../../client/README.md) — `@core/domain` re-exports
