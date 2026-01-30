import { Component, computed, inject, OnInit, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  ActivatedRoute,
  ActivationStart,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { NavigationItem } from '../../../resolvers/navigation-resolver';

@Component({
  selector: 'app-default',
  standalone: true,

  imports: [ToolbarModule, ButtonModule, CardModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './default.html',
  styleUrl: './default.scss',
})
export class Default {
  private route = inject(ActivatedRoute);
  private data = toSignal(this.route.data);
  navigation = computed(() => this.data()!['routes'] as NavigationItem[]);

  onActivate(event: any) {
    console.log('Activated component:', event);
  }
}
