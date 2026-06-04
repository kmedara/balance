import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalService } from '@modules/modal/modal.service';
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
  
  }
}
