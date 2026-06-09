import * as cdk from 'aws-cdk-lib';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';

export type AuthStackProps = cdk.StackProps & {
  callbackUrls: string[];
  logoutUrls: string[];
};

export class AuthStack extends cdk.Stack {
  public readonly userPool: cognito.UserPool;
  public readonly userPoolClient: cognito.UserPoolClient;

  constructor(scope: Construct, id: string, props: AuthStackProps) {
    super(scope, id, props);

    this.userPool = new cognito.UserPool(this, 'BalanceUserPool', {
      userPoolName: 'balance-users',
      selfSignUpEnabled: true,
      signInAliases: { email: true },
      autoVerify: { email: true },
      standardAttributes: {
        email: { required: true, mutable: true },
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    this.userPoolClient = this.userPool.addClient('BalanceWebClient', {
      userPoolClientName: 'balance-web',
      authFlows: {
        userSrp: true,
      },
      oAuth: {
        flows: {
          authorizationCodeGrant: true,
        },
        scopes: [cognito.OAuthScope.OPENID, cognito.OAuthScope.EMAIL, cognito.OAuthScope.PROFILE],
        callbackUrls: props.callbackUrls,
        logoutUrls: props.logoutUrls,
      },
      generateSecret: false,
      preventUserExistenceErrors: true,
      supportedIdentityProviders: [cognito.UserPoolClientIdentityProvider.COGNITO],
    });

    const domainPrefix = `balance-${cdk.Aws.ACCOUNT_ID}`;
    const userPoolDomain = this.userPool.addDomain('BalanceUserPoolDomain', {
      cognitoDomain: { domainPrefix },
    });

    const authority = `https://cognito-idp.${this.region}.amazonaws.com/${this.userPool.userPoolId}`;

    new cdk.CfnOutput(this, 'UserPoolId', {
      value: this.userPool.userPoolId,
      exportName: 'BalanceUserPoolId',
    });

    new cdk.CfnOutput(this, 'UserPoolClientId', {
      value: this.userPoolClient.userPoolClientId,
      exportName: 'BalanceUserPoolClientId',
    });

    new cdk.CfnOutput(this, 'CognitoRegion', {
      value: this.region,
      exportName: 'BalanceCognitoRegion',
    });

    new cdk.CfnOutput(this, 'CognitoAuthority', {
      value: authority,
      exportName: 'BalanceCognitoAuthority',
    });

    new cdk.CfnOutput(this, 'HostedUiDomain', {
      value: userPoolDomain.domainName,
      exportName: 'BalanceHostedUiDomain',
    });
  }
}
