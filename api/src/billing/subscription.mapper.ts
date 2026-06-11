import type Stripe from 'stripe';
import type { SubscriptionStatus, UserSubscription } from '../auth/user.repository.js';
import { DEFAULT_SUBSCRIPTION } from '../auth/user.repository.js';
import { priceIdToTier } from './constants.js';

const mapStripeStatus = (status: Stripe.Subscription.Status): SubscriptionStatus => {
  switch (status) {
    case 'active':
      return 'active';
    case 'trialing':
      return 'trialing';
    case 'past_due':
      return 'past_due';
    case 'canceled':
      return 'canceled';
    case 'incomplete':
    case 'incomplete_expired':
    case 'unpaid':
    case 'paused':
    default:
      return 'none';
  }
};

const primaryPriceId = (subscription: Stripe.Subscription): string | undefined =>
  subscription.items.data[0]?.price?.id;

const currentPeriodEndSeconds = (subscription: Stripe.Subscription): number | undefined => {
  const fromItem = subscription.items.data[0]?.current_period_end;
  if (typeof fromItem === 'number') return fromItem;

  const legacy = (subscription as Stripe.Subscription & { current_period_end?: number })
    .current_period_end;
  return legacy;
};

export const subscriptionFromStripe = (
  subscription: Stripe.Subscription,
): UserSubscription => {
  const priceId = primaryPriceId(subscription);
  const mappedTier = priceId ? (priceIdToTier(priceId) ?? 'free') : 'free';
  const status = mapStripeStatus(subscription.status);
  const currentPeriodEnd = currentPeriodEndSeconds(subscription);

  return {
    tier: status === 'canceled' || status === 'none' ? 'free' : mappedTier,
    status,
    stripeSubscriptionId: subscription.id,
    ...(currentPeriodEnd
      ? { currentPeriodEnd: new Date(currentPeriodEnd * 1000) }
      : {}),
    ...(subscription.trial_end
      ? { trialEnd: new Date(subscription.trial_end * 1000) }
      : {}),
  };
};

export const canceledSubscription = (): UserSubscription => ({
  ...DEFAULT_SUBSCRIPTION,
  status: 'canceled',
});
