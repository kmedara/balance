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

/**
 * Config sources — one source per concern (no env ↔ context fallbacks).
 *
 * | Concern                    | Source                                      |
 * |----------------------------|---------------------------------------------|
 * | Cognito OAuth URLs         | CDK context (`cdk.json` / `-c`)             |
 * | Domain / CORS / DNS        | Env vars                                    |
 * | GitHub OIDC                | CDK context                                 |
 * | API Lambda secrets / IDs   | Env vars (`pickApiLambdaEnvironment`)       |
 * | Client CSP / DNS labels    | CDK context                                 |
 */

const app = new cdk.App();
const stackEnv = getStackEnv();

// ---------------------------------------------------------------------------
// Cognito OAuth URLs — CDK context
// ---------------------------------------------------------------------------

const callbackUrls = app.node.getContext('callbackUrls') as string[];
const logoutUrls = app.node.getContext('logoutUrls') as string[];

new AuthStack(app, 'BalanceAuthStack', {
  env: stackEnv,
  callbackUrls,
  logoutUrls,
});

// ---------------------------------------------------------------------------
// Domain / CORS / DNS — env vars
// ---------------------------------------------------------------------------

const rootDomainName = process.env.ROOT_DOMAIN_NAME;
const hostedZoneId = process.env.HOSTED_ZONE_ID;
const corsOrigin = process.env.CLIENT_ORIGIN;
const clientDomainName = process.env.CLIENT_DOMAIN_NAME;
const clientCertificateArn = process.env.CLIENT_CERTIFICATE_ARN;

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

// Optional DNS label overrides + client CSP — CDK context
const apiSubdomain = app.node.tryGetContext('apiSubdomain') as string | undefined;
const appSubdomain = app.node.tryGetContext('appSubdomain') as string | undefined;
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
  new ClientStack(app, 'BalanceClientStack', {
    env: stackEnv,
    domainName: clientDomainName,
    certificateArn: clientCertificateArn,
    contentSecurityPolicy,
  });
}

// ---------------------------------------------------------------------------
// GitHub OIDC — CDK context (optional stack)
// ---------------------------------------------------------------------------

const githubOrg = app.node.tryGetContext('githubOrg') as string | undefined;
const githubRepo = app.node.tryGetContext('githubRepo') as string | undefined;

if (githubOrg && githubRepo) {
  const githubBranches = (app.node.tryGetContext('githubBranches') as string | undefined)
    ?.split(',')
    .map((branch) => branch.trim())
    .filter(Boolean);

  const githubEnvironments = (
    app.node.tryGetContext('githubEnvironments') as string | undefined
  )
    ?.split(',')
    .map((environment) => environment.trim())
    .filter(Boolean);

  const githubTags = (app.node.tryGetContext('githubTags') as string | undefined)
    ?.split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

  new GitHubOidcStack(app, 'BalanceGitHubOidcStack', {
    env: stackEnv,
    githubOrg,
    githubRepo,
    githubBranches,
    githubEnvironments,
    githubTags,
  });
}
