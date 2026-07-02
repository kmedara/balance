import type { FastifyPluginAsyncTypebox, TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

import { bearerSecurity, problemDetailsSchema } from "../swagger/schemas.js";

import { BadRequestError, NotFoundError } from "../errors/http-error.js";

import {
  calendarQuerySchema,
  calendarResponseSchema,
  createEventBodySchema,
  createEventResponseSchema,
  eventIdParamSchema,
  eventResponseSchema,
  patchEventBodySchema,
} from "./schemas.js";

import {
  buildMonthCalendarFromDayEvents,
  gridDateRange,
  toJsonCalendarResponse,
} from "./calendar.utils.js";

import { resolveDayCalendarEvents } from "./calendar-sources.js";

import { createEventForUser } from "./create-event.js";

import { updateEventForUser } from "./update-event.js";

import { findActiveEventsForCalendar, findEventById } from "./repository.js";

import type { EventWithId } from "../data/types.js";

import { isValidId } from "../data/id.js";

const parseEventTypes = (value: unknown): string[] | undefined => {
  if (value === undefined) return undefined;

  const raw = Array.isArray(value) ? value : [value];

  const eventTypes = [
    ...new Set(
      raw

        .flatMap((entry) => String(entry).split(","))

        .map((entry) => entry.trim())

        .filter(Boolean),
    ),
  ];

  return eventTypes.length > 0 ? eventTypes : undefined;
};

const isRemovedEvent = (event: EventWithId): boolean =>
  "removed" in event && Boolean((event as { removed?: boolean }).removed);

const formatEventDtstart = (value: EventWithId["dtstart"]): string => {
  if (value instanceof Date) {
    return value.toISOString();
  }

  if (value !== undefined) {
    return String(value);
  }

  throw new Error("Event missing dtstart");
};

const toCreateEventResponse = (event: EventWithId) => ({
  ...Object.fromEntries(
    Object.entries(event).filter(
      ([key]) =>
        ![
          "id",
          "eventType",
          "rrule",
          "dtstart",
          "userId",
          "createdAt",
          "updatedAt",
        ].includes(key),
    ),
  ),
  id: event.id,
  eventType: event.eventType,
  rrule: event.rrule,
  dtstart: formatEventDtstart(event.dtstart),
});

export const eventRoutes: FastifyPluginAsyncTypebox = async (app) => {
  app.withTypeProvider<TypeBoxTypeProvider>().post("/", {
    schema: {
      tags: ["Events"],

      summary: "Create a recurring event",

      description:
        "Creates an event. Budget events require title, type, amount, and category.",

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
        throw new BadRequestError("Provide rrule or frequency for recurring events");
      }

      const event = await createEventForUser(request.user.userId, body);

      return reply.status(201).send(toCreateEventResponse(event));
    },
  });

  app.withTypeProvider<TypeBoxTypeProvider>().get("/calendar", {
    schema: {
      tags: ["Events"],

      summary: "Month calendar grid",

      description:
        "Returns a padded month grid with events expanded from stored recurrence rules.",

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

      const { gridStart, gridEnd } = gridDateRange(year, monthIndex);

      const events = await findActiveEventsForCalendar(
        request.user.userId,
        gridStart,
        gridEnd,
        eventTypes,
      );

      return toJsonCalendarResponse(
        buildMonthCalendarFromDayEvents(year, monthIndex, (dayDate) =>
          resolveDayCalendarEvents(dayDate, events),
        ),
      );
    },
  });

  app.get("/:id", {
    schema: {
      tags: ["Events"],

      summary: "Get event by id",

      description: "Returns a single event owned by the authenticated user.",

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
        throw new BadRequestError("Invalid event id");
      }

      const event = await findEventById(id, { userId: request.user.userId });

      if (isRemovedEvent(event)) {
        throw new NotFoundError("Event not found");
      }

      return toCreateEventResponse(event);
    },
  });

  app.patch("/:id", {
    schema: {
      tags: ["Events"],

      summary: "Update event by id",

      description:
        'Updates a budget event. Plaid events cannot be updated.',

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
        throw new BadRequestError("Invalid event id");
      }

      const result = await updateEventForUser(request.user.userId, id, request.body);

      return toCreateEventResponse(result);
    },
  });
};
