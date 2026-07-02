import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { authRoutes } from './routes.js';
import { registerSession } from './session.js';

const authPlugin = async (app: FastifyInstance): Promise<void> => {
  // Session support is global so both the public /auth routes and the protected
  // scope can read/write the encrypted session cookie. Auth enforcement itself
  // lives in the encapsulated protected scope (see auth/protected.ts).
  await registerSession(app);

  await app.register(authRoutes, { prefix: '/auth' });
};

export const registerAuth = fp(authPlugin, { name: 'balance-auth' });
