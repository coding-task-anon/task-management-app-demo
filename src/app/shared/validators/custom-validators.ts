import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static futureDateOnly(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null; // No value, no error
      }
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        return { invalidDate: true }; // Invalid date format
      }
      if (date < new Date()) {
        return { pastDate: true }; // Date is in the past
      }
      return null; // Valid date
    };
  }
}
