import { TestBed } from '@angular/core/testing';

import { PlaidService } from './plaid.service';
import { beforeEach, describe, expect, it } from 'vitest';

describe('PlaidService', () => {
  let service: PlaidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
