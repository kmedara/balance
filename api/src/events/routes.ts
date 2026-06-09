import type { FastifyInstance } from 'fastify';
import type { EventDocument } from '@kmedara/balance-domain';
import { requireAuthUser } from '../auth/cognito.js';
import { buildMonthCalendarFromOccurrences, gridDateRange, toJsonCalendarResponse } from './calendar.utils.js';
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

export const eventRoutes = async (app: FastifyInstance) => {
  app.get('/calendar', async (req, reply) => {
    const query = req.query as { year?: string; month?: string; eventType?: string };
    const now = new Date();
    const year = parseYearQuery(query.year) ?? now.getFullYear();
    const monthIndex = parseMonthQuery(query.month) ?? now.getMonth();
    const eventType = query.eventType;

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
      eventType,
      user.userId,
    );
    const eventIds = [...new Set(occurrences.map((o) => o.eventResourceId))];
    const events = await findEventsByResourceIds<EventDocument>(
      db,
      eventIds,
      {
        userId: user.userId,
        ...(eventType !== undefined ? { eventType } : {}),
      },
    );
    const eventsById = new Map(events.map((event) => [event.resourceId, event]));

    return toJsonCalendarResponse(
      buildMonthCalendarFromOccurrences(year, monthIndex, occurrences, eventsById),
    );
  });
};
