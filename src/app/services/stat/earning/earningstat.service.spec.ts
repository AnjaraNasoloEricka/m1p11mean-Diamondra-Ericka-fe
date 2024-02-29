import { TestBed } from '@angular/core/testing';

import { EarningstatService } from './earningstat.service';

describe('EarningstatService', () => {
  let service: EarningstatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EarningstatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
