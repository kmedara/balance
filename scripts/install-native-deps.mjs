#!/usr/bin/env node

import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const repoRoot = path.resolve(__dirname, '..');

const workspaceFlagIndex = process.argv.indexOf('-w');
const workspace =
  workspaceFlagIndex >= 0 ? process.argv[workspaceFlagIndex + 1] : 'balance';

// #region agent log
const DEBUG_ENDPOINT =
  'http://127.0.0.1:7646/ingest/7f5db1f7-1cff-4c3b-a09c-ab7b254b4532';
const SESSION_ID = 'ad000b';

function debugLog(hypothesisId, location, message, data) {
  const payload = {
    sessionId: SESSION_ID,
    runId: process.env.DEBUG_RUN_ID || 'pre-fix',
    hypothesisId,
    location,
    message,
    data,
    timestamp: Date.now(),
  };

  for (const endpoint of [
    DEBUG_ENDPOINT,
    'http://host.docker.internal:7646/ingest/7f5db1f7-1cff-4c3b-a09c-ab7b254b4532',
  ]) {
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Debug-Session-Id': SESSION_ID,
      },
      body: JSON.stringify(payload),
    }).catch(() => {});
  }
}
// #endregion

function isMusl() {
  try {
    const report = process.report?.getReport?.();
    return report ? !report.header.glibcVersionRuntime : false;
  } catch {
    return false;
  }
}

function readPackageVersion(packageName, searchRoots) {
  for (const root of searchRoots) {
    const packageJsonPath = path.join(root, packageName, 'package.json');
    if (!existsSync(packageJsonPath)) {
      continue;
    }

    const { version } = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
    return version;
  }

  const resolved = require.resolve(`${packageName}/package.json`, {
    paths: searchRoots,
  });
  return require(resolved).version;
}

function parsePackageName(spec) {
  const atIndex = spec.lastIndexOf('@');
  return atIndex > 0 ? spec.slice(0, atIndex) : spec;
}

function packageExists(packageName, searchRoots) {
  for (const root of searchRoots) {
    if (existsSync(path.join(root, packageName))) {
      return true;
    }
  }

  return false;
}

const musl = isMusl();
const arch = process.arch;
const platform = process.platform;
const searchRoots = [
  path.join(repoRoot, 'client/node_modules'),
  path.join(repoRoot, 'api/node_modules'),
  path.join(repoRoot, 'node_modules'),
];

// #region agent log
debugLog('A', 'install-native-deps.mjs:platform', 'Detected container platform', {
  platform,
  arch,
  musl,
  workspace,
});
// #endregion

const nativePackages = [];

if (workspace === 'balance') {
  if (musl && arch === 'x64' && platform === 'linux') {
    nativePackages.push(
      `@rollup/rollup-linux-x64-musl@${readPackageVersion('rollup', searchRoots)}`,
      `@esbuild/linux-x64@${readPackageVersion('esbuild', searchRoots)}`,
      `lightningcss-linux-x64-musl@${readPackageVersion('lightningcss', searchRoots)}`,
      `@tailwindcss/oxide-linux-x64-musl@${readPackageVersion('@tailwindcss/oxide', searchRoots)}`,
      `@parcel/watcher-linux-x64-musl@${readPackageVersion('@parcel/watcher', searchRoots)}`,
    );
  }
}

if (workspace === 'node') {
  if (arch === 'x64' && platform === 'linux') {
    nativePackages.push(
      `@esbuild/linux-x64@${readPackageVersion('esbuild', searchRoots)}`,
    );
  }
}

if (nativePackages.length === 0) {
  // #region agent log
  debugLog('B', 'install-native-deps.mjs:skip', 'No native packages required for platform', {
    platform,
    arch,
    musl,
    workspace,
  });
  // #endregion
  process.exit(0);
}

const missingBefore = nativePackages.filter(
  (pkg) => !packageExists(parsePackageName(pkg), searchRoots),
);

// #region agent log
debugLog('A', 'install-native-deps.mjs:before-install', 'Optional native packages missing before install', {
  workspace,
  missingBefore,
  nativePackages,
});
// #endregion

if (missingBefore.length === 0) {
  // #region agent log
  debugLog('A', 'install-native-deps.mjs:already-installed', 'Native packages already present', {
    workspace,
    nativePackages,
  });
  // #endregion
  process.exit(0);
}

execSync(`npm install --no-save ${nativePackages.join(' ')} -w ${workspace}`, {
  cwd: repoRoot,
  stdio: 'inherit',
});

const missingAfter = nativePackages.filter(
  (pkg) => !packageExists(parsePackageName(pkg), searchRoots),
);

// #region agent log
debugLog('A', 'install-native-deps.mjs:after-install', 'Native package install finished', {
  workspace,
  missingAfter,
  installed: nativePackages,
});
// #endregion

if (missingAfter.length > 0) {
  console.error(
    `Failed to install native packages for ${workspace}: ${missingAfter.join(', ')}`,
  );
  process.exit(1);
}
