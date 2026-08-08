import type { SubscriptionTier, UserSubscription } from '../data/user.js';
import { TIER_RANK } from './utils.js';

const PAID_STATUSES = new Set<UserSubscription['status']>(['active', 'trialing']);

/** True when the subscription unlocks paid features (plus/pro + active|trialing). */
export const isPaidSubscription = (subscription: UserSubscription): boolean =>
  PAID_STATUSES.has(subscription.status) && subscription.tier !== 'free';

/** Whether the subscription meets or exceeds the minimum paid tier. */
export const hasEntitlement = (
  subscription: UserSubscription,
  minimumTier: SubscriptionTier,
): boolean => {
  if (!isPaidSubscription(subscription) && minimumTier !== 'free') {
    return false;
  }

  return TIER_RANK[subscription.tier] >= TIER_RANK[minimumTier];
};
