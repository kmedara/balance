import type { FastifyReply, FastifyRequest } from 'fastify';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { ForbiddenError, type AuthUser } from './types.js';
import './types.js';

const isAuthDisabled = (): boolean => process.env.AUTH_DISABLED === 'true';

const DEV_AUTH_USER: AuthUser = {
  userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  email: 'dev@localhost',
};

type CognitoVerifier = ReturnType<typeof CognitoJwtVerifier.create>;

let idVerifier: CognitoVerifier | null = null;
let accessVerifier: CognitoVerifier | null = null;

const getVerifierConfig = () => {
  const userPoolId = process.env.COGNITO_USER_POOL_ID;
  const clientId = process.env.COGNITO_CLIENT_ID;

  if (!userPoolId || !clientId) {
    throw new ForbiddenError('Authentication is not configured');
  }

  return { userPoolId, clientId };
};

const getIdVerifier = () => {
  if (idVerifier) return idVerifier;

  const { userPoolId, clientId } = getVerifierConfig();
  idVerifier = CognitoJwtVerifier.create({
    userPoolId,
    tokenUse: 'id',
    clientId,
  });

  return idVerifier;
};

const getAccessVerifier = () => {
  if (accessVerifier) return accessVerifier;

  const { userPoolId, clientId } = getVerifierConfig();
  accessVerifier = CognitoJwtVerifier.create({
    userPoolId,
    tokenUse: 'access',
    clientId,
  });

  return accessVerifier;
};

const toAuthUser = (payload: { sub: string; email?: unknown }): AuthUser => ({
  userId: payload.sub,
  email: typeof payload.email === 'string' ? payload.email : undefined,
});

export const verifyAuthHeader = async (authorization?: string): Promise<AuthUser> => {
  if (isAuthDisabled()) {
    return DEV_AUTH_USER;
  }

  if (!authorization?.startsWith('Bearer ')) {
    throw new ForbiddenError('Missing or invalid Authorization header');
  }

  const token = authorization.slice('Bearer '.length);

  try {
    return toAuthUser(await getIdVerifier().verify(token));
  } catch (idError) {
    try {
      return toAuthUser(await getAccessVerifier().verify(token));
    } catch {
      throw idError;
    }
  }
};

export const authenticateRequest = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  const path = request.url.split('?')[0] ?? request.url;

  if (path === '/ping' || path.startsWith('/docs') || request.method === 'OPTIONS') {
    return;
  }

  try {
    request.authUser = await verifyAuthHeader(request.headers.authorization);
  } catch (err) {
    const message =
      err instanceof ForbiddenError
        ? err.message
        : err instanceof Error
          ? err.message
          : 'Authentication failed';
    request.log.warn({ err, message }, 'Authentication failed');
    return reply.status(403).send({ error: 'Forbidden', message });
  }
};

export const requireAuthUser = (request: FastifyRequest): AuthUser => {
  if (!request.authUser) {
    throw new ForbiddenError('Authentication required');
  }

  return request.authUser;
};

export const isAuthenticationEnabled = (): boolean => !isAuthDisabled();
