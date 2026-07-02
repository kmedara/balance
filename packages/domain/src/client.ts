/**
 * Client-safe exports that avoid rrule expansion (default import incompatible with ESM in Angular).
 */
export type { CalendarEvent } from './domain/calendar.js';
export { isBudget } from './domain/guards.js';
