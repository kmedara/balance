import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, beforeEach, it, expect } from 'vitest';
import { AddEventModal } from './add-event-modal';
import { MODAL_CONTEXT } from '@modals/modal.token';

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
