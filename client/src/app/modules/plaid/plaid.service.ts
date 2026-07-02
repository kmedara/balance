import type {
  LinkTokenResponse,
  PlaidError,
  PlaidExchangeTokenResponse,
  PlaidSyncResponse,
  PlaidTransaction,
} from '@core/domain';
import { inject, Injectable, signal } from '@angular/core';
import { GATEWAY_HTTP_TOKEN } from '@core/gateway.http';

export type { PlaidTransaction };

type PlaidLinkHandler = { open: () => void };

type PlaidLinkOptions = {
  token: string;
  appearance?: Record<string, unknown>;
  onSuccess: (publicToken: string) => void;
};

type PlaidGlobal = { create: (options: PlaidLinkOptions) => PlaidLinkHandler };

const getPlaidGlobal = (): PlaidGlobal | undefined =>
  typeof window === 'undefined'
    ? undefined
    : (window as unknown as { Plaid?: PlaidGlobal }).Plaid;

@Injectable({
  providedIn: 'root',
})
export class PlaidService {
  private http = inject(GATEWAY_HTTP_TOKEN);
  readonly error = signal<PlaidError | null>(null);
  readonly linkedItems = signal<string[]>([]);
  readonly transactions = signal<PlaidTransaction[]>([]);
  readonly isFetchingTransactions = signal(false);
  private handler?: PlaidLinkHandler;

  init = async () => {
    const plaid = getPlaidGlobal();
    if (!plaid) {
      throw new Error('Plaid Link script not loaded');
    }
    this.http.post<LinkTokenResponse>('/plaid/link-token', {}).subscribe((res) => {
      this.handler = plaid.create({
        token: res.link_token,
        appearance: {
          theme: 'default',
          variables: {
            colorPrimary: 'red',
          },
        },
        onSuccess: (public_token: string) => {
          this.http
            .post<PlaidExchangeTokenResponse>('/plaid/exchange-token', {
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
      .post<PlaidSyncResponse>('/plaid/transactions/sync', {
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
