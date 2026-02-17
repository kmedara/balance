import { Configuration, CountryCode, PlaidApi, PlaidEnvironments } from 'plaid'
import type { PlaidEnv } from './types.js';
import { getPlaidEnvVars } from '../env.helper.js';
import { BaseAPI } from 'plaid/dist/base.js';
// Initialize the Plaid client
// Find your API keys in the Dashboard (https://dashboard.plaid.com/account/keys)
const configuration = () => {
    const env: PlaidEnv = getPlaidEnvVars();
    return new Configuration({
        basePath: PlaidEnvironments[env.PLAID_ENV],
        baseOptions: {
            headers: {
                'PLAID-CLIENT-ID': env.PLAID_CLIENT_ID,
                'PLAID-SECRET': env.PLAID_SECRET,
                'Plaid-Version': '2020-09-14',
            },
        },
    });
}
export const plaidClient = new PlaidApi(configuration())
