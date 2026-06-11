export const subscriptionResponseSchema = {
  type: 'object',
  properties: {
    tier: { type: 'string', enum: ['free', 'plus', 'pro'] },
    status: {
      type: 'string',
      enum: ['active', 'trialing', 'past_due', 'canceled', 'none'],
    },
    currentPeriodEnd: { type: 'string', format: 'date-time', nullable: true },
    trialEnd: { type: 'string', format: 'date-time', nullable: true },
  },
} as const;

export const checkoutBodySchema = {
  type: 'object',
  required: ['priceId'],
  properties: {
    priceId: { type: 'string', description: 'Stripe Price ID (e.g. price_...)' },
  },
} as const;

export const checkoutResponseSchema = {
  type: 'object',
  properties: {
    url: { type: 'string', format: 'uri' },
  },
} as const;

export const stripeWebhookResponseSchema = {
  type: 'object',
  properties: {
    received: { type: 'boolean' },
  },
} as const;
