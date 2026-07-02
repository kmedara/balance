import {
  HttpBackend,
  HttpClient,
  HttpHandlerFn,
  HttpInterceptorFn,
} from '@angular/common/http';
import { Provider } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InjectionToken } from '@angular/core';

export const GATEWAY_HTTP_TOKEN = new InjectionToken<HttpClient>('GATEWAY_HTTP_TOKEN');

const gatewayBaseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const url = `${environment.GATEWAY}${req.url}`;
  return next(req.clone({ url }));
};

const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  if (environment.authDisabled) {
    return next(req);
  }

  return next(req.clone({ withCredentials: true }));
};

const buildHandler = (
  backend: HttpBackend,
  interceptors: HttpInterceptorFn[],
): HttpHandlerFn => {
  return interceptors.reduceRight<HttpHandlerFn>(
    (next, interceptor) => (req) => interceptor(req, next),
    (req) => backend.handle(req),
  );
};

export const provideGatewayHttpClient = (): Provider => ({
  provide: GATEWAY_HTTP_TOKEN,
  useFactory: (backend: HttpBackend) =>
    new HttpClient({
      handle: buildHandler(backend, [credentialsInterceptor, gatewayBaseUrlInterceptor]),
    }),
  deps: [HttpBackend],
});
