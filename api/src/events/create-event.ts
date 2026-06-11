import { randomUUID } from 'node:crypto';
import type { Db } from 'mongodb';
import type { BudgetDocument, EventDocument } from '@kmedara/balance-domain';
import { BUDGET_EVENT_TYPE } from './constants.js';
import { RRule } from './rrule.utils.js';
import { parseDateOnly } from './calendar-date.utils.js';
import { materializeOccurrenceDocuments } from './expand-occurrences.js';
import { upsertOccurrences } from './occurrence.repository.js';
import { insertEvent } from './repository.js';

export type RecurrenceFrequencyInput = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';

export type CreateEventBody = {
  eventType: string;
  dtstart: string;
  rrule?: string;
  frequency?: RecurrenceFrequencyInput;
  interval?: number;
  until?: string;
  title?: string;
  type?: 'Income' | 'Expense';
  amount?: number;
  category?: string;
  description?: string;
};

const RECURRENCE_FREQUENCIES: RecurrenceFrequencyInput[] = [
  'DAILY',
  'WEEKLY',
  'MONTHLY',
  'YEARLY',
];

const FREQUENCY_MAP: Record<RecurrenceFrequencyInput, number> = {
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

const resolveRecurrence = (
  body: CreateEventBody,
): { rrule: string; dtstart: Date } => {
  if (body.rrule?.trim()) {
    const dtstart = parseDateOnly(body.dtstart);
    dtstart.setHours(0, 0, 0, 0);
    return { rrule: body.rrule.trim(), dtstart };
  }

  return buildEventRRule(body);
};

const validateBudgetFields = (body: CreateEventBody): string | null => {
  const title = body.title?.trim() ?? '';
  const category = body.category?.trim() ?? '';
  const type = body.type;
  const amount = Number(body.amount);
  const interval = body.interval === undefined ? 1 : Number(body.interval);

  if (!title || !category || !type || !Number.isFinite(amount) || amount <= 0) {
    return 'Budget events require title, type, amount (> 0), and category';
  }

  if (type !== 'Income' && type !== 'Expense') {
    return 'Budget type must be Income or Expense';
  }

  if (!Number.isInteger(interval) || interval < 1) {
    return 'interval must be an integer >= 1';
  }

  if (!body.rrule?.trim()) {
    if (!body.frequency || !RECURRENCE_FREQUENCIES.includes(body.frequency)) {
      return 'Provide rrule or a valid frequency (DAILY, WEEKLY, MONTHLY, YEARLY)';
    }
  }

  return null;
};

const buildBudgetDocument = (
  userId: string,
  body: CreateEventBody,
  rrule: string,
  dtstart: Date,
  now: Date,
): BudgetDocument => {
  const resourceId = randomUUID() as BudgetDocument['resourceId'];

  return {
    resourceId,
    userId,
    eventType: BUDGET_EVENT_TYPE,
    title: body.title!.trim(),
    type: body.type!,
    amount: body.amount!,
    category: body.category!.trim(),
    ...(body.description?.trim() ? { description: body.description.trim() } : {}),
    rrule,
    dtstart,
    createdAt: now,
    updatedAt: now,
  };
};

const buildGenericEventDocument = (
  userId: string,
  body: CreateEventBody,
  rrule: string,
  dtstart: Date,
  now: Date,
): EventDocument => {
  const resourceId = randomUUID() as EventDocument['resourceId'];
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
    resourceId,
    userId,
    eventType,
    rrule,
    dtstart,
    ...fields,
    createdAt: now,
    updatedAt: now,
  } as EventDocument;
};

export const validateCreateEventBody = (body: unknown): CreateEventBody | { error: string } => {
  if (typeof body !== 'object' || body === null) {
    return { error: 'Invalid event payload' };
  }

  const input = body as Record<string, unknown>;
  const eventType = typeof input.eventType === 'string' ? input.eventType.trim() : '';
  const dtstart = typeof input.dtstart === 'string' ? input.dtstart.trim() : '';
  const rrule = typeof input.rrule === 'string' ? input.rrule : undefined;
  const frequency =
    typeof input.frequency === 'string' &&
    RECURRENCE_FREQUENCIES.includes(input.frequency as RecurrenceFrequencyInput)
      ? (input.frequency as RecurrenceFrequencyInput)
      : undefined;
  const interval = input.interval === undefined ? undefined : Number(input.interval);
  const until = typeof input.until === 'string' && input.until.trim() ? input.until.trim() : undefined;
  const title = typeof input.title === 'string' ? input.title : undefined;
  const type = input.type === 'Income' || input.type === 'Expense' ? input.type : undefined;
  const amount = input.amount === undefined ? undefined : Number(input.amount);
  const category = typeof input.category === 'string' ? input.category : undefined;
  const description = typeof input.description === 'string' ? input.description : undefined;

  if (!eventType || !dtstart) {
    return { error: 'eventType and dtstart are required' };
  }

  const parsed: CreateEventBody = {
    eventType,
    dtstart,
    ...(rrule ? { rrule } : {}),
    ...(frequency ? { frequency } : {}),
    ...(interval !== undefined ? { interval } : {}),
    ...(until ? { until } : {}),
    ...(title ? { title } : {}),
    ...(type ? { type } : {}),
    ...(amount !== undefined ? { amount } : {}),
    ...(category ? { category } : {}),
    ...(description ? { description } : {}),
  };

  if (eventType === BUDGET_EVENT_TYPE) {
    const budgetError = validateBudgetFields(parsed);
    if (budgetError) return { error: budgetError };
  } else if (!rrule?.trim() && !frequency) {
    return { error: 'Provide rrule or frequency for recurring events' };
  }

  return parsed;
};

export const createEventForUser = async (
  db: Db,
  userId: string,
  body: CreateEventBody,
): Promise<EventDocument> => {
  const { rrule, dtstart } = resolveRecurrence(body);
  const now = new Date();

  const event =
    body.eventType === BUDGET_EVENT_TYPE
      ? buildBudgetDocument(userId, body, rrule, dtstart, now)
      : buildGenericEventDocument(userId, body, rrule, dtstart, now);

  await insertEvent(db, event);

  const occurrences = materializeOccurrenceDocuments({
    eventResourceId: event.resourceId,
    userId,
    eventType: event.eventType,
    rrule,
    dtstart,
  });

  await upsertOccurrences(db, occurrences, now);

  return event;
};
