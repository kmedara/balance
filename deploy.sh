#!/usr/bin/env bash

set -euo pipefail

SECRETS_FILE=".env.local.secrets"

if [[ ! -f "$SECRETS_FILE" ]]; then
  echo "Error: $SECRETS_FILE not found"
  exit 1
fi

# Export all variables from secrets file
set -a
# shellcheck disable=SC1090
source "$SECRETS_FILE"
set +a

# Optional: validate required variables
required_vars=(
  PLAID_CLIENT_ID
  PLAID_SECRET
  PLAID_PRODUCTS
  PLAID_HOST
  PLAID_COUNTRY_CODES
  PLAID_ENV
  PLAID_CLIENT_NAME
  PLAID_REDIRECT_URI
  GATEWAY
)

for var in "${required_vars[@]}"; do
  if [[ -z "${!var:-}" ]]; then
    echo "Error: $var is not set"
    exit 1
  fi
done

echo "Environment variables loaded from $SECRETS_FILE"

#docker compose up -d
