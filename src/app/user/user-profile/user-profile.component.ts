import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { catchError, of } from 'rxjs';
import { UserProfile } from 'src/app/core/models/user-profile.model';
import { UserProfileService } from 'src/app/core/services/user-profile.service';
import { UserService } from '../services/user.service';
import { UserPolicies } from '../models/user-policies.model';
import { ClaimRequestService } from 'src/app/core/services/claim-request.service';
import { ClaimRequest } from 'src/app/core/models/claim-request.model';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { FileUpload } from 'src/app/core/models/file-upload.model';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  userProfile: UserProfile | undefined;
  userPolicies: UserPolicies[] = []; // Initialize to an empty array
  userPolicyLoading: boolean = false;
  errorMessage: string | undefined;
  userId: number; // Declare userId as a number

  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage: number | string = 0;

  // Claim form fields
  claimForm = {
    DateOfIncident: '',
    Description: '',
    ClaimType: ''
  };

  constructor(
    private userProfileService: UserProfileService,
    private userService: UserService,
    private claimRequestService: ClaimRequestService,
    private authService: AuthService, // Inject AuthService
    private uploadService: FileUploadService
  ) {
    // Fetch userId dynamically from AuthService
    this.userId = Number(this.authService.getUserId()) || 0; // Ensure userId is a number
  }

  ngOnInit(): void {
    this.getUserProfileDetails(this.userId);
    this.getUserPolicies(this.userId);
  }
  ngAfterViewInit() {
    // Now fileInput is available here
    console.log(this.fileInput); // You can check if it is properly defined
  }

  claimPolicy(policyId: number): void {
    const policy = this.userPolicies.find(p => p.policyID === policyId);
    console.log('Claiming policy ID:', policyId); // Log the incoming policyId
    console.log('Claiming policy:', policy);

    if (policy) {
      if (policy.showDoneButton) {
        policy.showDoneButton = false;
        policy.isClaimed = true;
        this.submitClaim(policy.policyID);
      } else if (!policy.isClaimed) {
        policy.showDoneButton = true;
      }
    } else {
      console.error('Policy not found for claim:', policyId);
    }
  }

  submitClaim(policyId: number): void {
    if (!this.claimForm.DateOfIncident) {
      this.errorMessage = 'Date of incident is required.';
      return; // Stop execution if the date is not valid
    }

    const claimData: ClaimRequest = {
      userID: this.userId, // Ensure userId is a number
      policyID: policyId,
      dateOfIncident: new Date(this.claimForm.DateOfIncident).toISOString(),
      description: this.claimForm.Description,
      claimType: this.claimForm.ClaimType
    };

    this.claimRequestService.submitClaimRequest(claimData).subscribe({
      next: (response) => {
        console.log('Claim submitted successfully:', response);
        this.resetClaimForm(); // Reset form after successful submission
      },
      error: (error) => {
        console.error('Error submitting claim:', error);
        this.errorMessage = error.message || 'Error: Unable to submit the claim. Please try again.';
      }
    });
  }

  resetClaimForm(): void {
    this.claimForm = {
      DateOfIncident: '',
      Description: '',
      ClaimType: ''
    };
  }

  renewPolicy(policyId: number): void {
    console.log('Renewing policy:', policyId);
  }

  getUserProfileDetails(id: number): void {
    this.userProfileService.getUserProfileById(id).pipe(
      catchError((error) => {
        this.errorMessage = 'Error: Unable to reach the server. Please try again later.';
        console.error('Error fetching user profile:', error);
        return of(undefined);
      })
    ).subscribe((data: UserProfile | undefined) => {
      if (data) {
        this.userProfile = data;
      }
    });
  }

  getUserPolicies(userId: number): void {
    this.userPolicyLoading = true;
    this.userService.getUserPolicies(userId).subscribe({
      next: (data: UserPolicies[] | undefined) => {
        if (data) {
          console.log('Policies fetched:', data);
          this.userPolicies = data.map(policy => ({
            ...policy,
            showDoneButton: false,
          }));
        }
        this.userPolicyLoading = false;
      },
      error: (error: any) => {
        this.errorMessage = 'Error: Unable to fetch user policies.';
        this.userPolicyLoading = false;
        console.error('Error fetching policies:', error);
      }
    });
  }


  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
            if (this.percentage == 100) {
              this.percentage = "Upload Successful 100";
              // Wait for 2 sec and set undefined
              setTimeout(() => {
                this.currentFileUpload = undefined;
              }, 2000);

            }
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }
  onFileInputClick() {
    if (this.fileInput) {
      // Trigger the file input click programmatically
      this.fileInput.nativeElement.click();
    }
  }
}
