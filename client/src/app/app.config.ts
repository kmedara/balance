import {

  APP_INITIALIZER,

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

import { provideGatewayHttpClient } from '@core/gateway.http';

import { AuthService } from '@core/auth/auth.service';



export const appConfig: ApplicationConfig = {

  providers: [

    provideBrowserGlobalErrorListeners(),

    provideZonelessChangeDetection(),

    provideRouter(appRoutes()),

    provideClientHydration(withEventReplay()),

    provideAnimationsAsync(),

    provideGatewayHttpClient(),

    {

      provide: APP_INITIALIZER,

      multi: true,

      deps: [AuthService],

      useFactory: (auth: AuthService) => () => auth.init(),

    },

    providePrimeNG({

      theme: {

        preset: DefaultPreset,

      },

      ripple: true,

    }),

  ],

};

