#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ApiStack } from '../lib/api-stack';
import { pickApiLambdaEnvironment } from '../lib/api-env';
import { AuthStack } from '../lib/auth-stack';
import { ClientStack } from '../lib/client-stack';
import { DatabaseStack } from '../lib/database-stack';
import { DnsStack } from '../lib/dns-stack';
import { GitHubOidcStack } from '../lib/github-oidc-stack';
import { getStackEnv } from '../lib/stack-env';

const parseUrlList = (
  contextValue: string[] | undefined,
  envValue: string | undefined,
  fallback: string[],
): string[] => {
  if (contextValue?.length) {
    return contextValue;
  }

  if (envValue) {
    try {
      const parsed = JSON.parse(envValue) as unknown;
      if (Array.isArray(parsed) && parsed.every((entry) => typeof entry === 'string')) {
        return parsed;
      }
    } catch {
      return envValue.split(',').map((entry) => entry.trim()).filter(Boolean);
    }
  }

  return fallback;
};

const app = new cdk.App();

const callbackUrls = parseUrlList(
  app.node.tryGetContext('callbackUrls') as string[] | undefined,
  process.env.COGNITO_CALLBACK_URLS,
  ['http://localhost:3000/auth/callback'],
);

const logoutUrls = parseUrlList(
  app.node.tryGetContext('logoutUrls') as string[] | undefined,
  process.env.COGNITO_LOGOUT_URLS,
  ['http://localhost:4200/', 'http://localhost:4200/login'],
);

const stackEnv = getStackEnv();

const githubOrg = app.node.tryGetContext('githubOrg') as string | undefined;
const githubRepo = app.node.tryGetContext('githubRepo') as string | undefined;

if (githubOrg && githubRepo) {
  const githubBranches = (app.node.tryGetContext('githubBranches') as string | undefined)
    ?.split(',')
    .map((branch) => branch.trim());

  const githubEnvironments = (
    app.node.tryGetContext('githubEnvironments') as string | undefined
  )
    ?.split(',')
    .map((environment) => environment.trim())
    .filter(Boolean);

  const legacyGithubEnvironment = app.node.tryGetContext('githubEnvironment') as
    | string
    | undefined;

  new GitHubOidcStack(app, 'BalanceGitHubOidcStack', {
    env: stackEnv,
    githubOrg,
    githubRepo,
    githubBranches,
    githubEnvironments: githubEnvironments?.length
      ? githubEnvironments
      : legacyGithubEnvironment
        ? [legacyGithubEnvironment]
        : ['development'],
  });
}

new AuthStack(app, 'BalanceAuthStack', {
  env: stackEnv,
  callbackUrls,
  logoutUrls,
});

const rootDomainName =
  process.env.ROOT_DOMAIN_NAME ??
  (app.node.tryGetContext('rootDomainName') as string | undefined);

const apiSubdomain = (app.node.tryGetContext('apiSubdomain') as string | undefined) ?? 'api';
const appSubdomain = (app.node.tryGetContext('appSubdomain') as string | undefined) ?? 'app';
const hostedZoneId =
  process.env.HOSTED_ZONE_ID ?? (app.node.tryGetContext('hostedZoneId') as string | undefined);

const explicitCorsOrigin =
  process.env.CLIENT_ORIGIN ??
  process.env.CORS_ORIGIN ??
  (app.node.tryGetContext('corsOrigin') as string | undefined);

const corsOrigin =
  explicitCorsOrigin ??
  (rootDomainName ? `https://${appSubdomain}.${rootDomainName}` : 'http://localhost:4200');

const database = new DatabaseStack(app, 'BalanceDatabaseStack', {
  env: stackEnv,
});

const api = new ApiStack(app, 'BalanceApiStack', {
  env: stackEnv,
  corsOrigin,
  environment: pickApiLambdaEnvironment(),
  database: {
    tables: [database.table],
    environment: database.tableEnvironment,
  },
});

const contentSecurityPolicy = app.node.tryGetContext('clientCsp') as string | undefined;

if (rootDomainName) {
  const dns = new DnsStack(app, 'BalanceDnsStack', {
    env: stackEnv,
    domainName: rootDomainName,
    apiSubdomain,
    appSubdomain,
    hostedZoneId,
    httpApi: api.httpApi,
  });

  new ClientStack(app, 'BalanceClientStack', {
    env: stackEnv,
    domainName: dns.appDomainName,
    certificate: dns.clientCertificate,
    hostedZone: dns.hostedZone,
    contentSecurityPolicy,
  });
} else {
  const clientDomainName =
    process.env.CLIENT_DOMAIN_NAME ??
    (app.node.tryGetContext('clientDomainName') as string | undefined);

  const clientCertificateArn =
    process.env.CLIENT_CERTIFICATE_ARN ??
    (app.node.tryGetContext('clientCertificateArn') as string | undefined);

  new ClientStack(app, 'BalanceClientStack', {
    env: stackEnv,
    domainName: clientDomainName,
    certificateArn: clientCertificateArn,
    contentSecurityPolicy,
  });
}
