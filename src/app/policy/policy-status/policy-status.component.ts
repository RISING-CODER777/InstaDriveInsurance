import { Component, OnInit } from '@angular/core';
import { UserProposalStatus } from 'src/app/core/models/user-proposal-status.model';
import { UserProposalStatusService } from 'src/app/core/services/user-proposal-status.service';
import { SharedDataService } from 'src/app/core/services/shared-data.service';

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
    private sharedDataService: SharedDataService // Injecting SharedDataService
  ) {}

  ngOnInit(): void {
    const proposalId = this.sharedDataService.getProposalID(); // Get proposal ID from shared service
    if (proposalId) {
      this.getUserProposalDetails(proposalId); // Fetch proposal details using the retrieved ID
    } else {
      console.error('Proposal ID not found in shared data service.');
    }
  }

  getUserProposalDetails(id: number): void {
    this.userProposalService.getUserProposalById(id).subscribe({
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
}
