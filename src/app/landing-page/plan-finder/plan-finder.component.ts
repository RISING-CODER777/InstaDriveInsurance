import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/core/services/shared-data.service'; // Import the shared data service

@Component({
  selector: 'app-plan-finder',
  templateUrl: './plan-finder.component.html',
  styleUrls: ['./plan-finder.component.scss'],
})
export class PlanFinderComponent {
  selectedVehicle: string = 'car'; // Default set to 'car'
  vehicleNumber: string = ''; // Vehicle number variable remains for user input, but will not be used

  constructor(private router: Router, private sharedDataService: SharedDataService) {} // Inject the shared data service

  // Get placeholder based on selected vehicle type
  getPlaceholder(): string {
    switch (this.selectedVehicle) {
      case 'car':
        return 'e.g., MH01AB1234';
      case 'bike':
        return 'e.g., MH01AB123';
      case 'truck':
        return 'e.g., MH01AB12345';
      default:
        return '';
    }
  }

  // Function to get the maximum length of the input based on vehicle type
  getMaxLength(): number {
    switch (this.selectedVehicle) {
      case 'car':
        return 10;
      case 'bike':
        return 9;
      case 'truck':
        return 12;
      default:
        return 0;
    }
  }

  // Navigate to policy list with selected vehicle type when button is clicked
  viewPrices() {
    // Store the selected vehicle type in the shared data service
    this.sharedDataService.setVehicleType(this.selectedVehicle);
    this.sharedDataService.setVehicleNumber(this.vehicleNumber);


    // Navigate to the policy list 
    this.router.navigate(['/policy/policy-list'], {
      queryParams: { type: this.selectedVehicle }, 
    });
  }
}
