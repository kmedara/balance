import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-auth-callback',
  template: `<p class="p-6">Completing sign in…</p>`,
})
export class AuthCallback implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  async ngOnInit(): Promise<void> {
    if (environment.authDisabled) {
      await this.router.navigateByUrl('/calendar');
      return;
    }

    if (!this.auth.isAuthenticated()) {
      await this.router.navigateByUrl('/login');
      return;
    }

    await this.router.navigateByUrl('/calendar');
  }
}
