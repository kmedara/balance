import { PLAID_TRANSACTION_EVENT_TYPE } from '@balance/schemas/constants';
import type { PlaidTransactionEventFields } from './event-document.js';
import type { EventWithId } from '../data/types.js';

export type PlaidTransactionEventWithId = EventWithId<PlaidTransactionEventFields>;

export type PlaidCalendarEvent = PlaidTransactionEventWithId & {
  amount: number;
};

export const isPlaidTransactionEvent = (
  event: Pick<EventWithId, 'eventType'>,
): event is PlaidTransactionEventWithId =>
  event.eventType === PLAID_TRANSACTION_EVENT_TYPE;

/** Calendar-facing shape with display amount as a positive number. */
export const toPlaidCalendarEvent = (doc: PlaidTransactionEventWithId): PlaidCalendarEvent => ({
  ...doc,
  amount: Math.abs(doc.amount),
});
