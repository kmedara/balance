import { ForbiddenError } from '../errors/http-error.js';
import { createHash, randomBytes } from 'node:crypto';
import { getAuthCallbackUrl, getCognitoOAuthConfig } from './config.js';

export type OAuthTokens = {
  idToken: string;
  accessToken: string;
  refreshToken?: string;
};

export const generateOAuthState = (): string => randomBytes(24).toString('base64url');

export const generatePkcePair = (): { verifier: string; challenge: string } => {
  const verifier = randomBytes(32).toString('base64url');
  const challenge = createHash('sha256').update(verifier).digest('base64url');
  return { verifier, challenge };
};

export const buildAuthorizeUrl = (input: {
  state: string;
  challenge: string;
}): string => {
  const config = getCognitoOAuthConfig();
  if (!config) {
    throw new ForbiddenError('Authentication is not configured');
  }

  const params = new URLSearchParams({
    client_id: config.clientId,
    response_type: 'code',
    scope: config.scope,
    redirect_uri: getAuthCallbackUrl(),
    state: input.state,
    code_challenge: input.challenge,
    code_challenge_method: 'S256',
  });

  return `https://${config.hostedUiDomain}/oauth2/authorize?${params.toString()}`;
};

export const buildLogoutUrl = (logoutUri: string): string => {
  const config = getCognitoOAuthConfig();
  if (!config) {
    throw new ForbiddenError('Authentication is not configured');
  }

  const params = new URLSearchParams({
    client_id: config.clientId,
    logout_uri: logoutUri,
  });

  return `https://${config.hostedUiDomain}/logout?${params.toString()}`;
};

export const exchangeAuthorizationCode = async (input: {
  code: string;
  verifier: string;
}): Promise<OAuthTokens> => {
  const config = getCognitoOAuthConfig();
  if (!config) {
    throw new ForbiddenError('Authentication is not configured');
  }

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: config.clientId,
    code: input.code,
    redirect_uri: getAuthCallbackUrl(),
    code_verifier: input.verifier,
  });

  const response = await fetch(`https://${config.hostedUiDomain}/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new ForbiddenError(`Token exchange failed: ${detail}`);
  }

  const payload = (await response.json()) as {
    id_token?: string;
    access_token?: string;
    refresh_token?: string;
  };

  if (!payload.id_token || !payload.access_token) {
    throw new ForbiddenError('Token exchange did not return tokens');
  }

  return {
    idToken: payload.id_token,
    accessToken: payload.access_token,
    refreshToken: payload.refresh_token,
  };
};
