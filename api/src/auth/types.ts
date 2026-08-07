import type { AuthUser } from '@balance/schemas/auth';

declare module 'fastify' {
  interface FastifyRequest {
    // Guaranteed to be set for routes registered inside the protected scope
    // (see auth/protected.ts). Optional on public routes, but the type is
    // non-optional so protected handlers can read it without re-narrowing.
    user: AuthUser;
    _user?: AuthUser;
  }
}
