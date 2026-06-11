import type { Environment } from './environment.types';

export const environment: Environment = {
  "GATEWAY": "http://localhost:3000",
  "authDisabled": false,
  "cognito": {
    "authority": "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_smK0IYHjx",
    "clientId": "3tmil5d8uue5l082rg2q1pj3sh",
    "redirectUri": "http://localhost:4200/auth/callback",
    "postLogoutRedirectUri": "http://localhost:4200/",
    "scope": "openid email profile",
    "responseType": "code",
    "showDebugInformation": true
  }
};
