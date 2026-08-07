/**
 * Single-table key builders for the `balance` DynamoDB table.
 *
 * Every item uses PK + SK. User-owned rows share a partition (`USER#<cognitoSub>`)
 * so one Query can load profile, events, Plaid items, and accounts for a session.
 * Inverted-index rows (e.g. `TXN#…`) live outside the user partition when lookup
 * must start from an external id (Plaid transaction id, Stripe customer id via GSI).
 *
 * @see infrastructure/lib/database-stack.ts — GSI definitions
 * @see dynamo/entities.ts — item assembly from these keys
 */

import { formatDateKey } from '../data/dates.js';

/** Cognito `sub` — same value as `userId` on events and Plaid records. */
export type UserId = string;

/**
 * `USER#<cognitoSub>`
 *
 * Partition for all data owned by one authenticated user. Colocating profile,
 * events, Plaid links, and accounts under one PK avoids cross-table joins and
 * matches the API’s user-scoped access pattern (calendar, billing, Plaid sync).
 */
export const userPk = (userId: UserId): string => `USER#${userId}`;

/**
 * `PROFILE`
 *
 * Fixed sort key for the single user metadata row (email, subscription, Stripe
 * customer id). One item per user; distinct SK prevents collision with events
 * and Plaid rows on the same partition.
 */
export const profileSk = (): string => 'PROFILE';

/**
 * `EVT#<eventType>#<id>`
 *
 * Sort key for *recurring* events (budgets and other rrule-driven events) under
 * the user partition. `eventType` prefixes allow `begins_with(SK, 'EVT#budget#')`
 * filtering; `id` is a 24-char hex string. Recurrence is stored on the event
 * (`rrule`, `dtstart`) and expanded at read time — no separate occurrence rows.
 *
 * The recurring set is small per user, so the calendar loads all `EVT#` rows
 * and expands them in memory for the requested month.
 */
export const eventSk = (eventType: string, id: string): string => `EVT#${eventType}#${id}`;

/** SK prefix shared by all recurring (`EVT#`) events. */
export const RECURRING_EVENT_SK_PREFIX = 'EVT#' as const;

/** SK prefix shared by all date-anchored (`EVD#`) events. */
export const DATED_EVENT_SK_PREFIX = 'EVD#' as const;

/**
 * `EVD#<YYYY-MM-DD>#<id>`
 *
 * Sort key for *single-occurrence, date-anchored* events — currently Plaid
 * transactions. Embedding the posted date in the SK makes the calendar a
 * bounded `SK BETWEEN` range query instead of loading every transaction a user
 * has ever had. `id` is Plaid’s `transaction_id`. No rrule expansion needed:
 * the event lands on exactly its `dtstart` day.
 */
export const datedEventSk = (date: Date, id: string): string =>
  `${DATED_EVENT_SK_PREFIX}${formatDateKey(date)}#${id}`;

/**
 * Inclusive `SK BETWEEN` bounds for date-anchored events overlapping a calendar
 * grid window. `\uffff` is the largest code point, so the high bound captures
 * every id on the end day.
 */
export const datedEventSkRange = (
  rangeStart: Date,
  rangeEnd: Date,
): { lo: string; hi: string } => ({
  lo: `${DATED_EVENT_SK_PREFIX}${formatDateKey(rangeStart)}`,
  hi: `${DATED_EVENT_SK_PREFIX}${formatDateKey(rangeEnd)}#\uffff`,
});

/**
 * `PLAID#<plaidItemId>`
 *
 * Sort key for a linked Plaid Item (encrypted access token, institution,
 * sync cursor/state). Keyed by Plaid’s item id because that is what webhooks
 * and `/transactions/sync` receive — not our internal uuid.
 */
export const plaidSk = (plaidItemId: string): string => `PLAID#${plaidItemId}`;

/**
 * `ACCT#<plaidAccountId>`
 *
 * Sort key for a cached Plaid Account snapshot (name, balances, type). One row
 * per account under the user partition; upserted after link and during sync.
 */
export const accountSk = (plaidAccountId: string): string => `ACCT#${plaidAccountId}`;

