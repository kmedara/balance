import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const target = path.join(__dirname, '../src/environments/environment.development.ts');

const authDisabled = process.env.AUTH_DISABLED === 'true';

if (!authDisabled && (!process.env.COGNITO_AUTHORITY || !process.env.COGNITO_CLIENT_ID)) {
  console.warn(
    'AUTH_DISABLED is false but COGNITO_AUTHORITY or COGNITO_CLIENT_ID is missing — OAuth will not work',
  );
}

const environment = {
  GATEWAY: process.env.GATEWAY ?? 'http://localhost:3000',
  authDisabled,
  cognito: {
    authority: process.env.COGNITO_AUTHORITY ?? '',
    clientId: process.env.COGNITO_CLIENT_ID ?? '',
    redirectUri: process.env.COGNITO_REDIRECT_URI ?? 'http://localhost:4200/auth/callback',
    postLogoutRedirectUri: process.env.COGNITO_LOGOUT_URI ?? 'http://localhost:4200/',
    scope: 'openid email profile',
    responseType: 'code',
    showDebugInformation: true,
  },
};

const contents = `import type { Environment } from './environment.types';

export const environment: Environment = ${JSON.stringify(environment, null, 2)};
`;

fs.writeFileSync(target, contents);
console.log(`Wrote ${target} (authDisabled=${authDisabled})`);
