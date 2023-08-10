import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { SearchStorageService } from "../services/search-storage.service";
import { SingleSearch } from "../services/interfaces";

interface Search {
  searchValue: FormControl
}

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  private _formBuilder = inject(FormBuilder);
  private _searchService = inject(SearchStorageService);

  public searchingForm: FormGroup<Search> = this._formBuilder.nonNullable.group({
      searchValue: this._formBuilder.nonNullable.control<string>(''),
    }
  )

  public onSubmit(){
    const value = this.searchingForm.get('searchValue')?.value.replace(/\s+/g, ' ').trim().toLowerCase()

    const newSearch: SingleSearch = {
      value,
      date: Date.now()
    }

    this._searchService.addToSearches(newSearch)
    this.searchingForm.reset()
  }
}
