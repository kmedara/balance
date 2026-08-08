import type { CountryCode, Products } from 'plaid';

type EnvString<T> = { [K in keyof T]: string };

export type PlaidEnv = {
  PLAID_ENV: string;

  PLAID_SECRET: string;

  PLAID_CLIENT_ID: string;

  PLAID_HOST: string;

  PLAID_COUNTRY_CODES: CountryCode[];

  PLAID_PRODUCTS: Products[];

  PLAID_CLIENT_NAME: string;

  PLAID_REDIRECT_URI: string;

  ACCESS_TOKEN_ENCRYPTION_KEY: string;

  ACCESS_TOKEN_ENCRYPTION_ALGORITHM: string;

  ACCESS_TOKEN_ENCRYPTION_KEY_VERSION: string;

  ACCESS_TOKEN_ENCRYPTION_IV_LENGTH: string;
};

type StripeEnvStrings = EnvString<{
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  STRIPE_PRICE_PLUS_MONTHLY: string;
  STRIPE_PRICE_PLUS_ANNUAL: string;
  STRIPE_PRICE_PRO_MONTHLY: string;
  STRIPE_PRICE_PRO_ANNUAL: string;
  STRIPE_TRIAL_PERIOD_DAYS: string;
}>;

type CognitoEnvStrings = EnvString<{
  COGNITO_USER_POOL_ID: string;
  COGNITO_CLIENT_ID: string;
  COGNITO_REGION: string;
  COGNITO_HOSTED_UI_DOMAIN: string;
  AUTH_CALLBACK_URL: string;
}>;

type AuthEnvStrings = EnvString<{
  AUTH_DISABLED: string;
  AUTH_CALLBACK_URL: string;
}>;

type DynamoDBEnvStrings = EnvString<{
  DYNAMODB_ENDPOINT: string;
  BALANCE_TABLE: string;
}>;

type ClientOriginEnvStrings = EnvString<{
  CLIENT_ORIGIN: string;
}>;

type SessionSecretEnvStrings = EnvString<{
  SESSION_SECRET: string;
}>;

type ApiPublicEnvStrings = EnvString<{
  API_PUBLIC_URL: string;
}>;

type SeedDropEnvStrings = EnvString<{
  SEED_DROP: string;
}>;

declare global {
  namespace NodeJS {
    interface ProcessEnv
      extends
        EnvString<PlaidEnv>,
        StripeEnvStrings,
        CognitoEnvStrings,
        AuthEnvStrings,
        DynamoDBEnvStrings,
        ClientOriginEnvStrings,
        SessionSecretEnvStrings,
        ApiPublicEnvStrings,
        SeedDropEnvStrings {}
  }
}

export {};
