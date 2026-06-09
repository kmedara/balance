import type { EventDocument } from '@kmedara/balance-domain';
import { RRule } from '../budgets/rrule.utils.js';

const startOfDay = (date: Date): Date => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const endOfDay = (date: Date): Date => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};

export const eventOccursOnDate = (
  event: Pick<EventDocument, 'rrule'>,
  date: Date,
): boolean => {
  const rule = RRule.fromString(event.rrule);
  return rule.between(startOfDay(date), endOfDay(date), true).length > 0;
};

export const eventOccursInRange = (
  event: Pick<EventDocument, 'rrule'>,
  rangeStart: Date,
  rangeEnd: Date,
): boolean => {
  const rule = RRule.fromString(event.rrule);
  return rule.between(startOfDay(rangeStart), endOfDay(rangeEnd), true).length > 0;
};
