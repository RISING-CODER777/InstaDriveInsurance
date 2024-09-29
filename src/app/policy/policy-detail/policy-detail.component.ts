import { Component } from '@angular/core';
import { InsuranceOption } from 'src/app/core/models/insurance-option.model';
import { InsuranceOptionService } from 'src/app/core/services/insurance-option.service';

@Component({
  selector: 'app-policy-detail',
  templateUrl: './policy-detail.component.html',
  styleUrls: ['./policy-detail.component.scss'],
})
export class PolicyDetailComponent {
  hoveredOption: InsuranceOption | null = null;

  addOnOptions: InsuranceOption[] = [];
  accidentCoverOptions: InsuranceOption[] = [];
  accessoryCoverOptions: InsuranceOption[] = [];

  selectedOptions: InsuranceOption[] = [];
  totalPrice: number = 0;  // Total price of selected options
  baseInsuranceAmount: number = 1000000;  // Base insurance plan amount
  totalOptionsAmount: number = 0;  // Total price of all selected options
  totalPayableAmount: number = 0;  // Final payable amount

  constructor(private insuranceOptionService: InsuranceOptionService) {}

  ngOnInit(): void {
    this.loadInsuranceOptions();
  }

  loadInsuranceOptions(): void {
    this.insuranceOptionService.getInsuranceOptions().subscribe((data: InsuranceOption[]) => {
      this.addOnOptions = data.filter(option => option.optionType === 'AddOn');
      this.accidentCoverOptions = data.filter(option => option.optionType === 'AccidentCover');
      this.accessoryCoverOptions = data.filter(option => option.optionType === 'AccessoryCover');
    });
  }

  showTooltip(option: InsuranceOption) {
    this.hoveredOption = option;
  }

  hideTooltip() {
    this.hoveredOption = null;
  }

  onOptionChange(option: InsuranceOption, isChecked: boolean) {
    if (isChecked) {
      this.selectedOptions.push(option);
      this.totalOptionsAmount += option.price;
    } else {
      const index = this.selectedOptions.indexOf(option);
      if (index > -1) {
        this.selectedOptions.splice(index, 1);
        this.totalOptionsAmount -= option.price;
      }
    }
    this.calculateTotalPayableAmount();
  }

  calculateTotalPayableAmount(): void {
    this.totalPayableAmount = this.baseInsuranceAmount + this.totalOptionsAmount;
  }
}
