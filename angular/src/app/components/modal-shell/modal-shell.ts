import {
  Component,
  effect,
  EnvironmentInjector,
  inject,
  runInInjectionContext,
  signal,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ModalRef } from '../../services/modal/modal.ref';
import { ModalService } from '../../services/modal/modal.service';
import { MODAL_ID } from '../../services/modal/modal.tokens';

@Component({
  selector: 'app-modal-shell',
  imports: [Dialog],
  templateUrl: './modal-shell.html',
  styleUrl: './modal-shell.scss',
})
export class ModalShell {
  @ViewChild('contentHost', { read: ViewContainerRef, static: true })
  private vcr!: ViewContainerRef;

  @ViewChild('headerHost', { read: ViewContainerRef, static: true })
  private headerVcr!: ViewContainerRef;

  visible = true;
  headerText = signal('');

  private readonly modalService = inject(ModalService);
  private readonly modalId = inject(MODAL_ID);
  private readonly envInjector = inject(EnvironmentInjector);

  attachContent<T>(component: Type<T>) {
    runInInjectionContext(this.envInjector, () => {
      this.vcr.createComponent(component, {
        environmentInjector: this.envInjector,
      });
    });
  }

  attachHeader<T>(header: Type<T> | string) {
    console.log(header);
    if (typeof header === 'string') {
      this.headerText.set(header);
      this.headerVcr?.clear();
    } else {
      runInInjectionContext(this.envInjector, () => {
        this.headerVcr.createComponent(header, {
          environmentInjector: this.envInjector,
        });
      });
    }
  }

  close(result?: any) {
    if (!this.visible) return;
    this.visible = false;
    this.modalService.close(this.modalId, result);
  }
}
