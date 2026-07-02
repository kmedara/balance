import type { FastifyInstance, FastifyRequest } from 'fastify';
import type { AuthUser } from './types.js';
import { readSessionUser } from './session.js';
import { verifyAuthHeader } from './cognito.js';
import { upsertUserFromAuth } from './user.repository.js';

/**
 * Registers the auth guard on an encapsulated Fastify scope. Every route
 * registered on `app` (or its children) after this call requires a valid
 * session cookie or bearer access token, and handlers can read the resolved
 * user from the non-optional `request.user`.
 */
export const registerAuthGuard = (app: FastifyInstance): void => {
  app.decorateRequest('user', {
    getter(this: FastifyRequest) {
      return this._user!;
    },
    setter(this: FastifyRequest, value: AuthUser) {
      this._user = value;
    },
  });

  app.addHook('onRequest', async (request) => {
    // CORS preflight carries no credentials; let @fastify/cors handle it.
    if (request.method === 'OPTIONS') {
      console.log('CORS preflight');
      return;
    }

    // Primary: encrypted httpOnly session cookie (web SPA). Fallback: Cognito
    // access token via Authorization header (non-browser clients). Throws
    // ForbiddenError when neither is present/valid, which the error handler
    // maps to a 403 before the route handler runs.
    const user = readSessionUser(request) ?? (await verifyAuthHeader(request.headers.authorization));
    console.log('user', user);
    request.user = user;
    await upsertUserFromAuth(user);
    console.log('request.user', request.user);
  });
};
