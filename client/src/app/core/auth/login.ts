import { Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [Button],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly auth = inject(AuthService);

  login = () => this.auth.login();
}
