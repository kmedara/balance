// modal-ref.ts
import { signal, Signal } from '@angular/core';
type x = typeof crypto.randomUUID;
export class ModalRef<R = unknown> {
  readonly id = crypto.randomUUID();
  private readonly _closed = signal(false);
  private readonly _result = signal<R | undefined>(undefined);

  /** True once the modal has been closed */
  readonly closed: Signal<boolean> = this._closed.asReadonly();

  /** Close result (undefined until closed) */
  readonly result: Signal<R | undefined> = this._result.asReadonly();

  /** Close the modal exactly once */
  close(result?: R): void {
    if (this._closed()) return;

    this._result.set(result);
    this._closed.set(true);
  }
}
