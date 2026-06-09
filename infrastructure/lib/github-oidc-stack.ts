import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export type GitHubOidcStackProps = cdk.StackProps & {
  githubOrg: string;
  githubRepo: string;
  /** Must match the GitHub Actions `environment:` name (default: production). */
  githubEnvironment?: string;
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

    const githubEnvironment = props.githubEnvironment ?? 'production';
    const repository = `${props.githubOrg}/${props.githubRepo}`;

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
          'token.actions.githubusercontent.com:sub': [
            `repo:${repository}:environment:${githubEnvironment}`,
            `repo:${repository}:ref:refs/heads/main`,
          ],
        },
      }),
      description: 'GitHub Actions OIDC role for Balance CDK deploys',
      maxSessionDuration: cdk.Duration.hours(1),
    });

    this.deployRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess'),
    );

    new cdk.CfnOutput(this, 'DeployRoleArn', {
      value: this.deployRole.roleArn,
      description: 'Set as GitHub secret AWS_DEPLOY_ROLE_ARN (repo or production environment)',
      exportName: 'BalanceGitHubDeployRoleArn',
    });
  }
}
