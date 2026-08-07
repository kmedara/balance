import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly route = inject(ActivatedRoute);

  readonly errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    const error = this.route.snapshot.queryParamMap.get('error');
    if (error) {
      this.errorMessage.set(error);
    }
  }

  login = () => this.auth.login();
}
