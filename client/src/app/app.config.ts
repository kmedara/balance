import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { appRoutes } from '@routes/app';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { DefaultPreset } from '@core/theme.default';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideGatewayHttpClient } from '@core/http';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(appRoutes()),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    //provideHttpClient(withInterceptors([])),
    provideGatewayHttpClient(),
    providePrimeNG({
      theme: {
        preset: DefaultPreset,
      },
      ripple: true,
    }),
  ],
  //imports: [DynamicD]
};
