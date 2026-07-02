import { Type, type Static } from './typebox.js';
export declare const authLoginQuerySchema: Type.TObject<{
    returnTo: Type.TString;
}>;
export declare const authCallbackQuerySchema: Type.TObject<{
    code: Type.TOptional<Type.TString>;
    state: Type.TOptional<Type.TString>;
    error: Type.TOptional<Type.TString>;
}>;
export declare const authLogoutQuerySchema: Type.TObject<{
    returnTo: Type.TOptional<Type.TString>;
}>;
export declare const authMeResponseSchema: Type.TObject<{
    userId: Type.TString;
    email: Type.TOptional<Type.TString>;
}>;
export declare const unauthorizedResponseSchema: Type.TObject<{
    error: Type.TString;
}>;
export type AuthLoginQuery = Static<typeof authLoginQuerySchema>;
export type AuthCallbackQuery = Static<typeof authCallbackQuerySchema>;
export type AuthLogoutQuery = Static<typeof authLogoutQuerySchema>;
export type AuthUser = Static<typeof authMeResponseSchema>;
export type UnauthorizedResponse = Static<typeof unauthorizedResponseSchema>;
//# sourceMappingURL=auth.d.ts.map