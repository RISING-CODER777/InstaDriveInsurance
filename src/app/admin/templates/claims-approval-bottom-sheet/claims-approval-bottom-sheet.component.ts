import { Component, Inject, OnInit } from '@angular/core';
import { Claim } from '../../models/claim-approval.model';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ClaimsService } from 'src/app/core/services/claims.service';
import { ClaimRequest } from 'src/app/core/models/claim.model';

@Component({
  selector: 'app-claims-approval-bottom-sheet',
  templateUrl: './claims-approval-bottom-sheet.component.html',
  styleUrls: ['./claims-approval-bottom-sheet.component.scss'],
})
export class ClaimsApprovalBottomSheetComponent implements OnInit {
  data!: ClaimRequest; // Type for incoming data

  // Define status options
  status = [
    { value: 'Approved', viewValue: 'Approved' },
    { value: 'Rejected', viewValue: 'Rejected' },
    { value: 'Under Review', viewValue: 'Under Review' },
    { value: 'Submitted', viewValue: 'Submitted' }
  ];

  selectedValue!: string; // Holds the selected status

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public incomingData: Claim,
    private matBottomSheetRef: MatBottomSheetRef<ClaimsApprovalBottomSheetComponent>,
    private claimsService: ClaimsService
  ) {}

  ngOnInit(): void {
    this.data = this.incomingData; // Assign incoming data
    this.selectedValue = this.data.status; // Initialize selected value
  }

  updateClaimStatus(status: string): void {
    this.claimsService.getClaimById(this.data.claimNumber).subscribe((data: ClaimRequest) => {
      this.data = data; // Update local data
      this.data.status = status; // Set new status
      console.log(this.data);

      // Update the claim with the new status
      this.claimsService.updateClaimById(this.data.claimNumber, this.data).subscribe((updatedData: ClaimRequest) => {
        console.log(updatedData); // Log updated claim
        this.matBottomSheetRef.dismiss(); // Close the bottom sheet
      });
    });
  }

  close(): void {
    this.matBottomSheetRef.dismiss(); // Close the bottom sheet
  }
}
