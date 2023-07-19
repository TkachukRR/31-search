import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from "./local-storage.service";
import { Searching } from "./interfaces";

const LOCAL_STORAGE_KEY = "SEARCH_LIST"

@Injectable({
  providedIn: 'root'
})

export class SearchStorageService {
  private _localStorage = inject(LocalStorageService);

  public addNewSearch(search: Searching): void{
    const searchList = this._localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!searchList) this._localStorage.setItem(LOCAL_STORAGE_KEY, [search])
    else this._localStorage.setItem(LOCAL_STORAGE_KEY, [search, ...searchList])
  }
}
