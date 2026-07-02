import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, beforeEach, it, expect } from 'vitest';
import { AddEventModal } from './add-event-modal';
import { MODAL_CONTEXT, MODAL_DATA, MODAL_ID } from '@modals/modal.context';

describe('AddEventModal', () => {
  let component: AddEventModal;
  let fixture: ComponentFixture<AddEventModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEventModal],
      providers: [
        {
          provide: MODAL_CONTEXT,
          useValue: { submit: () => undefined, cancel: () => undefined },
        },
        {
          provide: MODAL_DATA,
          useValue: { action: 'createEvent', eventType: 'budget' },
        },
        {
          provide: MODAL_ID,
          useValue: 'test-modal-id',
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEventModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
