import { Routes } from '@angular/router';
import { routes as WebRoutes } from './layouts/web/web.routes'

var isMobile = false;
export const routes: Routes = isMobile ? [] : WebRoutes;
