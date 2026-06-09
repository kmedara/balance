import type { FastifyInstance } from 'fastify';
import { findBudgetsOverlapping } from './repository.js';
import { buildMonthCalendar, gridDateRange } from '@kmedara/balance-domain/domain/calendar/calendar.utils';

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

export const budgetRoutes = async (app: FastifyInstance) => {
  app.get('/calendar', async (req, reply) => {
    const query = req.query as { year?: string; month?: string };
    const now = new Date();
    const year = parseYearQuery(query.year) ?? now.getFullYear();
    const monthIndex = parseMonthQuery(query.month) ?? now.getMonth();

    if (query.year !== undefined && parseYearQuery(query.year) === null) {
      return reply.status(400).send({ error: 'Invalid year query param' });
    }
    if (query.month !== undefined && parseMonthQuery(query.month) === null) {
      return reply.status(400).send({ error: 'Invalid month query param (use 1–12)' });
    }

    const db = app.mongo.db ?? app.mongo.client.db('balance');
    const { gridStart, gridEnd } = gridDateRange(year, monthIndex);
    const budgets = await findBudgetsOverlapping(db, gridStart, gridEnd);

    return buildMonthCalendar(year, monthIndex, budgets);
  });
};
