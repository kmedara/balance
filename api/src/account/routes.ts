import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { Type } from 'typebox';
import { bearerSecurity, problemDetailsSchema } from '@balance/schemas/common';
import { deleteAccountForUser } from './service.js';

export const accountRoutes: FastifyPluginAsyncTypebox = async (app) => {
  app.delete('/', {
    schema: {
      tags: ['Account'],
      summary: 'Delete account (HP1)',
      description:
        'Hard-deletes the authenticated user account: external cleanup stubs (Cognito/Plaid/Stripe/sessions) then DynamoDB partition purge. Vendor cleanup is completed in later phases.',
      security: bearerSecurity,
      response: {
        204: Type.Null(),
        401: problemDetailsSchema,
        403: problemDetailsSchema,
        500: problemDetailsSchema,
      },
    },
    handler: async (request, reply) => {
      await deleteAccountForUser(request.user.userId);
      return reply.status(204).send(null);
    },
  });
};
