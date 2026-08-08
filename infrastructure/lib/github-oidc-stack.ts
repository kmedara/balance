import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { grantGitHubDeployPermissions } from './github-deploy-policy';

export type GitHubOidcStackProps = cdk.StackProps & {
  githubOrg: string;
  githubRepo: string;
  /** Branches allowed to assume the role (push without an environment claim). */
  githubBranches?: string[];
  /**
   * Tag ref patterns allowed in OIDC `sub` (e.g. `v*`).
   * Prefer environment claims for deploy jobs; tags are defense in depth.
   */
  githubTags?: string[];
  /** GitHub Actions environment names allowed in OIDC trust (deploy job `environment:`). */
  githubEnvironments?: string[];
  /** @deprecated Use githubEnvironments */
  githubEnvironment?: string;
  /** CloudFormation stack names deployed by CI (default includes Database/Auth/Api/Client/Dns). */
  deployStackNames?: string[];
  /** @deprecated Use deployStackNames */
  deployStackName?: string;
};

/**
 * Deploy once locally with admin credentials before enabling GitHub Actions deploys.
 *
 * Staging account example:
 * npx cdk deploy BalanceGitHubOidcStack -c githubOrg=OWNER -c githubRepo=REPO \
 *   -c githubEnvironments=staging -c githubBranches=main
 *
 * Production account example:
 * npx cdk deploy BalanceGitHubOidcStack -c githubOrg=OWNER -c githubRepo=REPO \
 *   -c githubEnvironments=production -c githubTags=v* -c githubBranches=main
 */
export class GitHubOidcStack extends cdk.Stack {
  public readonly deployRole: iam.Role;

  constructor(scope: Construct, id: string, props: GitHubOidcStackProps) {
    super(scope, id, props);

    const githubEnvironments = props.githubEnvironments?.length
      ? props.githubEnvironments
      : props.githubEnvironment
        ? [props.githubEnvironment]
        : ['staging', 'production'];
    const githubBranches = props.githubBranches?.length ? props.githubBranches : ['main'];
    const githubTags = props.githubTags?.length ? props.githubTags : ['v*'];
    const repository = `${props.githubOrg}/${props.githubRepo}`;

    const trustSubjects = [
      ...githubBranches.map((branch) => `repo:${repository}:ref:refs/heads/${branch}`),
      ...githubTags.map((tag) => `repo:${repository}:ref:refs/tags/${tag}`),
      ...githubEnvironments.map(
        (environment) => `repo:${repository}:environment:${environment}`,
      ),
    ];

    const provider = new iam.OpenIdConnectProvider(this, 'GitHubOidcProvider', {
      url: 'https://token.actions.githubusercontent.com',
      clientIds: ['sts.amazonaws.com'],
    });

    this.deployRole = new iam.Role(this, 'GitHubDeployRole', {
      roleName: 'balance-github-cdk-deploy',
      assumedBy: new iam.WebIdentityPrincipal(provider.openIdConnectProviderArn, {
        StringEquals: {
          'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com',
        },
        StringLike: {
          'token.actions.githubusercontent.com:sub': trustSubjects,
        },
      }),
      description: 'GitHub Actions OIDC role for Balance CDK deploys',
      maxSessionDuration: cdk.Duration.hours(1),
    });

    grantGitHubDeployPermissions(this, this.deployRole, {
      deployStackNames: props.deployStackNames,
      deployStackName: props.deployStackName,
    });

    new cdk.CfnOutput(this, 'DeployRoleArn', {
      value: this.deployRole.roleArn,
      description: 'Set as GitHub environment secret AWS_DEPLOY_ROLE_ARN',
      exportName: 'BalanceGitHubDeployRoleArn',
    });

    new cdk.CfnOutput(this, 'TrustSubjects', {
      value: trustSubjects.join(', '),
      description: 'OIDC sub claims allowed to assume this role',
    });
  }
}
