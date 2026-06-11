import {
  AfterViewInit,
  Component,
  createEnvironmentInjector,
  effect,
  EnvironmentInjector,
  inject,
  signal,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import {
  MODAL_CONFIG,
  MODAL_CONTEXT,
  MODAL_DATA,
  MODAL_ID,
} from '@modals/modal.token';
import { Dispatcher } from '@ngrx/signals/events';
import { CreateEventFormPayload, ModalContext, ModalData } from '@modals/modal.context';
import { ModalEvents, ModalStore } from '@modals/modal.store';

@Component({
  selector: 'app-modal-shell',
  imports: [Dialog, NgComponentOutlet],
  templateUrl: './modal-shell.html',
  styleUrl: './modal-shell.scss',
  standalone: true,
})
export class ModalShell {
  private readonly modalStore = inject(ModalStore);
  private readonly dispatcher = inject(Dispatcher);

  visible = signal(true);
  private readonly pendingSubmit = signal(false);
  private suppressCloseEvent = false;

  @ViewChild('content', { read: ViewContainerRef })
  private contentVcr!: ViewContainerRef;

  readonly config = inject(MODAL_CONFIG);
  private readonly modalId = inject(MODAL_ID);
  private readonly data = inject<ModalData>(MODAL_DATA);
  private readonly rootEnvInjector = inject(EnvironmentInjector);

  get headerText(): string | null {
    return typeof this.config.header === 'string' ? this.config.header : null;
  }

  get headerComponent(): Type<unknown> | null {
    return typeof this.config.header === 'function' ? this.config.header : null;
  }

  isHeaderString() {
    return this.headerText !== null;
  }

  isHeaderComponent() {
    return this.headerComponent !== null;
  }

  constructor() {
    effect(() => {
      const latest = this.modalStore.events().at(-1);
      if (!latest || latest.payload.resourceId !== this.modalId) return;

      if (latest.type === ModalEvents.submitted.type) {
        this.pendingSubmit.set(true);
        return;
      }

      if (latest.type === ModalEvents.submitFailed.type) {
        this.pendingSubmit.set(false);
        return;
      }

      if (latest.type === ModalEvents.submitSucceeded.type) {
        this.pendingSubmit.set(false);
        this.hide(true);
      }
    });
  }

  ngAfterViewInit() {
    if (!this.contentVcr) return;

    const context: ModalContext = {
      submit: (formPayload: CreateEventFormPayload) => {
        this.dispatcher.dispatch(
          ModalEvents.submitted({
            resourceId: this.modalId,
            payload: { ...formPayload, ...this.data },
            occurredAt: new Date(),
          }),
        );
      },
      cancel: () => {
        this.pendingSubmit.set(false);
        this.dispatcher.dispatch(
          ModalEvents.canceled({ resourceId: this.modalId, occurredAt: new Date() }),
        );
        this.hide(true);
      },
    };

    const contentEnvInjector = createEnvironmentInjector(
      [
        { provide: MODAL_CONTEXT, useValue: context },
        { provide: MODAL_DATA, useValue: this.data },
        { provide: MODAL_ID, useValue: this.modalId },
      ],
      this.rootEnvInjector,
    );

    this.contentVcr.clear();
    this.contentVcr.createComponent(this.config.content, {
      environmentInjector: contentEnvInjector,
    });
  }

  onVisibleChange(visible: boolean): void {
    if (visible) {
      this.visible.set(true);
      return;
    }

    if (this.pendingSubmit()) {
      this.visible.set(true);
      return;
    }

    if (!this.suppressCloseEvent) {
      this.dispatcher.dispatch(
        ModalEvents.closed({ resourceId: this.modalId, occurredAt: new Date() }),
      );
    }

    this.suppressCloseEvent = false;
    queueMicrotask(() => this.visible.set(false));
  }

  private hide(suppressCloseEvent: boolean): void {
    if (suppressCloseEvent) {
      this.suppressCloseEvent = true;
    }
    queueMicrotask(() => this.visible.set(false));
  }
}
