import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import type { FastifyRequest } from 'fastify';
import { publicRouteSecurity, problemDetailsSchema } from '../swagger/schemas.js';
import { BadRequestError, ServiceUnavailableError } from '../errors/http-error.js';
import { isStripeConfigured } from './constants.js';
import { stripeWebhookResponseSchema } from './schemas.js';
import { constructWebhookEvent } from './stripe.client.js';
import type { StripeWebhookRequest } from './types.js';
import { handleStripeWebhookEvent } from './webhook.handler.js';
import { registerStripeWebhookRawBody } from './routes.helpers.js';

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
