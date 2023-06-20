import { TestBed } from '@angular/core/testing';

import { CampCenterService } from './camp-center.service';

describe('CampCenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CampCenterService = TestBed.get(CampCenterService);
    expect(service).toBeTruthy();
  });
});
