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
  CLIENT_ORIGIN: string;
  STRIPE_TRIAL_PERIOD_DAYS: string;
}>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvString<PlaidEnv> {
      MONGO_URL?: string;
      MONGO_DB?: string;
      AUTH_DISABLED?: string;
      COGNITO_USER_POOL_ID?: string;
      COGNITO_CLIENT_ID?: string;
      COGNITO_REGION?: string;
      COGNITO_AUTHORITY?: string;
      API_PUBLIC_URL?: string;
      SEED_DROP?: string;
      /** Stripe billing — optional until checkout/webhooks are enabled. */
      STRIPE_SECRET_KEY?: StripeEnvStrings['STRIPE_SECRET_KEY'];
      STRIPE_WEBHOOK_SECRET?: StripeEnvStrings['STRIPE_WEBHOOK_SECRET'];
      STRIPE_PRICE_PLUS_MONTHLY?: StripeEnvStrings['STRIPE_PRICE_PLUS_MONTHLY'];
      STRIPE_PRICE_PLUS_ANNUAL?: StripeEnvStrings['STRIPE_PRICE_PLUS_ANNUAL'];
      STRIPE_PRICE_PRO_MONTHLY?: StripeEnvStrings['STRIPE_PRICE_PRO_MONTHLY'];
      STRIPE_PRICE_PRO_ANNUAL?: StripeEnvStrings['STRIPE_PRICE_PRO_ANNUAL'];
      CLIENT_ORIGIN?: StripeEnvStrings['CLIENT_ORIGIN'];
      STRIPE_TRIAL_PERIOD_DAYS?: StripeEnvStrings['STRIPE_TRIAL_PERIOD_DAYS'];
    }
  }
}

export {};
