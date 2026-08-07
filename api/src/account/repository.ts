import { PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { batchWriteAll } from '../dynamo/batch.js';
import { getDocClient } from '../dynamo/client.js';
import { serializeRecord } from '../dynamo/helpers.js';
import { userPk } from '../dynamo/keys.js';
import { queryAll } from '../dynamo/query.js';
import { getTableName } from '../dynamo/tables.js';

const table = (): string => getTableName();

/** Sort key for an in-flight account deletion job (HP1 orphan tracking). */
export const deleteJobSk = (): string => 'DELETE_JOB';

export type AccountDeleteJobStatus = 'pending' | 'failed' | 'completed';

export type AccountDeleteJobSteps = {
  cognito: boolean;
  plaid: boolean;
  stripe: boolean;
  sessions: boolean;
  dynamo: boolean;
};

export type AccountDeleteJob = {
  userId: string;
  status: AccountDeleteJobStatus;
  steps: AccountDeleteJobSteps;
  lastError?: string;
  createdAt: Date;
  updatedAt: Date;
};

const emptySteps = (): AccountDeleteJobSteps => ({
  cognito: false,
  plaid: false,
  stripe: false,
  sessions: false,
  dynamo: false,
});

export const putAccountDeleteJob = async (userId: string, now = new Date()): Promise<void> => {
  await getDocClient().send(
    new PutCommand({
      TableName: table(),
      Item: serializeRecord({
        PK: userPk(userId),
        SK: deleteJobSk(),
        entityType: 'account_delete_job',
        userId,
        status: 'pending' satisfies AccountDeleteJobStatus,
        steps: emptySteps(),
        createdAt: now,
        updatedAt: now,
      }),
    }),
  );
};

export const updateAccountDeleteJob = async (
  userId: string,
  patch: {
    status?: AccountDeleteJobStatus;
    steps?: Partial<AccountDeleteJobSteps>;
    lastError?: string;
  },
  now = new Date(),
): Promise<void> => {
  const names: Record<string, string> = {
    '#status': 'status',
    '#updatedAt': 'updatedAt',
  };
  const values: Record<string, unknown> = {
    ':updatedAt': now,
  };
  const sets = ['#updatedAt = :updatedAt'];

  if (patch.status !== undefined) {
    sets.push('#status = :status');
    values[':status'] = patch.status;
  }

  if (patch.lastError !== undefined) {
    names['#lastError'] = 'lastError';
    sets.push('#lastError = :lastError');
    values[':lastError'] = patch.lastError;
  }

  if (patch.steps) {
    for (const [key, done] of Object.entries(patch.steps)) {
      if (done === undefined) continue;
      const nameKey = `#step_${key}`;
      const valueKey = `:step_${key}`;
      names[nameKey] = key;
      names['#steps'] = 'steps';
      sets.push(`#steps.${nameKey} = ${valueKey}`);
      values[valueKey] = done;
    }
  }

  await getDocClient().send(
    new UpdateCommand({
      TableName: table(),
      Key: { PK: userPk(userId), SK: deleteJobSk() },
      UpdateExpression: `SET ${sets.join(', ')}`,
      ExpressionAttributeNames: names,
      ExpressionAttributeValues: serializeRecord(values),
    }),
  );
};

/**
 * Deletes every item under `USER#<userId>` except an optional DELETE_JOB row
 * left behind for orphan retry. Callers that finished external cleanup should
 * delete the job row last.
 */
export const purgeUserPartition = async (
  userId: string,
  options: { keepDeleteJob?: boolean } = {},
): Promise<number> => {
  const items = await queryAll<Record<string, unknown>>({
    TableName: table(),
    KeyConditionExpression: 'PK = :pk',
    ExpressionAttributeValues: { ':pk': userPk(userId) },
  });

  const toDelete = items.filter((item) => {
    if (options.keepDeleteJob && item.SK === deleteJobSk()) return false;
    return typeof item.PK === 'string' && typeof item.SK === 'string';
  });

  await batchWriteAll(
    table(),
    toDelete.map((item) => ({
      DeleteRequest: { Key: { PK: item.PK, SK: item.SK } },
    })),
  );

  return toDelete.length;
};

/** Lists incomplete delete jobs for the daily EventBridge sweeper (HP1). */
export const listPendingAccountDeleteJobs = async (): Promise<
  { userId: string; status: AccountDeleteJobStatus }[]
> => {
  // Skeleton: full scan / GSI for DELETE_JOB rows lands with EventBridge wiring.
  return [];
};
