import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import {
  authCallbackQuerySchema,
  authLoginQuerySchema,
  authLogoutQuerySchema,
  authMeResponseSchema,
  unauthorizedResponseSchema,
} from '@balance/schemas/auth';
import { publicRouteSecurity } from '@balance/schemas/common';
import {
  getPrimaryClientOrigin,
  isAuthDisabled,
  resolveCognitoLogoutUri,
  resolveReturnTo,
  sanitizeReturnTo,
} from './config.js';
import { verifyIdToken } from './cognito.js';
import { clearAuthSession, readSessionUser } from './session.js';
import {
  buildAuthorizeUrl,
  buildLogoutUrl,
  exchangeAuthorizationCode,
  generateOAuthState,
  generatePkcePair,
} from './service.js';
import { upsertUserFromAuth } from '../profile/repository.js';

const DEV_ME_RESPONSE = {
  userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  email: 'dev@localhost',
};

export const authRoutes: FastifyPluginAsyncTypebox = async (app) => {
  app.get(
    '/login',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Start Cognito sign-in',
        security: publicRouteSecurity,
        querystring: authLoginQuerySchema,
      },
    },
    async (request, reply) => {
      if (isAuthDisabled()) {
        return reply.redirect(resolveReturnTo(request.query.returnTo));
      }

      const returnTo = sanitizeReturnTo(request.query.returnTo);

      const { verifier, challenge } = generatePkcePair();
      const state = generateOAuthState();

      request.session.set('oauthState', state);
      request.session.set('pkceVerifier', verifier);
      request.session.set('returnTo', returnTo);

      return reply.redirect(buildAuthorizeUrl({ state, challenge }));
    },
  );

  app.get(
    '/callback',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Cognito OAuth callback',
        security: publicRouteSecurity,
        querystring: authCallbackQuerySchema,
      },
    },
    async (request, reply) => {
      if (isAuthDisabled()) {
        return reply.redirect(`${getPrimaryClientOrigin()}/calendar`);
      }

      const { code, state, error } = request.query;

      const expectedState = request.session.get('oauthState');
      const verifier = request.session.get('pkceVerifier');
      const returnTo = resolveReturnTo(request.session.get('returnTo'));

      const clientOrigin = new URL(returnTo).origin;

      request.session.set('oauthState', undefined);
      request.session.set('pkceVerifier', undefined);
      request.session.set('returnTo', undefined);

      if (error) {
        return reply.redirect(`${clientOrigin}/login?error=${encodeURIComponent(error)}`);
      }

      if (
        !code ||
        !state ||
        !expectedState ||
        state !== expectedState ||
        typeof verifier !== 'string'
      ) {
        return reply.redirect(`${clientOrigin}/login?error=invalid_state`);
      }

      try {
        const tokens = await exchangeAuthorizationCode({ code, verifier });
        const authUser = await verifyIdToken(tokens.idToken);
        await upsertUserFromAuth(authUser);
        request.session.set('authUser', authUser);
        return reply.redirect(returnTo);
      } catch (err) {
        request.log.warn({ err }, 'OAuth callback failed');
        const message = err instanceof Error ? err.message : 'sign_in_failed';
        return reply.redirect(`${clientOrigin}/login?error=${encodeURIComponent(message)}`);
      }
    },
  );

  app.get(
    '/me',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Current signed-in user',
        security: publicRouteSecurity,
        response: {
          200: authMeResponseSchema,
          401: unauthorizedResponseSchema,
        },
      },
    },
    async (request, reply) => {
      if (isAuthDisabled()) {
        return DEV_ME_RESPONSE;
      }

      const authUser = readSessionUser(request);
      if (!authUser) {
        return reply.status(401).send({ error: 'Unauthorized' });
      }

      return authUser;
    },
  );

  app.get(
    '/logout',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Sign out and clear session',
        security: publicRouteSecurity,
        querystring: authLogoutQuerySchema,
      },
    },
    async (request, reply) => {
      clearAuthSession(request, reply);

      const returnTo = resolveReturnTo(request.query.returnTo);
      const clientOrigin = new URL(returnTo).origin;

      if (isAuthDisabled()) {
        return reply.redirect(`${clientOrigin}/login`);
      }

      const logoutUri = resolveCognitoLogoutUri(returnTo);
      return reply.redirect(buildLogoutUrl(logoutUri));
    },
  );
};
