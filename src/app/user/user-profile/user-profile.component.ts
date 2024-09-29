import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { UserProfile } from 'src/app/core/models/user-profile.model';
import { UserProfileService } from 'src/app/core/services/user-profile.service';
import { UserService } from '../services/user.service';
import { UserPolicies } from '../models/user-policies.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userProfile: UserProfile | undefined;
  userPolicies!: UserPolicies[];

  userPolicyLoading: boolean = false;
  errorMessage: string | undefined;
  userId: number = 3;

  // Claim form fields
  claimForm = {
    DateOfIncident: '',
    Description: '',
    ClaimType: ''
  };

  constructor(
    private userProfileService: UserProfileService,
    private userService: UserService
  ) {
    this.userPolicies = [];
  }

  ngOnInit(): void {
    this.getUserProfileDetails(this.userId);
    this.getUserPolicies(this.userId); // Pass user ID to the method
  }

  // TODO: Need to implement service for Claim Policy Method
  claimPolicy(policyId: number): void {
    const policy = this.userPolicies.find(p => p.id === policyId);
    if (policy) {
      if (policy.showDoneButton) {
        // Submit the claim and mark policy as claimed
        policy.showDoneButton = false;
        policy.isClaimed = true;
        this.submitClaim(policy.id);
        console.log("Policy Claimed"); // Your original comment
      } else if (!policy.isClaimed && !policy.showDoneButton) {
        // Show the claim form
        policy.showDoneButton = true;
      }
    }
  }

  // TODO: Need to implement service for Renew Policy Method
  renewPolicy(policyId: number): void {
    console.log('Renewing policy:', policyId); // Your original comment
  }

  // Submit the claim form
  submitClaim(policyId: number): void {
    const claimData = {
      policyId: policyId,
      ...this.claimForm // Collect form data
    };
    console.log('Submitting claim for policy:', claimData); // Your original comment
    // Reset the form after submission
    this.claimForm = {
      DateOfIncident: '',
      Description: '',
      ClaimType: ''
    };
  }

  getUserProfileDetails(id: number): void {
    this.userProfileService.getUserProfileById(id).pipe(
      catchError((error) => {
        // Set error message if the request fails
        this.errorMessage = 'Error: Unable to reach the server. Please try again later.';
        console.error('Error fetching user profile:', error); // Log the actual error

        // Return an empty observable so that the app doesn't crash and still renders with 'Not Available'
        return of(undefined); // Observable that returns undefined
      })
    ).subscribe((data: UserProfile | undefined) => {
      if (data) {
        this.userProfile = data; // If we get the data, update userProfile
      }
    });
  }

  getUserPolicies(userId: number): void { // Accept userId as a parameter
    this.userPolicyLoading = true;
    this.userService.getUserPolicies(userId).subscribe({
      next: (data: UserPolicies[] | undefined) => {
        if (data) {
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
}
