import { Component, Inject } from '@angular/core';
import { Claim } from '../../models/claim-approval.model';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AdminService } from '../../services/admin.service';
import { ClaimStatusUpdate } from '../../models/claim-status-update.model';

@Component({
  selector: 'app-claims-approval-bottom-sheet',
  templateUrl: './claims-approval-bottom-sheet.component.html',
  styleUrls: ['./claims-approval-bottom-sheet.component.scss'],
})
export class ClaimsApprovalBottomSheetComponent {
  
  status = [
    { value: 'Approved', viewValue: 'Approved' },
    { value: 'Rejected', viewValue: 'Rejected' },
    { value: 'Under Review', viewValue: 'Under Review' },
    { value: 'Submitted', viewValue: 'Submitted' }
  ];
  
  selectedValue!: string;
  approvedAmount!: number;
  adminComments!: string;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Claim,
    private matBottomSheetRef: MatBottomSheetRef<ClaimsApprovalBottomSheetComponent>,
    private adminService: AdminService,
  ) {}

  ngOnInit() {
    this.selectedValue = this.data.status; // Initialize selected status
  }

  updateClaimStatus() {
    const updatedData: ClaimStatusUpdate = {
      claimStatus: this.selectedValue,
      approvedAmount: this.approvedAmount,
      remarks: this.adminComments,
    };

    this.adminService.patchClaimApprovalStatus(this.data.claimId, updatedData).subscribe(response => {
      console.log('Claim updated:', response);
      this.matBottomSheetRef.dismiss(); // Close bottom sheet after update
    }, error => {
      console.error('Error updating claim:', error);
    });
    this.matBottomSheetRef.dismiss();

  }

  close(): void {
    this.matBottomSheetRef.dismiss(); // Close bottom sheet
  }
}
