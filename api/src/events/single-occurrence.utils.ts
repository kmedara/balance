import { RRule } from './rrule.utils.js';

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
