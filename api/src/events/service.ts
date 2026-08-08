import type { BudgetDocumentFields } from '@balance/domain';
import type { EventWithId, StoredEventDocument } from '../data/types.js';
import type { CalendarResponseWire } from '@balance/schemas/events';
import { formatDateKey, parseDateOnly } from '../data/dates.js';
import { BadRequestError, NotFoundError } from '../errors/http-error.js';
import { BUDGET_EVENT_TYPE, PLAID_TRANSACTION_EVENT_TYPE } from '@balance/schemas/constants';
import { resolveDayCalendarEvents } from './calendar-sources.js';
import { buildMonthCalendarFromDayEvents, gridDateRange, toJsonCalendarResponse } from './calendar.utils.js';
import { RRule } from './recurrence.utils.js';
import {
  findActiveEventsForCalendar,
  findEventById,
  hardDeleteEventById,
  insertEvent,
  updateEventById,
} from './repository.js';
import type { CreateEventBody, PatchEventBody } from '@balance/schemas/events';

export const isRemovedEvent = (event: EventWithId): boolean =>
  'removed' in event && Boolean((event as { removed?: boolean }).removed);

const formatEventTimestamp = (value: Date | string | undefined, field: string): string => {
  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === 'string' && value.trim()) {
    return value;
  }

  throw new Error(`Event missing ${field}`);
};

const formatEventDtstart = (value: EventWithId['dtstart']): string =>
  formatEventTimestamp(value, 'dtstart');

export const toCreateEventResponse = (event: EventWithId) => ({
  ...Object.fromEntries(
    Object.entries(event).filter(
      ([key]) =>
        !['id', 'eventType', 'rrule', 'dtstart', 'userId', 'createdAt', 'updatedAt'].includes(key),
    ),
  ),
  id: event.id,
  eventType: event.eventType,
  updatedAt: formatEventTimestamp(event.updatedAt, 'updatedAt'),
  rrule: event.rrule,
  dtstart: formatEventDtstart(event.dtstart),
});

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
  if (!body.rrule?.trim() && !body.frequency) {
    throw new BadRequestError('Provide rrule or frequency for recurring events');
  }

  const { rrule, dtstart } = resolveRecurrence(body);
  const now = new Date();

  const event: StoredEventDocument =
    body.eventType === BUDGET_EVENT_TYPE
      ? buildBudgetDocument(userId, body as Extract<CreateEventBody, { eventType: 'budget' }>, rrule, dtstart, now)
      : buildGenericEventDocument(userId, body, rrule, dtstart, now);

  const id = await insertEvent(event);

  return { ...event, id };
};

export const getEventForUser = async (userId: string, eventId: string): Promise<EventWithId> => {
  const event = await findEventById(eventId, { userId });
  if (isRemovedEvent(event)) {
    throw new NotFoundError('Event not found');
  }
  return event;
};

const existingDtstart = (existing: EventWithId): Date => new Date(existing.dtstart ?? Date.now());

const hasRecurrencePatch = (patch: PatchEventBody): boolean =>
  patch.dtstart !== undefined ||
  patch.rrule !== undefined ||
  patch.frequency !== undefined ||
  patch.interval !== undefined ||
  patch.until !== undefined;

const toMergedCreateBody = (existing: EventWithId, patch: PatchEventBody): CreateEventBody => {
  const budget = existing as EventWithId<BudgetDocumentFields>;

  return {
    eventType: BUDGET_EVENT_TYPE,
    dtstart: patch.dtstart ?? formatDateKey(existingDtstart(existing)),
    ...(patch.rrule !== undefined
      ? { rrule: patch.rrule }
      : patch.frequency !== undefined
        ? {}
        : existing.rrule
          ? { rrule: existing.rrule }
          : {}),
    ...(patch.frequency !== undefined ? { frequency: patch.frequency } : {}),
    ...(patch.interval !== undefined ? { interval: patch.interval } : {}),
    ...(patch.until !== undefined ? { until: patch.until } : {}),
    title: patch.title ?? budget.title,
    type: patch.type ?? budget.type,
    amount: patch.amount ?? budget.amount,
    category: patch.category ?? budget.category,
    ...(patch.description !== undefined
      ? { description: patch.description }
      : budget.description
        ? { description: budget.description }
        : {}),
  } as CreateEventBody;
};

export const updateEventForUser = async (
  userId: string,
  eventId: string,
  patch: PatchEventBody,
): Promise<EventWithId> => {
  const existing = await findEventById(eventId, { userId });

  if ('removed' in existing && existing.removed) {
    throw new NotFoundError('Event not found');
  }

  if (existing.eventType === PLAID_TRANSACTION_EVENT_TYPE) {
    throw new BadRequestError('Plaid transaction events cannot be updated');
  }

  if (existing.eventType !== BUDGET_EVENT_TYPE) {
    throw new BadRequestError('Only budget events can be updated');
  }

  const merged = toMergedCreateBody(existing, patch);

  const { rrule, dtstart } = hasRecurrencePatch(patch)
    ? resolveRecurrence(merged)
    : { rrule: existing.rrule ?? '', dtstart: existingDtstart(existing) };

  const now = new Date();
  const set: Record<string, unknown> = {
    title: merged.title!.trim(),
    type: merged.type!,
    amount: merged.amount!,
    category: merged.category!.trim(),
    rrule,
    dtstart,
    updatedAt: now,
  };

  const unset: string[] = [];
  if (patch.description !== undefined) {
    const description = merged.description?.trim();
    if (description) {
      set.description = description;
    } else {
      unset.push('description');
    }
  }

  return await updateEventById(eventId, { userId }, {
    set,
    unset,
    expectedUpdatedAt: patch.updatedAt,
  });
};

export const deleteEventForUser = async (userId: string, eventId: string): Promise<void> => {
  const existing = await findEventById(eventId, { userId });

  if (existing.eventType === PLAID_TRANSACTION_EVENT_TYPE) {
    throw new BadRequestError('Plaid transaction events cannot be deleted');
  }

  if (existing.eventType !== BUDGET_EVENT_TYPE) {
    throw new BadRequestError('Only budget events can be deleted');
  }

  await hardDeleteEventById(eventId, userId);
};

export const parseEventTypes = (value: unknown): string[] | undefined => {
  if (value === undefined) return undefined;

  const raw = Array.isArray(value) ? value : [value];
  const eventTypes = [
    ...new Set(
      raw
        .flatMap((entry) => String(entry).split(','))
        .map((entry) => entry.trim())
        .filter(Boolean),
    ),
  ];

  return eventTypes.length > 0 ? eventTypes : undefined;
};

export const getCalendarForUser = async (
  userId: string,
  year: number,
  monthIndex: number,
  eventTypes: string[] | undefined,
): Promise<CalendarResponseWire> => {
  const { gridStart, gridEnd } = gridDateRange(year, monthIndex);
  const events = await findActiveEventsForCalendar(userId, gridStart, gridEnd, eventTypes);

  return toJsonCalendarResponse(
    buildMonthCalendarFromDayEvents(year, monthIndex, (dayDate) =>
      resolveDayCalendarEvents(dayDate, events),
    ),
  );
};
