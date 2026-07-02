import { Type, type Static } from './typebox.js';
export declare const subscriptionResponseSchema: Type.TObject<{
    tier: Type.TUnion<[Type.TLiteral<"free">, Type.TLiteral<"plus">, Type.TLiteral<"pro">]>;
    status: Type.TUnion<[Type.TLiteral<"active">, Type.TLiteral<"trialing">, Type.TLiteral<"past_due">, Type.TLiteral<"canceled">, Type.TLiteral<"none">]>;
    currentPeriodEnd: Type.TUnion<[Type.TString, Type.TNull]>;
    trialEnd: Type.TUnion<[Type.TString, Type.TNull]>;
}>;
export declare const checkoutBodySchema: Type.TObject<{
    priceId: Type.TString;
}>;
export declare const checkoutResponseSchema: Type.TObject<{
    url: Type.TString;
}>;
export declare const stripeWebhookResponseSchema: Type.TObject<{
    received: Type.TBoolean;
}>;
export type SubscriptionResponse = Static<typeof subscriptionResponseSchema>;
export type CheckoutBody = Static<typeof checkoutBodySchema>;
export type CheckoutResponse = Static<typeof checkoutResponseSchema>;
export type StripeWebhookResponse = Static<typeof stripeWebhookResponseSchema>;
//# sourceMappingURL=billing.d.ts.map