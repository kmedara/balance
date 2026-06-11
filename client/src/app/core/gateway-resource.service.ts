import { inject, Injectable, resource } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { GATEWAY_HTTP_TOKEN } from './gateway.http';
@Injectable({ providedIn: 'root' })
export class GatewayResourceService {
  createGatewayResource<T>(params: () => string | undefined) {
    const gateway = inject(GATEWAY_HTTP_TOKEN);
    return resource<T | undefined, string | undefined>({
      params,
      loader: ({ params: url }) =>
        url === undefined ? Promise.resolve(undefined) : firstValueFrom(gateway.get<T>(url)),
    });
  }
}
