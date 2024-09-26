import { Component, ElementRef, HostListener, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InsurancePlans } from 'src/app/core/models/insurance-plans.model';
import { InsurancePlansService } from 'src/app/core/services/insurance-plans.service';

@Component({
  selector: 'app-policy-list',
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.scss']
})
export class PolicyListComponent implements AfterViewInit {
  @ViewChild('formFilter', { static: false }) formFilterElement!: ElementRef;
  @ViewChild('formBackdrop', { static: false }) formBackdropElement!: ElementRef;
  @ViewChild('highlight', { static: false }) highlightElement!: ElementRef;

  isScrolled: boolean = false;
  policyListForm!: FormGroup;
  plans: InsurancePlans[] = [];
  errorMessage: string = '';
  plansLoading: boolean = false;

  isFocused: boolean = false;
  clickListener: any;


  constructor(
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private insurancePlansService: InsurancePlansService,
  ) {
    this.policyListForm = this.formBuilder.group({
      type: ['show all'],
      make: ['show all'],
      engineCC: ['show all'],
      seatingCapacity: ['show all'],
    });
  }

  ngOnInit() {
    this.getInsurancePlans();
  }

  ngOnDestroy() {

  }

  ngAfterViewInit() {
    this.setFocusEffect();

    this.onWindowScroll();
  }
  onSubmit() {
    console.log('PolicyList');
  }
  getInsurancePlans(): void {
    this.plansLoading = true;
    this.insurancePlansService.getInsurancePlans().subscribe({
      next: (data: InsurancePlans[] | undefined) => {
        if (data) {
          this.plans = data;
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
      return;  // Check if formFilterElement is available
    }

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollTop > 200;  // Adjust the threshold for when the navbar should animate up
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
    this.isFocused = true; // Trigger the dim background
    this.renderer.setStyle(this.formBackdropElement.nativeElement, 'background-color', 'white');
    this.renderer.setStyle(this.highlightElement.nativeElement, 'top', '50%');
    
    this.formFilterElement.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });

    // Remove dim background effect after some time (e.g., 3 seconds)
    setTimeout(() => {
     this.removeFocus();
    }, 3000);  // Adjust the delay as needed
  }

  removeFocus() {
    this.isFocused = false;
    window.scrollTo(0, 0);
    this.renderer.setStyle(this.highlightElement.nativeElement, 'top', '150%');
    this.renderer.setStyle(this.highlightElement.nativeElement, 'opacity', '0');
    this.renderer.setStyle(this.formBackdropElement.nativeElement, 'background-color', 'var(--form-backdrop-default-bg)');
  }

  
}
