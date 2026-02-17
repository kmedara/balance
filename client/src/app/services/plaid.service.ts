import { PlaidError } from '@__types/plaid';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class PlaidService {
  private http = inject(HttpClient);
  readonly error = signal<PlaidError | null>(null);
  readonly linkedItems = signal<string[]>([]);
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
}
