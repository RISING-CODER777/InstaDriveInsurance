import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { NewApproval } from '../../models/new-approval.model';
import { AdminService } from '../../services/admin.service';
import { Proposal } from 'src/app/core/models/proposal.model';
import { ProposalsService } from 'src/app/core/services/proposals.service';

@Component({
  selector: 'app-new-approval-bottom-sheet',
  templateUrl: './new-approval-bottom-sheet.component.html',
  styleUrls: ['./new-approval-bottom-sheet.component.scss']
})
export class NewApprovalBottomSheetComponent {

  status = [
    {value: 'Approved', viewValue: 'Approved'},
    {value: 'Rejected', viewValue: 'Rejected'},
    {value: 'Under Review', viewValue: 'Under Review'},
    {value: 'Submitted', viewValue: 'Submitted'}
  ];
  selectedValue!: string;
  updatedProposal!: Proposal;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: NewApproval,
    private matBottomSheetRef: MatBottomSheetRef,
    private proposalService: ProposalsService,
  ) {

  }

  ngOnInit() {
    this.selectedValue = this.data.status;
  }
  updateStatus(status: string) {
    this.proposalService.getProposalById(this.data.proposalId).subscribe((data: Proposal) => {
      this.updatedProposal = data;
      this.updatedProposal.status = status;
      console.log(this.updatedProposal);
      this.proposalService.updateProposalById(this.data.proposalId, this.updatedProposal).subscribe((data: Proposal) => {
        console.log(data);
      })
    })
    
    this.matBottomSheetRef.dismiss();
  }
  close() {
    this.matBottomSheetRef.dismiss();
  }
}
