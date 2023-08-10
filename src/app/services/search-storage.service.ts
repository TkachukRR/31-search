import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from "./local-storage.service";
import { BehaviorSubject} from "rxjs";
import { SearchList, SingleSearch } from "./interfaces";

const LOCAL_STORAGE_KEY = "SEARCH_LIST"

@Injectable({
  providedIn: 'root'
})

export class SearchStorageService{
  private _localStorage = inject(LocalStorageService);
  private _searches = new BehaviorSubject<any>(this._localStorage.getItem(LOCAL_STORAGE_KEY) || {})
  public searches$ = this._searches.asObservable()

  public updateSearches(): void{
    this._searches.next(this._searches.getValue())
  }

  public getSearches(): SearchList {
    return this._searches.getValue()
  }

  public addToSearches({value, date} : SingleSearch): void {
    const searches = this._searches.getValue()
    const isExist = searches.hasOwnProperty(value)

    if (isExist) searches[value].unshift(date)
    else searches[value] = [date]

    this._localStorage.setItem(LOCAL_STORAGE_KEY, searches)
    this.updateSearches();
  }

  public removeSearch({value, date} : SingleSearch): void {
    const searches = this._searches.getValue()
    const isExist = searches.hasOwnProperty(value)

    if (!isExist) return

    if (searches[value].length === 1) delete searches[value]
    else searches[value] = searches[value].filter((d: number) => d !== +date)

    this._localStorage.setItem(LOCAL_STORAGE_KEY, searches)
    this.updateSearches();
  }
}
