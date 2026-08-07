import { findUserByCognitoSub } from '../profile/repository.js';
import { findActivePlaidItemsByUserId } from '../plaid/repository.js';
import {
  listPendingAccountDeleteJobs,
  purgeUserPartition,
  putAccountDeleteJob,
  updateAccountDeleteJob,
} from './repository.js';

export type ExternalCleanupResult = {
  cognito: boolean;
  plaid: boolean;
  stripe: boolean;
  sessions: boolean;
};

/**
 * Stub: Cognito AdminDeleteUser (wired in P1 once operator IAM + SES paths settle).
 */
export const cleanupCognitoUser = async (_userId: string): Promise<void> => {
  // TODO(P1): AdminDeleteUser for the Cognito user pool subject.
};

/**
 * Stub: remove Plaid Items + TXN# inverted refs outside the user partition (P3).
 */
export const cleanupPlaidForUser = async (userId: string): Promise<void> => {
  await findActivePlaidItemsByUserId(userId);
  // TODO(P3): plaid.itemRemove per Item; hard-delete TXN# REF rows for that user.
};

/**
 * Stub: cancel Stripe subscription / delete customer (P3).
 */
export const cleanupStripeForUser = async (userId: string): Promise<void> => {
  const user = await findUserByCognitoSub(userId);
  void user?.stripeCustomerId;
  // TODO(P3): Stripe customer delete / subscription cancel via webhook-safe path.
};

/**
 * Stub: bump session epoch / invalidate all BFF sessions (P1).
 */
export const cleanupSessionsForUser = async (_userId: string): Promise<void> => {
  // TODO(P1): session epoch invalidate-all.
};

export const runExternalCleanup = async (userId: string): Promise<ExternalCleanupResult> => {
  const result: ExternalCleanupResult = {
    cognito: false,
    plaid: false,
    stripe: false,
    sessions: false,
  };

  await cleanupCognitoUser(userId);
  result.cognito = true;

  await cleanupPlaidForUser(userId);
  result.plaid = true;

  await cleanupStripeForUser(userId);
  result.stripe = true;

  await cleanupSessionsForUser(userId);
  result.sessions = true;

  return result;
};

/**
 * HP1 account deletion: record a job, run external cleanup stubs, purge the
 * user DynamoDB partition. External vendor calls are stubs until P1/P3.
 */
export const deleteAccountForUser = async (userId: string): Promise<void> => {
  await putAccountDeleteJob(userId);

  try {
    const external = await runExternalCleanup(userId);
    await updateAccountDeleteJob(userId, { steps: external });

    await purgeUserPartition(userId, { keepDeleteJob: true });
    await updateAccountDeleteJob(userId, {
      status: 'completed',
      steps: { dynamo: true },
    });

    await purgeUserPartition(userId, { keepDeleteJob: false });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Account deletion failed';
    await updateAccountDeleteJob(userId, { status: 'failed', lastError: message });
    throw error;
  }
};

/**
 * Daily EventBridge → Lambda entry for orphan/retry cleanup (HP1).
 * Wired to EventBridge in infrastructure later; callable now for local invoke.
 */
export const runAccountDeleteSweeper = async (): Promise<{ retried: number }> => {
  const pending = await listPendingAccountDeleteJobs();
  let retried = 0;

  for (const job of pending) {
    if (job.status === 'completed') continue;
    await deleteAccountForUser(job.userId);
    retried += 1;
  }

  return { retried };
};
