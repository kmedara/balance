import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetCalendarItem } from './budget-calendar-item';

describe('BudgetCalendarItem', () => {
  let component: BudgetCalendarItem;
  let fixture: ComponentFixture<BudgetCalendarItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetCalendarItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetCalendarItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
