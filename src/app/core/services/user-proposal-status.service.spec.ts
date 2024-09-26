import { TestBed } from '@angular/core/testing';

import { UserProposalStatusService } from './user-proposal-status.service';

describe('UserProposalStatusService', () => {
  let service: UserProposalStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserProposalStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
