import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalService } from './modals/modal.service';
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
      const events = this.modalService.results();
      console.log(events[events.length-1])
    });
  }
}
