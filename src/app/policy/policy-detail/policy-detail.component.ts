import { Component } from '@angular/core';
import { InsuranceOption } from 'src/app/core/models/insurance-option.model';
import { InsuranceOptionService } from 'src/app/core/services/insurance-option.service';

@Component({
  selector: 'app-policy-detail',
  templateUrl: './policy-detail.component.html',
  styleUrls: ['./policy-detail.component.scss'],
})
export class PolicyDetailComponent {
  hoveredOption: any = null;

  // Properties to control the visibility of options
  showAddOnOptions = false;
  showAccidentCoverOptions = false;
  showAccessoryCoverOptions = false;

  // Initialize the options as empty arrays
  addOnOptions: InsuranceOption[] = [];
  accidentCoverOptions: InsuranceOption[] = [];
  accessoryCoverOptions: InsuranceOption[] = [];

  // Track selected options and total price
  selectedOptions: InsuranceOption[] = [];
  totalPrice: number = 0;
  
  constructor(private insuranceOptionService: InsuranceOptionService) {}

  ngOnInit(): void {
    this.loadInsuranceOptions();
  }
  
  loadInsuranceOptions(): void {
    this.insuranceOptionService.getInsuranceOptions().subscribe((data: InsuranceOption[]) => {
      // Split options based on optionType
      this.addOnOptions = data.filter(option => option.optionType === 'AddOn');
      this.accidentCoverOptions = data.filter(option => option.optionType === 'AccidentCover');
      this.accessoryCoverOptions = data.filter(option => option.optionType === 'AccessoryCover');
    });
  }
  
  
  // Methods to handle hover for tooltips
  showTooltip(option: any) {
    this.hoveredOption = option;
  }

  hideTooltip() {
    this.hoveredOption = null;
  }

  // Methods to toggle visibility of options
  toggleAddOnOptions() {
    this.showAddOnOptions = !this.showAddOnOptions;
  }

  toggleAccidentCoverOptions() {
    this.showAccidentCoverOptions = !this.showAccidentCoverOptions;
  }

  toggleAccessoryCoverOptions() {
    this.showAccessoryCoverOptions = !this.showAccessoryCoverOptions;
  }

   // Method to handle checkbox change
   onOptionChange(option: InsuranceOption, isChecked: boolean) {
    if (isChecked) {
      this.selectedOptions.push(option);
      this.totalPrice += option.price;
    } else {
      this.selectedOptions = this.selectedOptions.filter(o => o.optionName !== option.optionName);
      this.totalPrice -= option.price;
    }
  }

}
