import type { FastifyInstance } from 'fastify';
import { CountryCode, Products, type LinkTokenCreateRequest } from 'plaid';
import { requireAuthUser } from '../auth/cognito.js';
import { getPlaidEnvVars } from '../env.helper.js';
import { getDb } from './db.js';
import { plaidClient } from './client.js';
import {
  linkPlaidItem,
  syncTransactionsForPlaidItemId,
  syncTransactionsForUser,
} from './sync.service.js';

export const plaidRoutes = async (app: FastifyInstance) => {
  app.post('/link-token', async (request) => {
    const { PLAID_REDIRECT_URI } = getPlaidEnvVars();
    const user = requireAuthUser(request);

    const linkRequest: LinkTokenCreateRequest = {
      language: 'en',
      country_codes: [CountryCode.Us],
      products: [Products.Transactions],
      client_name: 'Budget-Balance',
      user: {
        client_user_id: user.userId,
      },
      redirect_uri: PLAID_REDIRECT_URI,
    };

    return plaidClient.linkTokenCreate(linkRequest).then(({ data }) => data);
  });

  app.post<{
    Body: { public_token: string };
  }>('/exchange-token', async (request, reply) => {
    const { public_token } = request.body;
    const db = getDb(app);
    const user = requireAuthUser(request);

    try {
      const { data } = await plaidClient.itemPublicTokenExchange({ public_token });

      await linkPlaidItem(db, {
        userId: user.userId,
        plaidItemId: data.item_id,
        accessToken: data.access_token,
      });

      return {
        item_id: data.item_id,
        request_id: data.request_id,
      };
    } catch (err) {
      request.log.error(err);
      return reply.status(502).send({
        error: err instanceof Error ? err.message : 'Failed to link bank account',
      });
    }
  });

  app.post<{
    Body: { item_id?: string };
  }>('/transactions/sync', async (request, reply) => {
    const { item_id } = request.body ?? {};
    const db = getDb(app);
    const user = requireAuthUser(request);

    try {
      if (item_id) {
        const result = await syncTransactionsForPlaidItemId(db, item_id, user.userId);
        return { items: [result] };
      }

      const items = await syncTransactionsForUser(db, user.userId);
      return { items };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Transaction sync failed';
      const status = message.includes('No linked') ? 400 : 404;
      return reply.status(status).send({ error: message });
    }
  });
};
