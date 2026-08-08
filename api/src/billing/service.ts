import type Stripe from 'stripe';
import type { FastifyRequest } from 'fastify';
import type { AuthUser } from '@balance/schemas/auth';
import type {
  CheckoutBody,
  CheckoutResponse,
  SubscriptionResponse,
} from '@balance/schemas/billing';
import {
  DEFAULT_SUBSCRIPTION,
  type SubscriptionStatus,
  type SubscriptionTier,
  type UserSubscription,
} from '../data/user.js';
import { getPrimaryClientOrigin } from '../auth/config.js';
import { ForbiddenError, ServiceUnavailableError } from '../errors/http-error.js';
import { findUserByCognitoSub } from '../profile/repository.js';
import {
  findUserByStripeCustomerId,
  updateSubscriptionByStripeCustomerId,
  updateUserSubscription,
  setStripeCustomerId,
} from './repository.js';
import { hasEntitlement } from './entitlements.js';
import { isStripeConfigured, priceIdToTier } from './utils.js';
import {
  createCheckoutSession,
  createPortalSession,
  retrieveSubscription,
} from './stripe.client.js';

export { hasEntitlement, isPaidSubscription } from './entitlements.js';

export const requireEntitlement = async (
  request: FastifyRequest,
  minimumTier: Parameters<typeof hasEntitlement>[1],
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
}): SubscriptionResponse => ({
  tier: subscription.tier,
  status: subscription.status,
  currentPeriodEnd: subscription.currentPeriodEnd?.toISOString() ?? null,
  trialEnd: subscription.trialEnd?.toISOString() ?? null,
});

export const getSubscriptionForUser = async (userId: string): Promise<SubscriptionResponse> => {
  const user = await findUserByCognitoSub(userId);

  if (!user) {
    throw new ForbiddenError('User not found');
  }

  return toSubscriptionResponse(user.subscription);
};

export const startCheckoutForUser = async (
  authUser: AuthUser,
  body: CheckoutBody,
): Promise<CheckoutResponse> => {
  if (!isStripeConfigured()) {
    throw new ServiceUnavailableError('Stripe is not configured (STRIPE_SECRET_KEY)');
  }

  const user = await findUserByCognitoSub(authUser.userId);

  if (!user) {
    throw new ForbiddenError('User not found');
  }

  const clientOrigin = getPrimaryClientOrigin();

  return createCheckoutSession({
    cognitoSub: authUser.userId,
    email: authUser.email ?? user.email,
    stripeCustomerId: user.stripeCustomerId,
    priceId: body.priceId.trim(),
    successUrl: `${clientOrigin}/settings/billing?checkout=success`,
    cancelUrl: `${clientOrigin}/settings/billing?checkout=canceled`,
  });
};

export const startPortalForUser = async (userId: string): Promise<CheckoutResponse> => {
  if (!isStripeConfigured()) {
    throw new ServiceUnavailableError('Stripe is not configured (STRIPE_SECRET_KEY)');
  }

  const user = await findUserByCognitoSub(userId);

  if (!user?.stripeCustomerId) {
    throw new ForbiddenError('No billing account linked');
  }

  const clientOrigin = getPrimaryClientOrigin();

  return createPortalSession({
    stripeCustomerId: user.stripeCustomerId,
    returnUrl: `${clientOrigin}/settings/billing`,
  });
};

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
