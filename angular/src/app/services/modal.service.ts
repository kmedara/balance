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
import { MODAL_CONFIG, MODAL_DATA, MODAL_ID, ModalConfig } from '../core/tokens/modal';
import { ModalEvent } from '@__types/events';

/**
 * Tracks all modals, owns signals for “results” or lifecycle, knows nothing about DOM or components.
 */
@Injectable({ providedIn: 'root' })
export class ModalService {
  private readonly _results = signal<ModalEvent[]>([]);
  readonly results = this._results.asReadonly();
  private readonly rootEnvInjector = inject(EnvironmentInjector);
  private readonly appRef = inject(ApplicationRef);

  async open<T = unknown>(
    content: Type<unknown>,
    config: Partial<ModalConfig> = {},
  ): Promise<string> {
    const id = crypto.randomUUID();

    const shellInjector = createEnvironmentInjector(
      [
        { provide: MODAL_ID, useValue: id },
        { provide: MODAL_CONFIG, useValue: { content, ...config } },
        { provide: MODAL_DATA, useValue: config.data ?? null },
      ],
      this.rootEnvInjector,
    );
    const { ModalShell } = await import('../components/modals/modal-shell/modal-shell').then(
      (m) => m,
    );
    const shellRef = createComponent(ModalShell, {
      environmentInjector: shellInjector,
    });

    this.appRef.attachView(shellRef.hostView);
    document.body.appendChild(shellRef.location.nativeElement);
    this.emit({
      id,
      outcome: 'ModalOpened',
    });
    return id;
  }

  close<T>(event: ModalEvent) {
    this.emit(event);
  }

  emit(event: ModalEvent) {
    if (!event.payload) delete event.payload;
    this._results.update((events) => [...events, event]);
  }
}
