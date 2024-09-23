import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserSignupValidators } from 'src/app/validators/user-signup-validators';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.scss']
})
export class UserSignupComponent {
  signupForm: FormGroup;
  currentStep: number = 1;

  constructor(private fb: FormBuilder, private router: Router) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, UserSignupValidators.phoneNumberValidator()]],
      fullName: ['', Validators.required],
      dob: ['', Validators.required],
      aadhaar: ['', [Validators.required, UserSignupValidators.aadhaarValidator()]],
      pan: ['', Validators.required],
      pincode: ['', Validators.required],
      door: ['', Validators.required],
      street: ['', Validators.required],
      districtState: ['', Validators.required],
      password: ['', [Validators.required, UserSignupValidators.passwordStrengthValidator()]],
      confirmPassword: ['', Validators.required]
    });

    this.signupForm.get('confirmPassword')?.setValidators([
      Validators.required,
      UserSignupValidators.confirmPasswordValidator('password')
    ]);

    this.signupForm.get('password')?.valueChanges.subscribe(() => {
      this.signupForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  next() {
    if (this.currentStep === 1 && this.signupForm.get('username')?.valid &&
        this.signupForm.get('email')?.valid &&
        this.signupForm.get('phone')?.valid &&
        this.signupForm.get('fullName')?.valid &&
        this.signupForm.get('dob')?.valid) {
      this.currentStep = 2;
    } else if (this.currentStep === 2 && this.signupForm.get('aadhaar')?.valid &&
        this.signupForm.get('pan')?.valid &&
        this.signupForm.get('pincode')?.valid &&
        this.signupForm.get('door')?.valid &&
        this.signupForm.get('street')?.valid &&
        this.signupForm.get('districtState')?.valid) {
      this.currentStep = 3;
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  back() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  login() {
    this.router.navigate(['/authentication/user-login']);
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.router.navigate(['/authentication/user-login']);
    }
  }

  passwordHide = true;
  confirmPasswordHide = true;
}
