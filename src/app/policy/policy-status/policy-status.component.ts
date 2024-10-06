import { Component, OnInit } from '@angular/core';
import { UserProposalStatus } from 'src/app/core/models/user-proposal-status.model';
import { UserProposalStatusService } from 'src/app/core/services/user-proposal-status.service';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-policy-status',
  templateUrl: './policy-status.component.html',
  styleUrls: ['./policy-status.component.scss']
})
export class PolicyStatusComponent implements OnInit {
  
  userProposal: UserProposalStatus | undefined;
  showMoreDetails: boolean = false;
  showAddons: boolean = false;
  showAccidentCover: boolean = false;
  showAccessoryCover: boolean = false;

  constructor(
    private userProposalService: UserProposalStatusService,
    private sharedDataService: SharedDataService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    const proposalId = this.sharedDataService.getProposalID(); // Get proposal ID from shared service
    if (proposalId) {
      this.getUserProposalDetails(proposalId); // Fetch proposal details using the retrieved ID
    } else {
      console.error('Proposal ID not found in shared data service.');
    }

    // Subscribe to user proposal updates
    this.userProposalService.userProposal$.subscribe(proposal => {
      if (proposal) {
        this.userProposal = proposal; // Update the userProposal with fetched data
        console.log(proposal);
      }
    });
  }

  getUserProposalDetails(id: number): void {
    this.userProposalService.getUserProposalById(id).pipe(take(1)).subscribe({
      next: (proposal: UserProposalStatus) => {
        this.userProposal = proposal; // Update the userProposal with fetched data
        console.log(proposal);
      },
      error: (error: any) => {
        console.error('Error fetching user proposal:', error);
      }
    });
  }

  toggleDetails(): void {
    this.showMoreDetails = !this.showMoreDetails;
  }

  toggleAddons(): void {
    this.showAddons = !this.showAddons;
  }

  toggleAccidentCover(): void {
    this.showAccidentCover = !this.showAccidentCover;
  }

  toggleAccessoryCover(): void {
    this.showAccessoryCover = !this.showAccessoryCover;
  }

  navigateToPayment(): void {
    this.router.navigate(['/payment']);
  }
}
