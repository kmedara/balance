import type Stripe from 'stripe';
import {
  findUserByStripeCustomerId,
  setStripeCustomerId,
  updateSubscriptionByStripeCustomerId,
  updateUserSubscription,
} from './repository.js';
import { canceledSubscription, subscriptionFromStripe } from './subscription.mapper.js';
import { retrieveSubscription } from './stripe.client.js';

const subscriptionIdFromCheckout = (
  session: Stripe.Checkout.Session,
): string | undefined => {
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

export const handleStripeWebhookEvent = async (
  event: Stripe.Event,
): Promise<void> => {
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
