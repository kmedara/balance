/**
 * Wire types from @balance/schemas and runtime helpers from @balance/domain.
 */
export type {
  AuthUser,
  BudgetFields,
  BudgetType,
  CalendarDayWire,
  CalendarEventWire,
  CalendarResponseWire,
  CreateEventBody,
  EventResponse,
  PatchEventBody,
  LinkTokenResponse,
  PlaidError,
  PlaidExchangeTokenResponse,
  PlaidSyncResponse,
  PlaidTransaction,
  RecurrenceFrequency,
} from '@balance/schemas/client';

export { budgetTypes, recurrenceFrequencies, BUDGET_EVENT_TYPE, PLAID_TRANSACTION_EVENT_TYPE } from '@balance/schemas/client';

export type { CalendarEvent } from '@balance/domain/client';
export { isBudget } from '@balance/domain/client';

import type { CalendarDayWire, CalendarResponseWire } from '@balance/schemas/client';

/** Calendar day after JSON date strings are revived to local midnight. */
export type CalendarDay = Omit<CalendarDayWire, 'date'> & { date: Date };

/** Calendar month grid with revived local dates. */
export type CalendarResponse = Omit<CalendarResponseWire, 'days' | 'weeks'> & {
  days: CalendarDay[];
  weeks: CalendarDay[][];
};

/** Budget fields shown on a calendar event tile. */
export type Budget = import('@balance/schemas/client').BudgetFields;
