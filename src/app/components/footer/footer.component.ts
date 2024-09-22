import { Component } from '@angular/core';
import { NavUtilities } from '../utilities/nav-utilities';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
 
  siteConfig = NavUtilities.siteConfig;
  currentYear: number = new Date().getFullYear(); 
}
