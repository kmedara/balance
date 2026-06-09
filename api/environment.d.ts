import type { PlaidEnv } from "./src/plaid/types.ts";
import type { filterProps } from "./src/util.ts";

type strings<T> = { [key in keyof T] : string }
declare global {
    namespace NodeJS {
        interface ProcessEnv extends strings<PlaidEnv> {
            MONGO_URL?: string;
            MONGO_DB?: string;
            AUTH_DISABLED?: string;
            COGNITO_USER_POOL_ID?: string;
            COGNITO_CLIENT_ID?: string;
            COGNITO_REGION?: string;
            COGNITO_AUTHORITY?: string;
            ACCESS_TOKEN_ENCRYPTION_KEY: string;
            ACCESS_TOKEN_ENCRYPTION_ALGORITHM: string;
            ACCESS_TOKEN_ENCRYPTION_KEY_VERSION: string;
            ACCESS_TOKEN_ENCRYPTION_IV_LENGTH: string;
        }
        
    } 
}