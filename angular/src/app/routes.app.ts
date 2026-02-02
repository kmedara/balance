import { Routes } from '@angular/router';
import { routes as WebRoutes } from './routes.web';
/**
 * Routes are preloaded based on user permissions
 * @param user
 * @returns
 */
const appRoutes = () => {
  return false ? [] : WebRoutes;
};

export { appRoutes };
