import { Component, ElementRef, HostListener, Renderer2, ViewChild, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InsurancePlans } from 'src/app/core/models/insurance-plans.model';
import { InsurancePlansService } from 'src/app/core/services/insurance-plans.service';
import { InsuranceOptionService } from 'src/app/core/services/insurance-option.service'; // Import service

@Component({
  selector: 'app-policy-list',
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.scss']
})
export class PolicyListComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('formFilter', { static: false }) formFilterElement!: ElementRef;
  @ViewChild('formBackdrop', { static: false }) formBackdropElement!: ElementRef;
  @ViewChild('highlight', { static: false }) highlightElement!: ElementRef;

  isScrolled: boolean = false;
  policyListForm!: FormGroup;
  plans: InsurancePlans[] = [];
  filteredPlans: InsurancePlans[] = []; // New array to hold filtered plans
  errorMessage: string = '';
  plansLoading: boolean = false;

  // Dropdown options
  typeOptions = ['Show All', 'Bike', 'Car', 'Truck'];
  engineCCOptions = [0, 100, 250, 500, 1000, 1500, 2000, 2500, 3000, 4000, 5000]; // Numeric options
  seatingCapacityOptions = ['Show All', 2, 4, 8];
  planTypeOptions = ['Show All', 'Basic', 'Comprehensive', 'Third Party'];

  isFocused: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private insurancePlansService: InsurancePlansService,
    private insuranceOptionService: InsuranceOptionService // Inject service
  ) {
    this.policyListForm = this.formBuilder.group({
      type: ['Show All'],
      engineCC: [0], // Default to 0
      seatingCapacity: ['Show All'],
      planType: ['Show All'],
    });
  }

  ngOnInit() {
    this.getInsurancePlans();
  }

  ngOnDestroy() {}

  ngAfterViewInit() {
    this.setFocusEffect();
    this.onWindowScroll();
  }

  onSubmit() {
    this.calculatePremiumAndDisplay(); // Call function to calculate premium and update display
  }

  getInsurancePlans(): void {
    this.plansLoading = true;
    this.insurancePlansService.getInsurancePlans().subscribe({
      next: (data: InsurancePlans[] | undefined) => {
        if (data) {
          this.plans = data;
          this.filteredPlans = data; // Initialize filtered plans with all plans
        }
        this.plansLoading = false;
      },
      error: (error: any) => {
        this.errorMessage = 'Error: Unable to fetch Insurance Plans.';
        this.plansLoading = false;
        console.error('Error fetching Insurance Plans:', error);
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.formFilterElement) {
      return;
    }

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollTop > 200;
    if (this.isScrolled) {
      this.renderer.setStyle(this.formFilterElement.nativeElement, 'top', '0px');
      this.renderer.setStyle(this.formFilterElement.nativeElement, 'transform', 'translateX(12.5%)');
      this.renderer.setStyle(this.formBackdropElement.nativeElement, 'top', '0px');
    } else {
      this.renderer.setStyle(this.formFilterElement.nativeElement, 'top', '70px');
      this.renderer.setStyle(this.formFilterElement.nativeElement, 'transform', 'translateX(12.5%)');
      this.renderer.setStyle(this.formBackdropElement.nativeElement, 'top', '50px');
    }
  }

  setFocusEffect() {
    this.isFocused = true;
    this.renderer.setStyle(this.formBackdropElement.nativeElement, 'background-color', 'white');
    this.renderer.setStyle(this.highlightElement.nativeElement, 'top', '50%');

    this.formFilterElement.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });

    setTimeout(() => {
      this.removeFocus();
    }, 3000);
  }

  removeFocus() {
    this.isFocused = false;
    window.scrollTo(0, 0);
    this.renderer.setStyle(this.highlightElement.nativeElement, 'top', '150%');
    this.renderer.setStyle(this.highlightElement.nativeElement, 'opacity', '0');
    this.renderer.setStyle(this.formBackdropElement.nativeElement, 'background-color', 'var(--form-backdrop-default-bg)');
  }

  // Updated method to calculate premium and update the display
  calculatePremiumAndDisplay(): void {
    const requestData = {
      VehicleType: this.policyListForm.get('type')?.value,
      SeatingCapacity: this.policyListForm.get('seatingCapacity')?.value,
      EngineCC: this.policyListForm.get('engineCC')?.value,
      PlanType: this.policyListForm.get('planType')?.value
    };

    // Log the request data (optional)
    console.log('Request Data for Premium Calculation:', requestData);

    // Check for "Show All" and skip the POST request if true
    if (requestData.VehicleType === 'Show All' || requestData.PlanType === 'Show All') {
      this.filteredPlans = this.plans.filter(plan => {
        const isTypeMatch = requestData.VehicleType === 'Show All' || plan.vehicleType === requestData.VehicleType;
        const isPlanTypeMatch = requestData.PlanType === 'Show All' || plan.planType === requestData.PlanType;

        return isTypeMatch && isPlanTypeMatch;
      });
      return; // Exit the method without making a POST request
    }

    // Make the POST request to calculate premium
    this.insuranceOptionService.calculatePremium(requestData).subscribe({
      next: (response) => {
        // Extract the premium from the response
        const { premium } = response;

        // Update the premium on the correct plan card based on vehicleType and planType
        this.plans = this.plans.map(plan => {
          if (plan.vehicleType === requestData.VehicleType && plan.planType === requestData.PlanType) {
            return {
              ...plan,
              basePremium: premium // Update the premium for the matching plan
            };
          }
          return plan;
        });

        // Filter the plans based on selected type and plan type
        this.filteredPlans = this.plans.filter(plan => {
          const isTypeMatch = requestData.VehicleType === 'Show All' || plan.vehicleType === requestData.VehicleType;
          const isPlanTypeMatch = requestData.PlanType === 'Show All' || plan.planType === requestData.PlanType;

          return isTypeMatch && isPlanTypeMatch;
        });

        // No need to print the premium to console
        console.log('Premium Calculation Response:', response); 
      },
      error: (error) => {
        console.error('Error calculating premium:', error);
      }
    });
  }
}
