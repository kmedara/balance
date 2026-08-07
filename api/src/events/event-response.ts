import type { EventWithId } from '../data/types.js';

export const isRemovedEvent = (event: EventWithId): boolean =>
  'removed' in event && Boolean((event as { removed?: boolean }).removed);

const formatEventDtstart = (value: EventWithId['dtstart']): string => {
  if (value instanceof Date) {
    return value.toISOString();
  }

  if (value !== undefined) {
    return String(value);
  }

  throw new Error('Event missing dtstart');
};

export const toCreateEventResponse = (event: EventWithId) => ({
  ...Object.fromEntries(
    Object.entries(event).filter(
      ([key]) =>
        !['id', 'eventType', 'rrule', 'dtstart', 'userId', 'createdAt', 'updatedAt'].includes(key),
    ),
  ),
  id: event.id,
  eventType: event.eventType,
  rrule: event.rrule,
  dtstart: formatEventDtstart(event.dtstart),
});
