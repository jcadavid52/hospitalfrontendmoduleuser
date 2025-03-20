import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { Autenticated } from './autenticated.guard';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => Autenticated(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
