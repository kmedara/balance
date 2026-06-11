import type { EventDocument } from '@kmedara/balance-domain/data/event-document';
import { PLAID_TRANSACTION_EVENT_TYPE } from './constants.js';
import type { PlaidTransactionEventDocument } from './event-document.js';

export type PlaidCalendarEvent = PlaidTransactionEventDocument & {
  eventType: typeof PLAID_TRANSACTION_EVENT_TYPE;
};

export const isPlaidTransactionEvent = (
  event: EventDocument,
): event is PlaidTransactionEventDocument =>
  event.eventType === PLAID_TRANSACTION_EVENT_TYPE;

/** Calendar-facing shape with display amount as a positive number. */
export const toPlaidCalendarEvent = (
  doc: PlaidTransactionEventDocument,
): PlaidCalendarEvent => ({
  ...doc,
  eventType: PLAID_TRANSACTION_EVENT_TYPE,
  amount: Math.abs(doc.amount),
});
