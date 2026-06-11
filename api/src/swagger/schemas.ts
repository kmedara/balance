export const errorResponseSchema = {
  type: 'object',
  properties: {
    error: { type: 'string' },
    message: { type: 'string' },
  },
} as const;

export const bearerSecurity = [{ bearerAuth: [] }] as const;

export const publicRouteSecurity = [] as const;
