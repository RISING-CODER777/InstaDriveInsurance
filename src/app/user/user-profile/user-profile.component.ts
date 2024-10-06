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
import { UserAvatar } from '../models/user-avatar.model';
import { MatSnackBar } from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  userProfile: UserProfile | undefined;
  userPolicies: UserPolicies[] = [];
  userPolicyLoading: boolean = false;
  errorMessage: string | undefined;
  userId: number; // User ID from AuthService

  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage: number | string = 0;
  avatarLink?: string; // Store the avatar link for display

  // Claim form fields
  claimForm = {
    DateOfIncident: '',
    Description: '',
    ClaimType: '',
  };

  // Editing states
  isEditingPersonal: boolean = false;
  isEditingAddress: boolean = false;

  constructor(
    private userProfileService: UserProfileService,
    private userService: UserService,
    private claimRequestService: ClaimRequestService,
    private authService: AuthService,
    private uploadService: FileUploadService,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {
    this.userId = Number(this.authService.getUserId()) || 0; // Ensure userId is a number
  }

  ngOnInit(): void {
    this.getUserProfileDetails(this.userId);
    this.getUserPolicies(this.userId);
    this.getUserAvatar(); // Fetch and display user avatar on load
  }

  ngAfterViewInit() {
    console.log(this.fileInput); // Check if fileInput is properly defined
  }

  claimPolicy(policyId: number): void {
    this.userPolicies = this.userPolicies.map((policy) => {
      if (policy.policyID === policyId) {
        if (policy.showDoneButton) {
          policy.showDoneButton = false;
          policy.isClaimed = true;
          this.submitClaim(policy.policyID);
        } else if (!policy.isClaimed) {
          policy.showDoneButton = true;
        }
      }
      return policy;
    });
  }

  submitClaim(policyId: number): void {
    if (!this.claimForm.DateOfIncident) {
      this.errorMessage = 'Date of incident is required.';
      return;
    }
    
    if (this.isDateInFuture(this.claimForm.DateOfIncident)) {
      this.errorMessage = 'Date of incident cannot be in the future.';
      return;
    }

    if (!this.claimForm.ClaimType) {
      this.errorMessage = 'Claim type is required.';
      return;
    }

    if (!this.claimForm.Description) {
      this.errorMessage = 'Description is required.';
      return;
    }

    const claimData: ClaimRequest = {
      userID: this.userId,
      policyID: policyId,
      dateOfIncident: new Date(this.claimForm.DateOfIncident).toISOString(),
      description: this.claimForm.Description,
      claimType: this.claimForm.ClaimType,
    };

    console.log('Submitting claim for policy:', policyId);
    console.log('User policies before submission:', this.userPolicies);

    this.claimRequestService.submitClaimRequest(claimData).subscribe({
      next: (response) => {
        console.log('Claim submitted successfully:', response);
        this.resetClaimForm(); // Reset form after successful submission
        this.openSnackBar('Claim submitted successfully!'); // Open Snackbar
        // Optionally refetch policies or update the state as needed
        this.getUserPolicies(this.userId); // Uncomment if you need to refresh the policies
      },
      error: (error) => {
        console.error('Error submitting claim:', error);
        this.errorMessage =
          error.message || 'Error: Unable to submit the claim. Please try again.';
      },
    });
  }

  // Function to check if a date is in the future
isDateInFuture(dateString: string): boolean {
  const selectedDate = new Date(dateString);
  const today = new Date();
  
  // Clear the time part
  today.setHours(0, 0, 0, 0); // Set time to 00:00:00 to compare only dates
  selectedDate.setHours(0, 0, 0, 0); // Also clear the time part of the selected date
  
  return selectedDate > today; // This will return true if the selected date is in the future
}

  // Function to open Snackbar
  openSnackBar(message: string, action: string = 'Close') {
    this.snackBar.open(message, action, {
      duration: 3000, // Duration in milliseconds
    });
  }

  resetClaimForm(): void {
    this.claimForm = {
      DateOfIncident: '',
      Description: '',
      ClaimType: '',
    };
  }

  renewPolicy(policyId: number): void {
    console.log('Renewing policy:', policyId);
  }

  getUserProfileDetails(id: number): void {
    this.userProfileService
      .getUserProfileById(id)
      .pipe(
        catchError((error) => {
          this.errorMessage =
            'Error: Unable to reach the server. Please try again later.';
          console.error('Error fetching user profile:', error);
          return of(undefined);
        })
      )
      .subscribe((data: UserProfile | undefined) => {
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
          this.userPolicies = data.map((policy) => ({
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
      },
    });
  }

  togglePersonalInfoEdit(): void {
    this.isEditingPersonal = !this.isEditingPersonal;
    if (!this.isEditingPersonal) {
      this.saveUserProfile();
    }
  }

  toggleAddressEdit(): void {
    this.isEditingAddress = !this.isEditingAddress;
    if (!this.isEditingAddress) {
      this.saveUserProfile();
    }
  }

  saveUserProfile(): void {
    if (this.userProfile) {
      this.userProfileService
        .updateUserProfile(this.userId, this.userProfile)
        .subscribe({
          next: (response) => {
            console.log('User profile updated successfully:', response);
          },
          error: (error) => {
            console.error('Error updating user profile:', error);
            this.errorMessage =
              'Error: Unable to update profile. Please try again.';
          },
        });
    }
  }

  // File upload logic
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
          (progressOrUrl) => {
            if (typeof progressOrUrl === 'string') {
              this.updateUserAvatar(progressOrUrl);
              this.openSnackBar('Upload Successful'); // Show success message when upload is complete
            } else {
              // File upload progress tracking
              if (progressOrUrl === 100) {
                this.percentage = '100%'; // Full upload complete
              } else if (progressOrUrl >= 90) {
                this.percentage = '90%';
              } else if (progressOrUrl >= 50) {
                this.percentage = '50%';
              } else if (progressOrUrl >= 10) {
                this.percentage = '10%';
              }
            }
          },
          (error) => {
            console.log('Error uploading file:', error);
          }
        );
      }
    }
  }

  updateUserAvatar(downloadURL: string): void {
    const userAvatar: UserAvatar = {
      userID: this.userId,
      avatarLink: downloadURL,
    };

    this.userService.updateUserAvatar(userAvatar).subscribe({
      next: () => {
        console.log('Avatar updated successfully');
        this.avatarLink = downloadURL;
      },
      error: (error) => {
        console.log('Error updating avatar in the database:', error);
      },
    });
  }

  getUserAvatar(): void {
    this.userService.getUserAvatar(this.userId).subscribe({
      next: (response: { url: string }) => {
        console.log('Avatar fetched:', response.url);
        this.avatarLink = response.url;
      },
      error: (error) => {
        console.log('Error fetching user avatar:', error);
      },
    });
  }

  // Clear percentage once upload completes successfully
  clearUploadProgress(): void {
    this.percentage = 0; // Reset progress
  }
  onFileInputClick(): void {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }
}
