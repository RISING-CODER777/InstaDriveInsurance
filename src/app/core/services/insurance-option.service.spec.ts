import { TestBed } from '@angular/core/testing';

import { InsuranceOptionService } from './insurance-option.service';

describe('InsuranceOptionService', () => {
  let service: InsuranceOptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuranceOptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
