import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { VehicleValidators } from 'src/app/validators/vehicle-validators';
import { VehicleService } from 'src/app/core/services/vehicle.service';
import { Vehicle } from 'src/app/core/models/vehicle.model';
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

  constructor(private builder: FormBuilder, private vehicleService: VehicleService) { // Inject the VehicleService
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
        registrationNumber: ['', [Validators.required, Validators.maxLength(40)]],
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
    this.basicInfoForm.get('vehicleType')?.valueChanges.subscribe(value => {
      const engineControl = this.additionalDetailsForm.get('engineNo');
      engineControl?.clearValidators(); // Clear existing validators
      if (value) {
        engineControl?.setValidators(VehicleValidators.engineNumberValidator(value));
      }
      engineControl?.updateValueAndValidity(); // Update the validity after setting validators
    });
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
    if (this.policyForm.valid) {
      const vehicle: Vehicle = {
        userID: 3, // Hardcoded userID for now
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
      };

      this.vehicleService.submitVehicle(vehicle).subscribe({
        next: (response: any) => {
          console.log('Vehicle submitted successfully:', response);
          // reset the form
          this.policyForm.reset();
        },
        error: (err: any) => {
          console.error('Error submitting vehicle:', err);
        },
      });
    }
  }
}
