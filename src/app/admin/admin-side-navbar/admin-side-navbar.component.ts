import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { UserProfileService } from 'src/app/core/services/user-profile.service';
import { UserProfile } from 'src/app/core/models/user-profile.model';

@Component({
  selector: 'app-admin-side-navbar',
  templateUrl: './admin-side-navbar.component.html',
  styleUrls: ['./admin-side-navbar.component.scss']
})
export class AdminSideNavbarComponent implements OnInit {
  loggedIn: boolean = false; 
  isAdmin: boolean = false; 
  profile = {
    avatar: '/assets/images/admin-icon.png', 
    username: '', 
    email: '' 
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit(): void {
    // Subscribe to the authentication status BehaviorSubject
    this.authService.authStatus$.subscribe(
      (status: boolean) => {
        this.loggedIn = status;
        if (this.loggedIn) {
          this.checkAdminRole(); // Check if the user is admin
          this.fetchUserProfile(); // Fetch profile details
        }
      }
    );
  }

  // Check if the user is an admin
  checkAdminRole(): void {
    const role = this.authService.getRole();
    this.isAdmin = role === 'admin'; // Check if the role is 'admin'
  }

  // Fetch user profile and update the BehaviorSubject
  fetchUserProfile(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.userProfileService.getUserProfileById(Number(userId)).subscribe(
        (userProfile: UserProfile) => {
          this.profile.username = userProfile.username;
          this.profile.email = userProfile.email;
        },
        (error) => {
          console.error('Error fetching user profile:', error);
        }
      );
    }
  }

  // Navigate to Admin Profile page
  navigateToProfile() {
    this.router.navigate(['/admin/profile']); // Navigate to profile
  }

  // Navigate to Add Admin page
  navigateToAddAdmin() {
    this.router.navigate(['/admin/add-admin']); // Navigate to the 'Add Admin' page
  }

  // Logout user and clear token
  logout() {
    this.authService.logout();
    this.router.navigate(['/authentication/admin-login']); // Redirect to admin login after logout
  }
}
