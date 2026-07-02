#!/bin/sh
set -eu

cd /app

# #region agent log
DEBUG_RUN_ID="${DEBUG_RUN_ID:-post-fix}" node scripts/install-native-deps.mjs -w "${NATIVE_DEPS_WORKSPACE:?}"
# #endregion

cd "${APP_WORKDIR:?}"
exec "$@"
