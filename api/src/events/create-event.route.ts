import type { FastifyInstance } from 'fastify';
import { bearerSecurity, problemDetailsSchema } from '../swagger/schemas.js';
import { BadRequestError } from '../errors/http-error.js';
import { createEventBodySchema, createEventResponseSchema } from './schemas.js';
import { createEventForUser } from './create-event.js';
import { toCreateEventResponse } from './event-response.js';

export const registerCreateEventRoute = (app: FastifyInstance): void => {
  app.post('/', {
    schema: {
      tags: ['Events'],
      summary: 'Create a recurring event',
      description: 'Creates an event. Budget events require title, type, amount, and category.',
      security: bearerSecurity,
      body: createEventBodySchema,
      response: {
        201: createEventResponseSchema,
        400: problemDetailsSchema,
        403: problemDetailsSchema,
      },
    },
    handler: async (request, reply) => {
      const body = request.body;
      if (!body.rrule?.trim() && !body.frequency) {
        throw new BadRequestError('Provide rrule or frequency for recurring events');
      }
      const event = await createEventForUser(request.user.userId, body);
      return reply.status(201).send(toCreateEventResponse(event));
    },
  });
};
