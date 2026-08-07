import { ttlEpochSeconds } from '../data/dates.js';
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import type { FastifyInstance } from 'fastify';
import { Type } from 'typebox';
import { getDocClient } from '../dynamo/client.js';
import { eventFromItem } from '../dynamo/entities.js';
import { matchesEventFilter, serializeRecord } from '../dynamo/helpers.js';
import { queryAll } from '../dynamo/query.js';
import { getTableName } from '../dynamo/tables.js';
import { isValidId } from '../data/id.js';
import { BadRequestError, NotFoundError } from '../errors/http-error.js';
import { PLAID_TRANSACTION_EVENT_TYPE } from '../plaid/constants.js';
import { bearerSecurity, problemDetailsSchema } from '../swagger/schemas.js';
import { BUDGET_EVENT_TYPE, REMOVED_EVENT_TTL_DAYS } from './constants.js';
import { findEventById } from './repository.js';
import { eventIdParamSchema } from './schemas.js';
const table = (): string => getTableName();

const softDeleteEventById = async (id: string, userId: string): Promise<void> => {
  const items = await queryAll<Record<string, unknown>>({
    TableName: table(),
    IndexName: 'EventIdIndex',
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: { ':id': id },
    Limit: 1,
  });

  const raw = items[0];
  if (!raw?.PK || !raw?.SK) throw new NotFoundError('Event not found');

  const existing = eventFromItem(raw);
  if (
    !matchesEventFilter(
      existing,
      { userId, includeRemoved: true },
      raw.status as string | undefined,
    )
  ) {
    throw new NotFoundError('Event not found');
  }

  if (raw.status === 'removed' || (existing as { removed?: boolean }).removed) {
    throw new NotFoundError('Event not found');
  }

  const now = new Date();
  const ttl = ttlEpochSeconds(REMOVED_EVENT_TTL_DAYS, now);

  await getDocClient().send(
    new UpdateCommand({
      TableName: table(),
      Key: { PK: raw.PK, SK: raw.SK },
      UpdateExpression:
        'SET #status = :status, removed = :removed, updatedAt = :updatedAt, #ttl = :ttl',
      ExpressionAttributeNames: { '#status': 'status', '#ttl': 'ttl' },
      ExpressionAttributeValues: serializeRecord({
        ':status': 'removed',
        ':removed': true,
        ':updatedAt': now,
        ':ttl': ttl,
        ':userId': userId,
      }),
      ConditionExpression: 'userId = :userId',
    }),
  );
};

export const deleteEventForUser = async (userId: string, eventId: string): Promise<void> => {
  const existing = await findEventById(eventId, { userId });

  if (existing.eventType === PLAID_TRANSACTION_EVENT_TYPE) {
    throw new BadRequestError('Plaid transaction events cannot be deleted');
  }

  if (existing.eventType !== BUDGET_EVENT_TYPE) {
    throw new BadRequestError('Only budget events can be deleted');
  }

  await softDeleteEventById(eventId, userId);
};

export const registerDeleteEventRoute = (app: FastifyInstance): void => {
  app.delete('/:id', {
    schema: {
      tags: ['Events'],
      summary: 'Delete event by id',
      description: 'Soft-deletes a budget event. Plaid transaction events cannot be deleted.',
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
      const { id } = request.params as { id: string };
      if (!isValidId(id)) {
        throw new BadRequestError('Invalid event id');
      }
      await deleteEventForUser(request.user.userId, id);
      return reply.status(204).send(null);
    },
  });
};
