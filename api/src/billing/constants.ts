import type { SubscriptionTier } from '../auth/user.repository.js';
import type { StripeEnv } from './types.js';
import { env } from 'process';

const readOptional = (key: string): string | undefined => {
  const value = process.env[key]?.trim();
  return value ? value : undefined;
};

const readRequired = (key: string): string => {
  const value = readOptional(key);
  if (!value) {
    throw new Error(`Stripe environment variable undefined: ${key}`);
  }
  return value;
};

export const TIER_RANK: Record<SubscriptionTier, number> = {
  free: 0,
  plus: 1,
  pro: 2,
};

export const FREE_TIER_BUDGET_LIMIT = 25;
export const PLUS_TIER_PLAID_ITEM_LIMIT = 2;

export const isStripeConfigured = (): boolean =>
  Boolean(readOptional('STRIPE_SECRET_KEY'));

export const getStripeEnv = (): StripeEnv => ({
  STRIPE_SECRET_KEY: readRequired('STRIPE_SECRET_KEY'),
  STRIPE_WEBHOOK_SECRET: readRequired('STRIPE_WEBHOOK_SECRET'),
  STRIPE_PRICE_PLUS_MONTHLY: readOptional('STRIPE_PRICE_PLUS_MONTHLY'),
  STRIPE_PRICE_PLUS_ANNUAL: readOptional('STRIPE_PRICE_PLUS_ANNUAL'),
  STRIPE_PRICE_PRO_MONTHLY: readOptional('STRIPE_PRICE_PRO_MONTHLY'),
  STRIPE_PRICE_PRO_ANNUAL: readOptional('STRIPE_PRICE_PRO_ANNUAL'),
  CLIENT_ORIGIN: readOptional('CLIENT_ORIGIN') ?? 'http://localhost:4200',
  STRIPE_TRIAL_PERIOD_DAYS: readOptional('STRIPE_TRIAL_PERIOD_DAYS')
    ? Number(readOptional('STRIPE_TRIAL_PERIOD_DAYS'))
    : undefined,
});

export const getConfiguredStripePriceIds = (): Set<string> =>
  new Set(
    [
      env.STRIPE_PRICE_PLUS_MONTHLY,
      env.STRIPE_PRICE_PLUS_ANNUAL,
      env.STRIPE_PRICE_PRO_MONTHLY,
      env.STRIPE_PRICE_PRO_ANNUAL,
    ].filter((id): id is string => Boolean(id?.trim())),
  );

export const assertKnownPriceId = (priceId: string): void => {
  const configured = getConfiguredStripePriceIds();
  if (configured.size === 0) {
    throw new Error(
      'No Stripe price IDs configured. Set STRIPE_PRICE_PLUS_* and STRIPE_PRICE_PRO_* env vars.',
    );
  }

  if (!configured.has(priceId)) {
    throw new Error(`Unknown Stripe price ID: ${priceId}`);
  }
};

export const priceIdToTier = (priceId: string): SubscriptionTier | undefined => {
  const entries: Array<[string | undefined, SubscriptionTier]> = [
    [env.STRIPE_PRICE_PLUS_MONTHLY, 'plus'],
    [env.STRIPE_PRICE_PLUS_ANNUAL, 'plus'],
    [env.STRIPE_PRICE_PRO_MONTHLY, 'pro'],
    [env.STRIPE_PRICE_PRO_ANNUAL, 'pro'],
  ];

  for (const [envPriceId, tier] of entries) {
    if (envPriceId && envPriceId === priceId) return tier;
  }

  return undefined;
};

export const listConfiguredPriceIds = (): string[] => [...getConfiguredStripePriceIds()];
