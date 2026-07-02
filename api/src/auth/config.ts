import { ServiceUnavailableError } from '@src/errors/http-error.js';
import { createHash } from 'node:crypto';

const trimTrailingSlash = (value: string): string => value.replace(/\/+$/, '');

export const isAuthDisabled = (): boolean => process.env.AUTH_DISABLED === 'true';

export const getSessionSecret = (): string => {
  const secret = process.env.SESSION_SECRET;
  if (secret && secret.length >= 32) {
    return secret;
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error('SESSION_SECRET must be at least 32 characters in production');
  }

  return 'balance-dev-session-secret-32chars!!';
};

export const getSessionKey = (): Buffer =>
  createHash('sha256').update(getSessionSecret()).digest();

export const getCognitoOAuthConfig = () => {
  const clientId = process.env.COGNITO_CLIENT_ID;
  const hostedUiDomain = process.env.COGNITO_HOSTED_UI_DOMAIN;
  const region = process.env.COGNITO_REGION ?? 'us-east-1';

  if (!clientId || !hostedUiDomain) {
    throw new Error('Cognito client ID or hosted UI domain is not set');
  }

  return {
    clientId,
    hostedUiDomain: hostedUiDomain.replace(/^https?:\/\//, ''),
    region,
    scope: 'openid email profile',
  };
};

export const getAuthCallbackUrl = (): string =>
  process.env.AUTH_CALLBACK_URL ?? 'http://localhost:3000/auth/callback';

export const sanitizeReturnTo = (returnTo: string | undefined): string => {
  
    const url = new URL(returnTo ?? '');

    // Accept the target only if its origin is in the allowlist, so a
    // post-login redirect can land back on whichever client initiated sign-in.
    if (!getClientOrigins().includes(url.origin))
      throw new Error('Invalid returnTo');

    return url.toString();  
};

// Non-throwing variant of sanitizeReturnTo: returns a valid allowlisted target
// URL, or falls back to the primary client origin when absent/invalid. Use for
// fallback/error redirects so a lost or missing returnTo can't crash the flow.
export const resolveReturnTo = (returnTo: string | undefined): string => {
  try {
    return sanitizeReturnTo(returnTo);
  } catch {
    return getPrimaryClientOrigin();
  }
};

export const getClientOrigins = (): string[] => {
  const origins = process.env?.CLIENT_ORIGIN?.split(',')?.map(trimTrailingSlash);
  if (!origins || origins.length === 0) {
    throw new ServiceUnavailableError('Configuration error');
  }
  return origins;
};

// First entry of the allowlist; the default target when no specific client
// can be determined (e.g. fallback/error redirects).
export const getPrimaryClientOrigin = (): string => {
  const [primary] = getClientOrigins();
  if (!primary) {
    throw new ServiceUnavailableError('Configuration error');
  }
  return primary;
};

const normalizeLogoutUrl = (url: string): string => {
  const primary = getPrimaryClientOrigin();
  if (trimTrailingSlash(url) === primary && !url.endsWith('/')) {
    return `${primary}/`;
  }

  return url;
};

export const getCognitoLogoutUrls = (): string[] => {
  const urls = process.env.COGNITO_LOGOUT_URLS;
  if (urls) {
    try {
      const parsed = JSON.parse(urls) as unknown;
      if (Array.isArray(parsed) && parsed.every((entry) => typeof entry === 'string')) {
        return parsed.map(normalizeLogoutUrl);
      }
    } catch {
      const split = urls.split(',').map((entry) => entry.trim()).filter(Boolean);
      if (split.length > 0) return split.map(normalizeLogoutUrl);
    }
  }

  const single = process.env.COGNITO_LOGOUT_URI;
  if (single) return [normalizeLogoutUrl(single)];

  return [`${getPrimaryClientOrigin()}/`];
};

// Cognito requires logout_uri to exactly match a registered sign-out URL.
export const resolveCognitoLogoutUri = (returnTo: string): string => {
  const allowed = getCognitoLogoutUrls();
  if (allowed.includes(returnTo)) return returnTo;

  const normalizedReturnTo = trimTrailingSlash(returnTo);
  for (const url of allowed) {
    if (trimTrailingSlash(url) === normalizedReturnTo) return url;
  }

  return allowed[0] ?? `${getPrimaryClientOrigin()}/`;
};

export const isPublicAuthPath = (path: string): boolean =>
  path === '/auth/login' ||
  path === '/auth/callback' ||
  path === '/auth/logout' ||
  path === '/auth/me';
