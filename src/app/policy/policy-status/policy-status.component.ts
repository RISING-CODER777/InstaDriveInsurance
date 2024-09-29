import { Component, OnInit } from '@angular/core';
import { UserProposalStatus } from 'src/app/core/models/user-proposal-status.model';
import { UserProposalStatusService } from 'src/app/core/services/user-proposal-status.service';

@Component({
  selector: 'app-policy-status',
  templateUrl: './policy-status.component.html',
  styleUrls: ['./policy-status.component.scss']
})
export class PolicyStatusComponent implements OnInit {
  
  userProposal: UserProposalStatus | undefined;
  showMoreDetails: boolean = false;

  constructor(private userProposalService: UserProposalStatusService) {}

  ngOnInit(): void {
    this.getUserProposalDetails(1); // Hardcoded ID for demonstration
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

  toggleDetails() {
    this.showMoreDetails = !this.showMoreDetails;
  }
}
