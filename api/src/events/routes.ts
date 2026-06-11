import type { FastifyInstance } from 'fastify';
import type { EventDocument } from '@kmedara/balance-domain';
import { requireAuthUser } from '../auth/cognito.js';
import {
  bearerSecurity,
  calendarQuerySchema,
  calendarResponseSchema,
  createEventBodySchema,
  createEventResponseSchema,
  errorResponseSchema,
} from '../swagger/schemas.js';
import {
  buildMonthCalendarFromDayEvents,
  gridDateRange,
  toJsonCalendarResponse,
} from './calendar.utils.js';
import { resolveDayCalendarEvents } from './calendar-sources.js';
import { createEventForUser, validateCreateEventBody } from './create-event.js';
import { findEventsByResourceIds } from './repository.js';
import { findOccurrencesInRange } from './occurrence.repository.js';

const parseMonthQuery = (value: unknown): number | null => {
  const month = Number(value);
  if (!Number.isInteger(month) || month < 1 || month > 12) return null;
  return month - 1;
};

const parseYearQuery = (value: unknown): number | null => {
  const year = Number(value);
  if (!Number.isInteger(year) || year < 1970 || year > 3000) return null;
  return year;
};

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

const isRemovedEvent = (event: EventDocument): boolean =>
  'removed' in event && Boolean((event as { removed?: boolean }).removed);

const toCreateEventResponse = (event: EventDocument) => ({
  resourceId: event.resourceId,
  eventType: event.eventType,
  rrule: event.rrule,
  dtstart: event.dtstart,
  ...Object.fromEntries(
    Object.entries(event).filter(
      ([key]) =>
        !['resourceId', 'eventType', 'rrule', 'dtstart', 'userId', 'createdAt', 'updatedAt'].includes(
          key,
        ),
    ),
  ),
});

export const eventRoutes = async (app: FastifyInstance) => {
  app.post('/', {
    schema: {
      tags: ['Events'],
      summary: 'Create a recurring event',
      description:
        'Creates an event in the events collection and materializes occurrences. Budget events require title, type, amount, and category.',
      security: bearerSecurity,
      body: createEventBodySchema,
      response: {
        201: createEventResponseSchema,
        400: errorResponseSchema,
        403: errorResponseSchema,
      },
    },
    handler: async (request, reply) => {
      const parsed = validateCreateEventBody(request.body);
      if ('error' in parsed) {
        return reply.status(400).send({ error: parsed.error });
      }

      const user = requireAuthUser(request);
      const db = app.mongo.db ?? app.mongo.client.db('balance');
      const event = await createEventForUser(db, user.userId, parsed);

      return reply.status(201).send(toCreateEventResponse(event));
    },
  });

  app.get('/calendar', {
    schema: {
      tags: ['Events'],
      summary: 'Month calendar grid',
      description: 'Returns a padded month grid with events resolved from event_occurrences.',
      security: bearerSecurity,
      querystring: calendarQuerySchema,
      response: {
        200: calendarResponseSchema,
        400: errorResponseSchema,
        403: errorResponseSchema,
      },
    },
    handler: async (req, reply) => {
      const query = req.query as {
        year?: string;
        month?: string;
        eventType?: string | string[];
        eventTypes?: string | string[];
      };
      const now = new Date();
      const year = parseYearQuery(query.year) ?? now.getFullYear();
      const monthIndex = parseMonthQuery(query.month) ?? now.getMonth();
      const eventTypes = parseEventTypes(query.eventTypes ?? query.eventType);

      if (query.year !== undefined && parseYearQuery(query.year) === null) {
        return reply.status(400).send({ error: 'Invalid year query param' });
      }
      if (query.month !== undefined && parseMonthQuery(query.month) === null) {
        return reply.status(400).send({ error: 'Invalid month query param (use 1–12)' });
      }

      const user = requireAuthUser(req);
      const db = app.mongo.db ?? app.mongo.client.db('balance');
      const { gridStart, gridEnd } = gridDateRange(year, monthIndex);

      const occurrences = await findOccurrencesInRange(
        db,
        gridStart,
        gridEnd,
        eventTypes,
        user.userId,
      );

      const eventIds = [...new Set(occurrences.map((o) => o.eventResourceId))];
      const events = await findEventsByResourceIds<EventDocument>(db, eventIds, {
        userId: user.userId,
        ...(eventTypes !== undefined ? { eventTypes } : {}),
      });
      const eventsById = new Map(
        events.filter((event) => !isRemovedEvent(event)).map((event) => [event.resourceId, event]),
      );

      return toJsonCalendarResponse(
        buildMonthCalendarFromDayEvents(year, monthIndex, (dayDate) =>
          resolveDayCalendarEvents(dayDate, occurrences, eventsById),
        ),
      );
    },
  });
};
