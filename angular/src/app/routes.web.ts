import { Routes } from '@angular/router';
import { navigationMenuResolver } from './resolvers/navigation-menu-resolver';
import { Component } from '@angular/core';
import { UserActions } from './components/user-actions/user-actions';

const outlets: Routes = [
  {
    path: '',
    outlet: 'actions',
    component: UserActions,
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
    loadComponent: () => import('./layouts/web/default/default').then((mod) => mod.Default),
    data: { name: 'Layout' },
    resolve: { routes: navigationMenuResolver },
    children: [
      ...outlets,
      {
        path: 'calendar',

        loadComponent: () => import('./calendar/calendar').then((mod) => mod.Calendar),
        data: {
          name: 'Calendar',
        },
      }
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
