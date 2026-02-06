import { Routes } from '@angular/router';
import { navigationMenuResolver } from '@resolvers/navigation-menu-resolver';
const outlets = [
  {
    path: '',
    outlet: 'actions',
    loadComponent: () =>
      import('../components/user-actions/user-actions').then((mod) => mod.UserActions),
  },
];

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'calendar',
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () => import('../core/layouts/web/default/default').then((mod) => mod.Default),
    data: { name: 'Layout' },
    resolve: { routes: navigationMenuResolver },
    children: [
      ...outlets,
      {
        path: 'calendar',

        loadComponent: () => import('../components/calendar/calendar').then((mod) => mod.Calendar),
        data: {
          name: 'Calendar',
        },
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
