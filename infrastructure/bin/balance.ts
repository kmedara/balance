#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AuthStack } from '../lib/auth-stack';
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
  ['http://localhost:4200/auth/callback'],
);

const logoutUrls = parseUrlList(
  app.node.tryGetContext('logoutUrls') as string[] | undefined,
  process.env.COGNITO_LOGOUT_URLS,
  ['http://localhost:4200/'],
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
