import type { FastifyReply, FastifyRequest } from 'fastify';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import type { AuthUser } from './types.js';
import './types.js';

const isAuthDisabled = (): boolean => process.env.AUTH_DISABLED === 'true';

const DEV_AUTH_USER: AuthUser = {
  userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  email: 'dev@localhost',
};

let verifier: ReturnType<typeof CognitoJwtVerifier.create> | null = null;

const getVerifier = () => {
  if (verifier) return verifier;

  const userPoolId = process.env.COGNITO_USER_POOL_ID;
  const clientId = process.env.COGNITO_CLIENT_ID;

  if (!userPoolId || !clientId) {
    throw new Error('COGNITO_USER_POOL_ID and COGNITO_CLIENT_ID are required when auth is enabled');
  }

  verifier = CognitoJwtVerifier.create({
    userPoolId,
    tokenUse: 'id',
    clientId,
  });

  return verifier;
};

export const verifyAuthHeader = async (authorization?: string): Promise<AuthUser> => {
  if (isAuthDisabled()) {
    return DEV_AUTH_USER;
  }

  if (!authorization?.startsWith('Bearer ')) {
    throw new Error('Unauthorized');
  }

  const token = authorization.slice('Bearer '.length);
  const payload = await getVerifier().verify(token);

  return {
    userId: payload.sub,
    email: typeof payload.email === 'string' ? payload.email : undefined,
  };
};

export const authenticateRequest = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  const path = request.url.split('?')[0] ?? request.url;

  if (path === '/ping' || request.method === 'OPTIONS') {
    return;
  }

  try {
    request.authUser = await verifyAuthHeader(request.headers.authorization);
  } catch (err) {
    request.log.warn({ err }, 'Authentication failed');
    return reply.status(401).send({ error: 'Unauthorized' });
  }
};

export const requireAuthUser = (request: FastifyRequest): AuthUser => {
  if (!request.authUser) {
    throw new Error('Unauthorized');
  }

  return request.authUser;
};

export const isAuthenticationEnabled = (): boolean => !isAuthDisabled();
