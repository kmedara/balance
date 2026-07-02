import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import type { FastifyRequest } from 'fastify';
import type { SubscriptionStatus, SubscriptionTier } from '../auth/user.repository.js';
import type { StripeWebhookRequest } from './types.js';

export const toSubscriptionResponse = (subscription: {
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  currentPeriodEnd?: Date;
  trialEnd?: Date;
}) => ({
  tier: subscription.tier,
  status: subscription.status,
  currentPeriodEnd: subscription.currentPeriodEnd?.toISOString() ?? null,
  trialEnd: subscription.trialEnd?.toISOString() ?? null,
});

export const billingErrorMessage = (err: unknown): { status: 502 | 503; message: string } => {
  const message = err instanceof Error ? err.message : 'Billing request failed';
  if (message.includes('not configured') || message.includes('Unknown Stripe price')) {
    return { status: 503, message };
  }
  return { status: 502, message };
};

export const registerStripeWebhookRawBody = (
  app: Parameters<FastifyPluginAsyncTypebox>[0],
): void => {
  const defaultJsonParser = app.getDefaultJsonParser('error', 'error');

  app.addContentTypeParser(
    'application/json',
    { parseAs: 'buffer' },
    (request, body, done) => {
      const path = request.url.split('?')[0] ?? '';
      if (request.method === 'POST' && path.endsWith('/webhooks/stripe')) {
        (request as FastifyRequest & StripeWebhookRequest).rawBody = body as Buffer;
        done(null, body);
        return;
      }

      defaultJsonParser(
        request,
        Buffer.isBuffer(body) ? body.toString('utf8') : body,
        done,
      );
    },
  );
};
