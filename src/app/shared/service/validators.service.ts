import { Injectable } from '@angular/core';
import { AbstractControl, Form, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorService {

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public canBeStrider = (control: FormControl) => {

    const value:string = control.value.trim().toLowerCase();
    if(value === 'strider'){
      return {
        strider: true
      }
    }
    return null;

  }

  public isValidField(form: FormGroup, field: string) {
    return form.controls[field].errors
    && form.controls[field].touched;
  }

  public isFieldOneEqualToFieldTwo(field1: string, field2: string){

    return (FormGroup: AbstractControl):ValidationErrors | null => { //funcion que regresa otra funcion

      const fieldValue1 = FormGroup.get(field1)?.value;
      const fieldValue2 = FormGroup.get(field2)?.value;

      if(fieldValue1 !== fieldValue2){
        FormGroup.get(field2)?.setErrors({noIguales: true});
        return {noIguales: true};
      }
      FormGroup.get(field2)?.setErrors(null);
      return null;

    }

  }

}
