import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as customValidators from '../../../shared/validators/validators';
import { ValidatorService } from '../../../shared/service/validators.service';
import { EmailService } from '../../../shared/validators/email-validators.service';

@Component({
  selector: 'app-registerPage',
  templateUrl: './registerPage.component.html',
})
export class RegisterPageComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, customValidators.canBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
   },
  {
    validators:[
      this.validatorsService.isFieldOneEqualToFieldTwo('password', 'password2')
    ]
  });

  constructor(
    private fb:FormBuilder,
    private validatorsService:ValidatorService,
    private emailValidator: EmailService
  ) { }

  ngOnInit() {
  }

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  onSubmit(){
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value);
  }

}
