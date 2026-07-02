import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

/**
 * Single-table DynamoDB design for Balance API (on-demand billing).
 */
export class DatabaseStack extends cdk.Stack {
  public readonly table: dynamodb.Table;
  public readonly tableEnvironment: Record<string, string>;

  constructor(scope: Construct, id: string, props: cdk.StackProps = {}) {
    super(scope, id, props);

    this.table = new dynamodb.Table(this, 'BalanceTable', {
      tableName: 'balance',
      partitionKey: { name: 'PK', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'SK', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      // Removed Plaid events set a `ttl` epoch-seconds attribute so DynamoDB
      // reaps them automatically instead of accumulating tombstones.
      timeToLiveAttribute: 'ttl',
    });

    // KEYS_ONLY: lookups resolve the base-table key from this index, then do a
    // strongly consistent GetItem for the full record. Avoids replicating every
    // attribute (and its write cost) into the index.
    this.table.addGlobalSecondaryIndex({
      indexName: 'StripeCustomerIndex',
      partitionKey: { name: 'stripeCustomerId', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'userRef', type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.KEYS_ONLY,
    });

    this.table.addGlobalSecondaryIndex({
      indexName: 'PlaidItemIndex',
      partitionKey: { name: 'plaidItemId', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'userRef', type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.KEYS_ONLY,
    });

    // ALL: event-by-id reads (GET/PATCH /events/:id) serve the whole event from
    // this index in a single read, so it projects everything.
    this.table.addGlobalSecondaryIndex({
      indexName: 'EventIdIndex',
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'userRef', type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.ALL,
    });

    this.tableEnvironment = {
      BALANCE_TABLE: this.table.tableName,
    };

    new cdk.CfnOutput(this, 'BalanceTableName', {
      value: this.table.tableName,
      exportName: 'BalanceTableName',
    });
  }
}
