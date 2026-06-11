import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export type GitHubDeployPolicyProps = {
  /** CloudFormation stack deployed by CI (default BalanceAuthStack). */
  deployStackName?: string;
  /** CDK bootstrap stack name (default CDKToolkit). */
  bootstrapStackName?: string;
};

/**
 * Least-privilege permissions for GitHub Actions to bootstrap CDK and deploy BalanceAuthStack.
 * Does not include IAM admin — deploy BalanceGitHubOidcStack locally with a human admin role.
 */
export const grantGitHubDeployPermissions = (
  scope: Construct,
  role: iam.IRole,
  props: GitHubDeployPolicyProps = {},
): void => {
  const deployStackName = props.deployStackName ?? 'BalanceAuthStack';
  const bootstrapStackName = props.bootstrapStackName ?? 'CDKToolkit';

  const stack = cdk.Stack.of(scope);
  const region = stack.region;
  const account = stack.account;
  const partition = cdk.Aws.PARTITION;

  const stackArn = (name: string) =>
    `arn:${partition}:cloudformation:${region}:${account}:stack/${name}/*`;

  const deployStackArn = stackArn(deployStackName);
  const bootstrapStackArn = stackArn(bootstrapStackName);

  const assetBucketName = `cdk-hnb659fds-assets-${account}-${region}`;
  const assetBucketArn = `arn:${partition}:s3:::${assetBucketName}`;
  const assetObjectsArn = `${assetBucketArn}/*`;

  const cdkIamRoleArn = `arn:${partition}:iam::${account}:role/cdk-hnb659fds-*`;
  const cdkIamPolicyArn = `arn:${partition}:iam::${account}:policy/cdk-hnb659fds-*`;

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

  role.addToPrincipalPolicy(
    new iam.PolicyStatement({
      sid: 'CloudFormationMutateDeployStacks',
      actions: cfnMutatingActions,
      resources: [deployStackArn, bootstrapStackArn],
    }),
  );

  role.addToPrincipalPolicy(
    new iam.PolicyStatement({
      sid: 'CloudFormationReadDeployStacks',
      actions: cfnReadActions,
      resources: [deployStackArn, bootstrapStackArn],
    }),
  );

  // CDK CLI discovery (DescribeStacks on other stacks is denied).
  role.addToPrincipalPolicy(
    new iam.PolicyStatement({
      sid: 'CloudFormationList',
      actions: ['cloudformation:DescribeStacks', 'cloudformation:ListStacks'],
      resources: ['*'],
    }),
  );

  role.addToPrincipalPolicy(
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
  );

  role.addToPrincipalPolicy(
    new iam.PolicyStatement({
      sid: 'CdkAssetBucket',
      actions: [
        's3:CreateBucket',
        's3:PutBucketPolicy',
        's3:PutBucketPublicAccessBlock',
        's3:PutEncryptionConfiguration',
        's3:PutBucketVersioning',
        's3:PutLifecycleConfiguration',
        's3:GetBucketLocation',
        's3:ListBucket',
        's3:GetObject',
        's3:PutObject',
        's3:DeleteObject',
        's3:GetBucketPolicy',
      ],
      resources: [assetBucketArn, assetObjectsArn],
    }),
  );

  role.addToPrincipalPolicy(
    new iam.PolicyStatement({
      sid: 'CdkBootstrapSsm',
      actions: ['ssm:GetParameter', 'ssm:GetParameters', 'ssm:PutParameter'],
      resources: [
        `arn:${partition}:ssm:${region}:${account}:parameter/cdk-bootstrap/*`,
        `arn:${partition}:ssm:${region}:${account}:parameter/cdk-bootstrap/hnb659fds/*`,
      ],
    }),
  );

  role.addToPrincipalPolicy(
    new iam.PolicyStatement({
      sid: 'CdkBootstrapEcr',
      actions: [
        'ecr:CreateRepository',
        'ecr:DescribeRepositories',
        'ecr:SetRepositoryPolicy',
        'ecr:PutLifecyclePolicy',
        'ecr:GetAuthorizationToken',
        'ecr:BatchCheckLayerAvailability',
        'ecr:GetDownloadUrlForLayer',
        'ecr:BatchGetImage',
        'ecr:InitiateLayerUpload',
        'ecr:UploadLayerPart',
        'ecr:CompleteLayerUpload',
        'ecr:PutImage',
      ],
      resources: [
        `arn:${partition}:ecr:${region}:${account}:repository/cdk-hnb659fds-container-assets-${account}-${region}`,
      ],
    }),
  );

  role.addToPrincipalPolicy(
    new iam.PolicyStatement({
      sid: 'EcrAuthToken',
      actions: ['ecr:GetAuthorizationToken'],
      resources: ['*'],
    }),
  );

  role.addToPrincipalPolicy(
    new iam.PolicyStatement({
      sid: 'CdkBootstrapIamRoles',
      actions: [
        'iam:CreateRole',
        'iam:DeleteRole',
        'iam:GetRole',
        'iam:UpdateRole',
        'iam:TagRole',
        'iam:UntagRole',
        'iam:AttachRolePolicy',
        'iam:DetachRolePolicy',
        'iam:PutRolePolicy',
        'iam:DeleteRolePolicy',
        'iam:GetRolePolicy',
        'iam:PassRole',
      ],
      resources: [cdkIamRoleArn, cdkIamPolicyArn],
    }),
  );

  role.addToPrincipalPolicy(
    new iam.PolicyStatement({
      sid: 'StsIdentity',
      actions: ['sts:GetCallerIdentity'],
      resources: ['*'],
    }),
  );
};
