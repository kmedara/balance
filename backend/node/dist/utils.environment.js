import { filterProps } from "./util.js";
export const getPlaidEnvVars = () => {
    const env = filterProps(process.env);
    // const env: Partial<PlaidEnv> = {
    //     PLAID_CLIENT_ID: process.env.PLAID_CLIENT_ID,
    //     PLAID_COUNTRY_CODES: process.env.PLAID_COUNTRY_CODES?.split(",") as CountryCode[],
    //     PLAID_ENV: process.env.PLAID_ENV,
    //     PLAID_HOST: process.env.PLAID_HOST,
    //     PLAID_PRODUCTS: process.env.PLAID_PRODUCTS?.split(",") as Products[],
    //     PLAID_SECRET: process.env.PLAID_SECRET
    // }
    const empties = (obj) => Object.keys(obj).filter(key => {
        return obj[key] == undefined;
    });
    return env;
};
//# sourceMappingURL=utils.environment.js.map