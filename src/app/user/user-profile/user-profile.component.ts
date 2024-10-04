import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { UserProfile } from 'src/app/core/models/user-profile.model';
import { UserProfileService } from 'src/app/core/services/user-profile.service';
import { UserService } from '../services/user.service';
import { UserPolicies } from '../models/user-policies.model';
import { ClaimRequestService } from 'src/app/core/services/claim-request.service';
import { ClaimRequest } from 'src/app/core/models/claim-request.model';
import { AuthService } from 'src/app/authentication/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userProfile: UserProfile | undefined;
  userPolicies: UserPolicies[] = []; // Initialize to an empty array
  userPolicyLoading: boolean = false;
  errorMessage: string | undefined;
  userId: number; // Declare userId as a number

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
    private authService: AuthService // Inject AuthService
  ) {
    // Fetch userId dynamically from AuthService
    this.userId = Number(this.authService.getUserId()) || 0; // Ensure userId is a number
  }

  ngOnInit(): void {
    this.getUserProfileDetails(this.userId);
    this.getUserPolicies(this.userId);
  }

  claimPolicy(policyId: number): void {
    const policy = this.userPolicies.find((p) => p.policyID === policyId);
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
      claimType: this.claimForm.ClaimType,
    };

    this.claimRequestService.submitClaimRequest(claimData).subscribe({
      next: (response) => {
        console.log('Claim submitted successfully:', response);
        this.resetClaimForm(); // Reset form after successful submission
      },
      error: (error) => {
        console.error('Error submitting claim:', error);
        this.errorMessage =
          error.message || 'Error: Unable to submit the claim. Please try again.';
      },
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
          console.log('Policies fetched:', data);
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
      // Save changes if editing is done
      this.saveUserProfile();
    }
  }

  toggleAddressEdit(): void {
    this.isEditingAddress = !this.isEditingAddress;
    if (!this.isEditingAddress) {
      // Save changes if editing is done
      this.saveUserProfile();
    }
  }

  saveUserProfile(): void {
    if (this.userProfile) {
      // Logic to save user profile (e.g., call a service to update user profile)
      this.userProfileService.updateUserProfile(this.userId, this.userProfile).subscribe({
        next: (response) => {
          console.log('User profile updated successfully:', response);
        },
        error: (error) => {
          console.error('Error updating user profile:', error);
          this.errorMessage = 'Error: Unable to update profile. Please try again.';
        },
      });
    }
  }
}
