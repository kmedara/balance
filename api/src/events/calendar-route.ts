import type { FastifyInstance } from 'fastify';
import { bearerSecurity, problemDetailsSchema } from '../swagger/schemas.js';
import { calendarQuerySchema, calendarResponseSchema } from './schemas.js';
import {
  buildMonthCalendarFromDayEvents,
  gridDateRange,
  toJsonCalendarResponse,
} from './calendar.utils.js';
import { resolveDayCalendarEvents } from './calendar-sources.js';
import { findActiveEventsForCalendar } from './repository.js';

const parseEventTypes = (value: unknown): string[] | undefined => {
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

export const registerCalendarRoute = (app: FastifyInstance): void => {
  app.get('/calendar', {
    schema: {
      tags: ['Events'],
      summary: 'Month calendar grid',
      description: 'Returns a padded month grid with events expanded from stored recurrence rules.',
      security: bearerSecurity,
      querystring: calendarQuerySchema,
      response: {
        200: calendarResponseSchema,
        400: problemDetailsSchema,
        403: problemDetailsSchema,
      },
    },
    handler: async (request) => {
      const now = new Date();
      const year = request.query.year ?? now.getFullYear();
      const monthIndex = (request.query.month ?? now.getMonth() + 1) - 1;
      const eventTypes = parseEventTypes(request.query.eventType);
      const { gridStart, gridEnd } = gridDateRange(year, monthIndex);
      const events = await findActiveEventsForCalendar(
        request.user.userId,
        gridStart,
        gridEnd,
        eventTypes,
      );

      return toJsonCalendarResponse(
        buildMonthCalendarFromDayEvents(year, monthIndex, (dayDate) =>
          resolveDayCalendarEvents(dayDate, events),
        ),
      );
    },
  });
};
