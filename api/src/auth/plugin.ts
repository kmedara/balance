import type { FastifyInstance } from 'fastify';
import { authenticateRequest } from './cognito.js';
import { upsertUserFromAuth } from './user.repository.js';

const getDb = (app: FastifyInstance) =>
  app.mongo.db ?? app.mongo.client.db(process.env.MONGO_DB ?? 'balance');

export const registerAuth = async (app: FastifyInstance): Promise<void> => {
  app.addHook('onRequest', async (request, reply) => {
    await authenticateRequest(request, reply);
    if (reply.sent || !request.authUser) {
      return;
    }

    const db = getDb(app);
    await upsertUserFromAuth(db, request.authUser);
  });
};
