import { Component, inject } from '@angular/core';
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  private _formBuilder = inject(FormBuilder);

  public searchingForm = this._formBuilder.nonNullable.group({
      value: this._formBuilder.nonNullable.control<string>(''),
      date: this._formBuilder.nonNullable.control<number>(0)
    }
  )

  public onSubmit(){
    this.setActualFormDate()
  }

  private setActualFormDate(){
    this.searchingForm.controls.date.patchValue(Date.now())
  }
}
