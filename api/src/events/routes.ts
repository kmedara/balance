import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { registerCreateEventRoute } from './create-event.route.js';
import { registerCalendarRoute } from './calendar-route.js';
import { registerGetEventRoute } from './get-event.js';
import { registerUpdateEventRoute } from './update-event.route.js';
import { registerDeleteEventRoute } from './delete-event.js';

export const eventRoutes: FastifyPluginAsyncTypebox = async (app) => {
  registerCreateEventRoute(app);
  registerCalendarRoute(app);
  registerGetEventRoute(app);
  registerUpdateEventRoute(app);
  registerDeleteEventRoute(app);
};
