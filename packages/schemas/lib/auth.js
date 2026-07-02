import { Type } from './typebox.js';
export const authLoginQuerySchema = Type.Object({
    returnTo: Type.String(),
});
export const authCallbackQuerySchema = Type.Object({
    code: Type.Optional(Type.String()),
    state: Type.Optional(Type.String()),
    error: Type.Optional(Type.String()),
});
export const authLogoutQuerySchema = Type.Object({
    returnTo: Type.Optional(Type.String()),
});
export const authMeResponseSchema = Type.Object({
    userId: Type.String(),
    email: Type.Optional(Type.String()),
});
export const unauthorizedResponseSchema = Type.Object({
    error: Type.String(),
});
//# sourceMappingURL=auth.js.map