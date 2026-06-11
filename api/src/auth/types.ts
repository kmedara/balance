export type AuthUser = {
  userId: string;
  email?: string;
};

export class ForbiddenError extends Error {
  readonly statusCode = 403;

  constructor(message = 'Forbidden') {
    super(message);
    this.name = 'ForbiddenError';
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    authUser?: AuthUser;
  }
}
