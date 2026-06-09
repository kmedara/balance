/**
 * Client-safe re-exports from balance-domain.
 * Avoids the main entry, which pulls in rrule expansion (default import incompatible with ESM).
 */
export type { Budget, BudgetFrequency, BudgetType } from '@kmedara/balance-domain/domain/budget/budget';
export type { CalendarDay, CalendarResponse, Week } from '@kmedara/balance-domain/domain/calendar/calendar';
export { budgetTypes, frequencies } from '@kmedara/balance-domain/domain/constants';
export { isBudget } from '@kmedara/balance-domain/domain/budget/guards';
export type { PlaidError } from '@kmedara/balance-domain/domain/plaid/plaid';
