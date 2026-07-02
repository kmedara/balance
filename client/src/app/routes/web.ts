import { Routes } from '@angular/router';
import { authGuard } from '@core/auth/auth.guard';
import { navigationMenuResolver } from '@resolvers/navigation-menu-resolver';

const outlets = [
  {
    path: '',
    outlet: 'actions',
    loadComponent: () =>
      import('../core/layouts/outlets/user-actions/user-actions').then((mod) => mod.UserActions),
  },
];

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('../core/auth/login').then((mod) => mod.Login),
  },
  {
    path: '',
    redirectTo: 'calendar',
    pathMatch: 'full',
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('../core/layouts/web/default/default').then((mod) => mod.Default),
    data: { name: 'Layout' },
    resolve: { routes: navigationMenuResolver },
    children: [
      { 
        path: 'calendar',
        loadComponent: () => import('../modules/calendar/calendar').then((mod) => mod.Calendar),
        data: {
          name: 'Calendar',
        },
        children: [...outlets],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'calendar',
  },
];
