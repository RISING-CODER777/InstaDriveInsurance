import { TestBed } from '@angular/core/testing';

import { ClaimRequestService } from './claim-request.service';

describe('ClaimRequestService', () => {
  let service: ClaimRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClaimRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
