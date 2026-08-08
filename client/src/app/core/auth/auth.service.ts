import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import type { AuthUser } from '@balance/schemas/client';
import { GATEWAY_HTTP_TOKEN } from '@core/gateway.http';
import { billingStore } from '@modules/billing/billing.store';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(GATEWAY_HTTP_TOKEN);
  private readonly billing = inject(billingStore);
  private readonly ready = signal(false);

  readonly isAuthenticated = signal(false);
  readonly userId = signal<string | undefined>(undefined);
  readonly email = signal<string | undefined>(undefined);

  async init(): Promise<void> {
    if (environment.authDisabled) {
      this.isAuthenticated.set(true);
      this.userId.set('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa');
      this.email.set('dev@localhost');
      this.ready.set(true);
      return;
    }

    try {
      const user = await firstValueFrom(this.http.get<AuthUser>('/auth/me'));
      this.applyUser(user);
    } catch {
      this.clearUser();
    }

    this.ready.set(true);
  }

  login(): void {
    if (environment.authDisabled) {
      return;
    }

    const returnTo = encodeURIComponent(`${window.location.origin}/calendar`);
    window.location.href = `${environment.GATEWAY}/auth/login?returnTo=${returnTo}`;
  }

  logout(): void {
    this.billing.clearCachedSubscription();

    if (environment.authDisabled) {
      this.clearUser();
      return;
    }

    const returnTo = encodeURIComponent(`${window.location.origin}/login`);
    window.location.href = `${environment.GATEWAY}/auth/logout?returnTo=${returnTo}`;
  }

  isReady(): boolean {
    return this.ready();
  }

  private applyUser(user: AuthUser): void {
    if (!user.userId) {
      this.clearUser();
      return;
    }

    this.isAuthenticated.set(true);
    this.userId.set(user.userId);
    this.email.set(user.email);
  }

  private clearUser(): void {
    this.isAuthenticated.set(false);
    this.userId.set(undefined);
    this.email.set(undefined);
  }
}
