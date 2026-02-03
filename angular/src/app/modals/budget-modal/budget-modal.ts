import { AfterViewInit, Component, effect, inject, input, model, output, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Budget } from '@__types/types';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { RadioButton } from 'primeng/radiobutton';
import { frequencies, categories } from '@__types/constants';
import { MODAL_CONFIG, MODAL_CONTEXT, MODAL_DATA, MODAL_ID, 
  ModalContext} from 'src/app/modals/modal.tokens';
@Component({
  selector: 'app-budget-modal',
  imports: [Select, DatePicker, RadioButton, ReactiveFormsModule, InputText, Button],
  templateUrl: './budget-modal.html',
  styleUrl: './budget-modal.scss',
  standalone: true,
})
/**
 * Components to show within the modal really only need to reference the context or data
 */
export class BudgetModal {
  private readonly modalContext = inject<ModalContext<Budget>>(MODAL_CONTEXT);
  frequencies = frequencies;
  categories = categories;
  private fb = inject(FormBuilder);
  form = this.fb.group({
    title: this.fb.control('', {nonNullable: true, validators: [Validators.required]}),
    startDate: this.fb.control(new Date(), {nonNullable: true, validators: [Validators.required]}),
    category: this.fb.control('Expense', {nonNullable: true, validators: [Validators.required]}),
    frequency:  this.fb.control('Daily', {nonNullable: true, validators: [Validators.required]}),
    amount:this.fb.control(0, {nonNullable: true, validators: [Validators.required]}),
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
}
