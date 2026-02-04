export const getPlaidEnvVars = () => {
    const env = {
        PLAID_CLIENT_ID: process.env.PLAID_CLIENT_ID,
        PLAID_COUNTRY_CODES: process.env.PLAID_COUNTRY_CODES?.split(","),
        PLAID_ENV: process.env.PLAID_ENV,
        PLAID_HOST: process.env.PLAID_HOST,
        PLAID_PRODUCTS: process.env.PLAID_PRODUCTS?.split(","),
        PLAID_SECRET: process.env.PLAID_SECRET,
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
//# sourceMappingURL=utils.env.js.map