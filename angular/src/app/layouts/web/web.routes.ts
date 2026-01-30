import { Routes } from '@angular/router';
import { navigationResolver } from '../../resolvers/navigation-resolver';

const outlets: Routes = [];

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () => import('./default/default').then((mod) => mod.Default),
    data: { name: 'Layout' },
    resolve: { routes: navigationResolver },
    children: [
      ...outlets,
      {
        path: 'dashboard',

        loadComponent: () => import('../../dashboard/dashboard').then((mod) => mod.Dashboard),
        data: {
          name: 'Dashboard',
        },
      },
      {
        path: 'expenses',
        loadComponent: () => import('../../expenses/expenses').then((mod) => mod.Expenses),
        data: {
          name: 'Expenses',
        },
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
