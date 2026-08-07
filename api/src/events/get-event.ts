import type { FastifyInstance } from 'fastify';
import { bearerSecurity, problemDetailsSchema } from '../swagger/schemas.js';
import { BadRequestError, NotFoundError } from '../errors/http-error.js';
import { isValidId } from '../data/id.js';
import { eventIdParamSchema, eventResponseSchema } from './schemas.js';
import { isRemovedEvent, toCreateEventResponse } from './event-response.js';
import { findEventById } from './repository.js';

export const registerGetEventRoute = (app: FastifyInstance): void => {
  app.get('/:id', {
    schema: {
      tags: ['Events'],
      summary: 'Get event by id',
      description: 'Returns a single event owned by the authenticated user.',
      security: bearerSecurity,
      params: eventIdParamSchema,
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
      const event = await findEventById(id, { userId: request.user.userId });
      if (isRemovedEvent(event)) {
        throw new NotFoundError('Event not found');
      }
      return toCreateEventResponse(event);
    },
  });
};
