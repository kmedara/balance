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
} from './index.js';

export { budgetTypes, recurrenceFrequencies } from './constants.js';
