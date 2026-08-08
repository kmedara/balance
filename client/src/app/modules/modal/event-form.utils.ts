import type { EventResponse } from '@balance/schemas/client';
import { RRule } from 'rrule';
import { parseCalendarDate } from '@modules/calendar/calendar.utils';
import type { CreateEventFormPayload } from './modal.context';

const FREQUENCY_FROM_RRULE: Record<number, CreateEventFormPayload['frequency']> = {
  [RRule.DAILY]: 'DAILY',
  [RRule.WEEKLY]: 'WEEKLY',
  [RRule.MONTHLY]: 'MONTHLY',
  [RRule.YEARLY]: 'YEARLY',
};

export const formatDateOnly = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const toEventWriteRequest = (payload: CreateEventFormPayload) => ({
  title: payload.title.trim(),
  type: payload.type,
  amount: payload.amount ?? 0,
  category: payload.category.trim(),
  description: payload.description?.trim() || undefined,
  dtstart: formatDateOnly(payload.startDate),
  frequency: payload.frequency,
  interval: payload.interval,
  until: payload.endDate ? formatDateOnly(payload.endDate) : undefined,
});

export const eventResponseToFormValues = (event: EventResponse): CreateEventFormPayload => {
  const startDate = parseCalendarDate(event.dtstart);

  let frequency: CreateEventFormPayload['frequency'] = 'MONTHLY';
  let interval = 1;
  let endDate: Date | null = null;

  if (event.rrule) {
    try {
      const rule = RRule.fromString(event.rrule);
      const opts = rule.options;
      frequency = FREQUENCY_FROM_RRULE[opts.freq] ?? 'MONTHLY';
      interval = opts.interval ?? 1;
      endDate = opts.until ? parseCalendarDate(opts.until) : null;
    } catch {
      // Keep defaults when RRULE cannot be parsed.
    }
  }

  return {
    type: event.type ?? 'Expense',
    title: event.title ?? '',
    amount: event.amount ?? null,
    category: event.category ?? '',
    description: event.description ?? '',
    startDate,
    frequency,
    interval,
    endDate,
    updatedAt: event.updatedAt,
  };
};
