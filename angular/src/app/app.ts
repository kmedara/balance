import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalService } from './services/modal/modal.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('balance');
  private readonly modalService = inject(ModalService);

  constructor() {
    effect(() => {
      for (const event of this.modalService.events()) {
        console.log('Modal event:', event);
      }
    });
  }
}
