import type {
  EventWithId,
  PlaidItemWithId,
  StoredEventDocument,
  StoredPlaidItemDocument,
} from '../data/types.js';
import type { PlaidSyncStateDocument } from '../plaid/types.js';
import type { UserDocument, UserSubscription } from '../auth/user.repository.js';
import { toDate } from '../data/dates.js';
import { PLAID_TRANSACTION_EVENT_TYPE } from '../plaid/constants.js';
import {
  accountSk,
  categoriesSk,
  configPk,
  datedEventSk,
  eventSk,
  plaidSk,
  profileSk,
  txnRefPk,
  txnRefSk,
  userPk,
  userRef,
} from './keys.js';
import { deserializeDates, serializeRecord, toEventWithId } from './helpers.js';

export type TableItem = Record<string, unknown>;

export type PlaidSyncFields = {
  transactionCursor?: string;
  lastSuccessfulSync?: Date;
  lastAttemptedSync?: Date;
  status?: 'idle' | 'syncing' | 'error';
};

export const toUserDocument = (item: TableItem): UserDocument => {
  const parsed = deserializeDates(item);
  const { cognitoSub, email, stripeCustomerId, subscription, createdAt, updatedAt } = parsed;

  return {
    cognitoSub: cognitoSub as string,
    email: email as string | undefined,
    stripeCustomerId: stripeCustomerId as string | undefined,
    subscription: subscription as UserSubscription,
    createdAt: createdAt as Date,
    updatedAt: updatedAt as Date,
  };
};

export const buildProfileItem = (
  user: UserDocument,
): TableItem =>
  serializeRecord({
    PK: userPk(user.cognitoSub),
    SK: profileSk(),
    entityType: 'user',
    cognitoSub: user.cognitoSub,
    email: user.email,
    stripeCustomerId: user.stripeCustomerId,
    subscription: user.subscription,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    ...(user.stripeCustomerId ? { userRef: userRef(user.cognitoSub) } : {}),
  });

/**
 * Picks the SK namespace for an event. Plaid transactions are single-occurrence
 * and date-anchored (`EVD#<date>#<id>`) so the calendar can range-query them;
 * everything else is recurring (`EVT#<type>#<id>`) and expanded from its rrule.
 */
export const resolveEventSk = (
  event: { eventType: string; id: string; dtstart?: Date | string },
): string => {
  if (event.eventType === PLAID_TRANSACTION_EVENT_TYPE && event.dtstart) {
    return datedEventSk(toDate(event.dtstart), event.id);
  }
  return eventSk(event.eventType, event.id);
};

export const buildEventItem = (
  event: StoredEventDocument & { id: string },
  status: 'active' | 'removed' = 'active',
): TableItem => {
  const { plaidTransactionId } = event as { plaidTransactionId?: string };

  return serializeRecord({
    ...event,
    PK: userPk(event.userId),
    SK: resolveEventSk(event),
    entityType: 'event',
    status,
    id: event.id,
    userRef: userRef(event.userId),
    ...(plaidTransactionId ? { plaidTransactionId } : {}),
  });
};

export const buildTxnRefItem = (input: {
  plaidTransactionId: string;
  userId: string;
  eventSk: string;
}): TableItem =>
  serializeRecord({
    PK: txnRefPk(input.plaidTransactionId),
    SK: txnRefSk(),
    entityType: 'txn_ref',
    plaidTransactionId: input.plaidTransactionId,
    userId: input.userId,
    eventSk: input.eventSk,
  });

export const buildPlaidItemRecord = (
  document: StoredPlaidItemDocument & { id: string; sync?: PlaidSyncFields },
): TableItem =>
  serializeRecord({
    ...document,
    PK: userPk(document.userId),
    SK: plaidSk(document.plaidItemId),
    entityType: 'plaid_item',
    userRef: userRef(document.userId),
    plaidItemId: document.plaidItemId,
  });

export const toPlaidItemFromItem = (item: TableItem): PlaidItemWithId => {
  const parsed = deserializeDates(item);
  const {
    PK: _pk,
    SK: _sk,
    entityType: _entityType,
    userRef: _userRef,
    sync,
    ...rest
  } = parsed;

  const itemRecord = rest as StoredPlaidItemDocument & { id: string; sync?: PlaidSyncFields };
  return {
    ...itemRecord,
    id: itemRecord.plaidItemId,
    sync: sync as PlaidSyncFields | undefined,
  };
};

export const toPlaidSyncState = (
  item: PlaidItemWithId,
): PlaidSyncStateDocument | undefined => {
  if (!item.sync) return undefined;

  return {
    itemId: item.plaidItemId,
    userId: item.userId,
    plaidItemId: item.plaidItemId,
    transactionCursor: item.sync.transactionCursor,
    lastSuccessfulSync: item.sync.lastSuccessfulSync ?? item.updatedAt ?? new Date(),
    lastAttemptedSync: item.sync.lastAttemptedSync ?? item.updatedAt ?? new Date(),
    status: item.sync.status ?? 'idle',
    createdAt: item.createdAt ?? new Date(),
    updatedAt: item.updatedAt ?? new Date(),
  };
};

export const buildAccountItem = (
  account: Record<string, unknown> & {
    userId: string;
    plaidAccountId: string;
  },
  now: Date,
): TableItem =>
  serializeRecord({
    PK: userPk(account.userId),
    SK: accountSk(account.plaidAccountId),
    entityType: 'plaid_account',
    ...account,
    createdAt: account.createdAt ?? now,
    updatedAt: now,
  });

export const buildCategoriesConfigItem = (
  categories: { name: string; displayName: string; isSystem: boolean }[],
  now: Date,
): TableItem =>
  serializeRecord({
    PK: configPk(),
    SK: categoriesSk(),
    entityType: 'config',
    categories,
    updatedAt: now,
  });

export const eventFromItem = <T extends object = object>(item: TableItem): EventWithId<T> =>
  toEventWithId<T>(item);

export const isActiveEvent = (item: TableItem): boolean =>
  (item.status as string | undefined) !== 'removed' && item.removed !== true;
