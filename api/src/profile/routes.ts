import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import {
  createProfileBodySchema,
  patchProfileBodySchema,
  profileResponseSchema,
} from '@balance/schemas/auth';
import { bearerSecurity, problemDetailsSchema } from '@balance/schemas/common';
import {
  createProfileForUser,
  getProfileForUser,
  patchProfileForUser,
} from './service.js';

export const profileRoutes: FastifyPluginAsyncTypebox = async (app) => {
  app.get('/', {
    schema: {
      tags: ['Profile'],
      summary: 'Get current user profile',
      security: bearerSecurity,
      response: {
        200: profileResponseSchema,
        403: problemDetailsSchema,
        404: problemDetailsSchema,
      },
    },
    handler: async (request) => getProfileForUser(request.user),
  });

  app.post('/', {
    schema: {
      tags: ['Profile'],
      summary: 'Create user profile',
      description:
        'Creates the DynamoDB profile for the signed-in user. Returns 409 if it already exists. Optional email is written to Cognito when provided.',
      security: bearerSecurity,
      body: createProfileBodySchema,
      response: {
        201: profileResponseSchema,
        400: problemDetailsSchema,
        403: problemDetailsSchema,
        409: problemDetailsSchema,
      },
    },
    handler: async (request, reply) => {
      const profile = await createProfileForUser(request.user, request.body);
      if (profile.email) {
        request.session.set('authUser', {
          userId: request.user.userId,
          email: profile.email,
        });
      }
      return reply.status(201).send(profile);
    },
  });

  app.patch('/', {
    schema: {
      tags: ['Profile'],
      summary: 'Update user profile',
      description:
        'Patches profile fields (email, displayName). Email changes update Cognito and the session cookie.',
      security: bearerSecurity,
      body: patchProfileBodySchema,
      response: {
        200: profileResponseSchema,
        400: problemDetailsSchema,
        403: problemDetailsSchema,
        404: problemDetailsSchema,
      },
    },
    handler: async (request) => {
      const profile = await patchProfileForUser(request.user, request.body);
      request.session.set('authUser', {
        userId: request.user.userId,
        email: profile.email,
      });
      request.user = {
        userId: request.user.userId,
        email: profile.email,
      };
      return profile;
    },
  });
};
