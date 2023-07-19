import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from "./local-storage.service";
import { Searching } from "./interfaces";

const LOCAL_STORAGE_KEY = "SEARCH_LIST"

@Injectable({
  providedIn: 'root'
})

export class SearchStorageService {
  private _localStorage = inject(LocalStorageService);
  public searchingList: any

  public addNewSearch(search: Searching): void{
    if (!this.searchingList) this.searchingList = [search]
    else this.searchingList = [search, ...this.searchingList]

    this._localStorage.setItem(LOCAL_STORAGE_KEY, this.searchingList);
  }

  constructor() {
    this.searchingList = this._localStorage.getItem(LOCAL_STORAGE_KEY);
  }
}
