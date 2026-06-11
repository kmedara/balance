import type { SubscriptionTier } from '../auth/user.repository.js';
import { getConfiguredStripePriceIds } from './env.helper.js';

export const TIER_RANK: Record<SubscriptionTier, number> = {
  free: 0,
  plus: 1,
  pro: 2,
};

export const FREE_TIER_BUDGET_LIMIT = 25;
export const PLUS_TIER_PLAID_ITEM_LIMIT = 2;

export const priceIdToTier = (priceId: string): SubscriptionTier | null => {
  const entries: Array<[string | undefined, SubscriptionTier]> = [
    [process.env.STRIPE_PRICE_PLUS_MONTHLY, 'plus'],
    [process.env.STRIPE_PRICE_PLUS_ANNUAL, 'plus'],
    [process.env.STRIPE_PRICE_PRO_MONTHLY, 'pro'],
    [process.env.STRIPE_PRICE_PRO_ANNUAL, 'pro'],
  ];

  for (const [envPriceId, tier] of entries) {
    if (envPriceId && envPriceId === priceId) return tier;
  }

  return null;
};

export const listConfiguredPriceIds = (): string[] => [...getConfiguredStripePriceIds()];
