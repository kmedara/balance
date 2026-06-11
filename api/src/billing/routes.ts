import type { FastifyInstance, FastifyRequest } from 'fastify';
import { requireAuthUser } from '../auth/cognito.js';
import { findUserByCognitoSub } from '../auth/user.repository.js';
import {
  bearerSecurity,
  errorResponseSchema,
  publicRouteSecurity,
} from '../swagger/schemas.js';
import { getStripeEnv, isStripeConfigured } from './env.helper.js';
import {
  checkoutBodySchema,
  checkoutResponseSchema,
  stripeWebhookResponseSchema,
  subscriptionResponseSchema,
} from './schemas.js';
import {
  constructWebhookEvent,
  createCheckoutSession,
  createPortalSession,
} from './stripe.client.js';
import type { StripeWebhookRequest } from './types.js';
import { handleStripeWebhookEvent } from './webhook.handler.js';

const getDb = (app: FastifyInstance) =>
  app.mongo.db ?? app.mongo.client.db(process.env.MONGO_DB ?? 'balance');

const toSubscriptionResponse = (subscription: {
  tier: string;
  status: string;
  currentPeriodEnd?: Date;
  trialEnd?: Date;
}) => ({
  tier: subscription.tier,
  status: subscription.status,
  currentPeriodEnd: subscription.currentPeriodEnd?.toISOString() ?? null,
  trialEnd: subscription.trialEnd?.toISOString() ?? null,
});

const billingErrorMessage = (err: unknown): { status: 502 | 503; message: string } => {
  const message = err instanceof Error ? err.message : 'Billing request failed';
  if (message.includes('not configured') || message.includes('Unknown Stripe price')) {
    return { status: 503, message };
  }
  return { status: 502, message };
};

const registerStripeWebhookRawBody = (app: FastifyInstance): void => {
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

export const billingRoutes = async (app: FastifyInstance) => {
  registerStripeWebhookRawBody(app);

  app.get('/subscription', {
    schema: {
      tags: ['Billing'],
      summary: 'Current subscription tier and status',
      security: bearerSecurity,
      response: {
        200: subscriptionResponseSchema,
        403: errorResponseSchema,
      },
    },
    handler: async (request, reply) => {
      const authUser = requireAuthUser(request);
      const db = getDb(app);
      const user = await findUserByCognitoSub(db, authUser.userId);

      if (!user) {
        return reply.status(403).send({ error: 'Forbidden', message: 'User not found' });
      }

      return toSubscriptionResponse(user.subscription);
    },
  });

  app.post('/checkout', {
    schema: {
      tags: ['Billing'],
      summary: 'Create Stripe Checkout session for upgrade',
      security: bearerSecurity,
      body: checkoutBodySchema,
      response: {
        200: checkoutResponseSchema,
        400: errorResponseSchema,
        403: errorResponseSchema,
        502: errorResponseSchema,
        503: errorResponseSchema,
      },
    },
    handler: async (request, reply) => {
      if (!isStripeConfigured()) {
        return reply.status(503).send({
          error: 'Service Unavailable',
          message: 'Stripe is not configured (STRIPE_SECRET_KEY)',
        });
      }

      const authUser = requireAuthUser(request);
      const db = getDb(app);
      const user = await findUserByCognitoSub(db, authUser.userId);

      if (!user) {
        return reply.status(403).send({ error: 'Forbidden', message: 'User not found' });
      }

      const body = request.body as { priceId?: string };
      const priceId = body.priceId?.trim();
      if (!priceId) {
        return reply.status(400).send({ error: 'Bad Request', message: 'priceId is required' });
      }

      const { CLIENT_ORIGIN } = getStripeEnv();

      try {
        return await createCheckoutSession(db, {
          cognitoSub: authUser.userId,
          email: authUser.email ?? user.email,
          stripeCustomerId: user.stripeCustomerId,
          priceId,
          successUrl: `${CLIENT_ORIGIN}/settings/billing?checkout=success`,
          cancelUrl: `${CLIENT_ORIGIN}/settings/billing?checkout=canceled`,
        });
      } catch (err) {
        const { status, message } = billingErrorMessage(err);
        return reply.status(status).send({ error: 'Checkout failed', message });
      }
    },
  });

  app.post('/portal', {
    schema: {
      tags: ['Billing'],
      summary: 'Create Stripe Customer Portal session',
      security: bearerSecurity,
      response: {
        200: checkoutResponseSchema,
        403: errorResponseSchema,
        502: errorResponseSchema,
        503: errorResponseSchema,
      },
    },
    handler: async (request, reply) => {
      if (!isStripeConfigured()) {
        return reply.status(503).send({
          error: 'Service Unavailable',
          message: 'Stripe is not configured (STRIPE_SECRET_KEY)',
        });
      }

      const authUser = requireAuthUser(request);
      const db = getDb(app);
      const user = await findUserByCognitoSub(db, authUser.userId);

      if (!user?.stripeCustomerId) {
        return reply
          .status(403)
          .send({ error: 'Forbidden', message: 'No billing account linked' });
      }

      const { CLIENT_ORIGIN } = getStripeEnv();

      try {
        return await createPortalSession({
          stripeCustomerId: user.stripeCustomerId,
          returnUrl: `${CLIENT_ORIGIN}/settings/billing`,
        });
      } catch (err) {
        const { status, message } = billingErrorMessage(err);
        return reply.status(status).send({ error: 'Portal failed', message });
      }
    },
  });

  app.post('/webhooks/stripe', {
    schema: {
      tags: ['Billing'],
      summary: 'Stripe webhook receiver',
      description: 'No Cognito auth. Verified via Stripe-Signature header.',
      security: publicRouteSecurity,
      response: {
        200: stripeWebhookResponseSchema,
        400: errorResponseSchema,
        503: errorResponseSchema,
      },
    },
    handler: async (request, reply) => {
      if (!isStripeConfigured()) {
        return reply.status(503).send({
          error: 'Service Unavailable',
          message: 'Stripe is not configured (STRIPE_SECRET_KEY)',
        });
      }

      const signature = request.headers['stripe-signature'];
      if (typeof signature !== 'string') {
        return reply
          .status(400)
          .send({ error: 'Bad Request', message: 'Missing Stripe-Signature header' });
      }

      const rawBody = (request as FastifyRequest & StripeWebhookRequest).rawBody;
      if (!rawBody?.length) {
        return reply
          .status(400)
          .send({ error: 'Bad Request', message: 'Missing raw webhook body' });
      }

      try {
        const event = constructWebhookEvent(rawBody, signature);
        await handleStripeWebhookEvent(getDb(app), event);
        return { received: true };
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Webhook verification failed';
        request.log.warn({ err, message }, 'Stripe webhook failed');
        return reply.status(400).send({ error: 'Bad Request', message });
      }
    },
  });
};
