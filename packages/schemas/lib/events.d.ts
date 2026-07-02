import { Type, type Static } from './typebox.js';
export declare const recurrenceFrequencySchema: Type.TUnion<[Type.TLiteral<"DAILY">, Type.TLiteral<"WEEKLY">, Type.TLiteral<"MONTHLY">, Type.TLiteral<"YEARLY">]>;
export declare const budgetTypeSchema: Type.TUnion<[Type.TLiteral<"Income">, Type.TLiteral<"Expense">]>;
export type RecurrenceFrequency = Static<typeof recurrenceFrequencySchema>;
export type BudgetType = Static<typeof budgetTypeSchema>;
export declare const createEventBodySchema: Type.TUnion<[Type.TObject<{
    title: Type.TString;
    type: Type.TUnion<[Type.TLiteral<"Income">, Type.TLiteral<"Expense">]>;
    amount: Type.TNumber;
    category: Type.TString;
    description: Type.TOptional<Type.TString>;
    dtstart: Type.TString;
    rrule: Type.TOptional<Type.TString>;
    frequency: Type.TOptional<Type.TUnion<[Type.TLiteral<"DAILY">, Type.TLiteral<"WEEKLY">, Type.TLiteral<"MONTHLY">, Type.TLiteral<"YEARLY">]>>;
    interval: Type.TOptional<Type.TInteger>;
    until: Type.TOptional<Type.TString>;
    eventType: Type.TLiteral<"budget">;
}>, Type.TObject<{
    title: Type.TOptional<Type.TString>;
    type: Type.TOptional<Type.TUnion<[Type.TLiteral<"Income">, Type.TLiteral<"Expense">]>>;
    amount: Type.TOptional<Type.TNumber>;
    category: Type.TOptional<Type.TString>;
    description: Type.TOptional<Type.TString>;
    dtstart: Type.TString;
    rrule: Type.TOptional<Type.TString>;
    frequency: Type.TOptional<Type.TUnion<[Type.TLiteral<"DAILY">, Type.TLiteral<"WEEKLY">, Type.TLiteral<"MONTHLY">, Type.TLiteral<"YEARLY">]>>;
    interval: Type.TOptional<Type.TInteger>;
    until: Type.TOptional<Type.TString>;
    eventType: Type.TLiteral<"test">;
}>]>;
export declare const createEventResponseSchema: Type.TObject<{
    id: Type.TString;
    eventType: Type.TString;
    rrule: Type.TOptional<Type.TString>;
    dtstart: Type.TString;
    title: Type.TOptional<Type.TString>;
    type: Type.TOptional<Type.TUnion<[Type.TLiteral<"Income">, Type.TLiteral<"Expense">]>>;
    amount: Type.TOptional<Type.TNumber>;
    category: Type.TOptional<Type.TString>;
    description: Type.TOptional<Type.TString>;
}>;
export declare const eventResponseSchema: Type.TObject<{
    id: Type.TString;
    eventType: Type.TString;
    rrule: Type.TOptional<Type.TString>;
    dtstart: Type.TString;
    title: Type.TOptional<Type.TString>;
    type: Type.TOptional<Type.TUnion<[Type.TLiteral<"Income">, Type.TLiteral<"Expense">]>>;
    amount: Type.TOptional<Type.TNumber>;
    category: Type.TOptional<Type.TString>;
    description: Type.TOptional<Type.TString>;
}>;
export declare const eventIdParamSchema: Type.TObject<{
    id: Type.TString;
}>;
export declare const patchEventBodySchema: Type.TObject<{
    dtstart: Type.TOptional<Type.TString>;
    rrule: Type.TOptional<Type.TString>;
    frequency: Type.TOptional<Type.TUnion<[Type.TLiteral<"DAILY">, Type.TLiteral<"WEEKLY">, Type.TLiteral<"MONTHLY">, Type.TLiteral<"YEARLY">]>>;
    interval: Type.TOptional<Type.TInteger>;
    until: Type.TOptional<Type.TString>;
    title: Type.TOptional<Type.TString>;
    type: Type.TOptional<Type.TUnion<[Type.TLiteral<"Income">, Type.TLiteral<"Expense">]>>;
    amount: Type.TOptional<Type.TNumber>;
    category: Type.TOptional<Type.TString>;
    description: Type.TOptional<Type.TString>;
}>;
export declare const calendarQuerySchema: Type.TObject<{
    year: Type.TInteger;
    month: Type.TInteger;
    eventType: Type.TOptional<Type.TArray<Type.TString>>;
}>;
export declare const calendarEventWireSchema: Type.TObject<{
    id: Type.TOptional<Type.TString>;
    eventType: Type.TOptional<Type.TString>;
    title: Type.TOptional<Type.TString>;
    type: Type.TOptional<Type.TUnion<[Type.TLiteral<"Income">, Type.TLiteral<"Expense">]>>;
    amount: Type.TOptional<Type.TNumber>;
    category: Type.TOptional<Type.TString>;
    description: Type.TOptional<Type.TString>;
    rrule: Type.TOptional<Type.TString>;
    dtstart: Type.TOptional<Type.TString>;
    pending: Type.TOptional<Type.TBoolean>;
    plaidTransactionId: Type.TOptional<Type.TString>;
    merchantName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    name: Type.TOptional<Type.TString>;
}>;
export declare const calendarDayWireSchema: Type.TObject<{
    date: Type.TString;
    inCurrentMonth: Type.TBoolean;
    events: Type.TOptional<Type.TArray<Type.TObject<{
        id: Type.TOptional<Type.TString>;
        eventType: Type.TOptional<Type.TString>;
        title: Type.TOptional<Type.TString>;
        type: Type.TOptional<Type.TUnion<[Type.TLiteral<"Income">, Type.TLiteral<"Expense">]>>;
        amount: Type.TOptional<Type.TNumber>;
        category: Type.TOptional<Type.TString>;
        description: Type.TOptional<Type.TString>;
        rrule: Type.TOptional<Type.TString>;
        dtstart: Type.TOptional<Type.TString>;
        pending: Type.TOptional<Type.TBoolean>;
        plaidTransactionId: Type.TOptional<Type.TString>;
        merchantName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
        name: Type.TOptional<Type.TString>;
    }>>>;
}>;
export declare const calendarResponseSchema: Type.TObject<{
    year: Type.TInteger;
    month: Type.TInteger;
    monthLabel: Type.TString;
    days: Type.TArray<Type.TObject<{
        date: Type.TString;
        inCurrentMonth: Type.TBoolean;
        events: Type.TOptional<Type.TArray<Type.TObject<{
            id: Type.TOptional<Type.TString>;
            eventType: Type.TOptional<Type.TString>;
            title: Type.TOptional<Type.TString>;
            type: Type.TOptional<Type.TUnion<[Type.TLiteral<"Income">, Type.TLiteral<"Expense">]>>;
            amount: Type.TOptional<Type.TNumber>;
            category: Type.TOptional<Type.TString>;
            description: Type.TOptional<Type.TString>;
            rrule: Type.TOptional<Type.TString>;
            dtstart: Type.TOptional<Type.TString>;
            pending: Type.TOptional<Type.TBoolean>;
            plaidTransactionId: Type.TOptional<Type.TString>;
            merchantName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
            name: Type.TOptional<Type.TString>;
        }>>>;
    }>>;
    weeks: Type.TArray<Type.TArray<Type.TObject<{
        date: Type.TString;
        inCurrentMonth: Type.TBoolean;
        events: Type.TOptional<Type.TArray<Type.TObject<{
            id: Type.TOptional<Type.TString>;
            eventType: Type.TOptional<Type.TString>;
            title: Type.TOptional<Type.TString>;
            type: Type.TOptional<Type.TUnion<[Type.TLiteral<"Income">, Type.TLiteral<"Expense">]>>;
            amount: Type.TOptional<Type.TNumber>;
            category: Type.TOptional<Type.TString>;
            description: Type.TOptional<Type.TString>;
            rrule: Type.TOptional<Type.TString>;
            dtstart: Type.TOptional<Type.TString>;
            pending: Type.TOptional<Type.TBoolean>;
            plaidTransactionId: Type.TOptional<Type.TString>;
            merchantName: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
            name: Type.TOptional<Type.TString>;
        }>>>;
    }>>>;
}>;
export declare const budgetFieldsSchema: Type.TObject<{
    title: Type.TString;
    type: Type.TUnion<[Type.TLiteral<"Income">, Type.TLiteral<"Expense">]>;
    amount: Type.TNumber;
    category: Type.TString;
    description: Type.TOptional<Type.TString>;
}>;
export type CreateEventBody = Static<typeof createEventBodySchema>;
export type PatchEventBody = Static<typeof patchEventBodySchema>;
export type CalendarQuery = Static<typeof calendarQuerySchema>;
export type EventIdParams = Static<typeof eventIdParamSchema>;
export type EventResponse = Static<typeof eventResponseSchema>;
export type CalendarEventWire = Static<typeof calendarEventWireSchema>;
export type CalendarDayWire = Static<typeof calendarDayWireSchema>;
export type CalendarResponseWire = Static<typeof calendarResponseSchema>;
export type BudgetFields = Static<typeof budgetFieldsSchema>;
//# sourceMappingURL=events.d.ts.map