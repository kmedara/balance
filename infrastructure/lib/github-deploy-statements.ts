import * as iam from 'aws-cdk-lib/aws-iam';

export type DeployPolicyContext = {
  partition: string;
  region: string;
  account: string;
  deployStackArns: string[];
  bootstrapStackArn: string;
  assetBucketArn: string;
  assetObjectsArn: string;
  cdkIamRoleArn: string;
  cdkIamPolicyArn: string;
  lambdaRoleArn: string;
  clientBucketArn: string;
  clientObjectsArn: string;
};

const cfnMutatingActions = [
  'cloudformation:CreateStack',
  'cloudformation:UpdateStack',
  'cloudformation:DeleteStack',
  'cloudformation:CreateChangeSet',
  'cloudformation:ExecuteChangeSet',
  'cloudformation:DeleteChangeSet',
  'cloudformation:TagResource',
  'cloudformation:UntagResource',
];

const cfnReadActions = [
  'cloudformation:DescribeStacks',
  'cloudformation:DescribeStackEvents',
  'cloudformation:DescribeStackResources',
  'cloudformation:DescribeStackResource',
  'cloudformation:DescribeChangeSet',
  'cloudformation:GetTemplate',
  'cloudformation:GetTemplateSummary',
  'cloudformation:ListStackResources',
  'cloudformation:ListChangeSets',
];

/**
 * CloudFormation + application-runtime resources (Cognito, Lambda, API Gateway,
 * CloudWatch Logs, DynamoDB) that CI provisions for the Balance stacks.
 */
export const buildCoreDeployStatements = (ctx: DeployPolicyContext): iam.PolicyStatement[] => {
  const { partition, region, account, deployStackArns, bootstrapStackArn } = ctx;
  const deployAndBootstrap = [...deployStackArns, bootstrapStackArn];

  return [
    new iam.PolicyStatement({
      sid: 'CloudFormationMutateDeployStacks',
      actions: cfnMutatingActions,
      resources: deployAndBootstrap,
    }),
    new iam.PolicyStatement({
      sid: 'CloudFormationReadDeployStacks',
      actions: cfnReadActions,
      resources: deployAndBootstrap,
    }),
    new iam.PolicyStatement({
      sid: 'CloudFormationList',
      actions: ['cloudformation:DescribeStacks', 'cloudformation:ListStacks'],
      resources: ['*'],
    }),
    new iam.PolicyStatement({
      sid: 'CognitoAuthStack',
      actions: [
        'cognito-idp:CreateUserPool',
        'cognito-idp:UpdateUserPool',
        'cognito-idp:DeleteUserPool',
        'cognito-idp:DescribeUserPool',
        'cognito-idp:CreateUserPoolClient',
        'cognito-idp:UpdateUserPoolClient',
        'cognito-idp:DeleteUserPoolClient',
        'cognito-idp:DescribeUserPoolClient',
        'cognito-idp:CreateUserPoolDomain',
        'cognito-idp:UpdateUserPoolDomain',
        'cognito-idp:DeleteUserPoolDomain',
        'cognito-idp:DescribeUserPoolDomain',
        'cognito-idp:TagResource',
        'cognito-idp:UntagResource',
        'cognito-idp:GetUserPoolMfaConfig',
        'cognito-idp:SetUserPoolMfaConfig',
      ],
      resources: [`arn:${partition}:cognito-idp:${region}:${account}:userpool/*`],
    }),
    new iam.PolicyStatement({
      sid: 'LambdaApiStack',
      actions: [
        'lambda:CreateFunction',
        'lambda:DeleteFunction',
        'lambda:GetFunction',
        'lambda:GetFunctionConfiguration',
        'lambda:UpdateFunctionCode',
        'lambda:UpdateFunctionConfiguration',
        'lambda:ListVersionsByFunction',
        'lambda:PublishVersion',
        'lambda:TagResource',
        'lambda:UntagResource',
        'lambda:AddPermission',
        'lambda:RemovePermission',
      ],
      resources: [`arn:${partition}:lambda:${region}:${account}:function:balance-api`],
    }),
    new iam.PolicyStatement({
      sid: 'ApiGatewayV2',
      actions: [
        'apigateway:GET',
        'apigateway:POST',
        'apigateway:PUT',
        'apigateway:PATCH',
        'apigateway:DELETE',
      ],
      resources: [`arn:${partition}:apigateway:${region}::/*`],
    }),
    new iam.PolicyStatement({
      sid: 'CloudWatchLogsApi',
      actions: [
        'logs:CreateLogGroup',
        'logs:CreateLogStream',
        'logs:DeleteLogGroup',
        'logs:DescribeLogGroups',
        'logs:PutRetentionPolicy',
        'logs:TagResource',
        'logs:TagLogGroup',
      ],
      resources: [
        `arn:${partition}:logs:${region}:${account}:log-group:/balance/api`,
        `arn:${partition}:logs:${region}:${account}:log-group:/balance/api:*`,
        `arn:${partition}:logs:${region}:${account}:log-group:/aws/lambda/balance-api`,
        `arn:${partition}:logs:${region}:${account}:log-group:/aws/lambda/balance-api:*`,
      ],
    }),
    new iam.PolicyStatement({
      sid: 'DynamoDbBalanceTables',
      actions: [
        'dynamodb:CreateTable',
        'dynamodb:DeleteTable',
        'dynamodb:DescribeTable',
        'dynamodb:UpdateTable',
        'dynamodb:UpdateTimeToLive',
        'dynamodb:TagResource',
        'dynamodb:UntagResource',
        'dynamodb:DescribeTimeToLive',
        'dynamodb:DescribeContinuousBackups',
        'dynamodb:UpdateContinuousBackups',
      ],
      resources: [`arn:${partition}:dynamodb:${region}:${account}:table/balance`],
    }),
  ];
};
