import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SearchStorageService } from "../services/search-storage.service";
import { Observable, Subscription } from "rxjs";
import { LastSearch, Search, SearchList } from "../services/interfaces";

export enum SortedBy {
  popularity= 'pop',
  date='date'
}

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit, OnDestroy{
  public searchStorage = inject(SearchStorageService)
  public searchList: Search[] = []
  public sortedBy: SortedBy = SortedBy.popularity
  public isVisibleFullList = false
  private _subscriptions: Subscription[] = []
  public searchListFull: any
  public sortedSearchList:any =[]

  public ngOnInit(): void {
    this.getSortedByDate()
    this._subscriptions.push(
      this.searchStorage.searches$.subscribe((searches: any) => {
        this.getSortedSearchList()
        })
    )
  }

  public ngOnDestroy(): void{
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public getSortedSearchList(){
    console.log(this.sortedBy)
    switch (this.sortedBy) {
      case SortedBy.date:
        this.searchList = this.getSortedByDate();
        break;
      case SortedBy.popularity:
        this.searchList = this.getSortedByPopularity();
        break;
    }
  }

  public showFullList(){
    this._subscriptions.push(
      this.searchStorage.searches$.subscribe((searches: any) => {
        this.searchListFull = this.searchStorage.getFullSearchesList()
      })
    )
    this.isVisibleFullList = true;
  }

  public deleteItem(value: string, date: number){
    this.searchStorage.removeSearch({value, date})
  }

  public changeSortedByTo(sortBy: SortedBy){
    this.sortedBy = sortBy
    this.getSortedSearchList()
  }

  public getSortedByDate(): Search[] {
    const unsortedSearchArray: Search[] = this.getUnsortedSearchArray()

    return unsortedSearchArray.slice().sort((a: Search, b: Search) => {
      return b.date[0] - a.date[0]
    })
  }

  public getSortedByPopularity(): Search[] {
    const unsortedSearchArray: Search[] = this.getUnsortedSearchArray()

    return unsortedSearchArray.slice().sort((a: Search, b: Search) => {
      if (b.date.length === a.date.length) return b.date[0] - a.date[0]
      return b.date.length - a.date.length
    })
  }

  private getUnsortedSearchArray(): Search[] {
    const unsortedSearches: SearchList = this.searchStorage.getSearches();
    const allLastSearches = [];

    for (let searchKey in unsortedSearches) {
      allLastSearches.push({value : searchKey,date: unsortedSearches[searchKey]})
    }

    return allLastSearches
  }


}
