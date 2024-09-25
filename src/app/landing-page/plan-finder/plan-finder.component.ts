import { Component } from '@angular/core';

@Component({
  selector: 'app-plan-finder',
  templateUrl: './plan-finder.component.html',
  styleUrls: ['./plan-finder.component.scss'],
})
export class PlanFinderComponent {
  selectedVehicle: string = 'car';
  vehicleNumber: string = '';

  // get placeholder based on selected vehicle type
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
}
