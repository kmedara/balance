import { TestBed } from '@angular/core/testing';

import { BudgetService } from './budget.service';
import { beforeEach, describe, expect, it } from 'vitest';

describe('BudgetService', () => {
  let service: BudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
