import type { CountryCode, Products } from "plaid";
export type PlaidEnv = {
    [key: string]: any | undefined;
    PLAID_ENV: string;
    PLAID_SECRET: string;
    PLAID_CLIENT_ID: string;
    PLAID_HOST: string;
    PLAID_COUNTRY_CODES: CountryCode[];
    PLAID_PRODUCTS: Products[];
    PLAID_CLIENT_NAME: string;
    PLAID_REDIRECT_URI: string;
};
//# sourceMappingURL=types.d.ts.map