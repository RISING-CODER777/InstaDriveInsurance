import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InsuranceOption } from 'src/app/core/models/insurance-option.model';
import { InsuranceOptionService } from 'src/app/core/services/insurance-option.service';
import { InsuranceOptionSelectionService } from 'src/app/core/services/insurance-option-selection.service';
import { InsuranceOptionSelection } from 'src/app/core/models/insurance-option-selection.model';
import { SharedDataService } from 'src/app/core/services/shared-data.service';

@Component({
  selector: 'app-policy-detail',
  templateUrl: './policy-detail.component.html',
  styleUrls: ['./policy-detail.component.scss'],
})
export class PolicyDetailComponent implements OnInit {
  hoveredOption: InsuranceOption | null = null;

  addOnOptions: InsuranceOption[] = [];
  accidentCoverOptions: InsuranceOption[] = [];
  accessoryCoverOptions: InsuranceOption[] = [];

  selectedOptions: InsuranceOption[] = [];
  totalPrice: number = 0;  // Total price of selected options
  baseInsuranceAmount: number = 0;  // Base insurance plan amount
  totalOptionsAmount: number = 0;  // Total price of all selected options
  totalPayableAmount: number = 0;  // Final payable amount
  planName: string = ''; // Variable to hold the plan name
  proposalID: number | undefined;

  constructor(
    private insuranceOptionService: InsuranceOptionService,
    private insuranceOptionSelectionService: InsuranceOptionSelectionService,
    private router: Router,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {
    this.loadInsuranceOptions();
    this.loadSharedData(); // Load the base amount and plan name from shared data
  }

  // Load available insurance options from service
  loadInsuranceOptions(): void {
    this.insuranceOptionService.getInsuranceOptions().subscribe((data: InsuranceOption[]) => {
      this.addOnOptions = data.filter(option => option.optionType === 'AddOn');
      this.accidentCoverOptions = data.filter(option => option.optionType === 'AccidentCover');
      this.accessoryCoverOptions = data.filter(option => option.optionType === 'AccessoryCover');
    });
  }

  // Load base insurance amount, plan name, and proposal ID from SharedDataService
  loadSharedData(): void {
    this.baseInsuranceAmount = this.sharedDataService.getPremiumAmount(); // Get base amount from shared data
    this.planName = this.sharedDataService.getPlanName(); // Get plan name from shared data
    this.proposalID = this.sharedDataService.getProposalID(); // Get proposal ID from shared data
    console.log('Base Insurance Amount:', this.baseInsuranceAmount);
    console.log('Plan Name:', this.planName);
    console.log('Proposal ID:', this.proposalID);
  }

  // Handle changes in the user's selection of options
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
    console.log('Selected options:', this.selectedOptions); // Debugging output
    this.calculateTotalPayableAmount();
  }

  // Calculate the total amount the user will have to pay
  calculateTotalPayableAmount(): void {
    this.totalPayableAmount = this.baseInsuranceAmount + this.totalOptionsAmount;
  }

  // Show a tooltip when hovering over an option
  showTooltip(option: InsuranceOption) {
    this.hoveredOption = option;
  }

  // Hide the tooltip
  hideTooltip() {
    this.hoveredOption = null;
  }

  // Send selected options to backend
  sendQuote() {
    if (this.proposalID) {
      // Map selected options to the format the backend expects
      const selectedOptionData: InsuranceOptionSelection[] = this.selectedOptions.map(option => ({
        proposalID: this.proposalID!,  // Use the proposalID from shared data
        optionID: option.optionID,  // Use the selected option's ID
        price: option.price,  // Use the selected option's price
      }));

      console.log('Data to be sent:', selectedOptionData); // Debugging output

      // Post selected options to the backend
      this.insuranceOptionSelectionService.postSelectedOptions(selectedOptionData).subscribe(
        (response: any) => {
          console.log('Options submitted successfully:', response);
          this.router.navigate(['/policy/policy-status']);
        },
        (error: any) => {
          console.error('Error submitting options:', error);
        }
      );
    } else {
      console.error('Proposal ID is missing');
    }
  }
}
