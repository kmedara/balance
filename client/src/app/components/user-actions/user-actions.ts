import { Component, inject, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { ModalService } from '@modules/modal/modal.service';
import { BudgetModal } from '@modules/budget/add-budget/add-budget';
import { PlaidService } from 'src/app/modules/plaid/plaid.service';
import { AuthService } from '@core/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-actions',
  imports: [Button, Menu],
  templateUrl: './user-actions.html',
  styleUrl: './user-actions.scss',
})
export class UserActions {
  private _service = inject(ModalService);
  private _plaidService = inject(PlaidService);
  private _authService = inject(AuthService);
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

  fetchTransactions = () => {
    this._plaidService.fetchTransactions();
  };

  logout = () => {
    this._authService.logout();
  };

  items = [
    {
      icon: 'pi pi-building-columns',
      label: 'Connect a bank account',
      action: this._plaidService.init,
    },
    {
      icon: 'pi pi-sync',
      label: 'Fetch Plaid transactions',
      action: this.fetchTransactions,
    },
    {
      icon: 'pi pi-plus',
      label: 'Add a budget',
      action: this.add,
    },
    ...(environment.authDisabled
      ? []
      : [
          {
            icon: 'pi pi-sign-out',
            label: 'Sign out',
            action: this.logout,
          },
        ]),
  ];
}
