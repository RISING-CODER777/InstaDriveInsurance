import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserSignupValidators } from 'src/app/validators/user-signup-validators';
import { AuthService } from '../services/auth.service';
import { UserSignUp } from '../models/user-signup.model'; // Ensure correct import of your UserSignUp model

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.scss']
})
export class UserSignupComponent {
  signupForm: FormGroup;
  currentStep: number = 1;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
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
      districtState: ['', Validators.required], // Assuming this is a single field for state and district
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
      const formData = this.signupForm.value;

      // Combine address fields into a single address string
      const address = `${formData.door}, ${formData.street}, ${formData.districtState}`;

      // Create the UserSignUp object
      const userSignUp: UserSignUp = {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        phoneNumber: formData.phone,
        fullName: formData.fullName,
        dateOfBirth: formData.dob,
        aadharNumber: formData.aadhaar,
        panNumber: formData.pan,
        address: address // Set the combined address
      };

      // Call the sign-up service
      this.authService.userSignUp(userSignUp).subscribe({
        next: (response) => {
          console.log('Signup successful', response);
          this.router.navigate(['/authentication/user-login']);
        },
        error: (error) => {
          console.error('Signup error', error);
        }
      });
    }
  }

  passwordHide = true;
  confirmPasswordHide = true;
}
