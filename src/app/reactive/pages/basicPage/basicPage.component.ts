import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/service/validators.service';

const rtx5090 = {
  name: 'RTX 5090',
  price: 5000,
  inStorage: 5
};

@Component({
  selector: 'app-basicPage',
  templateUrl: './basicPage.component.html',
  styleUrls: ['./basicPage.component.css']
})
export class BasicPageComponent implements OnInit {

  public myform: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0)]],
      inStorage: [0, [Validators.required, Validators.min(0)]]
    }
  );

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorService
  ) { }
  ngOnInit(): void {
    // this.myform.reset(rtx5090);
  }
  isValidField(field: string) {
    return this.validatorsService.isValidField(this.myform, field);
  }

  getFieldsErrors(field: string): string  | null{
    if(!this.myform.controls[field]) return null;

    const errors =this.myform.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required';
        case 'minlength':
          return `This field must have at least ${errors[key].requiredLength} characters`;

      }

    }
    return null;

  }

  onSave():void {
    if (this.myform.invalid) {
      this.myform.markAllAsTouched();
    }
    console.log(this.myform.value);

    this.myform.reset();
  }

}
