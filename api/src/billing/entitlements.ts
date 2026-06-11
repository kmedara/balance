import type { FastifyRequest } from 'fastify';
import type { Db } from 'mongodb';
import { findUserByCognitoSub, type SubscriptionTier, type UserSubscription } from '../auth/user.repository.js';
import { ForbiddenError } from '../auth/types.js';
import { requireAuthUser } from '../auth/cognito.js';
import { TIER_RANK } from './constants.js';

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
  db: Db,
  request: FastifyRequest,
  minimumTier: SubscriptionTier,
): Promise<UserSubscription> => {
  const authUser = requireAuthUser(request);
  const user = await findUserByCognitoSub(db, authUser.userId);

  if (!user) {
    throw new ForbiddenError('User not found');
  }

  if (!hasEntitlement(user.subscription, minimumTier)) {
    throw new ForbiddenError(`Requires ${minimumTier} subscription or higher`);
  }

  return user.subscription;
};
