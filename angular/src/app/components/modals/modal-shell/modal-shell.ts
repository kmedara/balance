import {
  AfterViewInit,
  Component,
  computed,
  createEnvironmentInjector,
  effect,
  EnvironmentInjector,
  inject,
  Renderer2,
  runInInjectionContext,
  signal,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ModalService } from '@services/modal.service';
import {
  MODAL_CONFIG,
  MODAL_CONTEXT,
  MODAL_DATA,
  MODAL_ID,
  ModalContext,
} from 'src/app/core/tokens/modal';
import { NgComponentOutlet, NgIf } from '@angular/common';
import { IClosable } from '@__types/closable';

/**
 * Renders the modal (PrimeNG dialog),
 * injects the content component,
 * wires the content to the ModalService via ModalContext.
 * the shell owns the dialog visibility
 */
@Component({
  selector: 'app-modal-shell',
  imports: [Dialog, NgComponentOutlet],
  templateUrl: './modal-shell.html',
  styleUrl: './modal-shell.scss',
  standalone: true,
})
export class ModalShell implements IClosable {
  visible = true;

  @ViewChild('content', { read: ViewContainerRef })
  private contentVcr!: ViewContainerRef;

  readonly config = inject(MODAL_CONFIG);
  private readonly modalId = inject(MODAL_ID);
  private readonly data = inject(MODAL_DATA, { optional: true });
  private readonly modalService = inject(ModalService);
  private readonly rootEnvInjector = inject(EnvironmentInjector);

  // Header getters
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

  constructor() {}
  ngAfterViewInit() {
    if (!this.contentVcr) return; // safety check

    const context: ModalContext = {
      submit: (data) => this.close('ModalSubmitted', data),
      cancel: () => this.close('ModalCanceled'),
    };

    // ModalContext for the content

    //Create an EnvironmentInjector specifically for the content component
    const contentEnvInjector = createEnvironmentInjector(
      [{ provide: MODAL_CONTEXT, useValue: context }],
      this.rootEnvInjector,
    );
    // Create the content component dynamically
    this.contentVcr.clear(); // remove previous if any
    this.contentVcr.createComponent(this.config.content, {
      environmentInjector: contentEnvInjector,
    });
  }

  close<T>(outcome: ModalOutcome, payload?: T) {
    this.visible = false;
    this.modalService.close({ id: this.modalId, outcome: outcome, payload });
  }
  hello(event: any) {
    console.log('hello', event);
  }
}
