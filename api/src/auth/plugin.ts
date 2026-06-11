import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { authenticateRequest } from './cognito.js';
import { ForbiddenError } from './types.js';
import { upsertUserFromAuth } from './user.repository.js';

const getDb = (app: FastifyInstance) =>
  app.mongo.db ?? app.mongo.client.db(process.env.MONGO_DB ?? 'balance');

const authPlugin = async (app: FastifyInstance): Promise<void> => {
  app.setErrorHandler((error, _request, reply) => {
    if (error instanceof ForbiddenError) {
      return reply.status(403).send({ error: 'Forbidden', message: error.message });
    } else if((error as any).validation) {
      return reply.status(400).send({ error: 'Bad Request', message: 'oh no' });
    }

    reply.send(error);
  });

  app.addHook('onRequest', async (request, reply) => {
    await authenticateRequest(request, reply);
    if (reply.sent || !request.authUser) {
      return;
    }

    const db = getDb(app);
    await upsertUserFromAuth(db, request.authUser);
  });
};

export const registerAuth = fp(authPlugin, { name: 'balance-auth' });
