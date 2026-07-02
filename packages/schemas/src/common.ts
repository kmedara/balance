import { Type, type Static } from './typebox.js';

export const problemDetailsSchema = Type.Object(
  {
    type: Type.String({
      default: 'about:blank',
      description: 'URI reference identifying the problem type',
    }),
    title: Type.String({ description: 'Short, human-readable summary of the problem type' }),
    status: Type.Integer({ description: 'HTTP status code' }),
    detail: Type.Optional(
      Type.String({ description: 'Explanation specific to this occurrence of the problem' }),
    ),
    instance: Type.Optional(
      Type.String({ description: 'URI reference identifying this specific occurrence' }),
    ),
  },
  { additionalProperties: true, description: 'RFC 9457 Problem Details' },
);

export const bearerSecurity = [{ bearerAuth: [] }] as const;

export const publicRouteSecurity = [] as const;

export const pingResponseSchema = Type.String();

export type ProblemDetails = Static<typeof problemDetailsSchema>;
