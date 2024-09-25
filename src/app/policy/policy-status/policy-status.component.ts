import { Component } from '@angular/core';

@Component({
  selector: 'app-policy-status',
  templateUrl: './policy-status.component.html',
  styleUrls: ['./policy-status.component.scss']
})
export class PolicyStatusComponent {

  status: string = 'Pending'; // or 'Approved' // TODO: Need to write logic
  showMoreDetails: boolean = false;

  toggleDetails() {
    this.showMoreDetails = !this.showMoreDetails;
  }
}

