import type { CountryCode, Products } from 'plaid';
import type {
  IResourcable,
  MongoTimestamps,
  PlaidAccount,
  PlaidItem,
  SyncState,
} from '@kmedara/balance-domain';
import type { PlaidTransactionEventDocument } from './event-document.js';

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
  ACCESS_TOKEN_ENCRYPTION_KEY: string;
  ACCESS_TOKEN_ENCRYPTION_ALGORITHM: string;
  ACCESS_TOKEN_ENCRYPTION_KEY_VERSION: string;
  ACCESS_TOKEN_ENCRYPTION_IV_LENGTH: string;
};

export type PlaidItemDocument = PlaidItem & MongoTimestamps;
export type PlaidSyncStateDocument = SyncState & MongoTimestamps;
export type PlaidAccountDocument = PlaidAccount & MongoTimestamps;

/** @deprecated Use PlaidTransactionEventDocument — transactions live in the events collection. */
export type PlaidTransactionDocument = PlaidTransactionEventDocument;

export type ClientPlaidTransaction = {
  transaction_id: string;
  account_id: string;
  amount: number;
  date: string;
  name: string;
  merchant_name?: string | null;
  pending: boolean;
};

export type ItemTransactionsSyncResult = {
  item_id: string;
  added: ClientPlaidTransaction[];
  modified: ClientPlaidTransaction[];
  removed: { transaction_id: string }[];
};
