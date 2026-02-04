import { plaidClient } from './client.js';
import { Products } from 'plaid';
import { getPlaidEnvVars } from '../env.js';
process.env.p;
export async function plaidRoutes(app, options) {
    // Create Link Token
    app.post('/link-token', async () => {
        const response = await plaidClient.linkTokenCreate({
            user: {
                client_user_id: 'user-123' // replace with your user ID
            },
            client_name: 'Balance',
            products: [Products.Auth, Products.Balance],
            country_codes: getPlaidEnvVars().PLAID_COUNTRY_CODES,
            language: 'en'
        });
        return response.data;
    });
    // Exchange public_token for access_token
    app.post('/exchange-token', async (request) => {
        const { public_token } = request.body;
        const response = await plaidClient.itemPublicTokenExchange({
            public_token
        });
        return response.data;
    });
}
//# sourceMappingURL=routes.js.map