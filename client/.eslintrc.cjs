module.exports = {
  root: true,
  env: {
    es2023: true,
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  ignorePatterns: ['dist/**', '.angular/**'],
  rules: {
    // Enforce monorepo boundaries: client must not depend on api app code.
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          '../api/*',
          '../api/**',
          '../../api/*',
          '../../api/**',
          'api/*',
          'api/**',
          '@api/*',
          '@api/**',
        ],
      },
    ],
  },
};
