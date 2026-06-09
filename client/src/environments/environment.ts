import type { Environment } from './environment.types';

export const environment: Environment = {
  GATEWAY: 'http://localhost:3000',
  authDisabled: true,
  cognito: {
    authority: '',
    clientId: '',
    redirectUri: 'http://localhost:4200/auth/callback',
    postLogoutRedirectUri: 'http://localhost:4200/',
    scope: 'openid email profile',
    responseType: 'code',
    showDebugInformation: true,
  },
};
