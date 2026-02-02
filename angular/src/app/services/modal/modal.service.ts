// modal.service.ts
import {
  ApplicationRef,
  EnvironmentInjector,
  Injectable,
  Type,
  createComponent,
  createEnvironmentInjector,
  effect,
  inject,
  PLATFORM_ID,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ModalShell } from '../../components/modal-shell/modal-shell';
import { ModalRef } from './modal.ref';
import { MODAL_DATA, MODAL_ID } from './modal.tokens';

/**
 * Open modals

Close modals

Track all modal refs

Emit modal events

Destroy shells
 */
@Injectable({ providedIn: 'root' })
export class ModalService {
  private readonly platformId = inject(PLATFORM_ID);

  /** Active modal refs (internal only) */
  private readonly modals = new Map<string, ModalRef>();

  /** 🔴 Global modal event signal */
  readonly events = signal<any[]>([]);

  constructor(
    private appRef: ApplicationRef,
    private rootEnvInjector: EnvironmentInjector,
  ) {}

  open<C, H = unknown, D = unknown, R = unknown>(
    contentComponent: Type<C>,
    options?: {
      headerComponent: Type<H> | string;
      data?: D;
    },
  ): string {
    const modalRef = new ModalRef<R>();
    this.modals.set(modalRef.id, modalRef);

    // Emit OPEN event
    this.events.update((events) => [
      ...events,
      { type: 'opened', id: modalRef.id, component: contentComponent },
    ]);

    if (!isPlatformBrowser(this.platformId)) {
      return modalRef.id;
    }

    const modalEnvInjector = createEnvironmentInjector(
      [
        { provide: MODAL_ID, useValue: modalRef.id },
        { provide: MODAL_DATA, useValue: options?.data },
      ],
      this.rootEnvInjector,
    );

    const shellRef = createComponent(ModalShell, {
      environmentInjector: modalEnvInjector,
    });

    this.appRef.attachView(shellRef.hostView);
    document.body.appendChild(shellRef.location.nativeElement);

    shellRef.instance.attachContent(contentComponent);
    if (options?.headerComponent) shellRef.instance.attachHeader(options.headerComponent);

    runInInjectionContext(this.rootEnvInjector, () => {
      //emit a closed event when the modal is closed
      effect(() => {
        if (!modalRef.closed()) return;

        this.events.update((events) => [
          ...events,
          {
            type: 'closed',
            id: modalRef.id,
            result: modalRef.result(),
          },
        ]);
        this.modals.delete(modalRef.id);
        this.appRef.detachView(shellRef.hostView);
        shellRef.destroy();
      });
    });

    return modalRef.id;
  }

  close<R = unknown>(id: string, result: R): void {
    this.modals.get(id)?.close(result);
  }
}
