import { Component, HostListener } from '@angular/core';
import { NavUtilities } from '../utilities/nav-utilities';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss']
})
export class TopNavBarComponent {
  siteConfig = NavUtilities.siteConfig;
  isScrolled: boolean = false;
  loggedIn: boolean = true;
  profile = {
    avatar: '/assets/images/login-images/apple_icon.png',
    username: 'John Doe',
    email: 'XH8oQ@example.com'

  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollTop > 200;  // Adjust the threshold for when the navbar should animate up
    
  }

  constructor(private router: Router) { }

  navigateToLogin() {
    this.router.navigate(['/authentication/user-login']);
  }

  navigateToSignUp(){
    this.router.navigate(['/authentication/user-signup']);
  }

}
