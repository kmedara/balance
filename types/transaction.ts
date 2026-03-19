import type { IResourcable } from "./resourcable";

/**
 * index (userId, postedDate, id)
 * index (accountId, postedDate, id)
 * index(id, unique)
 */
export type Transaction = {
  userId: string;
  accountId: string;
  itemId: string;
  name: string;
  merchantName?: string;
  amount: number;
  currency: string;
  category: string[];
  categoryId?: string;
  pending: boolean;
  authorizedDate?: Date;
  postedDate: Date;
  location?: {
    [key: string]: string;
  };
} & IResourcable;
