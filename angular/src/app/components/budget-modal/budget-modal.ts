import { Component, effect, inject, input, model, output, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Budget } from '../../types/types';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { RadioButton } from 'primeng/radiobutton';
import { frequencies, categories } from '../../types/constants';
import { ModalRef } from '../../services/modal/modal.ref';
import { MODAL_DATA, MODAL_ID } from '../../services/modal/modal.tokens';
import { ModalService } from '../../services/modal/modal.service';
@Component({
  selector: 'app-budget-modal',
  imports: [Select, DatePicker, RadioButton, ReactiveFormsModule, InputText, Button],
  templateUrl: './budget-modal.html',
  styleUrl: './budget-modal.scss',
  standalone: true,
})
export class BudgetModal {
  private readonly modalService = inject(ModalService);
  private readonly modalId = inject(MODAL_ID);
  private modalData = inject(MODAL_DATA);
  frequencies = frequencies;
  categories = categories;
  private fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
    title: [<string>null!, [Validators.required]],
    startDate: new Date(),
    category: 'Expense',
    frequency: 'Once',
  });

  close(): void {
    this.modalService.close(this.modalId, undefined);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.modalService.close(this.modalId, this.form.value);
  }
}
