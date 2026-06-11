import type { Db } from 'mongodb';
import Stripe from 'stripe';
import { getStripeEnv, assertKnownPriceId } from './env.helper.js';
import { setStripeCustomerId } from './repository.js';

let stripeClient: Stripe | null = null;

export const getStripeClient = (): Stripe => {
  if (stripeClient) return stripeClient;

  const { STRIPE_SECRET_KEY } = getStripeEnv();
  stripeClient = new Stripe(STRIPE_SECRET_KEY);
  return stripeClient;
};

export type CheckoutSessionInput = {
  cognitoSub: string;
  email?: string;
  stripeCustomerId?: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
};

export const ensureStripeCustomer = async (
  db: Db,
  input: Pick<CheckoutSessionInput, 'cognitoSub' | 'email' | 'stripeCustomerId'>,
): Promise<string> => {
  if (input.stripeCustomerId) return input.stripeCustomerId;

  const stripe = getStripeClient();
  const customer = await stripe.customers.create({
    email: input.email,
    metadata: { cognitoSub: input.cognitoSub },
  });

  await setStripeCustomerId(db, input.cognitoSub, customer.id);
  return customer.id;
};

export const createCheckoutSession = async (
  db: Db,
  input: CheckoutSessionInput,
): Promise<{ url: string }> => {
  assertKnownPriceId(input.priceId);

  const stripe = getStripeClient();
  const env = getStripeEnv();
  const customerId = await ensureStripeCustomer(db, input);

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: customerId,
    client_reference_id: input.cognitoSub,
    line_items: [{ price: input.priceId, quantity: 1 }],
    success_url: input.successUrl,
    cancel_url: input.cancelUrl,
    metadata: { cognitoSub: input.cognitoSub },
    subscription_data:
      env.STRIPE_TRIAL_PERIOD_DAYS && env.STRIPE_TRIAL_PERIOD_DAYS > 0
        ? { trial_period_days: env.STRIPE_TRIAL_PERIOD_DAYS }
        : undefined,
  });

  if (!session.url) {
    throw new Error('Stripe Checkout session did not return a URL');
  }

  return { url: session.url };
};

export type PortalSessionInput = {
  stripeCustomerId: string;
  returnUrl: string;
};

export const createPortalSession = async (
  input: PortalSessionInput,
): Promise<{ url: string }> => {
  const stripe = getStripeClient();
  const session = await stripe.billingPortal.sessions.create({
    customer: input.stripeCustomerId,
    return_url: input.returnUrl,
  });

  return { url: session.url };
};

export const constructWebhookEvent = (rawBody: Buffer, signature: string): Stripe.Event => {
  const { STRIPE_WEBHOOK_SECRET } = getStripeEnv();
  const stripe = getStripeClient();
  return stripe.webhooks.constructEvent(rawBody, signature, STRIPE_WEBHOOK_SECRET);
};

export const retrieveSubscription = async (
  subscriptionId: string,
): Promise<Stripe.Subscription> => {
  const stripe = getStripeClient();
  return stripe.subscriptions.retrieve(subscriptionId);
};
