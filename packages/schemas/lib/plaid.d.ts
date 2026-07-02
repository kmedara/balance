import { Type, type Static } from './typebox.js';
export declare const plaidErrorTypeSchema: Type.TUnion<[Type.TLiteral<"INVALID_REQUEST">, Type.TLiteral<"INVALID_CONFIGURATION">, Type.TLiteral<"INSTITUTION_ERROR">, Type.TLiteral<"RATE_LIMIT_EXCEEDED">, Type.TLiteral<"API_ERROR">, Type.TLiteral<"ITEM_ERROR">]>;
export declare const plaidErrorSchema: Type.TObject<{
    error_type: Type.TUnion<[Type.TLiteral<"INVALID_REQUEST">, Type.TLiteral<"INVALID_CONFIGURATION">, Type.TLiteral<"INSTITUTION_ERROR">, Type.TLiteral<"RATE_LIMIT_EXCEEDED">, Type.TLiteral<"API_ERROR">, Type.TLiteral<"ITEM_ERROR">]>;
    error_code: Type.TString;
    error_message: Type.TString;
    display_message: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
}>;
export declare const linkTokenResponseSchema: Type.TObject<{
    link_token: Type.TString;
}>;
export declare const exchangeTokenBodySchema: Type.TObject<{
    public_token: Type.TString;
}>;
export declare const plaidExchangeTokenResponseSchema: Type.TObject<{
    item_id: Type.TString;
    request_id: Type.TString;
}>;
export declare const syncTransactionsBodySchema: Type.TObject<{
    item_id: Type.TOptional<Type.TString>;
}>;
export declare const plaidTransactionSchema: Type.TObject<{
    transaction_id: Type.TString;
    account_id: Type.TString;
    amount: Type.TNumber;
    date: Type.TString;
    name: Type.TString;
    merchant_name: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
    pending: Type.TBoolean;
}>;
export declare const plaidRemovedTransactionSchema: Type.TObject<{
    transaction_id: Type.TString;
}>;
export declare const plaidSyncResponseSchema: Type.TObject<{
    items: Type.TArray<Type.TObject<{
        item_id: Type.TString;
        added: Type.TArray<Type.TObject<{
            transaction_id: Type.TString;
            account_id: Type.TString;
            amount: Type.TNumber;
            date: Type.TString;
            name: Type.TString;
            merchant_name: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
            pending: Type.TBoolean;
        }>>;
        modified: Type.TArray<Type.TObject<{
            transaction_id: Type.TString;
            account_id: Type.TString;
            amount: Type.TNumber;
            date: Type.TString;
            name: Type.TString;
            merchant_name: Type.TOptional<Type.TUnion<[Type.TString, Type.TNull]>>;
            pending: Type.TBoolean;
        }>>;
        removed: Type.TArray<Type.TObject<{
            transaction_id: Type.TString;
        }>>;
    }>>;
}>;
export type PlaidErrorType = Static<typeof plaidErrorTypeSchema>;
export type PlaidError = Static<typeof plaidErrorSchema>;
export type LinkTokenResponse = Static<typeof linkTokenResponseSchema>;
export type ExchangeTokenBody = Static<typeof exchangeTokenBodySchema>;
export type PlaidExchangeTokenResponse = Static<typeof plaidExchangeTokenResponseSchema>;
export type SyncTransactionsBody = Static<typeof syncTransactionsBodySchema>;
export type PlaidTransaction = Static<typeof plaidTransactionSchema>;
export type PlaidRemovedTransaction = Static<typeof plaidRemovedTransactionSchema>;
export type PlaidSyncResponse = Static<typeof plaidSyncResponseSchema>;
//# sourceMappingURL=plaid.d.ts.map