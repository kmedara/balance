import type { CountryCode, Products } from "plaid";
export type PlaidEnv = {
    [key: string]: any | undefined;
    PLAID_ENV: string;
    PLAID_SECRET: string;
    PLAID_CLIENT_ID: string;
    PLAID_HOST: string;
    PLAID_COUNTRY_CODES: CountryCode[];
    PLAID_PRODUCTS: Products[];
};
//# sourceMappingURL=types.d.ts.map