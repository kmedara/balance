export type AuthUser = {
  userId: string;
  email?: string;
};

declare module 'fastify' {
  interface FastifyRequest {
    authUser?: AuthUser;
  }
}
