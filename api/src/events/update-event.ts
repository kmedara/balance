import type { BudgetDocumentFields } from '@balance/domain';
import { BUDGET_EVENT_TYPE } from './constants.js';
import { PLAID_TRANSACTION_EVENT_TYPE } from '../plaid/constants.js';
import { type CreateEventBody, resolveRecurrence } from './create-event.js';
import type { PatchEventBody } from './schemas.js';
import { formatDateKey } from '../data/dates.js';
import { findEventById, updateEventById } from './repository.js';
import type { EventWithId } from '../data/types.js';
import { BadRequestError, NotFoundError } from '../errors/http-error.js';

export type { PatchEventBody } from './schemas.js';

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

  return await updateEventById(eventId, { userId }, { set, unset });

};
