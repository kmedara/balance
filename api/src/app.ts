import { fastify, type FastifyInstance } from 'fastify';

import mongoSanitize from '@exortek/fastify-mongo-sanitize';

import {
  type TypeBoxTypeProvider,
  TypeBoxValidatorCompiler,
} from '@fastify/type-provider-typebox';

import { plaidRoutes } from './plaid/routes.js';
import { registerErrorHandling } from './errors/http-error.js';
import { registerAuth } from './auth/plugin.js';
import { registerAuthGuard } from './auth/protected.js';
import cors from '@fastify/cors';
import { cateogoryRoutes } from './categories/routes.js';
import { eventRoutes } from './events/routes.js';
import { billingRoutes } from './billing/routes.js';
import { billingWebhookRoutes } from './billing/webhook.routes.js';
import { registerSwagger, registerSwaggerUi } from './swagger/register.js';
import { pingResponseSchema, publicRouteSecurity } from './swagger/schemas.js';
import { getClientOrigins } from './auth/config.js';

export const buildApp = async (): Promise<FastifyInstance> => {
  const server = fastify()
    .setValidatorCompiler(TypeBoxValidatorCompiler)
    .withTypeProvider<TypeBoxTypeProvider>();

  await server.register(registerErrorHandling);

  await server.register(cors, {
    // Array allowlist: with credentials:true the browser requires the response
    // to echo the specific requesting origin, so `*` can't be used. @fastify/cors
    // reflects whichever allowlisted origin made the request.
    origin: getClientOrigins(),
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
  });

  await server.register(registerSwagger);

  server.get(
    '/ping',
    {
      schema: {
        tags: ['Health'],
        summary: 'Health check',
        security: publicRouteSecurity,
        response: {
          200: pingResponseSchema,
        },
      },
    },
    async () => 'pong',
  );

  await server.register(registerAuth);

  await server.register(mongoSanitize, {
    replaceWith: '',
    onSanitize: ({ key, originalValue, sanitizedValue }) => {
      server.log.warn({ key, originalValue, sanitizedValue }, 'Sanitized value');
    },
  });

  // Public: the Stripe webhook has no Cognito auth (verified via signature), so
  // it lives outside the protected scope.
  await server.register(billingWebhookRoutes, { prefix: '/billing' });

  // Protected: everything registered inside this encapsulated scope requires a
  // valid session/bearer token via the auth guard, and can read `request.user`.
  await server.register(async (protectedScope) => {
    registerAuthGuard(protectedScope);

    await protectedScope.register(plaidRoutes, { prefix: '/plaid' });
    await protectedScope.register(cateogoryRoutes, { prefix: '/categories' });
    await protectedScope.register(eventRoutes, { prefix: '/events' });
    await protectedScope.register(billingRoutes, { prefix: '/billing' });
  });

  await server.register(registerSwaggerUi);

  return server;
};
