import { Component, inject, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { ModalService } from '@modules/modal/modal.service';
import { BudgetModal } from '@modules/budget/add-budget/add-budget';
import { PlaidService } from 'src/app/modules/plaid/plaid.service';

@Component({
  selector: 'app-user-actions',
  imports: [Button, Menu],
  templateUrl: './user-actions.html',
  styleUrl: './user-actions.scss',
})
export class UserActions {
  private _service = inject(ModalService);
  private _plaidService = inject(PlaidService);
  visible = signal(false);

  // ngOnInit() {
  //   // Load Plaid script dynamically
  //   const script = document.createElement('script');
  //   script.src = 'https://cdn.plaid.com/link/v2/stable/link-initialize.js';
  //   document.body.appendChild(script);
  // }

  actions = [];
  add = () => {
    this._service.open({content: BudgetModal, header: 'header'}, { a: 'b' });
  };

  items = [
    {
      icon: 'pi pi-building-columns',
      label: 'Connect a bank account',
      action: this._plaidService.init,
    },
    {
      icon: 'pi pi-plus',
      label: 'Add a budget',
      action: this.add,
    },
  ];
}
