import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarEventItem } from './calendar-event-item';

describe('CalendarEventItem', () => {
  let component: CalendarEventItem;
  let fixture: ComponentFixture<CalendarEventItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarEventItem],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarEventItem);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('event', {
      id: '507f1f77bcf86cd799439011',
      eventType: 'budget',
      title: 'Test',
      amount: 100,
      type: 'Income',
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
