import { Type, type Static } from './typebox.js';

export const recurrenceFrequencySchema = Type.Union([
  Type.Literal('DAILY'),
  Type.Literal('WEEKLY'),
  Type.Literal('MONTHLY'),
  Type.Literal('YEARLY'),
]);

export const budgetTypeSchema = Type.Union([Type.Literal('Income'), Type.Literal('Expense')]);

export type RecurrenceFrequency = Static<typeof recurrenceFrequencySchema>;
export type BudgetType = Static<typeof budgetTypeSchema>;

const recurrenceProps = {
  dtstart: Type.String({ format: 'date', description: 'Series start date (YYYY-MM-DD)' }),
  rrule: Type.Optional(
    Type.String({ description: 'RFC 5545 RRULE string (alternative to frequency)' }),
  ),
  frequency: Type.Optional(recurrenceFrequencySchema),
  interval: Type.Optional(Type.Integer({ minimum: 1, default: 1 })),
  until: Type.Optional(Type.String({ format: 'date' })),
};

const budgetCreateBodySchema = Type.Object(
  {
    eventType: Type.Literal('budget', { description: 'Budget event discriminator' }),
    ...recurrenceProps,
    title: Type.String({ minLength: 1 }),
    type: budgetTypeSchema,
    amount: Type.Number({ exclusiveMinimum: 0 }),
    category: Type.String({ minLength: 1 }),
    description: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

const genericCreateBodySchema = Type.Object(
  {
    eventType: Type.Literal('test', { description: 'Generic (non-budget) event discriminator' }),
    ...recurrenceProps,
    title: Type.Optional(Type.String()),
    type: Type.Optional(budgetTypeSchema),
    amount: Type.Optional(Type.Number({ exclusiveMinimum: 0 })),
    category: Type.Optional(Type.String()),
    description: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

export const createEventBodySchema = Type.Union(
  [budgetCreateBodySchema, genericCreateBodySchema],
  {
    description:
      'Event payload discriminated by eventType. Budget events require title, type, amount (> 0), and category.',
  },
);

export const createEventResponseSchema = Type.Object(
  {
    id: Type.String({ description: '24-character hex entity id' }),
    eventType: Type.String(),
    rrule: Type.Optional(Type.String()),
    dtstart: Type.String({ format: 'date-time' }),
    title: Type.Optional(Type.String()),
    type: Type.Optional(budgetTypeSchema),
    amount: Type.Optional(Type.Number()),
    category: Type.Optional(Type.String()),
    description: Type.Optional(Type.String()),
  },
  { additionalProperties: true },
);

export const eventResponseSchema = createEventResponseSchema;

export const eventIdParamSchema = Type.Object({
  id: Type.String({ description: '24-character hex entity id' }),
});

export const patchEventBodySchema = Type.Object(
  {
    dtstart: Type.Optional(
      Type.String({ format: 'date', description: 'Series start date (YYYY-MM-DD)' }),
    ),
    rrule: Type.Optional(
      Type.String({ description: 'RFC 5545 RRULE string (alternative to frequency)' }),
    ),
    frequency: Type.Optional(recurrenceFrequencySchema),
    interval: Type.Optional(Type.Integer({ minimum: 1 })),
    until: Type.Optional(Type.String({ format: 'date' })),
    title: Type.Optional(Type.String({ minLength: 1 })),
    type: Type.Optional(budgetTypeSchema),
    amount: Type.Optional(Type.Number({ exclusiveMinimum: 0 })),
    category: Type.Optional(Type.String({ minLength: 1 })),
    description: Type.Optional(Type.String()),
  },
  { minProperties: 1, additionalProperties: false },
);

export const calendarQuerySchema = Type.Object({
  year: Type.Integer({ minimum: 2026, maximum: 2099, description: 'Calendar year, e.g. 2026' }),
  month: Type.Integer({ minimum: 1, maximum: 12, description: 'Calendar month 1–12' }),
  eventType: Type.Optional(
    Type.Array(Type.String(), {
      description: 'Filter by event type(s). Repeat param or comma-separate.',
    }),
  ),
});

export const calendarEventWireSchema = Type.Object(
  {
    id: Type.Optional(Type.String()),
    eventType: Type.Optional(Type.String()),
    title: Type.Optional(Type.String()),
    type: Type.Optional(budgetTypeSchema),
    amount: Type.Optional(Type.Number()),
    category: Type.Optional(Type.String()),
    description: Type.Optional(Type.String()),
    rrule: Type.Optional(Type.String()),
    dtstart: Type.Optional(Type.String()),
    pending: Type.Optional(Type.Boolean()),
    plaidTransactionId: Type.Optional(Type.String()),
    merchantName: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    name: Type.Optional(Type.String()),
  },
  { additionalProperties: true },
);

export const calendarDayWireSchema = Type.Object({
  date: Type.String({ format: 'date', description: 'Calendar day (YYYY-MM-DD)' }),
  inCurrentMonth: Type.Boolean(),
  events: Type.Optional(Type.Array(calendarEventWireSchema)),
});

export const calendarResponseSchema = Type.Object({
  year: Type.Integer(),
  month: Type.Integer(),
  monthLabel: Type.String(),
  days: Type.Array(calendarDayWireSchema),
  weeks: Type.Array(Type.Array(calendarDayWireSchema)),
});

export const budgetFieldsSchema = Type.Object({
  title: Type.String(),
  type: budgetTypeSchema,
  amount: Type.Number(),
  category: Type.String(),
  description: Type.Optional(Type.String()),
});

export type CreateEventBody = Static<typeof createEventBodySchema>;
export type PatchEventBody = Static<typeof patchEventBodySchema>;
export type CalendarQuery = Static<typeof calendarQuerySchema>;
export type EventIdParams = Static<typeof eventIdParamSchema>;
export type EventResponse = Static<typeof eventResponseSchema>;
export type CalendarEventWire = Static<typeof calendarEventWireSchema>;
export type CalendarDayWire = Static<typeof calendarDayWireSchema>;
export type CalendarResponseWire = Static<typeof calendarResponseSchema>;
export type BudgetFields = Static<typeof budgetFieldsSchema>;
