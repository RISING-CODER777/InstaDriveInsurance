import { Component, HostListener, OnInit } from '@angular/core';
import { NavUtilities } from '../utilities/nav-utilities';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { UserProfileService } from 'src/app/core/services/user-profile.service';
import { UserProfile } from 'src/app/core/models/user-profile.model';
import { UserAvatar } from 'src/app/user/models/user-avatar.model';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss'],
})
export class TopNavBarComponent implements OnInit {
  siteConfig = NavUtilities.siteConfig;
  isScrolled: boolean = false;
  loggedIn: boolean = false; // Initially set to false, will be updated after authentication check
  isAdmin: boolean = false; // Variable to track if the user is admin
  profile = {
    avatar: '/assets/images/login-images/avatar.png', // Default avatar
    username: '', // Dynamically populated
    email: '', // Dynamically populated
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit(): void {
    // Subscribe to the authentication status BehaviorSubject
    this.authService.authStatus$.subscribe((status: boolean) => {
      console.log('Authentication status:', status); // Log the authentication status
      this.loggedIn = status;
      if (this.loggedIn) {
        this.fetchUserProfile();
        // Check if the logged-in user is an admin
        this.isAdmin = this.authService.getRole() === 'admin';
        console.log('Is admin:', this.isAdmin); // Log if the user is admin
      }
    });

    // Subscribe to the user profile BehaviorSubject
    this.authService.userProfile$.subscribe((profile: any) => {
      if (profile) {
        console.log('User profile:', profile); // Log the fetched user profile
        this.profile.username = profile.username;
        this.profile.email = profile.email;
      }
    });
  }

  // Fetch user profile and avatar, then update the BehaviorSubject
  fetchUserProfile(): void {
    const userId = this.authService.getUserId();
    console.log('Fetching user profile for user ID:', userId); // Log the user ID being fetched

    if (userId) {
      // Convert userId to a number
      const numericUserId = Number(userId);

      // Fetch user profile
      this.userProfileService.getUserProfileById(numericUserId).subscribe({
        next: (profile: UserProfile) => {
          if (profile) {
            this.profile.username = profile.username;
            this.profile.email = profile.email;
            this.fetchUserAvatar(numericUserId); // Fetch user avatar after getting the profile
          }
        },
        error: (error) => {
          console.error('Error fetching user profile:', error);
        },
      });
    } else {
      console.warn('No user ID found.'); // Log warning if user ID is not found
    }
  }

  // Method to fetch user avatar
  fetchUserAvatar(userId: number): void {
    this.userProfileService.getUserAvatar(userId).subscribe({
      next: (avatar: UserAvatar) => {
        if (avatar && avatar.url) {
          this.profile.avatar = avatar.url; // Use the avatar URL from the response
          console.log('Profile avatar updated to:', this.profile.avatar); // Log the avatar update
        } else {
          console.warn('No avatar URL found in the response.'); // Log warning if no URL is found
        }
      },
      error: (error) => {
        console.error('Error fetching user avatar:', error);
      },
    });
  }

  // Scroll event listener to add animation to navbar
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollTop > 200; // Adjust threshold for scroll animation
    console.log('Scroll position:', scrollTop); // Log the scroll position
  }

  // Navigation and logout methods
  navigateToLogin() {
    console.log('Navigating to Login page');
    this.router.navigate(['/authentication/user-login']);
  }

  navigateToSignUp() {
    console.log('Navigating to Signup page');
    this.router.navigate(['/authentication/user-signup']);
  }

  navigateToProfile() {
    console.log('Navigating to User Profile page');
    this.router.navigate(['/user/user-profile']);
  }

  navigateToProposalStatus() {
    console.log('Navigating to Proposal Status page');
    this.router.navigate(['/policy/policy-status']);
  }

  logout() {
    console.log('Logging out user');
    this.authService.logout();
  }
}
