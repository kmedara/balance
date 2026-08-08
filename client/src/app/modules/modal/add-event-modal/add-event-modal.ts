import { Component, effect, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { budgetTypes, type EventResponse } from '@balance/schemas/client';
import { GATEWAY_HTTP_TOKEN } from '@core/gateway.http';
import {
  MODAL_CONTEXT,
  MODAL_DATA,
  MODAL_ID,
  ModalContext,
  ModalData,
} from '@modals/modal.context';
import { ModalEvents, ModalStore } from '@modals/modal.store';
import { eventResponseToFormValues } from '@modals/event-form.utils';

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
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './add-event-modal.html',
  styleUrl: './add-event-modal.scss',
  standalone: true,
})
export class AddEventModal implements OnInit {
  private readonly modalContext = inject<ModalContext>(MODAL_CONTEXT);
  private readonly modalData = inject<ModalData>(MODAL_DATA);
  private readonly modalId = inject(MODAL_ID);
  private readonly modalStore = inject(ModalStore);
  private readonly gateway = inject(GATEWAY_HTTP_TOKEN);
  readonly eventType = this.modalData.eventType;
  readonly isEdit = this.modalData.action === 'updateEvent';
  private readonly fb = inject(FormBuilder);

  readonly budgetTypes = budgetTypes.map((type) => ({ label: type, value: type }));
  readonly frequencyOptions = BUDGET_FREQUENCY_OPTIONS;

  readonly form = this.fb.group({
    type: this.fb.control<'Income' | 'Expense'>('Expense', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    title: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
    amount: this.fb.control<number | null>(null, {
      validators: [Validators.required, Validators.min(0.01)],
    }),
    category: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
    description: this.fb.control('', { nonNullable: true }),
    startDate: this.fb.control<Date>(new Date(), {
      nonNullable: true,
      validators: [Validators.required],
    }),
    frequency: this.fb.control<'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'>('MONTHLY', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    interval: this.fb.control(1, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    }),
    endDate: this.fb.control<Date | null>(null),
    updatedAt: this.fb.control<string | null>(null),
  });

  readonly loading = signal(false);
  readonly submitting = signal(false);
  readonly errorMessage = signal<string>('');

  constructor() {
    effect(() => {
      const latest = this.modalStore.events().at(-1);
      if (!latest || latest.payload.resourceId !== this.modalId) return;

      if (latest.type === ModalEvents.submitFailed.type) {
        this.submitting.set(false);
        this.errorMessage.set(latest.payload.error);
      }
    });
  }

  ngOnInit(): void {
    const eventId = this.modalData.eventId;
    if (!eventId) return;

    this.loading.set(true);
    this.gateway.get<EventResponse>(`/events/${eventId}`).subscribe({
      next: (event) => {
        this.form.patchValue(eventResponseToFormValues(event));
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(err instanceof Error ? err.message : 'Failed to load event');
      },
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.errorMessage.set('');
    const raw = this.form.getRawValue();
    this.modalContext.submit({
      ...raw,
      updatedAt: raw.updatedAt ?? undefined,
    });
  }

  cancel(): void {
    this.modalContext.cancel();
  }
}
