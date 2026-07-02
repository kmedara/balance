import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { findUserByCognitoSub } from '../auth/user.repository.js';
import {
  bearerSecurity,
  problemDetailsSchema,
} from '../swagger/schemas.js';
import {
  BadGatewayError,
  ForbiddenError,
  ServiceUnavailableError,
} from '../errors/http-error.js';
import { getStripeEnv, isStripeConfigured } from './constants.js';
import {
  checkoutBodySchema,
  checkoutResponseSchema,
  subscriptionResponseSchema,
} from './schemas.js';
import {
  createCheckoutSession,
  createPortalSession,
} from './stripe.client.js';
import {
  billingErrorMessage,
  toSubscriptionResponse,
} from './routes.helpers.js';

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
    handler: async (request) => {
      const user = await findUserByCognitoSub(request.user.userId);

      if (!user) {
        throw new ForbiddenError('User not found');
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
        400: problemDetailsSchema,
        403: problemDetailsSchema,
        502: problemDetailsSchema,
        503: problemDetailsSchema,
      },
    },
    handler: async (request) => {
      if (!isStripeConfigured()) {
        throw new ServiceUnavailableError('Stripe is not configured (STRIPE_SECRET_KEY)');
      }

      const user = await findUserByCognitoSub(request.user.userId);

      if (!user) {
        throw new ForbiddenError('User not found');
      }

      const priceId = request.body.priceId.trim();
      const { CLIENT_ORIGIN } = getStripeEnv();

      return await createCheckoutSession({
        cognitoSub: request.user.userId,
        email: request.user.email ?? user.email,
        stripeCustomerId: user.stripeCustomerId,
        priceId,
        successUrl: `${CLIENT_ORIGIN}/settings/billing?checkout=success`,
        cancelUrl: `${CLIENT_ORIGIN}/settings/billing?checkout=canceled`,
      });
    },
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
    handler: async (request) => {
      if (!isStripeConfigured()) {
        throw new ServiceUnavailableError('Stripe is not configured (STRIPE_SECRET_KEY)');
      }

      const user = await findUserByCognitoSub(request.user.userId);

      if (!user?.stripeCustomerId) {
        throw new ForbiddenError('No billing account linked');
      }

      const { CLIENT_ORIGIN } = getStripeEnv();

      return await createPortalSession({
        stripeCustomerId: user.stripeCustomerId,
        returnUrl: `${CLIENT_ORIGIN}/settings/billing`,
      });
    },
  });
};
