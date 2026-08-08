import { afterEach, describe, expect, it } from 'vitest';
import type { UserSubscription } from '../data/user.js';
import { hasEntitlement, isPaidSubscription } from './entitlements.js';
import { priceIdToTier } from './utils.js';

const subscription = (
  partial: Pick<UserSubscription, 'tier' | 'status'>,
): UserSubscription => ({
  ...partial,
});

describe('isPaidSubscription', () => {
  it('returns false for free / none', () => {
    expect(isPaidSubscription(subscription({ tier: 'free', status: 'none' }))).toBe(false);
  });

  it('returns true for active plus', () => {
    expect(isPaidSubscription(subscription({ tier: 'plus', status: 'active' }))).toBe(true);
  });

  it('returns true for trialing pro', () => {
    expect(isPaidSubscription(subscription({ tier: 'pro', status: 'trialing' }))).toBe(true);
  });

  it('returns false for past_due plus', () => {
    expect(isPaidSubscription(subscription({ tier: 'plus', status: 'past_due' }))).toBe(false);
  });
});

describe('hasEntitlement', () => {
  it('blocks free users from plus', () => {
    expect(hasEntitlement(subscription({ tier: 'free', status: 'none' }), 'plus')).toBe(false);
  });

  it('allows trialing plus for plus gate', () => {
    expect(hasEntitlement(subscription({ tier: 'plus', status: 'trialing' }), 'plus')).toBe(true);
  });

  it('blocks past_due plus from plus gate', () => {
    expect(hasEntitlement(subscription({ tier: 'plus', status: 'past_due' }), 'plus')).toBe(false);
  });

  it('allows pro for plus minimum', () => {
    expect(hasEntitlement(subscription({ tier: 'pro', status: 'active' }), 'plus')).toBe(true);
  });

  it('blocks plus from pro minimum', () => {
    expect(hasEntitlement(subscription({ tier: 'plus', status: 'active' }), 'pro')).toBe(false);
  });

  it('allows free for free minimum', () => {
    expect(hasEntitlement(subscription({ tier: 'free', status: 'none' }), 'free')).toBe(true);
  });
});

describe('priceIdToTier', () => {
  const previous = {
    plusMonthly: process.env.STRIPE_PRICE_PLUS_MONTHLY,
    plusAnnual: process.env.STRIPE_PRICE_PLUS_ANNUAL,
    proMonthly: process.env.STRIPE_PRICE_PRO_MONTHLY,
    proAnnual: process.env.STRIPE_PRICE_PRO_ANNUAL,
  };

  afterEach(() => {
    process.env.STRIPE_PRICE_PLUS_MONTHLY = previous.plusMonthly;
    process.env.STRIPE_PRICE_PLUS_ANNUAL = previous.plusAnnual;
    process.env.STRIPE_PRICE_PRO_MONTHLY = previous.proMonthly;
    process.env.STRIPE_PRICE_PRO_ANNUAL = previous.proAnnual;
  });

  it('maps configured price ids to tiers', () => {
    process.env.STRIPE_PRICE_PLUS_MONTHLY = 'price_plus_m';
    process.env.STRIPE_PRICE_PRO_ANNUAL = 'price_pro_a';

    expect(priceIdToTier('price_plus_m')).toBe('plus');
    expect(priceIdToTier('price_pro_a')).toBe('pro');
    expect(priceIdToTier('price_unknown')).toBeUndefined();
  });
});
