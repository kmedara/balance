import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'html', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        'src/**/*.test.ts',
        'src/**/*.spec.ts',
        'src/**/*.d.ts',
        'src/index.ts',
        'src/app.ts',
        'src/lambda.ts',
      ],
      // Report only modules loaded by the test run (not the whole tree at 0%).
    },
  },
  resolve: {
    alias: [
      {
        find: '@balance/domain',
        replacement: path.resolve(root, '../packages/domain/src/index.ts'),
      },
      {
        find: /^@balance\/schemas\/(.+)$/,
        replacement: path.resolve(root, '../packages/schemas/src/$1.ts'),
      },
      {
        find: '@balance/schemas',
        replacement: path.resolve(root, '../packages/schemas/src/index.ts'),
      },
    ],
  },
});
