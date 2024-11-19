import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/service/validators.service';

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent implements OnInit {

  public myForm:FormGroup = this.fb.group({
    gender: ['M', [Validators.required]],
    wantNotifications: [false, [Validators.required]],
    termsAndConditions: [false, [Validators.requiredTrue]]

  });

  public person = {
    gender:'F',
    wantNotifications:true
  }

  constructor(
    private fb:FormBuilder,
    private validatorsService: ValidatorService
  ) {}

  ngOnInit(): void {
  this.myForm.reset(this.person);
  }

  //ngSubmit

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.myForm, field);
  }


  onSave():void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    const { termsAndConditions, ...newPerson } = this.myForm.value;
    this.person = newPerson;
    console.log(this.myForm.value);
    console.log(this.person);

  }
};
