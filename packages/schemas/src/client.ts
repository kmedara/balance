/**
 * Client-safe wire types from @balance/schemas.
 * Import with `import type` to avoid pulling TypeBox runtime into the bundle.
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
  LinkTokenResponse,
  PatchEventBody,
  PlaidError,
  PlaidExchangeTokenResponse,
  PlaidSyncResponse,
  PlaidTransaction,
  RecurrenceFrequency,
  SubscriptionResponse,
} from './index.js';

export { budgetTypes, recurrenceFrequencies, BUDGET_EVENT_TYPE, PLAID_TRANSACTION_EVENT_TYPE } from './constants.js';
