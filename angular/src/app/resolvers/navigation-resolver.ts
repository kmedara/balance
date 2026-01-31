import { ResolveFn } from '@angular/router';
import { of } from 'rxjs';
import { routes as siteRoutes } from '../app.routes';

export type NavigationItem = {
  name: string;
  route: string;
};

//get routes for navigation
export const navigationResolver: ResolveFn<NavigationItem[]> = (route, state) => {
  const routes = !isPremium()
    ? siteRoutes
        .find((el) => el.data && el.data['name'] === 'Layout')!
        .children!.filter((el) => el.data && el.data['name'])
        .map((el) => ({
          name: el.data!['name'],
          route: el.path!,
        }))
    : [];
  return of(routes ?? []);
};

export const isPremium = () => {
  return false;
};
