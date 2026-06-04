import {
  ApplicationRef,
  EnvironmentInjector,
  Injectable,
  Type,
  createComponent,
  createEnvironmentInjector,
  inject,
  signal,
} from '@angular/core';
import { MODAL_CONFIG, MODAL_DATA, MODAL_ID } from './modal.token';
import { ModalConfig } from './modal.context';
import { ModalEvents } from './modal.events';
import { Dispatcher, injectDispatch } from '@ngrx/signals/events';
/**
 * Tracks all modals, owns signals for “results” or lifecycle, knows nothing about DOM or components.
 */
@Injectable({ providedIn: 'root' })
export class ModalService {
  private readonly dispatch = injectDispatch(ModalEvents);
  private readonly rootEnvInjector = inject(EnvironmentInjector);
  private readonly appRef = inject(ApplicationRef);

  async open<T = unknown>(
    config: ModalConfig,
    data: unknown = null,
  ): Promise<string> {
    const id = crypto.randomUUID();

    const shellInjector = createEnvironmentInjector(
      [
        { provide: MODAL_ID, useValue: id },
        { provide: MODAL_CONFIG, useValue: config  },
        { provide: MODAL_DATA, useValue: data ?? null },
      ],
      this.rootEnvInjector,
    );
    const { ModalShell } = await this.loadShell();
    const shellRef = createComponent(ModalShell, {
      environmentInjector: shellInjector,
    });

    this.appRef.attachView(shellRef.hostView);
    document.body.appendChild(shellRef.location.nativeElement);
    this.dispatch.opened({ resourceId: id, occurredAt: new Date() });

    return id;
  }

  protected loadShell = () => import('./modal-shell/modal-shell');
}
