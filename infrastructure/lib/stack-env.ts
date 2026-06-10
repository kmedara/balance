import type { Environment } from 'aws-cdk-lib';

/**
 * Region is required for synth (Cognito is regional). Account is resolved at deploy
 * from AWS credentials when CDK_DEFAULT_ACCOUNT is unset.
 */
export const getStackEnv = (): Environment => ({
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region:
    process.env.CDK_DEFAULT_REGION ??
    process.env.AWS_REGION ??
    process.env.AWS_DEFAULT_REGION ??
    'us-east-1',
});
