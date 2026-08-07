import { BUDGET_EVENT_TYPE } from '@core/domain';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ModalService } from '@modules/modal/modal.service';
import { PlaidService } from 'src/app/modules/plaid/plaid.service';
import { AuthService } from '@core/auth/auth.service';
import { environment } from 'src/environments/environment';
import { AddEventModal } from '@modals/add-event-modal/add-event-modal';

@Component({
  selector: 'app-user-actions',
  imports: [MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './user-actions.html',
  styleUrl: './user-actions.scss',
})
export class UserActions {
  private _service = inject(ModalService);
  private _plaidService = inject(PlaidService);
  private _authService = inject(AuthService);
  visible = signal(false);

  addBudget = () => {
    this._service.open(
      { content: AddEventModal, header: 'Add budget' },
      { action: 'createEvent', eventType: BUDGET_EVENT_TYPE },
    );
  };

  fetchTransactions = () => {
    this._plaidService.fetchTransactions();
  };

  logout = () => {
    this._authService.logout();
  };

  items = [
    {
      icon: 'account_balance',
      label: 'Connect a bank account',
      action: this._plaidService.init,
    },
    {
      icon: 'sync',
      label: 'Fetch Plaid transactions',
      action: this.fetchTransactions,
    },
    {
      icon: 'add',
      label: 'Add a budget',
      action: this.addBudget,
    },
    ...(environment.authDisabled
      ? []
      : [
          {
            icon: 'logout',
            label: 'Sign out',
            action: this.logout,
          },
        ]),
  ];
}
