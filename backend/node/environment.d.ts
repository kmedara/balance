import type { PlaidEnv } from "./src/plaid/types.ts";
import type { filterProps } from "./src/util.ts";

type strings<T> = { [key in keyof T] : string }
declare global {
    namespace NodeJS {
        interface ProcessEnv extends strings<PlaidEnv> {
        }
        
    } 
}