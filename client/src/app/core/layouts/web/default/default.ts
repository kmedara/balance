import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { NavigationItem } from '../../../resolvers/navigation-menu-resolver';

@Component({
  selector: 'app-default',
  standalone: true,

  imports: [ToolbarModule, ButtonModule, CardModule, RouterOutlet],
  templateUrl: './default.html',
  styleUrl: './default.scss',
})
export class Default {
  private route = inject(ActivatedRoute);
  private data = toSignal(this.route.data);

  navigationInfo = computed(() => this.data()!['routes'] as NavigationItem[]);

  onActivate(_event: unknown) {}
}
