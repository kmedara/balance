import { Routes } from '@angular/router';
import { routes as WebRoutes } from './web';
/**
 * Routes are preloaded based on user permissions
 * @param user
 * @returns
 */
const appRoutes = (): Routes => {
  return false ? [] : WebRoutes;
};

export { appRoutes };
