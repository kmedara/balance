import type { PlaidError } from '@core/domain';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';

export type PlaidTransaction = {
  transaction_id: string;
  account_id: string;
  amount: number;
  date: string;
  name: string;
  merchant_name?: string | null;
  pending: boolean;
};

export type PlaidTransactionsSyncResponse = {
  items: {
    item_id: string;
    added: PlaidTransaction[];
    modified: PlaidTransaction[];
    removed: { transaction_id: string }[];
  }[];
};

@Injectable({
  providedIn: 'root',
})
export class PlaidService {
  private http = inject(HttpClient);
  readonly error = signal<PlaidError | null>(null);
  readonly linkedItems = signal<string[]>([]);
  readonly transactions = signal<PlaidTransaction[]>([]);
  readonly isFetchingTransactions = signal(false);
  private handler?: any;

  init = async () => {
    if (typeof window === 'undefined' || !(window as any).Plaid) {
      throw new Error('Plaid Link script not loaded');
    }
    this.http.post<any>(`${environment.GATEWAY}/plaid/link-token`, {}).subscribe((res) => {
      this.handler = (window as any).Plaid.create({
        token: res.link_token,
        appearance: {
          theme: 'default',
          variables: {
            colorPrimary: 'red',
          },
        },
        onSuccess: (public_token: string) => {
          this.http
            .post<{ item_id: string }>(`${environment.GATEWAY}/plaid/exchange-token`, {
              public_token: public_token,
            })
            .subscribe({
              next: ({ item_id }) => {
                this.linkedItems.update((items) => [...items, item_id]);
              },
              error: (err) => {
                this.error.set(err.error as PlaidError);
              },
            });
        },
      });
      this.handler.open();
    });
  };

  fetchTransactions = (itemId?: string) => {
    this.isFetchingTransactions.set(true);
    this.error.set(null);

    this.http
      .post<PlaidTransactionsSyncResponse>(`${environment.GATEWAY}/plaid/transactions/sync`, {
        item_id: itemId,
      })
      .subscribe({
        next: ({ items }) => {
          const synced = items.flatMap(({ added, modified }) => [...added, ...modified]);
          this.transactions.set(synced);
          this.isFetchingTransactions.set(false);
        },
        error: (err) => {
          this.error.set(err.error as PlaidError);
          this.isFetchingTransactions.set(false);
        },
      });
  };
}
