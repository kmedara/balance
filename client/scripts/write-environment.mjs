import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const environmentsDir = path.join(__dirname, '../src/environments');

const configuration = process.env.BUILD_CONFIGURATION ?? 'development';
const isProduction = configuration === 'production';

// Production replaces environment.ts (see angular.json production fileReplacements);
// development overwrites the generated environment.development.ts.
const target = path.join(
  environmentsDir,
  isProduction ? 'environment.production.ts' : 'environment.development.ts',
);

if (isProduction && !process.env.GATEWAY) {
  throw new Error('GATEWAY must be set for a production environment build');
}

const environment = {
  GATEWAY: process.env.GATEWAY ?? 'http://localhost:3000',
  authDisabled: isProduction ? false : process.env.AUTH_DISABLED === 'true',
};

const contents = `import type { Environment } from './environment.types';

export const environment: Environment = ${JSON.stringify(environment, null, 2)};
`;

fs.writeFileSync(target, contents);
console.log(
  `Wrote ${target} (configuration=${configuration}, authDisabled=${environment.authDisabled})`,
);
