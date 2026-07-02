import type {

  MongoTimestamps,

  PlaidAccount,

  PlaidItem,

  SyncState,

} from '@balance/domain';

import type { EventWithId } from '../data/types.js';
import type { PlaidTransactionEventFields } from './event-document.js';




export type PlaidItemDocument = Omit<PlaidItem, 'resourceId'> & MongoTimestamps;

export type PlaidSyncStateDocument = SyncState & MongoTimestamps;

export type PlaidAccountDocument = Omit<PlaidAccount, 'resourceId'> & MongoTimestamps;


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


export type PlaidTransactionEventWithId = EventWithId<PlaidTransactionEventFields>;
