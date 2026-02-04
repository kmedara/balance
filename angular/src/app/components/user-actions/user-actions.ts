import { Component, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { Drawer } from 'primeng/drawer';

import { ModalService } from 'src/app/modals/modal.service';
import { BudgetModal } from 'src/app/modals/budget-modal/budget-modal';

@Component({
  selector: 'app-user-actions',
  imports: [Button, Drawer],
  templateUrl: './user-actions.html',
  styleUrl: './user-actions.scss',
})
export class UserActions {
  private _service = inject(ModalService);

  add = () => {
    this._service.open(BudgetModal, { header: 'header' });
  };
}
