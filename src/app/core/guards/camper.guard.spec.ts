import { TestBed } from '@angular/core/testing';

import { CamperGuard } from './camper.guard';

describe('CamperGuard', () => {
  let guard: CamperGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CamperGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
