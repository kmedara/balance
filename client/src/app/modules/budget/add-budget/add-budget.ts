import { Component, computed, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { RadioButton } from 'primeng/radiobutton';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { frequencies, Budget, budgetTypes } from '@core/domain';
import {
  MODAL_CONFIG,
  MODAL_CONTEXT,
  MODAL_DATA,
  MODAL_ID,
} from '@modals/modal.token';
import { ModalContext } from '@modals/modal.context';
import { FileUpload } from '@modules/file-upload/file-upload';
import { injectDispatch } from '@ngrx/signals/events';
// import { BudgetStore } from '../../calendar/calendar.store';


type BudgetForm = {
  [Property in keyof Budget as Exclude<Property, 'resourceId'>]: FormControl<Budget[Property]>;
};
@Component({
  selector: 'app-add-budget',
  imports: [Select, DatePicker, ReactiveFormsModule, InputText, Button, FileUpload, AutoComplete],
  templateUrl: './add-budget.html',
  styleUrl: './add-budget.scss',
  standalone: true,
})
/**
 * Components to show within the modal really only need to reference the context or data
 */
export class BudgetModal {
  private readonly modalContext = inject<ModalContext<Budget>>(MODAL_CONTEXT);
  frequencies = frequencies;
  // private readonly store = inject(BudgetStore);
  //readonly categories = computed(() => this.store.categorySuggestions());

  onCategoryComplete(event: AutoCompleteCompleteEvent): void {
    //this.dispatch.loadCategories({ category: event.query });
  }
  private fb = inject(FormBuilder);
  form = this.fb.group({
    type: this.fb.control('Expense', { nonNullable: true, validators: [Validators.required] }),
    title: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
    amount: this.fb.control(0, { nonNullable: true, validators: [Validators.required] }),
    // startDate: this.fb.control(new Date(), {
    //   nonNullable: true,
    //   validators: [Validators.required],
    // }),
    category: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
    // frequency: this.fb.control('Daily', { nonNullable: true, validators: [Validators.required] }),
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    //this.modalContext.submit(this.form.value as Required<Budget>, BudgetEvents.create);
  }
  cancel(): void {
    this.modalContext.cancel();
  }
}
