import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { grantGitHubDeployPermissions } from './github-deploy-policy';

export type GitHubOidcStackProps = cdk.StackProps & {
  githubOrg: string;
  githubRepo: string;
  /** Branches allowed to assume the role (push / workflow_dispatch). */
  githubBranches?: string[];
  /** GitHub Actions environment names allowed in OIDC trust (deploy job `environment:`). */
  githubEnvironments?: string[];
  /** @deprecated Use githubEnvironments */
  githubEnvironment?: string;
  /** CloudFormation stack name deployed by CI (default BalanceAuthStack). */
  deployStackName?: string;
};

/**
 * Deploy once locally with admin credentials before enabling GitHub Actions deploys.
 *
 * npx cdk deploy BalanceGitHubOidcStack -c githubOrg=OWNER -c githubRepo=REPO
 */
export class GitHubOidcStack extends cdk.Stack {
  public readonly deployRole: iam.Role;

  constructor(scope: Construct, id: string, props: GitHubOidcStackProps) {
    super(scope, id, props);

    const githubEnvironments = props.githubEnvironments?.length
      ? props.githubEnvironments
      : props.githubEnvironment
        ? [props.githubEnvironment]
        : ['development'];
    const githubBranches = props.githubBranches?.length
      ? props.githubBranches
      : ['main', 'master'];
    const repository = `${props.githubOrg}/${props.githubRepo}`;

    const trustSubjects = [
      ...githubBranches.map((branch) => `repo:${repository}:ref:refs/heads/${branch}`),
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
      deployStackName: props.deployStackName ?? 'BalanceAuthStack',
    });

    new cdk.CfnOutput(this, 'DeployRoleArn', {
      value: this.deployRole.roleArn,
      description: 'Set as GitHub secret AWS_DEPLOY_ROLE_ARN (repo or environment secret)',
      exportName: 'BalanceGitHubDeployRoleArn',
    });

    new cdk.CfnOutput(this, 'TrustSubjects', {
      value: trustSubjects.join(', '),
      description: 'OIDC sub claims allowed to assume this role',
    });
  }
}
