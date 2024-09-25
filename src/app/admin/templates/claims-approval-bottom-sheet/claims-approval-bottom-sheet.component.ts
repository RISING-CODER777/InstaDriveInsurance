import { Component, Inject } from '@angular/core';
import { Claim } from '../../models/claim-approval.model';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ClaimsService } from 'src/app/core/services/claims.service';
import { ClaimRequest } from 'src/app/core/models/claim.model';

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
  updatedClaim!: ClaimRequest;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Claim,
    private matBottomSheetRef: MatBottomSheetRef<ClaimsApprovalBottomSheetComponent>,
    private claimsService: ClaimsService,
  ) {}

  ngOnInit(){
    this.selectedValue = this.data.status; // Initialize selected value
  }

  updateClaimStatus(status: string){
    this.claimsService.getClaimById(this.data.claimId).subscribe((data: ClaimRequest) => {
      this.updatedClaim = data;
      this.updatedClaim.status = status; // Set new status
      console.log(this.updatedClaim);

      this.claimsService.updateClaimById(this.data.claimId, this.updatedClaim).subscribe((data: ClaimRequest) => {
        console.log(data); // Log updated claim
        this.matBottomSheetRef.dismiss(); // Close the bottom sheet
      });
    });
    this.matBottomSheetRef.dismiss();

  }

  close(): void {
    this.matBottomSheetRef.dismiss(); // Close the bottom sheet
  }
}
