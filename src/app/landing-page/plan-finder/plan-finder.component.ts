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
  vehicleNumber: string = ''; // Vehicle number variable for user input
  errorMessage: string = ''; // Variable to hold validation error message

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

  // Function to validate the vehicle number input
  validateInput(): boolean {
    this.errorMessage = ''; // Reset error message

    // Check if the vehicle number is empty
    if (!this.vehicleNumber) {
      this.errorMessage = 'Vehicle number is required.';
      return false;
    }

    // Check if the vehicle number length is valid
    const maxLength = this.getMaxLength();
    if (this.vehicleNumber.length !== maxLength) {
      this.errorMessage = `Vehicle number must be exactly ${maxLength} characters.`;
      return false;
    }

    return true; // Input is valid
  }

  // Navigate to policy list with selected vehicle type when button is clicked
  viewPrices() {
    // Validate input before proceeding
    if (this.validateInput()) {
      // Store the selected vehicle type in the shared data service
      this.sharedDataService.setVehicleType(this.selectedVehicle);
      this.sharedDataService.setVehicleNumber(this.vehicleNumber);

      // Navigate to the policy list 
      this.router.navigate(['/policy/policy-list'], {
        queryParams: { type: this.selectedVehicle }, 
      });
    }
  }
}
