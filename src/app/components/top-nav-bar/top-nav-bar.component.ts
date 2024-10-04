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
  profile = {
    avatar: '/assets/images/login-images/apple_icon.png', // Default avatar
    username: '', // Dynamically populated
    email: '' // Dynamically populated
  };

  constructor(
    private router: Router,
    private authService: AuthService, // Inject AuthService
    private userProfileService: UserProfileService // Inject UserProfileService
  ) {}

  ngOnInit(): void {
    this.checkUserAuthentication();
  }

  // Method to check user authentication and fetch profile
  checkUserAuthentication(): void {
    this.loggedIn = this.authService.isAuthenticated();

    if (this.loggedIn) {
      // Fetch user ID from the token
      const userId = this.authService.getUserId();

      if (userId) {
        // Fetch the user profile using the ID
        this.fetchUserProfile(Number(userId));
      }
    }
  }

  // Fetch detailed user profile using the user ID
  fetchUserProfile(userId: number): void {
    this.userProfileService.getUserProfileById(userId).subscribe(
      (userProfile: UserProfile) => {
        // Update profile with fetched data
        this.profile.username = userProfile.username;
        this.profile.email = userProfile.email;
        // You can update the avatar if it exists in the profile object
        // this.profile.avatar = userProfile.avatar || this.profile.avatar;
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
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
  navigateToSignUp(){
    this.router.navigate(['/authentication/user-signup']);
  }
}
