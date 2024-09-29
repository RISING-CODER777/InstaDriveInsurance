import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AdminService } from '../../services/admin.service';
import { NewApprovalStatusUpdate } from '../../models/new-approval-status-update.model';

@Component({
  selector: 'app-new-approval-bottom-sheet',
  templateUrl: './new-approval-bottom-sheet.component.html',
  styleUrls: ['./new-approval-bottom-sheet.component.scss']
})
export class NewApprovalBottomSheetComponent {

  status = [
    { value: 'Approved', viewValue: 'Approved' },
    { value: 'Rejected', viewValue: 'Rejected' },
    { value: 'Under Review', viewValue: 'Under Review' },
    { value: 'Submitted', viewValue: 'Submitted' }
  ];
  selectedValue!: string;
  adminComments!: string;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,  // NewApproval Data
    private matBottomSheetRef: MatBottomSheetRef,
    private adminService: AdminService,
  ) { }

  ngOnInit() {
    this.selectedValue = this.data.status;
  }

  updateStatus() {
    const updatedData: NewApprovalStatusUpdate = {
      status: this.selectedValue,
      remarks: this.adminComments,
      approvedBy: 'rajesh_admin'  //Need to change this harcode
    };

    this.adminService.patchProposalStatus(this.data.proposalID, updatedData).subscribe(response => {
      console.log('Proposal updated:', response);
      this.matBottomSheetRef.dismiss();
    }, error => {
      console.error('Error updating proposal:', error);
    });
    this.matBottomSheetRef.dismiss();

  }

  close() {
    this.matBottomSheetRef.dismiss();
  }
}
