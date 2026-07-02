import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import {
  buildCoreDeployStatements,
  type DeployPolicyContext,
} from './github-deploy-statements.js';
import { buildStorageDeployStatements } from './github-deploy-storage-statements.js';

export type GitHubDeployPolicyProps = {
  /** CloudFormation stacks deployed by CI. */
  deployStackNames?: string[];
  /** @deprecated Use deployStackNames */
  deployStackName?: string;
  /** CDK bootstrap stack name (default CDKToolkit). */
  bootstrapStackName?: string;
};

const defaultDeployStackNames = [
  'BalanceAuthStack',
  'BalanceApiStack',
  'BalanceDatabaseStack',
  'BalanceClientStack',
  'BalanceDnsStack',
];

/**
 * Least-privilege permissions for GitHub Actions to bootstrap CDK and deploy Balance stacks.
 * Does not include IAM admin — deploy BalanceGitHubOidcStack locally with a human admin role.
 */
export const grantGitHubDeployPermissions = (
  scope: Construct,
  role: iam.IRole,
  props: GitHubDeployPolicyProps = {},
): void => {
  const deployStackNames =
    props.deployStackNames ??
    (props.deployStackName ? [props.deployStackName] : defaultDeployStackNames);
  const bootstrapStackName = props.bootstrapStackName ?? 'CDKToolkit';

  const stack = cdk.Stack.of(scope);
  const region = stack.region;
  const account = stack.account;
  const partition = cdk.Aws.PARTITION;

  const stackArn = (name: string) =>
    `arn:${partition}:cloudformation:${region}:${account}:stack/${name}/*`;

  const assetBucketName = `cdk-hnb659fds-assets-${account}-${region}`;
  const assetBucketArn = `arn:${partition}:s3:::${assetBucketName}`;
  const clientBucketArn = `arn:${partition}:s3:::balance-client-${account}`;

  const ctx: DeployPolicyContext = {
    partition,
    region,
    account,
    deployStackArns: deployStackNames.map((name) => stackArn(name)),
    bootstrapStackArn: stackArn(bootstrapStackName),
    assetBucketArn,
    assetObjectsArn: `${assetBucketArn}/*`,
    cdkIamRoleArn: `arn:${partition}:iam::${account}:role/cdk-hnb659fds-*`,
    cdkIamPolicyArn: `arn:${partition}:iam::${account}:policy/cdk-hnb659fds-*`,
    lambdaRoleArn: `arn:${partition}:iam::${account}:role/BalanceApiStack-*`,
    clientBucketArn,
    clientObjectsArn: `${clientBucketArn}/*`,
  };

  [...buildCoreDeployStatements(ctx), ...buildStorageDeployStatements(ctx)].forEach((statement) =>
    role.addToPrincipalPolicy(statement),
  );
};
