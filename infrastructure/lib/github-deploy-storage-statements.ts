import * as iam from 'aws-cdk-lib/aws-iam';
import type { DeployPolicyContext } from './github-deploy-statements.js';

/**
 * Storage, CDN, DNS, and CDK-bootstrap resources (S3, CloudFront, Route 53,
 * ACM, SSM, ECR, IAM roles) that CI provisions for the Balance stacks.
 */
export const buildStorageDeployStatements = (ctx: DeployPolicyContext): iam.PolicyStatement[] => {
  const {
    partition,
    region,
    account,
    assetBucketArn,
    assetObjectsArn,
    cdkIamRoleArn,
    cdkIamPolicyArn,
    lambdaRoleArn,
    clientBucketArn,
    clientObjectsArn,
  } = ctx;

  return [
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
    new iam.PolicyStatement({
      sid: 'ClientBucketManage',
      actions: [
        's3:CreateBucket',
        's3:DeleteBucket',
        's3:PutBucketPolicy',
        's3:GetBucketPolicy',
        's3:DeleteBucketPolicy',
        's3:PutBucketPublicAccessBlock',
        's3:GetBucketPublicAccessBlock',
        's3:PutEncryptionConfiguration',
        's3:PutBucketVersioning',
        's3:GetBucketLocation',
        's3:PutBucketTagging',
      ],
      resources: [clientBucketArn],
    }),
    // `aws s3 sync` of the Angular build output + asset cleanup.
    new iam.PolicyStatement({
      sid: 'ClientBucketObjects',
      actions: ['s3:ListBucket', 's3:GetObject', 's3:PutObject', 's3:DeleteObject'],
      resources: [clientBucketArn, clientObjectsArn],
    }),
    // Route 53 hosted zone management + DNS-validation / alias records.
    new iam.PolicyStatement({
      sid: 'Route53DnsStack',
      actions: [
        'route53:CreateHostedZone',
        'route53:DeleteHostedZone',
        'route53:GetHostedZone',
        'route53:ListHostedZones',
        'route53:ListHostedZonesByName',
        'route53:GetChange',
        'route53:ChangeResourceRecordSets',
        'route53:ListResourceRecordSets',
        'route53:ChangeTagsForResource',
        'route53:ListTagsForResource',
      ],
      resources: ['*'],
    }),
    // ACM certificates (api + client). ACM cert ARNs are generated, so scope is wildcard.
    new iam.PolicyStatement({
      sid: 'AcmCertificates',
      actions: [
        'acm:RequestCertificate',
        'acm:DeleteCertificate',
        'acm:DescribeCertificate',
        'acm:ListCertificates',
        'acm:AddTagsToCertificate',
        'acm:RemoveTagsFromCertificate',
        'acm:ListTagsForCertificate',
      ],
      resources: ['*'],
    }),
    // CloudFront ARNs are not regional/account-scoped in IAM; distribution-level
    // actions require a wildcard resource.
    new iam.PolicyStatement({
      sid: 'CloudFrontClientStack',
      actions: [
        'cloudfront:CreateDistribution',
        'cloudfront:UpdateDistribution',
        'cloudfront:DeleteDistribution',
        'cloudfront:GetDistribution',
        'cloudfront:GetDistributionConfig',
        'cloudfront:TagResource',
        'cloudfront:UntagResource',
        'cloudfront:CreateInvalidation',
        'cloudfront:GetInvalidation',
        'cloudfront:CreateOriginAccessControl',
        'cloudfront:UpdateOriginAccessControl',
        'cloudfront:DeleteOriginAccessControl',
        'cloudfront:GetOriginAccessControl',
        'cloudfront:CreateResponseHeadersPolicy',
        'cloudfront:UpdateResponseHeadersPolicy',
        'cloudfront:DeleteResponseHeadersPolicy',
        'cloudfront:GetResponseHeadersPolicy',
      ],
      resources: ['*'],
    }),
    new iam.PolicyStatement({
      sid: 'CdkBootstrapSsm',
      actions: ['ssm:GetParameter', 'ssm:GetParameters', 'ssm:PutParameter'],
      resources: [
        `arn:${partition}:ssm:${region}:${account}:parameter/cdk-bootstrap/*`,
        `arn:${partition}:ssm:${region}:${account}:parameter/cdk-bootstrap/hnb659fds/*`,
      ],
    }),
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
    new iam.PolicyStatement({
      sid: 'EcrAuthToken',
      actions: ['ecr:GetAuthorizationToken'],
      resources: ['*'],
    }),
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
      resources: [cdkIamRoleArn, cdkIamPolicyArn, lambdaRoleArn],
    }),
    new iam.PolicyStatement({
      sid: 'StsIdentity',
      actions: ['sts:GetCallerIdentity'],
      resources: ['*'],
    }),
  ];
};
