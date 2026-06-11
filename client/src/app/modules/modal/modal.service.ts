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
import { ModalConfig, ModalData } from './modal.context';
import { injectDispatch } from '@ngrx/signals/events';
import { ModalEvents, ModalStore } from './modal.store';

/**
 * Tracks all modals, owns signals for “results” or lifecycle, knows nothing about DOM or components.
 */
@Injectable({ providedIn: 'root' })
export class ModalService {
  /** Eagerly creates the store so event handlers subscribe to the dispatcher. */
  private readonly modalStore = inject(ModalStore);
  private readonly dispatch = injectDispatch(ModalEvents);
  private readonly rootEnvInjector = inject(EnvironmentInjector);
  private readonly appRef = inject(ApplicationRef);

  async open(
    config: ModalConfig,
    data: ModalData,
  ): Promise<string> {
    const id = crypto.randomUUID();

    const shellInjector = createEnvironmentInjector(
      [
        { provide: MODAL_ID, useValue: id },
        { provide: MODAL_CONFIG, useValue: config  },
        { provide: MODAL_DATA, useValue: data },
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
