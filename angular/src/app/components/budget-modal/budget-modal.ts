import { Component, effect, input, output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Budget, BudgetCategory, BudgetForm, BudgetFrequency } from '../../types/types';

@Component({
  selector: 'app-budget-modal',
  imports: [],
  templateUrl: './budget-modal.html',
  styleUrl: './budget-modal.scss',
  standalone: true,
})
export class BudgetModal {
  visible = input(false);
  visibleChange = output<boolean>();
  save = output<boolean>();

  constructor(private fb: FormBuilder) {
    /**
     * Reset form when dialog opens
     */
    effect(() => {
      if (this.visible()) {
        this.form.reset({
          title: '',
          startDate: null,
          category: 'Expense',
          frequency: 'Monthly',
        });
      }
    });
  }

  close(): void {
    this.visible = '';
    this.visibleChange.emit(false);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.save.emit(this.form.value as Budget);
    this.close();
  }
}
