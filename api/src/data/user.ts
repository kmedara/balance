export type SubscriptionTier = 'free' | 'plus' | 'pro';

export type SubscriptionStatus = 'active' | 'trialing' | 'past_due' | 'canceled' | 'none';

export type UserSubscription = {
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  stripeSubscriptionId?: string;
  currentPeriodEnd?: Date;
  trialEnd?: Date;
};

export const DEFAULT_SUBSCRIPTION: UserSubscription = {
  tier: 'free',
  status: 'none',
};

export type UserDocument = {
  cognitoSub: string;
  email?: string;
  displayName?: string;
  stripeCustomerId?: string;
  subscription: UserSubscription;
  createdAt: Date;
  updatedAt: Date;
};
