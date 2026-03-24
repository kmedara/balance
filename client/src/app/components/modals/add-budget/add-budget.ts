import {
  AfterViewInit,
  Component,
  effect,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
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
import { frequencies, Budget, budgetTypes } from '@kmedara/balance-domain';
import {
  MODAL_CONFIG,
  MODAL_CONTEXT,
  MODAL_DATA,
  MODAL_ID,
  ModalContext,
} from 'src/app/tokens/modal';
import { FileUpload } from '@components/file-upload/file-upload';

type AddBudgetForm = { [k in keyof Omit<Budget, 'resourceId'>]: FormControl<Budget[k]> };

@Component({
  selector: 'app-add-budget',
  imports: [
    Select,
    DatePicker,
    RadioButton,
    ReactiveFormsModule,
    InputText,
    Button,
    FileUpload,
    AutoComplete,
  ],
  templateUrl: './add-budget.html',
  styleUrl: './add-budget.scss',
  standalone: true,
})
export class BudgetModal {
  private readonly modalContext = inject<ModalContext<Budget>>(MODAL_CONTEXT);
  frequencies = frequencies;
  budgetTypes = ['Income', 'Expense'];
  suggestedCategories: string[] = [];

  private fb = inject(FormBuilder);
  form = this.fb.group<AddBudgetForm>({
    type: this.fb.nonNullable.control('Income', { validators: [Validators.required] }),
    title: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
    startDate: this.fb.nonNullable.control(new Date(), { validators: [Validators.required] }),
    frequency: this.fb.nonNullable.control(this.frequencies[0], {
      validators: [Validators.required],
    }),
    amount: this.fb.nonNullable.control(0, { validators: [Validators.required] }),
    category: this.fb.nonNullable.control(this.suggestedCategories[0], {
      validators: [Validators.required],
    }),
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.modalContext.submit(this.form.value as Required<Budget>);
  }

  cancel(): void {
    this.modalContext.cancel();
  }

  search(event: AutoCompleteCompleteEvent) {
    this.suggestedCategories = ['Rent'];
  }
}
