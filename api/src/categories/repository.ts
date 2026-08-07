import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { getDocClient } from '../dynamo/client.js';
import { categoriesSk, configPk } from '../dynamo/keys.js';
import { getTableName } from '../dynamo/tables.js';

export const listCategoryDisplayNames = async (): Promise<string[]> => {
  const result = await getDocClient().send(
    new GetCommand({
      TableName: getTableName(),
      Key: { PK: configPk(), SK: categoriesSk() },
    }),
  );

  const categories = (result.Item?.categories ?? []) as {
    displayName: string;
  }[];

  return categories.map((category) => category.displayName);
};
