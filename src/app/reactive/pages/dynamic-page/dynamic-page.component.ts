import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/service/validators.service';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {


  // public myForm2: FormGroup = this.fb.group({
  //   favoriteGames: this.fb.array([])
  // });

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],

    ]),
  });

  public newFavoriteGame:FormControl = new FormControl('', Validators.required);

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorService
  ) { }

  get FavoriteGamesArr() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  getFieldsErrors(field: string): string  | null{
    if(!this.myForm.controls[field]) return null;

    const errors =this.myForm.controls[field].errors || {};
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

  isValidFieldInArray(formArray: FormArray, index: number) {
    return formArray.controls[index].errors
    && formArray.controls[index].touched;
  }

  onDeleteFavoriteGame(index: number): void {
    this.FavoriteGamesArr.removeAt(index);
  }

  onAddFavoriteGame(): void {

    if(this.newFavoriteGame.invalid) return;

    const newGame = this.newFavoriteGame.value;
    this.FavoriteGamesArr.push(this.fb.control(newGame, Validators.required));

    console.log(this.newFavoriteGame.value);
    this.newFavoriteGame.reset();

  }


  onSubmit():void {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);

    this.FavoriteGamesArr.clear();

    this.myForm.reset();
  }

}
