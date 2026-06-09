import {
  HttpBackend,
  HttpClient,
  HttpHandlerFn,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject, Provider } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';
import { GATEWAY_HTTP_TOKEN } from './tokens/http.token';
import { environment } from 'src/environments/environment';

const gatewayBaseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const url = `${environment.GATEWAY}${req.url}`;
  return next(req.clone({ url }));
};

const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (environment.authDisabled) {
    return next(req);
  }

  const token = inject(AuthService).getIdToken();
  if (!token) {
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

function buildHandler(
  backend: HttpBackend,
  interceptors: HttpInterceptorFn[],
): HttpHandlerFn {
  return interceptors.reduceRight<HttpHandlerFn>(
    (next, interceptor) => (req) => interceptor(req, next),
    (req) => backend.handle(req),
  );
}

export const provideGatewayHttpClient = (): Provider => ({
  provide: GATEWAY_HTTP_TOKEN,
  useFactory: (backend: HttpBackend) =>
    new HttpClient({
      handle: buildHandler(backend, [authInterceptor, gatewayBaseUrlInterceptor]),
    }),
  deps: [HttpBackend],
});
