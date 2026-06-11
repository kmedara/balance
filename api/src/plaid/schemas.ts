export const linkTokenResponseSchema = {
  type: 'object',
  additionalProperties: true,
} as const;

export const exchangeTokenBodySchema = {
  type: 'object',
  required: ['public_token'],
  properties: {
    public_token: { type: 'string' },
  },
} as const;

export const plaidExchangeTokenResponseSchema = {
  type: 'object',
  properties: {
    item_id: { type: 'string' },
    request_id: { type: 'string' },
  },
} as const;

export const syncTransactionsBodySchema = {
  type: 'object',
  properties: {
    item_id: { type: 'string', description: 'Plaid item id. Omit to sync all linked items.' },
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
