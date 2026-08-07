import type { CreateEventBody } from './schemas.js';
import type { BudgetDocumentFields } from '@balance/domain';
import { BUDGET_EVENT_TYPE } from './constants.js';
import { parseDateOnly } from '../data/dates.js';
import { RRule } from './recurrence.utils.js';
import { insertEvent } from './repository.js';
import type { EventWithId, StoredEventDocument } from '../data/types.js';

export type { CreateEventBody } from './schemas.js';

const FREQUENCY_MAP: Record<NonNullable<CreateEventBody['frequency']>, number> = {
  DAILY: RRule.DAILY,
  WEEKLY: RRule.WEEKLY,
  MONTHLY: RRule.MONTHLY,
  YEARLY: RRule.YEARLY,
};

export const buildEventRRule = (
  body: Pick<CreateEventBody, 'dtstart' | 'frequency' | 'interval' | 'until'>,
): { rrule: string; dtstart: Date } => {
  const dtstart = parseDateOnly(body.dtstart);
  dtstart.setHours(0, 0, 0, 0);

  if (!body.frequency) {
    throw new Error('frequency is required when rrule is not provided');
  }

  const until = body.until ? parseDateOnly(body.until) : undefined;
  if (until) {
    until.setHours(23, 59, 59, 999);
  }

  const rule = new RRule({
    freq: FREQUENCY_MAP[body.frequency],
    interval: body.interval ?? 1,
    dtstart,
    ...(until ? { until } : {}),
  });

  return { rrule: rule.toString(), dtstart };
};

export const resolveRecurrence = (
  body: CreateEventBody,
): { rrule: string; dtstart: Date } => {
  if ('rrule' in body && body.rrule?.trim()) {
    const dtstart = parseDateOnly(body.dtstart);
    dtstart.setHours(0, 0, 0, 0);
    return { rrule: body.rrule.trim(), dtstart };
  }

  return buildEventRRule(body);
};

const buildBudgetDocument = (
  userId: string,
  body: Extract<CreateEventBody, { eventType: 'budget' }>,
  rrule: string,
  dtstart: Date,
  now: Date,
): StoredEventDocument<BudgetDocumentFields> => ({
  userId,
  eventType: BUDGET_EVENT_TYPE,
  title: body.title.trim(),
  type: body.type,
  amount: body.amount,
  category: body.category.trim(),
  ...(body.description?.trim() ? { description: body.description.trim() } : {}),
  rrule,
  dtstart,
  createdAt: now,
  updatedAt: now,
});

const buildGenericEventDocument = (
  userId: string,
  body: CreateEventBody,
  rrule: string,
  dtstart: Date,
  now: Date,
): StoredEventDocument => {
  const {
    eventType,
    dtstart: _dtstart,
    rrule: _rrule,
    frequency: _frequency,
    interval: _interval,
    until: _until,
    ...fields
  } = body;

  return {
    userId,
    eventType,
    rrule,
    dtstart,
    ...fields,
    createdAt: now,
    updatedAt: now,
  };
};

export const createEventForUser = async (
  userId: string,
  body: CreateEventBody,
): Promise<EventWithId> => {
  const { rrule, dtstart } = resolveRecurrence(body);
  const now = new Date();

  const event: StoredEventDocument =
    body.eventType === BUDGET_EVENT_TYPE
      ? buildBudgetDocument(userId, body as Extract<CreateEventBody, { eventType: 'budget' }>, rrule, dtstart, now)
      : buildGenericEventDocument(userId, body, rrule, dtstart, now);

  const id = await insertEvent(event);

  return { ...event, id };
};
