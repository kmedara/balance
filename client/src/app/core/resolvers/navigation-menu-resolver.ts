import { ResolveFn, Routes } from '@angular/router';
import { of } from 'rxjs';
import { appRoutes } from '@routes/app';
export type NavigationItem = {
  name: string;
  route: string;
};

//get routes for navigation
export const navigationMenuResolver: ResolveFn<NavigationItem[]> = (route, state) => {
  //@ts-ignore

  //return navigationBuilder(appRoutes()).getLayoutChildrenWithDataNames();
  const items: NavigationItem[] = appRoutes()
    .find((el) => el.data && el.data['name'] === 'Layout')!
    .children!.filter((el) => el.data && el.data['name'])
    .map((r) => ({
      name: r.data ? r.data['name'] : 'name',
      route: r.path ? r.path : '',
    }));

  return of(items ?? []);
};

// function navigationBuilder(routes: Routes) {
//   this.routes = routes;
// }

// navigationBuilder.prototype.getLayoutChildrenWithDataNames = function () {
//   //@ts-ignore
//   this.routes
//     //@ts-ignore

//     .find((el) => el.data && el.data['name'] === 'Layout')!
//     //@ts-ignore

//     .children!.filter((el) => el.data && el.data['name']);
//   return this;
// };

// navigationBuilder.prototype.filterPaidRouting = (routes: Routes) => {
//   routes = routes.filter((r) => r.data);
//   return this;
// };

// navigationBuilder.prototype.getRoutes = function () {
//   this.routes;
// };
