import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';

export const CalendarEvents = eventGroup({
  source: 'Calendar',
  events: {
    // 👇 Defining an event creator without a payload.
    opened: type<void>(),
    datesChanged: type<string>(),
  },
});