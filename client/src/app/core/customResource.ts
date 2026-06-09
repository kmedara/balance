import { inject, Injectable, resource } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { GATEWAY_HTTP_TOKEN } from './tokens/http.token';

@Injectable({ providedIn: 'root' })
export class DataService {
  createGatewayResource<T>(params: () => string | undefined) {
    const gateway = inject(GATEWAY_HTTP_TOKEN);
    return resource<T | undefined, string | undefined>({
      params,
      loader: ({ params: url }) =>
        url === undefined ? Promise.resolve(undefined) : firstValueFrom(gateway.get<T>(url)),
    });
  }
}
