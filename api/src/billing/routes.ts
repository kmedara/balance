import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import type { FastifyRequest } from 'fastify';
import {
  checkoutBodySchema,
  checkoutResponseSchema,
  stripeWebhookResponseSchema,
  subscriptionResponseSchema,
} from '@balance/schemas/billing';
import {
  bearerSecurity,
  publicRouteSecurity,
  problemDetailsSchema,
} from '@balance/schemas/common';
import {
  BadRequestError,
  ServiceUnavailableError,
} from '../errors/http-error.js';
import { isStripeConfigured } from './utils.js';
import { constructWebhookEvent } from './stripe.client.js';
import {
  getSubscriptionForUser,
  handleStripeWebhookEvent,
  startCheckoutForUser,
  startPortalForUser,
} from './service.js';
import type { StripeWebhookRequest } from './types.js';

export const billingRoutes: FastifyPluginAsyncTypebox = async (app) => {
  app.get('/subscription', {
    schema: {
      tags: ['Billing'],
      summary: 'Current subscription tier and status',
      security: bearerSecurity,
      response: {
        200: subscriptionResponseSchema,
        403: problemDetailsSchema,
      },
    },
    handler: async (request) => getSubscriptionForUser(request.user.userId),
  });

  app.post('/checkout', {
    schema: {
      tags: ['Billing'],
      summary: 'Create Stripe Checkout session for upgrade',
      security: bearerSecurity,
      body: checkoutBodySchema,
      response: {
        200: checkoutResponseSchema,
        400: problemDetailsSchema,
        403: problemDetailsSchema,
        502: problemDetailsSchema,
        503: problemDetailsSchema,
      },
    },
    handler: async (request) => startCheckoutForUser(request.user, request.body),
  });

  app.post('/portal', {
    schema: {
      tags: ['Billing'],
      summary: 'Create Stripe Customer Portal session',
      security: bearerSecurity,
      response: {
        200: checkoutResponseSchema,
        403: problemDetailsSchema,
        502: problemDetailsSchema,
        503: problemDetailsSchema,
      },
    },
    handler: async (request) => startPortalForUser(request.user.userId),
  });
};

const registerStripeWebhookRawBody = (
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

// Public (no Cognito auth): verified via the Stripe-Signature header. Kept out
// of the protected scope so it can be reached without a session or bearer token.
export const billingWebhookRoutes: FastifyPluginAsyncTypebox = async (app) => {
  registerStripeWebhookRawBody(app);

  app.post('/webhooks/stripe', {
    schema: {
      tags: ['Billing'],
      summary: 'Stripe webhook receiver',
      description: 'No Cognito auth. Verified via Stripe-Signature header.',
      security: publicRouteSecurity,
      response: {
        200: stripeWebhookResponseSchema,
        400: problemDetailsSchema,
        503: problemDetailsSchema,
      },
    },
    handler: async (request) => {
      if (!isStripeConfigured()) {
        throw new ServiceUnavailableError('Stripe is not configured (STRIPE_SECRET_KEY)');
      }

      const signature = request.headers['stripe-signature'];
      if (typeof signature !== 'string') {
        throw new BadRequestError('Missing Stripe-Signature header');
      }

      const rawBody = (request as FastifyRequest & StripeWebhookRequest).rawBody;
      if (!rawBody?.length) {
        throw new BadRequestError('Missing raw webhook body');
      }

      return await handleStripeWebhookEvent(constructWebhookEvent(rawBody, signature))
        .then(() => ({ received: true }))
        .catch((err) => {
          const message = err instanceof Error ? err.message : 'Webhook verification failed';
          request.log.warn({ err, message }, 'Stripe webhook failed');
          throw new BadRequestError(message);
        });
    },
  });
};
