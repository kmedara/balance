import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { CountryCode, Products, type LinkTokenCreateRequest } from 'plaid';
import {
  bearerSecurity,
  problemDetailsSchema,
} from '@balance/schemas/common';
import {
  exchangeTokenBodySchema,
  linkTokenResponseSchema,
  plaidExchangeTokenResponseSchema,
  plaidSyncResponseSchema,
  syncTransactionsBodySchema,
} from '@balance/schemas/plaid';
import { BadGatewayError } from '../errors/http-error.js';
import { plaidClient } from './client.js';
import {
  linkPlaidItem,
  syncTransactionsForPlaidItemId,
  syncTransactionsForUser,
} from './service.js';

export const plaidRoutes: FastifyPluginAsyncTypebox = async (app) => {
  app.post('/link-token', {
    schema: {
      tags: ['Plaid'],
      summary: 'Create a Plaid Link token',
      security: bearerSecurity,
      response: {
        200: linkTokenResponseSchema,
        403: problemDetailsSchema,
      },
    },
    handler: async (request) => {
      const linkRequest: LinkTokenCreateRequest = {
        language: 'en',
        country_codes: [CountryCode.Us],
        products: [Products.Transactions],
        client_name: 'Budget-Balance',
        user: {
          client_user_id: request.user.userId,
        },
        redirect_uri: process.env.PLAID_REDIRECT_URI,
      };

      return await plaidClient.linkTokenCreate(linkRequest).then(({ data }) => data);
    },
  });

  app.post('/exchange-token', {
    schema: {
      tags: ['Plaid'],
      summary: 'Exchange a public token for a linked item',
      security: bearerSecurity,
      body: exchangeTokenBodySchema,
      response: {
        200: plaidExchangeTokenResponseSchema,
        403: problemDetailsSchema,
        502: problemDetailsSchema,
      },
    },
    handler: async (request) => {
      const { public_token } = request.body;
      const user = request.user;

      try {
        const { data } = await plaidClient.itemPublicTokenExchange({ public_token });

        await linkPlaidItem({
          userId: user.userId,
          plaidItemId: data.item_id,
          accessToken: data.access_token,
        });

        return {
          item_id: data.item_id,
          request_id: data.request_id,
        };
      } catch (err) {
        throw new BadGatewayError(
          err instanceof Error ? err.message : 'Failed to link bank account',
        );
      }
    },
  });

  app.post('/transactions/sync', {
    schema: {
      tags: ['Plaid'],
      summary: 'Sync Plaid transactions into events',
      description:
        'Pulls transactions from Plaid and upserts them as plaid_transaction events.',
      security: bearerSecurity,
      body: syncTransactionsBodySchema,
      response: {
        200: plaidSyncResponseSchema,
        400: problemDetailsSchema,
        403: problemDetailsSchema,
        404: problemDetailsSchema,
      },
    },
    handler: async (request) => {
      const { item_id } = request.body;

      return item_id ? 
      { items: [await syncTransactionsForPlaidItemId(item_id, request.user.userId)] } : 
      { items: await syncTransactionsForUser(request.user.userId) };
    },
  });
};
