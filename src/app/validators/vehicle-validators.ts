import { AbstractControl, ValidationErrors } from '@angular/forms';

export class VehicleValidators {
  //purchase amount
  static purchaseAmountValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    return value > 0 ? null : { purchaseAmountInvalid: true };
  }

  // VIN validator
  static vinValidator(control: AbstractControl): ValidationErrors | null {
    const vin = control.value;

    if (vin && vin.length !== 17) {
      return { vinInvalid: 'VIN must be exactly 17 characters long.' };
    }

    const vinPattern = /^[A-HJ-NPR-Z0-9]{17}$/; // VIN pattern excluding I, O, Q
    return vin && vinPattern.test(vin) ? null : { vinInvalid: 'VIN cannot contain I, O, Q.' };
  }

  // Year range validator
  static yearRangeValidator(min: number, max: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value && value.length < 4) {
        return { minlength: true };
      }
      const yearValue = parseInt(value, 10);
      if (yearValue < min || yearValue > max) {
        return { yearInvalid: `Year must be between ${min} and ${max}.` };
      }
      return null;
    };
  }

  // Engine number validator
  static engineNumberValidator(vehicleType: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      const engineNo = control.value;
      let valid = false;

      switch (vehicleType) {
        case 'Bike':
          valid = /^\d{6,8}$/.test(engineNo); // 6 to 8 digits for bikes
          break;
        case 'Car':
        case 'Truck':
          valid = /^\d{7,10}$/.test(engineNo); // 7 to 10 digits for cars and trucks
          break;
        default:
          valid = false;
      }

      return valid ? null : { engineNoInvalid: `Engine number must be ${vehicleType === 'Bike' ? '6-8 digits' : '7-10 digits'} long.` };
    };
  }

  
}
