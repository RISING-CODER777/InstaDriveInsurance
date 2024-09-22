import { Component, HostListener } from '@angular/core';
import { NavUtilities } from '../utilities/nav-utilities';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss']
})
export class TopNavBarComponent {
  siteConfig = NavUtilities.siteConfig;
  isScrolled: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    console.log(scrollTop);
    this.isScrolled = scrollTop > 200;  // Adjust the threshold for when the navbar should animate up
    console.log(this.isScrolled);
  }
}
