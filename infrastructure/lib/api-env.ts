/** Environment variable names forwarded to the Balance API Lambda at deploy time. */
export const API_LAMBDA_ENV_KEYS = [
  'AUTH_DISABLED',
  'COGNITO_USER_POOL_ID',
  'COGNITO_CLIENT_ID',
  'COGNITO_REGION',
  'COGNITO_HOSTED_UI_DOMAIN',
  'COGNITO_AUTHORITY',
  'AUTH_CALLBACK_URL',
  'SESSION_SECRET',
  'CLIENT_ORIGIN',
  'API_PUBLIC_URL',
  'PLAID_CLIENT_ID',
  'PLAID_SECRET',
  'PLAID_ENV',
  'PLAID_HOST',
  'PLAID_COUNTRY_CODES',
  'PLAID_PRODUCTS',
  'PLAID_CLIENT_NAME',
  'PLAID_REDIRECT_URI',
  'ACCESS_TOKEN_ENCRYPTION_KEY',
  'ACCESS_TOKEN_ENCRYPTION_ALGORITHM',
  'ACCESS_TOKEN_ENCRYPTION_KEY_VERSION',
  'ACCESS_TOKEN_ENCRYPTION_IV_LENGTH',
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'STRIPE_PRICE_PLUS_MONTHLY',
  'STRIPE_PRICE_PLUS_ANNUAL',
  'STRIPE_PRICE_PRO_MONTHLY',
  'STRIPE_PRICE_PRO_ANNUAL',
  'STRIPE_TRIAL_PERIOD_DAYS',
] as const;

export const pickApiLambdaEnvironment = (
  env: NodeJS.ProcessEnv = process.env,
): Record<string, string> => {
  const environment: Record<string, string> = {};

  for (const key of API_LAMBDA_ENV_KEYS) {
    const value = env[key];
    if (value) {
      environment[key] = value;
    }
  }

  return environment;
};
