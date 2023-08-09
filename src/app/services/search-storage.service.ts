import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from "./local-storage.service";
import { BehaviorSubject, Observable } from "rxjs";

const LOCAL_STORAGE_KEY = "SEARCH_LIST"

@Injectable({
  providedIn: 'root'
})

export class SearchStorageService{
  private _localStorage = inject(LocalStorageService);
  private _searches: any = new BehaviorSubject<any>(this._localStorage.getItem(LOCAL_STORAGE_KEY) || {})
  public searches$ = this._searches.asObservable()
  public loading = false;

  public updateSearches(){
    this._searches.next(this._searches.getValue())
  }

  public getSearches() {
      return this._searches
  }

  public addToSearches(search : {value: string, date: number}) {
    this.loading = true;
    if (this._searches.getValue()[search.value]) this._searches.getValue()[search.value].unshift(search.date)
    else this._searches.getValue()[search.value] = [search.date]

    this._localStorage.setItem(LOCAL_STORAGE_KEY, this._searches.getValue())
    this.updateSearches();
    this.loading = false;
  }

  public removeSearch(searchVal: string, searchDate: string) {
    this.loading = true;
    this._searches.getValue()[searchVal] = this._searches.getValue()[searchVal].filter((date: number) => date !== +searchDate)
    this._localStorage.setItem(LOCAL_STORAGE_KEY, this._searches.getValue())
    this.updateSearches();
    this.loading = false;
  }

  public getSortedByPopularity() {
    const sortedMap = new Map<string, number[]>();

    Object.keys(this._searches.getValue()).forEach(key => {
      sortedMap.set(key, this._searches.getValue()[key]);
    });

    const sortedKeys = Array.from(sortedMap.keys()).sort((keyA, keyB) => {
      const lengthDiff = sortedMap.get(keyB)!.length - sortedMap.get(keyA)!.length;
      if (lengthDiff !== 0) {
        return lengthDiff;
      } else {
        return sortedMap.get(keyB)![0] - sortedMap.get(keyA)![0];
      }
    });

    // const sortedData = new Map<string, number[]>();
    // sortedKeys.forEach(key => {
    //   sortedData.set(key, sortedMap.get(key)!);
    // });

    return sortedKeys
  }

  public getSortedByDate() {
    const sortedMap = new Map<string, number[]>();

    Object.keys(this._searches.getValue()).forEach(key => {
      sortedMap.set(key, this._searches.getValue()[key]);
    });

    const sortedKeys = Array.from(sortedMap.keys()).sort((keyA, keyB) => {
      return sortedMap.get(keyB)![0] - sortedMap.get(keyA)![0];
    });

    return sortedKeys
  }

  public getFullSearchesList() {
    const sortedObjects: Record<number, number>[] = [];

    Object.keys(this._searches.getValue()).forEach(key => {
      this._searches.getValue()[key].forEach((value: string) => {
        sortedObjects.push({ [value]: parseInt(key.toString()) });
      });
    });

    return sortedObjects.sort((objA, objB) => {
      const valueA = Object.keys(objA)[0];
      const valueB = Object.keys(objB)[0];
      return parseInt(valueB) - parseInt(valueA);
    });
  }
}
