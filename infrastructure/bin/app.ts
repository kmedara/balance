import * as cdk from "aws-cdk-lib";
import { BalanceInfraStack } from "../lib/stacks/balance-infra-stack.js";

const app = new cdk.App();

new BalanceInfraStack(app, "BalanceInfraStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION ?? "us-east-1",
  },
});
