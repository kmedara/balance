import type { AuthUser } from '@balance/schemas/auth';
import {
  AdminUpdateUserAttributesCommand,
  CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { env } from 'process';
import { BadRequestError, ForbiddenError, ServiceUnavailableError } from '../errors/http-error.js';
import { isAuthDisabled } from './config.js';

const DEV_AUTH_USER: AuthUser = {
  userId: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  email: 'dev@localhost',
};

type CognitoVerifier = ReturnType<typeof CognitoJwtVerifier.create>;

let idVerifier: CognitoVerifier | null = null;
let accessVerifier: CognitoVerifier | null = null;
let cognitoClient: CognitoIdentityProviderClient | null = null;

const getVerifierConfig = () => {
  const userPoolId = env.COGNITO_USER_POOL_ID;
  const clientId = env.COGNITO_CLIENT_ID;

  if (!userPoolId || !clientId) {
    throw new ServiceUnavailableError('Environment is not configured');
  }

  return { userPoolId, clientId };
};

const getCognitoClient = (): CognitoIdentityProviderClient => {
  if (cognitoClient) return cognitoClient;
  const region = env.COGNITO_REGION ?? 'us-east-1';
  cognitoClient = new CognitoIdentityProviderClient({ region });
  return cognitoClient;
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

export const verifyIdToken = async (token: string): Promise<AuthUser> =>
  toAuthUser(await getIdVerifier().verify(token));

export const verifyAuthHeader = async (authorization?: string): Promise<AuthUser> => {
  if (isAuthDisabled()) {
    return DEV_AUTH_USER;
  }

  if (!authorization?.startsWith('Bearer ')) {
    throw new ForbiddenError('Missing or invalid Authorization header');
  }

  return await getAccessVerifier().verify(authorization.slice('Bearer '.length)).then(toAuthUser);
};

/**
 * Updates the Cognito user's email via AdminUpdateUserAttributes.
 * Uses the Cognito `sub` as Username (UUID username pools / federated users).
 * Skipped when AUTH_DISABLED=true.
 */
export const updateCognitoEmail = async (userId: string, email: string): Promise<void> => {
  if (isAuthDisabled()) return;

  const { userPoolId } = getVerifierConfig();

  try {
    await getCognitoClient().send(
      new AdminUpdateUserAttributesCommand({
        UserPoolId: userPoolId,
        Username: userId,
        UserAttributes: [
          { Name: 'email', Value: email },
          { Name: 'email_verified', Value: 'true' },
        ],
      }),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Cognito email update failed';
    throw new BadRequestError(message);
  }
};
