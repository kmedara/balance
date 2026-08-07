import type { FastifyInstance, FastifyRequest } from 'fastify';
import type { AuthUser } from '@balance/schemas/auth';
import { readSessionUser } from './session.js';
import { verifyAuthHeader } from './cognito.js';
import { ensureUserExists } from '../profile/repository.js';

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
    if (request.method === 'OPTIONS') {
      return;
    }

    // Primary: encrypted httpOnly session cookie (web SPA). Fallback: Cognito
    // access token via Authorization header (non-browser clients).
    const user =
      readSessionUser(request) ?? (await verifyAuthHeader(request.headers.authorization));
    request.user = user;
    // Create profile on first protected request if login upsert was skipped
    // (e.g. bearer-only clients). Does not rewrite email on every request.
    await ensureUserExists(user);
  });
};
