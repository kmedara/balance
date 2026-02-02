import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { navigationResolver } from './navigation-resolver';

describe('navigationResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => navigationResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