/**
 * `TXN#<plaidTransactionId>`
 *
 * Partition key for an inverted lookup row (not under `USER#…`). Plaid sync
 * receives batches of transaction ids and must resolve existing events without
 * knowing the user partition first. `BatchGetItem` on these keys is O(1) per id.
 *
 * Paired with {@link txnRefSk}; the full event payload stays on the user item
 * referenced by `eventSk` on the REF row.
 */
export const txnRefPk = (plaidTransactionId: string): string => `TXN#${plaidTransactionId}`;

/**
 * `REF`
 *
 * Fixed sort key for Plaid transaction inverted indexes. Only one REF row exists
 * per transaction id; stores `userId` and `eventSk` to reach the canonical event.
 */
export const txnRefSk = (): string => 'REF';

/**
 * `CONFIG`
 *
 * Partition for application-wide configuration (not user-scoped). Keeps static
 * catalog data out of user partitions and avoids full-table scans for categories.
 */
export const configPk = (): string => 'CONFIG';

/**
 * `CATEGORIES`
 *
 * Sort key for the seeded category list (`CONFIG` / `CATEGORIES`). Single item
 * holds the full array; replaced on seed rather than one row per category.
 */
export const categoriesSk = (): string => 'CATEGORIES';

/**
 * `USER#<cognitoSub>` — duplicated as the `userRef` attribute on GSI items.
 *
 * Sparse GSIs (`StripeCustomerIndex`, `PlaidItemIndex`, `EventIdIndex`) use
 * external ids as hash keys and `userRef` as range key so a lookup returns
 * which user partition to read. Same string as {@link userPk} by design.
 */
export const userRef = (userId: UserId): string => userPk(userId);

/**
 * Parses an event SK ({@link eventSk} or {@link datedEventSk}) back into
 * components. Used when only the SK is available (e.g. a `TXN#…/REF` row’s
 * `eventSk` field). Dated events have no stored eventType in the SK, so the
 * caller relies on the `EVD#` prefix to know it is a Plaid transaction.
 */
export const parseEventSk = (
  sk: string,
):
  | { kind: 'recurring'; eventType: string; id: string }
  | { kind: 'dated'; date: string; id: string }
  | undefined => {
  const parts = sk.split('#');
  if (parts[0] === 'EVT' && parts.length === 3) {
    return { kind: 'recurring', eventType: parts[1]!, id: parts[2]! };
  }
  if (parts[0] === 'EVD' && parts.length === 3) {
    return { kind: 'dated', date: parts[1]!, id: parts[2]! };
  }
  return undefined;
};

/**
 * GSI hash key: Stripe `customer` id on the user PROFILE item.
 * Enables webhook handlers to find the user without scanning.
 * Index: `StripeCustomerIndex` (hash: stripeCustomerId, range: userRef).
 */
export const GSI_STRIPE_CUSTOMER_ID = 'stripeCustomerId' as const;

/**
 * GSI hash key: Plaid Item id on PLAID# rows.
 * Resolves item → user when only `item_id` is known (exchange, sync, webhooks).
 * Index: `PlaidItemIndex` (hash: plaidItemId, range: userRef).
 */
export const GSI_PLAID_ITEM_ID = 'plaidItemId' as const;

/**
 * GSI hash key: event id (budget hex id or Plaid transaction id).
 * GET/PATCH `/events/:id` only receives id — not eventType — so this index
 * locates the owning user partition before GetItem.
 * Index: `EventIdIndex` (hash: id, range: userRef).
 */
export const GSI_EVENT_ID = 'id' as const;

/**
 * GSI range key attribute name on all three GSIs. Value is {@link userRef}.
 */
export const GSI_USER_REF = 'userRef' as const;

/**
 * Base table attribute names (DynamoDB reserved generic names for single-table design).
 */
export const TABLE_PK = 'PK' as const;
export const TABLE_SK = 'SK' as const;

/**
 * Item `status` for events. New writes use `active` only; user-initiated and
 * Plaid removals hard-delete rows (HP1). `removed` may still appear on legacy
 * items until they are purged or TTL-reaped.
 */
export type EventStatus = 'active' | 'removed';
