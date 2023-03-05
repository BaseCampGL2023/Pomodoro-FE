import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class NumberValidator {
  static number(min?: number, max?: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = Number(control.value);

      if (isNaN(value)) {
        return { notNumber: true };
      }
      if (min && value < min) {
        return { numberLessThanMin: min };
      }
      if (max && value > max) {
        return { numberMoreThanMax: max };
      }
      return null;
    };
  }
}
