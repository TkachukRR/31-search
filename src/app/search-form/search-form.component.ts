import { Component, inject } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { SearchStorageService } from "../services/search-storage.service";
import { Searching } from "../services/interfaces";

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  private _formBuilder = inject(FormBuilder);
  private _searchStorage = inject(SearchStorageService);

  public searchingForm = this._formBuilder.nonNullable.group({
      value: this._formBuilder.nonNullable.control<string>(''),
      date: this._formBuilder.nonNullable.control<number>(0)
    }
  )

  public onSubmit(){
    this.setActualFormDate();
    const search: Searching = {
      value: this.searchingForm.get('value')?.value || '', //TODO
      date: this.searchingForm.get('date')?.value || 0  //TODO
    }
    this._searchStorage.addNewSearch(search);
  }

  private setActualFormDate(){
    this.searchingForm.controls.date.patchValue(Date.now())
  }
}
