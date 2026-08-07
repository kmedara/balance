import type { FastifyInstance } from 'fastify';
import { bearerSecurity, problemDetailsSchema } from '../swagger/schemas.js';
import { BadRequestError } from '../errors/http-error.js';
import { isValidId } from '../data/id.js';
import { eventIdParamSchema, eventResponseSchema, patchEventBodySchema } from './schemas.js';
import { toCreateEventResponse } from './event-response.js';
import { updateEventForUser } from './update-event.js';

export const registerUpdateEventRoute = (app: FastifyInstance): void => {
  app.patch('/:id', {
    schema: {
      tags: ['Events'],
      summary: 'Update event by id',
      description: 'Updates a budget event. Plaid events cannot be updated.',
      security: bearerSecurity,
      params: eventIdParamSchema,
      body: patchEventBodySchema,
      response: {
        200: eventResponseSchema,
        400: problemDetailsSchema,
        403: problemDetailsSchema,
        404: problemDetailsSchema,
      },
    },
    handler: async (request) => {
      const { id } = request.params;
      if (!isValidId(id)) {
        throw new BadRequestError('Invalid event id');
      }
      const result = await updateEventForUser(request.user.userId, id, request.body);
      return toCreateEventResponse(result);
    },
  });
};
