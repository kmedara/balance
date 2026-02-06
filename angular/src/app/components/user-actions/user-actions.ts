import { Component, inject, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { Drawer } from 'primeng/drawer';
import { Menu } from 'primeng/menu';
import { ModalService } from '@services/modal.service';
import { BudgetModal } from '@modals/budget-modal/budget-modal';
import { PlaidService } from '@services/plaid.service';

@Component({
  selector: 'app-user-actions',
  imports: [Button, Drawer, Menu],
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
    this._service.open(BudgetModal, { header: 'header' });
  };

  items = [
    {
      icon: 'pi pi-building-columns',
      label: 'Connect a bank account',
      action: this._plaidService.init,
    },
  ];
}
