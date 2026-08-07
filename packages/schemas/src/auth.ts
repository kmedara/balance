import { Type, type Static } from './typebox.js';

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

const profileEmail = Type.String({ format: 'email', minLength: 3, maxLength: 320 });
const profileDisplayName = Type.String({ minLength: 1, maxLength: 100 });

export const profileResponseSchema = Type.Object({
  userId: Type.String(),
  email: Type.Optional(profileEmail),
  displayName: Type.Optional(profileDisplayName),
});

export const createProfileBodySchema = Type.Object(
  {
    email: Type.Optional(profileEmail),
    displayName: Type.Optional(profileDisplayName),
  },
  { additionalProperties: false },
);

export const patchProfileBodySchema = Type.Object(
  {
    email: Type.Optional(profileEmail),
    displayName: Type.Optional(profileDisplayName),
  },
  { additionalProperties: false, minProperties: 1 },
);

export type AuthLoginQuery = Static<typeof authLoginQuerySchema>;
export type AuthCallbackQuery = Static<typeof authCallbackQuerySchema>;
export type AuthLogoutQuery = Static<typeof authLogoutQuerySchema>;
export type AuthUser = Static<typeof authMeResponseSchema>;
export type UnauthorizedResponse = Static<typeof unauthorizedResponseSchema>;
export type ProfileResponse = Static<typeof profileResponseSchema>;
export type CreateProfileBody = Static<typeof createProfileBodySchema>;
export type PatchProfileBody = Static<typeof patchProfileBodySchema>;
