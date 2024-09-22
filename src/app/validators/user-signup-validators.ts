import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class UserSignupValidators {

  // Phone Number Validator
  static phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const validFormat = /^[0-9]{10}$/.test(control.value); // Check for exactly 10 digits
      return validFormat ? null : { invalidPhoneNumber: true };
    };
  }

  // Aadhaar Validator
  static aadhaarValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const validFormat = /^[0-9]{12}$/.test(control.value); // Check for exactly 12 digits
      return validFormat ? null : { invalidAadhaar: true };
    };
  }

  // Password Strength Validator
  static passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      const strongPassword = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/;

      if (!value) {
        return { required: true };
      } else if (!strongPassword.test(value)) {
        return { weakPassword: true };
      } else {
        return null;
      }
    };
  }

  // Confirm Password Validator
  static confirmPasswordValidator(passwordControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordControl = control.parent?.get(passwordControlName);
      const confirmPasswordValue = control.value;
      const passwordValue = passwordControl ? passwordControl.value : '';

      if (confirmPasswordValue && passwordValue !== confirmPasswordValue) {
        return { passwordsNotMatching: true };
      }
      return null;
    };
  }
}
