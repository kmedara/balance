import { Configuration, CountryCode, PlaidApi, PlaidEnvironments } from 'plaid';
import { filterProps } from '../util.js';
import { getPlaidEnvVars } from '../env.js';
// Initialize the Plaid client
// Find your API keys in the Dashboard (https://dashboard.plaid.com/account/keys)
const configuration = () => {
    const env = getPlaidEnvVars();
    console.log(env);
    return new Configuration({
        basePath: PlaidEnvironments[env.PLAID_ENV],
        baseOptions: {
            headers: {
                'PLAID-CLIENT-ID': env.PLAID_CLIENT_ID,
                'PLAID-SECRET': env.PLAID_SECRET
            },
        },
    });
};
export const plaidClient = new PlaidApi(configuration());
//# sourceMappingURL=client.js.map