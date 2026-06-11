import type { FastifyInstance } from 'fastify';
import { bearerSecurity } from '../swagger/schemas.js';
import { categoryListResponseSchema } from './schemas.js';

export const cateogoryRoutes = async (app: FastifyInstance) => {
  app.get('/', {
    schema: {
      tags: ['Categories'],
      summary: 'List category display names',
      security: bearerSecurity,
      response: {
        200: categoryListResponseSchema,
      },
    },
    handler: async () => {
      const db = app.mongo.db ?? app.mongo.client.db('balance');
      const categories = await db.collection('categories').find({}).toArray();
      return categories.map((c) => c.displayName as string);
    },
  });
};
