import type {
  LinkTokenResponse,
  PlaidError,
  PlaidExchangeTokenResponse,
  PlaidSyncResponse,
  PlaidTransaction,
} from '@balance/schemas/client';
import { inject, Injectable, signal } from '@angular/core';
import { GATEWAY_HTTP_TOKEN } from '@core/gateway.http';
import { billingStore } from '@modules/billing/billing.store';
import { environment } from 'src/environments/environment';

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
  private billing = inject(billingStore);
  readonly error = signal<PlaidError | null>(null);
  readonly linkedItems = signal<string[]>([]);
  readonly transactions = signal<PlaidTransaction[]>([]);
  readonly isFetchingTransactions = signal(false);
  private handler?: PlaidLinkHandler;

  private async assertPaidAccess(): Promise<boolean> {
    if (environment.authDisabled) {
      return true;
    }

    try {
      await this.billing.ensureLoaded();
      if (this.billing.isPaid()) {
        return true;
      }
      this.error.set({
        error_type: 'INVALID_REQUEST',
        error_code: 'ENTITLEMENT_REQUIRED',
        error_message: 'A paid subscription is required to link banks with Plaid',
      });
      return false;
    } catch {
      this.error.set({
        error_type: 'API_ERROR',
        error_code: 'ENTITLEMENT_CHECK_FAILED',
        error_message: 'Unable to verify subscription for Plaid access',
      });
      return false;
    }
  }

  init = async () => {
    if (!(await this.assertPaidAccess())) {
      return;
    }

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

  fetchTransactions = async (itemId?: string) => {
    if (!(await this.assertPaidAccess())) {
      return;
    }

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
