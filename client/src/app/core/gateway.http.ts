import {
  HttpBackend,
  HttpClient,
  HttpHandlerFn,
  HttpInterceptorFn,
} from '@angular/common/http';
import { Provider } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';
import { environment } from 'src/environments/environment';
import { InjectionToken } from "@angular/core";

export const GATEWAY_HTTP_TOKEN = new InjectionToken<HttpClient>('GATEWAY_HTTP_TOKEN');
const gatewayBaseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const url = `${environment.GATEWAY}${req.url}`;
  return next(req.clone({ url }));
};

const createAuthInterceptor = (auth: AuthService): HttpInterceptorFn => (req, next) => {
  if (environment.authDisabled) {
    return next(req);
  }

  if (!auth.isReady()) {
    console.warn('API request before auth init completed');
  }

  const token = auth.getBearerToken();
  if (!token) {
    console.warn(
      'API request without auth token — sign in via /login or set AUTH_DISABLED=true on client and API',
    );
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    }),
  );
};

const buildHandler = (
  backend: HttpBackend,
  interceptors: HttpInterceptorFn[],
): HttpHandlerFn => {
  return interceptors.reduceRight<HttpHandlerFn>(
    (next, interceptor) => (req) => interceptor(req, next),
    (req) => backend.handle(req),
  );
}

export const provideGatewayHttpClient = (): Provider => ({
  provide: GATEWAY_HTTP_TOKEN,
  useFactory: (backend: HttpBackend, auth: AuthService) =>
    new HttpClient({
      handle: buildHandler(backend, [createAuthInterceptor(auth), gatewayBaseUrlInterceptor]),
    }),
  deps: [HttpBackend, AuthService],
});
