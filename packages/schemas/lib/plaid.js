import { Type } from './typebox.js';
export const plaidErrorTypeSchema = Type.Union([
    Type.Literal('INVALID_REQUEST'),
    Type.Literal('INVALID_CONFIGURATION'),
    Type.Literal('INSTITUTION_ERROR'),
    Type.Literal('RATE_LIMIT_EXCEEDED'),
    Type.Literal('API_ERROR'),
    Type.Literal('ITEM_ERROR'),
]);
export const plaidErrorSchema = Type.Object({
    error_type: plaidErrorTypeSchema,
    error_code: Type.String(),
    error_message: Type.String(),
    display_message: Type.Optional(Type.Union([Type.String(), Type.Null()])),
});
export const linkTokenResponseSchema = Type.Object({
    link_token: Type.String(),
}, { additionalProperties: true });
export const exchangeTokenBodySchema = Type.Object({
    public_token: Type.String(),
});
export const plaidExchangeTokenResponseSchema = Type.Object({
    item_id: Type.String(),
    request_id: Type.String(),
});
export const syncTransactionsBodySchema = Type.Object({
    item_id: Type.Optional(Type.String({ description: 'Plaid item id. Omit to sync all linked items.' })),
});
export const plaidTransactionSchema = Type.Object({
    transaction_id: Type.String(),
    account_id: Type.String(),
    amount: Type.Number(),
    date: Type.String({ format: 'date' }),
    name: Type.String(),
    merchant_name: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    pending: Type.Boolean(),
});
export const plaidRemovedTransactionSchema = Type.Object({
    transaction_id: Type.String(),
});
const plaidSyncItemSchema = Type.Object({
    item_id: Type.String(),
    added: Type.Array(plaidTransactionSchema),
    modified: Type.Array(plaidTransactionSchema),
    removed: Type.Array(plaidRemovedTransactionSchema),
});
export const plaidSyncResponseSchema = Type.Object({
    items: Type.Array(plaidSyncItemSchema),
});
//# sourceMappingURL=plaid.js.map