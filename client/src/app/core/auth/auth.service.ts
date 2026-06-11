import { inject, Injectable, signal } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly oauth = inject(OAuthService);
  private readonly ready = signal(false);

  readonly isAuthenticated = signal(false);
  readonly userId = signal<string | undefined>(undefined);
  readonly email = signal<string | undefined>(undefined);

  async init(): Promise<void> {
    if (environment.authDisabled) {
      this.isAuthenticated.set(true);
      this.userId.set('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa');
      this.ready.set(true);
      return;
    }

    this.oauth.configure(this.buildAuthConfig());    this.oauth.setupAutomaticSilentRefresh();

    await this.oauth.loadDiscoveryDocumentAndTryLogin();

    this.syncSession();
    this.oauth.events.subscribe(() => this.syncSession());
    this.ready.set(true);
  }

  login(): void {
    if (environment.authDisabled) {
      return;
    }

    this.oauth.initCodeFlow();
  }

  logout(): void {
    if (environment.authDisabled) {
      return;
    }

    this.oauth.logOut();
    this.syncSession();
  }

  getIdToken(): string | null {
    if (environment.authDisabled) {
      return null;
    }

    return this.oauth.getIdToken() || null;
  }

  getAccessToken(): string | null {
    if (environment.authDisabled) {
      return null;
    }

    return this.oauth.getAccessToken() || null;
  }

  getBearerToken(): string | null {
    return this.getIdToken() ?? this.getAccessToken();
  }

  isReady(): boolean {
    return this.ready();
  }

  private buildAuthConfig(): AuthConfig {
    return {
      issuer: environment.cognito.authority,
      clientId: environment.cognito.clientId,
      redirectUri: environment.cognito.redirectUri,
      postLogoutRedirectUri: environment.cognito.postLogoutRedirectUri,
      responseType: environment.cognito.responseType,
      scope: environment.cognito.scope,
      showDebugInformation: environment.cognito.showDebugInformation,
      strictDiscoveryDocumentValidation: false,
      requireHttps: false,
    };
  }

  private syncSession(): void {
    const authenticated = this.oauth.hasValidAccessToken();
    this.isAuthenticated.set(environment.authDisabled || authenticated);

    const claims = this.oauth.getIdentityClaims() as Record<string, unknown> | null;
    this.userId.set(typeof claims?.['sub'] === 'string' ? claims['sub'] : undefined);
    this.email.set(typeof claims?.['email'] === 'string' ? claims['email'] : undefined);
  }
}
