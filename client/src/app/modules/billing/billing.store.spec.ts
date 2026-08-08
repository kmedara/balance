import { describe, expect, it } from 'vitest';
import type { SubscriptionResponse } from '@balance/schemas/client';
import { isPaidSubscription } from './billing.store';

const sub = (
  partial: Pick<SubscriptionResponse, 'tier' | 'status'>,
): SubscriptionResponse => ({
  ...partial,
  currentPeriodEnd: null,
  trialEnd: null,
});

describe('isPaidSubscription', () => {
  it('returns false for free tier', () => {
    expect(isPaidSubscription(sub({ tier: 'free', status: 'none' }))).toBe(false);
  });

  it('returns true for active plus', () => {
    expect(isPaidSubscription(sub({ tier: 'plus', status: 'active' }))).toBe(true);
  });

  it('returns true for trialing pro', () => {
    expect(isPaidSubscription(sub({ tier: 'pro', status: 'trialing' }))).toBe(true);
  });

  it('returns false for past_due even when tier is plus', () => {
    expect(isPaidSubscription(sub({ tier: 'plus', status: 'past_due' }))).toBe(false);
  });
});
