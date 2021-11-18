import { Attribute, Directive, ElementRef, forwardRef } from '@angular/core';
import { ValidatorFn, AbstractControl, NG_VALIDATORS, Validator, ValidationErrors } from '@angular/forms';

export function MayusculasValidation(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) { return null; }
    return control.value === control.value.toUpperCase() ? null : { mayusculas: 'No esta en mayúsculas.'}
  };
}

@Directive({
  selector: '[mayusculas][formControlName],[mayusculas][formControl],[mayusculas][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MayusculasValidator, multi: true }]
})
export class MayusculasValidator implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
      return MayusculasValidation()(control);
  }
}

export function NIFValidation(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) { return null; }
      const err = { nif: { invalidFormat: true, invalidChar: true } };
      if (/^\d{1,8}\w$/.test(control.value)) {
          const letterValue = control.value.substr(control.value.length - 1);
          const numberValue = control.value.substr(0, control.value.length - 1);
          err.nif.invalidFormat = false;
          return letterValue.toUpperCase() === 'TRWAGMYFPDXBNJZSQVHLCKE'.charAt(numberValue % 23) ? null : err;
      } else { return err; }
  };
}
@Directive({
  selector: '[nif][formControlName],[nif][formControl],[nif][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NIFValidator, multi: true }]
})
export class NIFValidator implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
      return NIFValidation()(control);
  }
}

@Directive({
  selector: '[type][formControlName],[type][formControl],[type][ngModel]',
  providers: [
      { provide: NG_VALIDATORS, useExisting: forwardRef(() => TypeValidator), multi: true }
  ]
})
export class TypeValidator implements Validator {
  constructor(private elem: ElementRef) { }
  validate(control: AbstractControl): ValidationErrors | null {
      const valor = control.value;
      if (valor) {
        const dom = this.elem.nativeElement;
        if (dom.validity) { // dom.checkValidity();
          return dom.validity.typeMismatch ? { 'type': dom.validationMessage } : null;
        }
      }
      return null;
  }
}

@Directive({
  selector: '[equalsTo][formControlName],[equalsTo][formControl],[equalsTo][ngModel]',
  providers: [ { provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualsValidator), multi: true } ]
})
export class EqualsValidator implements Validator {
  constructor( @Attribute('equalsTo') public validateEqual: string) {}
  validate(control: AbstractControl): ValidationErrors | null {
      let valor = control.value;
      let cntrlBind = control.root.get(this.validateEqual);

      if (valor) {
        return (!cntrlBind || valor !== cntrlBind.value) ? { 'equalsTo': `${valor} <> ${cntrlBind?.value}` } : null;
      }
      return null;
  }
}

export const MIS_VALIDADORES = [ MayusculasValidator, NIFValidator, TypeValidator, EqualsValidator ];
