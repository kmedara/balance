#!/usr/bin/env bash

#
# Exports all required variables from secrets file into current shell
#

#strict mode
set -euo pipefail

#define secrets file
SECRETS_FILE=".env.local.secrets"

#validate file existence 
if [[ ! -f "$SECRETS_FILE" ]]; then
    echo "Error: $SECRETS_FILE not found"
    exit 1
fi

# Export all variables from here on automatically
set -a

# shellcheck disable=SC1090

# execute file in current shell
source "$SECRETS_FILE"

# stop auto export 
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
    MONGO_URL
)

# indirect expansion
# If var="PLAID_CLIENT_ID", then: ${!var} → value of $PLAID_CLIENT_ID
# If the variable is unset, it evaluates to empty string instead of erroring
# checks if the resulting value is empty
for var in "${required_vars[@]}"; do
    if [[ -z "${!var:-}" ]]; then
        echo "Error: $var is not set"
        exit 1
    fi
done

echo "Environment variables loaded from $SECRETS_FILE"

docker compose up -d --build
