import { Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [Button],
  template: `
    <div class="min-h-screen flex items-center justify-center p-6">
      <div class="flex flex-col items-center gap-4">
        <h1 class="text-2xl font-semibold">Balance</h1>
        <p class="text-sm text-muted-color">Sign in to manage your budget calendar.</p>        <p-button label="Sign in with Cognito" icon="pi pi-sign-in" (onClick)="login()" />
      </div>
    </div>
  `,
})
export class Login {
  private readonly auth = inject(AuthService);

  login = () => this.auth.login();
}
