import { defineConfig } from 'vitest/config';

export const config = () => {
  return defineConfig({
    test: {
      environment: 'jsdom',
      globals: true,
      include: ['**/*.test.ts', '**/*spec.ts'],
    },
  });
};
