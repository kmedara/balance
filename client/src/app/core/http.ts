import {
  HttpBackend,
  HttpClient,
  HttpHandlerFn,
  HttpInterceptorFn,
} from '@angular/common/http';
import { Provider } from '@angular/core';
import { GATEWAY_HTTP_TOKEN } from './tokens/http.token';
import { environment } from 'src/environments/environment';


const gatewayBaseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const url = `${environment.GATEWAY}${req.url}`;

  return next(req.clone({ url }));
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
    new HttpClient({ handle: buildHandler(backend, [gatewayBaseUrlInterceptor]) }),
  deps: [HttpBackend],
});
