module.exports = {
  root: true,
  env: {
    es2023: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  ignorePatterns: ['dist/**'],
  rules: {
    // Enforce monorepo boundaries: api must not depend on client app code.
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          '../client/*',
          '../client/**',
          '../../client/*',
          '../../client/**',
          'client/*',
          'client/**',
          '@client/*',
          '@client/**',
        ],
      },
    ],
  },
};
