import type Stripe from 'stripe';
import type { FastifyRequest } from 'fastify';
import {
  DEFAULT_SUBSCRIPTION,
  findUserByCognitoSub,
  type SubscriptionStatus,
  type SubscriptionTier,
  type UserSubscription,
} from '../profile/repository.js';
import { ForbiddenError } from '../errors/http-error.js';
import {
  findUserByStripeCustomerId,
  updateSubscriptionByStripeCustomerId,
  updateUserSubscription,
  setStripeCustomerId,
} from './repository.js';
import { TIER_RANK, priceIdToTier } from './utils.js';
import { retrieveSubscription } from './stripe.client.js';

const PAID_STATUSES = new Set<UserSubscription['status']>(['active', 'trialing']);

export const isPaidSubscription = (subscription: UserSubscription): boolean =>
  PAID_STATUSES.has(subscription.status) && subscription.tier !== 'free';

export const hasEntitlement = (
  subscription: UserSubscription,
  minimumTier: SubscriptionTier,
): boolean => {
  if (!isPaidSubscription(subscription) && minimumTier !== 'free') {
    return false;
  }

  return TIER_RANK[subscription.tier] >= TIER_RANK[minimumTier];
};

export const requireEntitlement = async (
  request: FastifyRequest,
  minimumTier: SubscriptionTier,
): Promise<UserSubscription> => {
  const user = await findUserByCognitoSub(request.user.userId);

  if (!user) {
    throw new ForbiddenError('User not found');
  }

  if (!hasEntitlement(user.subscription, minimumTier)) {
    throw new ForbiddenError(`Requires ${minimumTier} subscription or higher`);
  }

  return user.subscription;
};

export const toSubscriptionResponse = (subscription: {
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  currentPeriodEnd?: Date;
  trialEnd?: Date;
}) => ({
  tier: subscription.tier,
  status: subscription.status,
  currentPeriodEnd: subscription.currentPeriodEnd?.toISOString() ?? null,
  trialEnd: subscription.trialEnd?.toISOString() ?? null,
});

export const billingErrorMessage = (err: unknown): { status: 502 | 503; message: string } => {
  const message = err instanceof Error ? err.message : 'Billing request failed';
  if (message.includes('not configured') || message.includes('Unknown Stripe price')) {
    return { status: 503, message };
  }
  return { status: 502, message };
};

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

export const subscriptionFromStripe = (subscription: Stripe.Subscription): UserSubscription => {
  const priceId = primaryPriceId(subscription);
  const mappedTier = priceId ? (priceIdToTier(priceId) ?? 'free') : 'free';
  const status = mapStripeStatus(subscription.status);
  const currentPeriodEnd = currentPeriodEndSeconds(subscription);

  return {
    tier: status === 'canceled' || status === 'none' ? 'free' : mappedTier,
    status,
    stripeSubscriptionId: subscription.id,
    ...(currentPeriodEnd ? { currentPeriodEnd: new Date(currentPeriodEnd * 1000) } : {}),
    ...(subscription.trial_end ? { trialEnd: new Date(subscription.trial_end * 1000) } : {}),
  };
};

export const canceledSubscription = (): UserSubscription => ({
  ...DEFAULT_SUBSCRIPTION,
  status: 'canceled',
});

const subscriptionIdFromCheckout = (session: Stripe.Checkout.Session): string | undefined => {
  const subscription = session.subscription;
  return typeof subscription === 'string' ? subscription : subscription?.id;
};

const customerIdFromSession = (session: Stripe.Checkout.Session): string | undefined => {
  const customer = session.customer;
  return typeof customer === 'string' ? customer : customer?.id;
};

const cognitoSubFromSession = (session: Stripe.Checkout.Session): string | undefined =>
  session.client_reference_id ?? session.metadata?.cognitoSub;

const subscriptionIdFromInvoice = (invoice: Stripe.Invoice): string | undefined => {
  const nested = invoice.parent?.subscription_details?.subscription;
  if (typeof nested === 'string') return nested;
  return nested?.id;
};

const applySubscription = async (
  stripeCustomerId: string,
  subscription: Stripe.Subscription,
): Promise<void> => {
  await updateSubscriptionByStripeCustomerId(
    stripeCustomerId,
    subscriptionFromStripe(subscription),
  );
};

export const handleStripeWebhookEvent = async (event: Stripe.Event): Promise<void> => {
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const cognitoSub = cognitoSubFromSession(session);
      const stripeCustomerId = customerIdFromSession(session);
      const subscriptionId = subscriptionIdFromCheckout(session);

      if (cognitoSub && stripeCustomerId) {
        await setStripeCustomerId(cognitoSub, stripeCustomerId);
      }

      if (stripeCustomerId && subscriptionId) {
        const subscription = await retrieveSubscription(subscriptionId);
        await applySubscription(stripeCustomerId, subscription);
      }
      return;
    }

    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      const stripeCustomerId =
        typeof subscription.customer === 'string'
          ? subscription.customer
          : subscription.customer.id;

      await applySubscription(stripeCustomerId, subscription);
      return;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      const stripeCustomerId =
        typeof subscription.customer === 'string'
          ? subscription.customer
          : subscription.customer.id;

      await updateSubscriptionByStripeCustomerId(stripeCustomerId, canceledSubscription());
      return;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;
      const stripeCustomerId =
        typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id;

      if (!stripeCustomerId) return;

      const subscriptionId = subscriptionIdFromInvoice(invoice);

      if (subscriptionId) {
        const subscription = await retrieveSubscription(subscriptionId);
        await applySubscription(stripeCustomerId, subscription);
        return;
      }

      const user = await findUserByStripeCustomerId(stripeCustomerId);
      if (user) {
        await updateUserSubscription(user.cognitoSub, {
          ...user.subscription,
          status: 'past_due',
        });
      }
      return;
    }

    default:
      return;
  }
};
