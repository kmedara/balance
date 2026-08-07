import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { categoryListResponseSchema } from '@balance/schemas/categories';
import { bearerSecurity } from '@balance/schemas/common';
import { listCategories } from './service.js';

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
    async () => await listCategories(),
  );
};
