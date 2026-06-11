export const createEventBodySchema = {
  type: 'object',
  required: ['eventType', 'dtstart'],
  properties: {
    eventType: {
      type: 'string',
      enum: ['budget', 'test'],
      description: 'Event discriminator, e.g. budget or plaid_transaction',
    },
    dtstart: { type: 'string', format: 'date', description: 'Series start date (YYYY-MM-DD)' },
    rrule: { type: 'string', description: 'RFC 5545 RRULE string (alternative to frequency)' },
    frequency: { type: 'string', enum: ['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'] },
    interval: { type: 'integer', minimum: 1, default: 1 },
    until: { type: 'string', format: 'date' },
    title: { type: 'string' },
    type: { type: 'string', enum: ['Income', 'Expense'] },
    amount: { type: 'number', exclusiveMinimum: 0 },
    category: { type: 'string' },
    description: { type: 'string' },
  },
} as const;

export const createEventResponseSchema = {
  type: 'object',
  properties: {
    resourceId: { type: 'string', format: 'uuid' },
    eventType: { type: 'string' },
    rrule: { type: 'string' },
    dtstart: { type: 'string', format: 'date-time' },
    title: { type: 'string' },
    type: { type: 'string', enum: ['Income', 'Expense'] },
    amount: { type: 'number' },
    category: { type: 'string' },
    description: { type: 'string' },
  },
  additionalProperties: true,
} as const;

export const calendarQuerySchema = {
  type: 'object',
  properties: {
    year: { type: 'string', description: 'Calendar year, e.g. 2026' },
    month: { type: 'string', description: 'Calendar month 1–12' },
    eventType: {
      oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
      description: 'Filter by event type(s). Repeat param or comma-separate.',
    },
    eventTypes: {
      oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
    },
  },
} as const;

export const calendarResponseSchema = {
  type: 'object',
  properties: {
    year: { type: 'integer' },
    month: { type: 'integer' },
    monthLabel: { type: 'string' },
    days: { type: 'array', items: { type: 'object', additionalProperties: true } },
    weeks: {
      type: 'array',
      items: { type: 'array', items: { type: 'object', additionalProperties: true } },
    },
  },
} as const;
