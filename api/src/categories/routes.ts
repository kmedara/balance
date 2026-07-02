import { GetCommand } from '@aws-sdk/lib-dynamodb';
import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { bearerSecurity } from '../swagger/schemas.js';
import { getDocClient } from '../dynamo/client.js';
import { categoriesSk, configPk } from '../dynamo/keys.js';
import { getTableName } from '../dynamo/tables.js';
import { categoryListResponseSchema } from './schemas.js';

export const cateogoryRoutes: FastifyPluginAsyncTypebox = async (app) => {
  app.get(
    '/',
    {
      schema: {
        tags: ['Categories'],
        summary: 'List category display names',
        security: bearerSecurity,
        response: {
          200: categoryListResponseSchema,
        },
      },
    },
    async () => {
      const result = await getDocClient().send(
        new GetCommand({
          TableName: getTableName(),
          Key: { PK: configPk(), SK: categoriesSk() },
        }),
      );

      const categories = (result.Item?.categories ?? []) as {
        displayName: string;
      }[];

      return categories.map((category) => category.displayName);
    },
  );
};
