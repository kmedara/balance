export const errorResponseSchema = {
  type: 'object',
  properties: {
    error: { type: 'string' },
    message: { type: 'string' },
  },
} as const;

export const createEventBodySchema = {
  type: 'object',
  required: ['eventType', 'dtstart'],
  properties: {
    eventType: { type: 'string', enum: ['budget', 'test'], description: 'Event discriminator, e.g. budget or plaid_transaction' },
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
    weeks: { type: 'array', items: { type: 'array', items: { type: 'object', additionalProperties: true } } },
  },
} as const;

export const exchangeTokenBodySchema = {
  type: 'object',
  required: ['public_token'],
  properties: {
    public_token: { type: 'string' },
  },
} as const;

export const syncTransactionsBodySchema = {
  type: 'object',
  properties: {
    item_id: { type: 'string', description: 'Plaid item id. Omit to sync all linked items.' },
  },
} as const;

export const plaidExchangeTokenResponseSchema = {
  type: 'object',
  properties: {
    item_id: { type: 'string' },
    request_id: { type: 'string' },
  },
} as const;

export const plaidSyncResponseSchema = {
  type: 'object',
  properties: {
    items: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          item_id: { type: 'string' },
          added: { type: 'array', items: { type: 'object', additionalProperties: true } },
          modified: { type: 'array', items: { type: 'object', additionalProperties: true } },
          removed: { type: 'array', items: { type: 'object', additionalProperties: true } },
        },
      },
    },
  },
} as const;

export const bearerSecurity = [{ bearerAuth: [] }] as const;

export const publicRouteSecurity = [] as const;
