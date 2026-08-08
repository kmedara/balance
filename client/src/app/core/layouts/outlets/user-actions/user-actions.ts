import { BUDGET_EVENT_TYPE } from '@balance/schemas/client';
import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ModalService } from '@modules/modal/modal.service';
import { billingStore } from '@modules/billing/billing.store';
import { PlaidService } from 'src/app/modules/plaid/plaid.service';
import { AuthService } from '@core/auth/auth.service';
import { environment } from 'src/environments/environment';
import { AddEventModal } from '@modals/add-event-modal/add-event-modal';

type ActionItem = {
  icon: string;
  label: string;
  action: () => void;
  paidOnly?: boolean;
};

@Component({
  selector: 'app-user-actions',
  imports: [MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './user-actions.html',
  styleUrl: './user-actions.scss',
})
export class UserActions {
  private _service = inject(ModalService);
  private _plaidService = inject(PlaidService);
  private _billing = inject(billingStore);
  private _authService = inject(AuthService);

  addBudget = () => {
    this._service.open(
      { content: AddEventModal, header: 'Add budget' },
      { action: 'createEvent', eventType: BUDGET_EVENT_TYPE },
    );
  };

  fetchTransactions = () => {
    void this._plaidService.fetchTransactions();
  };

  logout = () => {
    this._authService.logout();
  };

  private readonly allItems: ActionItem[] = [
    {
      icon: 'account_balance',
      label: 'Connect a bank account',
      action: () => void this._plaidService.init(),
      paidOnly: true,
    },
    {
      icon: 'sync',
      label: 'Fetch Plaid transactions',
      action: this.fetchTransactions,
      paidOnly: true,
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

  readonly items = computed(() =>
    this.allItems.filter(
      (item) => !item.paidOnly || environment.authDisabled || this._billing.isPaid(),
    ),
  );
}
