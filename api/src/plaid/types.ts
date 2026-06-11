import type {

  MongoTimestamps,

  PlaidAccount,

  PlaidItem,

  SyncState,

} from '@kmedara/balance-domain';

import type { PlaidTransactionEventDocument } from './event-document.js';




export type PlaidItemDocument = PlaidItem & MongoTimestamps;

export type PlaidSyncStateDocument = SyncState & MongoTimestamps;

export type PlaidAccountDocument = PlaidAccount & MongoTimestamps;


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


