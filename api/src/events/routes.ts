import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { Type } from 'typebox';
import { isValidId } from '../data/id.js';
import { BadRequestError } from '../errors/http-error.js';
import { bearerSecurity, problemDetailsSchema } from '@balance/schemas/common';
import {
  calendarQuerySchema,
  calendarResponseSchema,
  createEventBodySchema,
  createEventResponseSchema,
  eventIdParamSchema,
  eventResponseSchema,
  patchEventBodySchema,
} from '@balance/schemas/events';
import {
  createEventForUser,
  deleteEventForUser,
  getCalendarForUser,
  getEventForUser,
  parseEventTypes,
  toCreateEventResponse,
  updateEventForUser,
} from './service.js';

export const eventRoutes: FastifyPluginAsyncTypebox = async (app) => {
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
      const event = await createEventForUser(request.user.userId, request.body);
      return reply.status(201).send(toCreateEventResponse(event));
    },
  });

  app.get('/calendar', {
    schema: {
      tags: ['Events'],
      summary: 'Month calendar grid',
      description: 'Returns a padded month grid with events expanded from stored recurrence rules.',
      security: bearerSecurity,
      querystring: calendarQuerySchema,
      response: {
        200: calendarResponseSchema,
        400: problemDetailsSchema,
        403: problemDetailsSchema,
      },
    },
    handler: async (request) => {
      const now = new Date();
      const year = request.query.year ?? now.getFullYear();
      const monthIndex = (request.query.month ?? now.getMonth() + 1) - 1;
      const eventTypes = parseEventTypes(request.query.eventType);
      return getCalendarForUser(request.user.userId, year, monthIndex, eventTypes);
    },
  });

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
      const event = await getEventForUser(request.user.userId, id);
      return toCreateEventResponse(event);
    },
  });

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

  app.delete('/:id', {
    schema: {
      tags: ['Events'],
      summary: 'Delete event by id',
      description:
        'Hard-deletes a budget event (HP1). Plaid transaction events cannot be deleted by the user.',
      security: bearerSecurity,
      params: eventIdParamSchema,
      response: {
        204: Type.Null(),
        400: problemDetailsSchema,
        403: problemDetailsSchema,
        404: problemDetailsSchema,
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params;
      if (!isValidId(id)) {
        throw new BadRequestError('Invalid event id');
      }
      await deleteEventForUser(request.user.userId, id);
      return reply.status(204).send(null);
    },
  });
};
