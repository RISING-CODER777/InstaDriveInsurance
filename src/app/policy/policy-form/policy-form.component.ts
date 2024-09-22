import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { VehicleValidators } from 'src/app/validators/vehicle-validators';

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

  constructor(private builder: FormBuilder) {
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

  handleSubmit() {
    if (this.policyForm.valid) {
      console.log('Form Submitted!', this.policyForm.value);
    }
  }
}
