

import { Products, type CountryCode } from "plaid"
import type { PlaidEnv } from "./plaid/types.js"

export const getPlaidEnvVars = (): PlaidEnv => {

  const env: PlaidEnv = {
    PLAID_CLIENT_ID: process.env.PLAID_CLIENT_ID,
    PLAID_COUNTRY_CODES: (process.env.PLAID_COUNTRY_CODES || 'US').split(",") as CountryCode[],
    PLAID_ENV: process.env.PLAID_ENV,
    PLAID_HOST: process.env.PLAID_HOST,
    PLAID_PRODUCTS: (process.env.PLAID_PRODUCTS || Products.Balance).split(",") as Products[],
    PLAID_SECRET: process.env.PLAID_SECRET,
    PLAID_CLIENT_NAME: process.env.PLAID_CLIENT_NAME,
    PLAID_REDIRECT_URI: process.env.PLAID_REDIRECT_URI
  }

  const undefinedKeys = Object.keys(env).filter(key => {
    return env[key] == undefined;
  })

  if (undefinedKeys.length)
    throw Error('Plaid environment variable undefined', {
      cause: undefinedKeys
    })
  return env as PlaidEnv;
}

