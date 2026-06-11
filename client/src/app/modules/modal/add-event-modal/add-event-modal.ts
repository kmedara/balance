import { Component, effect, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Button } from 'primeng/button';
import { InputNumber } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { Textarea } from 'primeng/textarea';
import { budgetTypes } from '@core/domain';
import { MODAL_CONTEXT, MODAL_DATA, MODAL_ID } from '@modals/modal.token';
import { ModalContext, ModalData } from '@modals/modal.context';
import { ModalEvents, ModalStore } from '@modals/modal.store';

const BUDGET_FREQUENCY_OPTIONS = [
  { label: 'Monthly', value: 'MONTHLY' as const },
  { label: 'Weekly', value: 'WEEKLY' as const },
  { label: 'Daily', value: 'DAILY' as const },
  { label: 'Yearly', value: 'YEARLY' as const },
];

@Component({
  selector: 'app-add-event-modal',
  imports: [
    ReactiveFormsModule,
    InputText,
    InputNumber,
    Select,
    DatePicker,
    Textarea,
    Button,
  ],
  templateUrl: './add-event-modal.html',
  styleUrl: './add-event-modal.scss',
  standalone: true,
})
export class AddEventModal {
  private readonly modalContext = inject<ModalContext>(MODAL_CONTEXT);
  private readonly modalData = inject<ModalData>(MODAL_DATA);
  private readonly modalId = inject(MODAL_ID);
  private readonly modalStore = inject(ModalStore);
  readonly eventType = this.modalData.eventType;
  private readonly fb = inject(FormBuilder);

  readonly budgetTypes = budgetTypes.map((type) => ({ label: type, value: type }));
  readonly frequencyOptions = BUDGET_FREQUENCY_OPTIONS;

  readonly form = this.fb.group({
    type: this.fb.control<'Income' | 'Expense'>('Expense', { nonNullable: true, validators: [Validators.required] }),
    title: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
    amount: this.fb.control<number | null>(null, { validators: [Validators.required, Validators.min(0.01)] }),
    category: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
    description: this.fb.control('', { nonNullable: true }),
    startDate: this.fb.control<Date>(new Date(), { nonNullable: true, validators: [Validators.required] }),
    frequency: this.fb.control<'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'>('MONTHLY', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    interval: this.fb.control(1, { nonNullable: true, validators: [Validators.required, Validators.min(1)] }),
    endDate: this.fb.control<Date | null>(null),
  });

  submitting = false;
  errorMessage: string | null = null;

  constructor() {
    effect(() => {
      const latest = this.modalStore.events().at(-1);
      if (!latest || latest.payload.resourceId !== this.modalId) return;

      if (latest.type === ModalEvents.submitFailed.type) {
        this.submitting = false;
        this.errorMessage = latest.payload.error;
      }
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.errorMessage = null;
    this.modalContext.submit(this.form.getRawValue());
  }

  cancel(): void {
    this.modalContext.cancel();
  }
}
