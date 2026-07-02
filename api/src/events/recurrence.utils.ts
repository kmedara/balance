import type { EventDocument } from '@balance/domain';
import rrule from 'rrule';
import { endOfDay, startOfDay } from '../data/dates.js';

export const { RRule, rrulestr } = rrule as typeof import('rrule');

/** Builds an rrule that expands to exactly one calendar day. */
export const buildSingleOccurrenceRRule = (
  dtstart: Date,
): { rrule: string; dtstart: Date } => {
  const start = new Date(dtstart);
  start.setHours(0, 0, 0, 0);

  const rule = new RRule({
    freq: RRule.DAILY,
    count: 1,
    dtstart: start,
  });

  return { rrule: rule.toString(), dtstart: start };
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
