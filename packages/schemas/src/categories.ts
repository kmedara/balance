import { Type, type Static } from './typebox.js';

export const categoryListResponseSchema = Type.Array(Type.String());

export type CategoryListResponse = Static<typeof categoryListResponseSchema>;
