import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { VehicleValidators } from 'src/app/validators/vehicle-validators';
import { VehicleService } from 'src/app/core/services/vehicle.service';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/services/auth.service';

@Component({
  selector: 'app-policy-form',
  templateUrl: './policy-form.component.html',
  styleUrls: ['./policy-form.component.scss']
})
export class PolicyFormComponent implements OnInit {
  isLinear = true;
  policyForm: FormGroup;
  vehicleTypes = ['Bike', 'Car', 'Truck'];
  currentYear: number;
  isFromAutoFill: boolean = false;
  autoFilledRegistrationNumber: string = '';
  userId!: number; // Ensure userId is a number

  constructor(
    private builder: FormBuilder,
    private vehicleService: VehicleService,
    private sharedDataService: SharedDataService,
    private router: Router,
    private authService: AuthService
  ) {
    this.currentYear = new Date().getFullYear();
    this.policyForm = this.builder.group({
      basicInfo: this.builder.group({
        vehicleType: ['', Validators.required],
        make: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(/^[a-zA-Z0-9\s]*$/)]],
        model: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(/^[a-zA-Z0-9\s]*$/)]]
      }),
      vehicleDetails: this.builder.group({
        modelYear: ['', [
          Validators.required,
          Validators.minLength(4),
          VehicleValidators.yearRangeValidator(1900, this.currentYear)
        ]],
        purchaseYear: ['', [
          Validators.required,
          Validators.minLength(4),
          VehicleValidators.yearRangeValidator(1900, this.currentYear)
        ]],
        purchaseAmount: ['', [Validators.required, VehicleValidators.purchaseAmountValidator]]
      }),
      additionalDetails: this.builder.group({
        vin: ['', [Validators.required, Validators.maxLength(17), VehicleValidators.vinValidator]],
        engineNo: ['', [Validators.required, Validators.maxLength(10)]],
        color: ['', [Validators.required, Validators.maxLength(60), Validators.pattern(/^[a-zA-Z]+$/)]]
      }),
      vehicleSpecs: this.builder.group({
        fuelType: ['', [Validators.required, Validators.maxLength(30)]],
        registrationNumber: ['', [Validators.maxLength(40)]],
        mileage: ['', [Validators.required]]
      }),
      engineWeight: this.builder.group({
        engineCC: ['', [Validators.required]],
        grossWeight: ['', [Validators.required]],
        seatCapacity: ['', [Validators.required]]
      })
    });
  }

  ngOnInit(): void {
    // Fetch the user ID from AuthService
    const userIdFromService = this.authService.getUserId(); // Adjust this to match your actual method

    // Ensure userId is always a number, fallback to -1 if null or invalid
    this.userId = userIdFromService ? Number(userIdFromService) : -1;

    const registrationNumber = this.sharedDataService.getVehicleNumber();
    const engineCC = this.sharedDataService.getEngineCC();
    const seatCapacity = this.sharedDataService.getSeatingCapacity();

    this.isFromAutoFill = !!(registrationNumber || engineCC || seatCapacity);

    this.policyForm.patchValue({
      basicInfo: {
        vehicleType: this.sharedDataService.getVehicleType(),
      },
      vehicleSpecs: {
        registrationNumber: registrationNumber
      },
      engineWeight: {
        engineCC: engineCC,
        seatCapacity: seatCapacity,
      }
    });

    this.autoFilledRegistrationNumber = registrationNumber;

    // Disable fields only for autofill scenario
    if (registrationNumber) {
      this.policyForm.get('vehicleSpecs.registrationNumber')?.disable();
    }

    if (this.sharedDataService.getVehicleType()) {
      this.policyForm.get('basicInfo.vehicleType')?.disable();
    }

    if (engineCC) {
      this.policyForm.get('engineWeight.engineCC')?.disable();
    }

    if (seatCapacity) {
      this.policyForm.get('engineWeight.seatCapacity')?.disable();
    }
  }

  get basicInfoForm() {
    return this.policyForm.get('basicInfo') as FormGroup;
  }

  get vehicleDetailsForm() {
    return this.policyForm.get('vehicleDetails') as FormGroup;
  }

  get additionalDetailsForm() {
    return this.policyForm.get('additionalDetails') as FormGroup;
  }

  get vehicleSpecsForm() {
    return this.policyForm.get('vehicleSpecs') as FormGroup;
  }

  get engineWeightForm() {
    return this.policyForm.get('engineWeight') as FormGroup;
  }

  handleSubmit() {
    // Enable fields before submission
    this.policyForm.get('basicInfo.vehicleType')?.enable();
    this.policyForm.get('vehicleSpecs.registrationNumber')?.enable();
    this.policyForm.get('engineWeight.engineCC')?.enable();
    this.policyForm.get('engineWeight.seatCapacity')?.enable();

    if (this.policyForm.valid) {
      const vehicle = {
        userID: this.userId,
        vehicleType: this.basicInfoForm.value.vehicleType,
        make: this.basicInfoForm.value.make,
        model: this.basicInfoForm.value.model,
        modelYear: this.vehicleDetailsForm.value.modelYear,
        purchaseYear: this.vehicleDetailsForm.value.purchaseYear,
        purchaseAmount: this.vehicleDetailsForm.value.purchaseAmount,
        vin: this.additionalDetailsForm.value.vin,
        engineNo: this.additionalDetailsForm.value.engineNo,
        color: this.additionalDetailsForm.value.color,
        fuelType: this.vehicleSpecsForm.value.fuelType,
        registrationNumber: this.vehicleSpecsForm.value.registrationNumber,
        mileage: this.vehicleSpecsForm.value.mileage,
        engineCC: this.engineWeightForm.value.engineCC,
        grossWeight: this.engineWeightForm.value.grossWeight,
        seatCapacity: this.engineWeightForm.value.seatCapacity,
        isFromAutoFill: this.isFromAutoFill
      };

      console.log('Vehicle Data to Submit:', vehicle);

      this.vehicleService.submitVehicle(vehicle).subscribe({
        next: (response: any) => {
          console.log('Vehicle submitted successfully:', response);
          console.log('Vehicle ID:', response.vehicleID);

          // Prepare the proposal coverage object
          const premiumProposalCoverage = {
            userID: this.userId,
            vehicleID: response.vehicleID,
            insurancePlanID: this.sharedDataService.getPlanId()
          };

          // Submit the premium proposal coverage
          this.vehicleService.submitPremiumProposalCoverage(premiumProposalCoverage).subscribe({
            next: (proposalResponse) => {
              console.log('Premium proposal coverage submitted successfully:', proposalResponse);
              this.sharedDataService.setPremiumAmount(proposalResponse.premiumAmount);
              this.sharedDataService.setProposalID(proposalResponse.proposalID);
              this.router.navigate(['/policy/policy-detail']);
            },
            error: (error) => {
              console.error('Error submitting premium proposal coverage:', error);
            }
          });

          // Reset the form after successful submission
          this.policyForm.reset();
        },
        error: (error: any) => {
          console.error('Error submitting vehicle:', error);
        }
      });
    } else {
      console.error('Form is invalid:', this.policyForm.errors);
    }

    // Optionally disable fields again after submission
    this.policyForm.get('basicInfo.vehicleType')?.disable();
    this.policyForm.get('vehicleSpecs.registrationNumber')?.disable();
    this.policyForm.get('engineWeight.engineCC')?.disable();
    this.policyForm.get('engineWeight.seatCapacity')?.disable();
  }
}
