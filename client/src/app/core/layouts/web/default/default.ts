import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { NavigationItem } from '../../../resolvers/navigation-menu-resolver';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './default.html',
  styleUrl: './default.scss',
})
export class Default {
  private route = inject(ActivatedRoute);
  private data = toSignal(this.route.data);

  navigationInfo = computed(() => this.data()!['routes'] as NavigationItem[]);

  onActivate(_event: unknown) {}
}
