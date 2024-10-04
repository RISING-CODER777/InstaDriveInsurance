import { TestBed } from '@angular/core/testing';

import { InsuranceAmountFinalService } from './insurance-amount-final.service';

describe('InsuranceAmountFinalService', () => {
  let service: InsuranceAmountFinalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuranceAmountFinalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
