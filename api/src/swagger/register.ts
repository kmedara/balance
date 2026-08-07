import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

const isAuthDisabled = (): boolean => process.env.AUTH_DISABLED === 'true';

export const registerSwagger = fp(
  async (app: FastifyInstance): Promise<void> => {
    await app.register(swagger, {
      openapi: {
        openapi: '3.0.3',
        info: {
          title: 'Balance API',
          description:
            'Budget calendar and Plaid bank sync API. Most routes require a Cognito JWT Bearer token unless AUTH_DISABLED=true.',
          version: '1.0.0',
        },
        servers: [
          {
            url: process.env.API_PUBLIC_URL ?? 'http://localhost:3000',
            description: 'API server',
          },
        ],
        tags: [
          { name: 'Health', description: 'Liveness checks' },
          { name: 'Auth', description: 'Session and Cognito OAuth' },
          { name: 'Profile', description: 'User profile create and update' },
          { name: 'Events', description: 'Unified events and calendar' },
          { name: 'Categories', description: 'Budget categories' },
          { name: 'Plaid', description: 'Bank linking and transaction sync' },
          { name: 'Billing', description: 'Stripe subscriptions and entitlements' },
          { name: 'Account', description: 'Account deletion (HP1 hard purge)' },
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
              description: isAuthDisabled()
                ? 'Optional in dev when AUTH_DISABLED=true (uses seeded dev user).'
                : 'Cognito id or access token.',
            },
          },
        },
      },
    });
  },
  { name: 'balance-swagger' },
);

export const registerSwaggerUi = fp(
  async (app: FastifyInstance): Promise<void> => {
    await app.register(swaggerUi, {
      routePrefix: '/docs',
      uiConfig: {
        docExpansion: 'list',
        deepLinking: true,
      },
    });
  },
  { name: 'balance-swagger-ui' },
);
