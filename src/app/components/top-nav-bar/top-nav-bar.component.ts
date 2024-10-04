import { Component, HostListener, OnInit } from '@angular/core';
import { NavUtilities } from '../utilities/nav-utilities';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { UserProfileService } from 'src/app/core/services/user-profile.service';
import { UserProfile } from 'src/app/core/models/user-profile.model';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss']
})
export class TopNavBarComponent implements OnInit {
  siteConfig = NavUtilities.siteConfig;
  isScrolled: boolean = false;
  loggedIn: boolean = false; // Initially set to false, will be updated after authentication check
  isAdmin: boolean = false; // New variable to track if the user is admin
  profile = {
    avatar: '/assets/images/login-images/apple_icon.png', // Default avatar
    username: '', // Dynamically populated
    email: '' // Dynamically populated
  };

  constructor(
    private router: Router,
    private authService: AuthService, 
    private userProfileService: UserProfileService 
  ) {}

  ngOnInit(): void {
    // Subscribe to the authentication status BehaviorSubject
    this.authService.authStatus$.subscribe(
      (status: boolean) => {
        this.loggedIn = status;
        if (this.loggedIn) {
          this.fetchUserProfile();
          // Check if the logged-in user is an admin
          this.isAdmin = this.authService.getRole() === 'admin';
        }
      }
    );

    // Subscribe to the user profile BehaviorSubject
    this.authService.userProfile$.subscribe(
      (profile: any) => {
        if (profile) {
          this.profile.username = profile.username;
          this.profile.email = profile.email;
        }
      }
    );
  }

  // Fetch user profile and update the BehaviorSubject
  fetchUserProfile(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.userProfileService.getUserProfileById(Number(userId)).subscribe(
        (userProfile: UserProfile) => {
          this.authService.updateUserProfile(userProfile);
        },
        (error) => {
          console.error('Error fetching user profile:', error);
        }
      );
    }
  }

  // Scroll event listener to add animation to navbar
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollTop > 200;  // Adjust threshold for scroll animation
  }

  // Navigation to Login page
  navigateToLogin() {
    this.router.navigate(['/authentication/user-login']);
  }

  // Navigation to Signup page
  navigateToSignUp() {
    this.router.navigate(['/authentication/user-signup']);
  }

  // Navigate to User Profile page
  navigateToProfile() {
    this.router.navigate(['/user/user-profile']); // Navigates to the user profile page
  }

  // Navigate to Proposal Status page
  navigateToProposalStatus() {
    this.router.navigate(['/policy/policy-status']); // Navigates to the proposal status page
  }

  // Logout user and clear token
  logout() {
    this.authService.logout(); // Call logout method to handle token removal
  }
}
