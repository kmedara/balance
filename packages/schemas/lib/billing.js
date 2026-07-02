import { Type } from './typebox.js';
export const subscriptionResponseSchema = Type.Object({
    tier: Type.Union([Type.Literal('free'), Type.Literal('plus'), Type.Literal('pro')]),
    status: Type.Union([
        Type.Literal('active'),
        Type.Literal('trialing'),
        Type.Literal('past_due'),
        Type.Literal('canceled'),
        Type.Literal('none'),
    ]),
    currentPeriodEnd: Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
    trialEnd: Type.Union([Type.String({ format: 'date-time' }), Type.Null()]),
});
export const checkoutBodySchema = Type.Object({
    priceId: Type.String({ description: 'Stripe Price ID (e.g. price_...)' }),
});
export const checkoutResponseSchema = Type.Object({
    url: Type.String({ format: 'uri' }),
});
export const stripeWebhookResponseSchema = Type.Object({
    received: Type.Boolean(),
});
//# sourceMappingURL=billing.js.map