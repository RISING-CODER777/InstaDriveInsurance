import { Component, ElementRef, HostListener, Renderer2, ViewChild, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InsurancePlans } from 'src/app/core/models/insurance-plans.model';
import { InsurancePlansService } from 'src/app/core/services/insurance-plans.service';
import { InsuranceOptionService } from 'src/app/core/services/insurance-option.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from 'src/app/core/services/shared-data.service'; // Import the SharedDataService

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
  filteredPlans: InsurancePlans[] = [];
  errorMessage: string = '';
  plansLoading: boolean = false;

  // Dropdown options
  typeOptions = ['Show All', 'Bike', 'Car', 'Truck'];
  engineCCOptions = [0, 100, 250, 500, 1000, 1500, 2000, 2500, 3000, 4000, 5000];
  seatingCapacityOptions = ['Show All', 2, 4, 8];
  planTypeOptions = ['Show All', 'Basic', 'Comprehensive', 'Third Party'];

  isFocused: boolean = false;
  policyType: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private insurancePlansService: InsurancePlansService,
    private insuranceOptionService: InsuranceOptionService,
    private route: ActivatedRoute,
    private router: Router,
    private sharedDataService: SharedDataService // Inject SharedDataService
  ) {
    // Initialize form with default values
    this.policyListForm = this.formBuilder.group({
      type: ['Show All'],
      engineCC: [100],
      seatingCapacity: ['Show All'],
      planType: ['Show All'],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.policyType = params['type'];
      this.policyListForm.patchValue({
        type: this.policyType ? this.capitalizeFirstLetter(this.policyType) : 'Show All'
      });
      this.getInsurancePlans();
    });
  }

  ngOnDestroy() {}

  ngAfterViewInit() {
    this.setFocusEffect();
    this.onWindowScroll();
  }

  capitalizeFirstLetter(type: string): string {
    return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  }

  onSubmit() {
    this.calculatePremiumAndDisplay();
  }

  getInsurancePlans(): void {
    this.plansLoading = true;
    this.insurancePlansService.getInsurancePlans().subscribe({
      next: (data: InsurancePlans[] | undefined) => {
        if (data) {
          this.plans = data;
          this.filterPlans();
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
    if (!this.formFilterElement) return;
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
    this.formFilterElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => this.removeFocus(), 3000);
  }

  removeFocus() {
    this.isFocused = false;
    window.scrollTo(0, 0);
    this.renderer.setStyle(this.highlightElement.nativeElement, 'top', '150%');
    this.renderer.setStyle(this.highlightElement.nativeElement, 'opacity', '0');
    this.renderer.setStyle(this.formBackdropElement.nativeElement, 'background-color', 'var(--form-backdrop-default-bg)');
  }

  calculatePremiumAndDisplay(): void {
    const requestData = {
      VehicleType: this.policyListForm.get('type')?.value,
      SeatingCapacity: this.policyListForm.get('seatingCapacity')?.value,
      EngineCC: this.policyListForm.get('engineCC')?.value,
      PlanType: this.policyListForm.get('planType')?.value
    };

    // Store data in SharedDataService
    this.sharedDataService.setVehicleType(requestData.VehicleType);
    this.sharedDataService.setEngineCC(requestData.EngineCC);
    this.sharedDataService.setSeatingCapacity(requestData.SeatingCapacity);
    this.sharedDataService.setPlanType(requestData.PlanType);

    this.sharedDataService.printSharedData(); // print the shared data


    this.filterPlans();

    if (requestData.VehicleType !== 'Show All' && requestData.PlanType !== 'Show All') {
      this.insuranceOptionService.calculatePremium(requestData).subscribe({
        next: (response) => {
          const { premium } = response;
          this.updatePremiumForMatchingPlan(requestData.VehicleType, requestData.PlanType, premium);
        },
        error: (error) => {
          console.error('Error calculating premium:', error);
        }
      });
    }
  }

  filterPlans(): void {
    const selectedType = this.policyListForm.get('type')?.value;
    const selectedPlanType = this.policyListForm.get('planType')?.value;
    this.filteredPlans = this.plans.filter(plan => {
      const isTypeMatch = selectedType === 'Show All' || plan.vehicleType === selectedType;
      const isPlanTypeMatch = selectedPlanType === 'Show All' || plan.planType === selectedPlanType;
      return isTypeMatch && isPlanTypeMatch;
    });
  }

  updatePremiumForMatchingPlan(vehicleType: string, planType: string, premium: number): void {
    this.plans = this.plans.map(plan => {
      if (plan.vehicleType === vehicleType && plan.planType === planType) {
        return { ...plan, basePremium: premium };
      }
      return plan;
    });
    this.filterPlans();
  }

  // Method to handle clicking on the premium amount
  onPremiumClick(plan: InsurancePlans): void {
    console.log('Selected Plan ID:', plan.insurancePlanID); // Log the insurance plan ID
    console.log('Selected Plan Name:', plan.planName); // Log the insurance plan name

    // Set the plan ID in SharedDataService
    this.sharedDataService.setPlanId(plan.insurancePlanID);
    this.sharedDataService.setPlanName(plan.planName); 


    // Redirect to the policy form page and retain query params
    this.router.navigate(['/policy/policy-form'], {
      // queryParams: {
    //   type: this.policyListForm.get('type')?.value,
    //   engineCC: this.policyListForm.get('engineCC')?.value,
    //   seatingCapacity: this.policyListForm.get('seatingCapacity')?.value,
    //   planType: this.policyListForm.get('planType')?.value,
    //   planId: plan.insurancePlanID // Pass the selected plan ID
    // }
    });
  }
}
