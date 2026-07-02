import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { isAuthDisabled } from './config.js';
import { ForbiddenError, type AuthUser } from './types.js';
import { env} from 'process'
import { ServiceUnavailableError } from '@src/errors/http-error.js';

const DEV_AUTH_USER: AuthUser = {
  userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  email: 'dev@localhost',
};

type CognitoVerifier = ReturnType<typeof CognitoJwtVerifier.create>;

let idVerifier: CognitoVerifier | null = null;
let accessVerifier: CognitoVerifier | null = null;

const getVerifierConfig = () => {
  const userPoolId = env.COGNITO_USER_POOL_ID;
  const clientId = env.COGNITO_CLIENT_ID;

  if (!userPoolId || !clientId) {
    throw new ServiceUnavailableError('Environment is not configured');
  }

  return { userPoolId, clientId };
};

// ID token: carries user identity claims (e.g. email) and is audience-bound to clientId.
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

// Access token: authorizes API calls (scopes/groups), and typically has no email claim.
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

export const verifyIdToken = async (token: string): Promise<AuthUser> =>
  toAuthUser(await getIdVerifier().verify(token));

// Resolves an AuthUser from a raw `Authorization` header value.
// Business endpoints authorize via the access token only. The ID token is
// consumed exclusively by the OAuth callback (`verifyIdToken`) to bootstrap
// the session, keeping the authentication (ID) and authorization (access)
// concerns separate.
export const verifyAuthHeader = async (authorization?: string): Promise<AuthUser> => {
  // Local/dev short-circuit: skip token verification and use a fixed user.
  if (isAuthDisabled()) {
    return DEV_AUTH_USER;
  }

  // Require a bearer token; reject anything else.
  if (!authorization?.startsWith('Bearer ')) {
    throw new ForbiddenError('Missing or invalid Authorization header');
  }

  return await getAccessVerifier().verify(authorization.slice('Bearer '.length)).then(toAuthUser);
};
