import { Products } from "plaid";
export const getPlaidEnvVars = () => {
    const env = {
        PLAID_CLIENT_ID: process.env.PLAID_CLIENT_ID,
        PLAID_COUNTRY_CODES: (process.env.PLAID_COUNTRY_CODES || 'US').split(","),
        PLAID_ENV: process.env.PLAID_ENV,
        PLAID_HOST: process.env.PLAID_HOST,
        PLAID_PRODUCTS: (process.env.PLAID_PRODUCTS || Products.Balance).split(","),
        PLAID_SECRET: process.env.PLAID_SECRET,
        PLAID_CLIENT_NAME: process.env.PLAID_CLIENT_NAME
    };
    const undefinedKeys = Object.keys(env).filter(key => {
        return env[key] == undefined;
    });
    if (undefinedKeys.length)
        throw Error('Plaid environment variable undefined', {
            cause: undefinedKeys
        });
    return env;
};
//# sourceMappingURL=environment.js.map