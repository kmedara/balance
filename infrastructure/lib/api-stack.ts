import * as path from 'node:path';
import * as cdk from 'aws-cdk-lib';
import * as apigwv2 from 'aws-cdk-lib/aws-apigatewayv2';
import * as integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import type * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction, OutputFormat } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as logs from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';

export type ApiStackProps = cdk.StackProps & {
  /** Allowed browser origin for CORS / redirects (sets Lambda `CLIENT_ORIGIN`). */
  corsOrigin?: string;
  /** Lambda environment variables (secrets should move to Secrets Manager in production). */
  environment?: Record<string, string>;
  /** DynamoDB tables and env vars from BalanceDatabaseStack. */
  database?: {
    tables: dynamodb.ITable[];
    environment: Record<string, string>;
  };
};

/**
 * Balance API on API Gateway HTTP API + Lambda (Fastify via @fastify/aws-lambda).
 */
export class ApiStack extends cdk.Stack {
  public readonly httpApi: apigwv2.HttpApi;
  public readonly apiFunction: NodejsFunction;

  constructor(scope: Construct, id: string, props: ApiStackProps = {}) {
    super(scope, id, props);

    const corsOrigin = props.corsOrigin ?? 'http://localhost:4200';
    const environment: Record<string, string> = {
      NODE_ENV: 'production',
      CLIENT_ORIGIN: corsOrigin,
      ...props.database?.environment,
      ...props.environment,
    };

    const logGroup = new logs.LogGroup(this, 'ApiLogGroup', {
      logGroupName: '/balance/api',
      retention: logs.RetentionDays.ONE_MONTH,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    this.apiFunction = new NodejsFunction(this, 'ApiFunction', {
      functionName: 'balance-api',
      entry: path.join(__dirname, '../../api/src/lambda.ts'),
      projectRoot: path.join(__dirname, '../..'),
      depsLockFilePath: path.join(__dirname, '../../package-lock.json'),
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_22_X,
      architecture: lambda.Architecture.ARM_64,
      memorySize: 512,
      timeout: cdk.Duration.seconds(29),
      environment,
      logGroup,
      bundling: {
        format: OutputFormat.ESM,
        target: 'node22',
        mainFields: ['module', 'main'],
        minify: true,
        sourceMap: true,
        forceDockerBundling: false,
        esbuildArgs: {
          '--packages': 'external',
        },
      },
    });

    for (const table of props.database?.tables ?? []) {
      table.grantReadWriteData(this.apiFunction);
    }

    this.httpApi = new apigwv2.HttpApi(this, 'BalanceHttpApi', {
      apiName: 'balance-api',
      description: 'Balance Fastify API (Lambda proxy)',
      createDefaultStage: true,
      corsPreflight: {
        allowCredentials: true,
        allowHeaders: ['Authorization', 'Content-Type', 'Cookie', 'Stripe-Signature'],
        allowMethods: [
          apigwv2.CorsHttpMethod.GET,
          apigwv2.CorsHttpMethod.POST,
          apigwv2.CorsHttpMethod.PATCH,
          apigwv2.CorsHttpMethod.DELETE,
          apigwv2.CorsHttpMethod.OPTIONS,
        ],
        allowOrigins: [corsOrigin],
      },
    });

    const integration = new integrations.HttpLambdaIntegration(
      'ApiLambdaIntegration',
      this.apiFunction,
    );

    this.httpApi.addRoutes({
      path: '/{proxy+}',
      methods: [apigwv2.HttpMethod.ANY],
      integration,
    });

    this.httpApi.addRoutes({
      path: '/',
      methods: [apigwv2.HttpMethod.ANY],
      integration,
    });

    new cdk.CfnOutput(this, 'ApiUrl', {
      value: this.httpApi.apiEndpoint,
      exportName: 'BalanceApiUrl',
      description: 'API Gateway base URL — set AUTH_CALLBACK_URL to {ApiUrl}/auth/callback',
    });

    new cdk.CfnOutput(this, 'ApiFunctionArn', {
      value: this.apiFunction.functionArn,
      exportName: 'BalanceApiFunctionArn',
    });
  }
}
