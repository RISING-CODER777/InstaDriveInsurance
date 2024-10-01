import { TestBed } from '@angular/core/testing';

import { InsuranceOptionSelectionService } from './insurance-option-selection.service';

describe('InsuranceOptionSelectionService', () => {
  let service: InsuranceOptionSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuranceOptionSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
