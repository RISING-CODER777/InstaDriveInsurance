import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AdminService } from '../../services/admin.service';
import { AuthService } from 'src/app/authentication/services/auth.service';  // Import AuthService
import { NewApprovalStatusUpdate } from '../../models/new-approval-status-update.model';

@Component({
  selector: 'app-new-approval-bottom-sheet',
  templateUrl: './new-approval-bottom-sheet.component.html',
  styleUrls: ['./new-approval-bottom-sheet.component.scss']
})
export class NewApprovalBottomSheetComponent implements OnInit {
  status = [
    { value: 'Approved', viewValue: 'Approved' },
    { value: 'Rejected', viewValue: 'Rejected' },
    { value: 'Under Review', viewValue: 'Under Review' },
  ];
  selectedValue!: string;
  adminComments!: string;
  loggedInUsername: string | null = null;  // Changed to string | null to handle nullable username

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,  // NewApproval Data
    private matBottomSheetRef: MatBottomSheetRef,
    private adminService: AdminService,
    private authService: AuthService  // Inject AuthService here
  ) {}

  ngOnInit(): void {
    this.selectedValue = this.data.status;
    
    // Get the logged-in username dynamically
    this.loggedInUsername = this.authService.getUsername() || '';  // Provide fallback to empty string if null
  }

  updateStatus(): void {
    const updatedData: NewApprovalStatusUpdate = {
      status: this.selectedValue,
      remarks: this.adminComments,
      approvedBy: this.loggedInUsername || 'Unknown'  // Fallback to 'Unknown' if username is null
    };

    this.adminService.patchProposalStatus(this.data.proposalID, updatedData).subscribe(response => {
      console.log('Proposal updated:', response);
      this.matBottomSheetRef.dismiss();
    }, error => {
      console.error('Error updating proposal:', error);
    });
    
    this.matBottomSheetRef.dismiss();
  }

  close(): void {
    this.matBottomSheetRef.dismiss();
  }
}
