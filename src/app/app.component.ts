import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'instadrive-insurance';
  
  isAdminRoute = false;
  isLoading = true; 

  constructor(private router: Router) {
    // Subscribe to router events to check the current route 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Route navigation has started, show the loading spinner
        this.isLoading = true;
      }

      if (event instanceof NavigationEnd) {
        // Check if the current route contains 'admin'
        this.isAdminRoute = this.router.url.startsWith('/admin');
        this.isLoading = false;
      }
    });
  }

  
}
