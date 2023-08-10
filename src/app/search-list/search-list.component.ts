import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SearchStorageService } from "../services/search-storage.service";
import { Subscription } from "rxjs";
import { Search, SearchList, SingleSearch } from "../services/interfaces";
import { SortedBy, SortedByFull } from "../services/enums";

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})

export class SearchListComponent implements OnInit, OnDestroy{
  protected readonly SortedBy = SortedBy

  public searchStorage = inject(SearchStorageService)
  public searchList: Search[] = []
  public sortedBy: SortedBy = SortedBy.popularity
  public isVisibleFullList = false
  public searchListFull: SingleSearch[] = []
  public sortedFullListBy: SortedByFull = SortedByFull.date

  private _subscriptions: Subscription[] = []

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
        this.searchListFull = this.getFullSearchesList()
      })
    )
    this.onFullListSortedByChange()
    this.isVisibleFullList = true;
  }

  public deleteItem(value: string, date: number){
    this.searchStorage.removeSearch({value, date})
  }

  public getSortedByDate(): Search[] {
    const unsortedSearchArray: Search[] = this._getUnsortedSearchArray()

    return unsortedSearchArray.slice().sort((a: Search, b: Search) => {
      return b.date[0] - a.date[0]
    })
  }

  public getSortedByPopularity(): Search[] {
    const unsortedSearchArray: Search[] = this._getUnsortedSearchArray()

    return unsortedSearchArray.slice().sort((a: Search, b: Search) => {
      if (b.date.length === a.date.length) return b.date[0] - a.date[0]
      return b.date.length - a.date.length
    })
  }

  public getFullSearchesList(): SingleSearch[] {
    const unsortedSearchArray: Search[] = this._getUnsortedSearchArray()
    const searches: SingleSearch[] = [];

    unsortedSearchArray.map((search: Search) => {
      search.date.map(date => searches.push({value: search.value, date}))
    })

    return searches
  }

  public onSortedByChange():void {
    this.getSortedSearchList();
  }

  public onFullListSortedByChange():void{
    switch (this.sortedFullListBy) {
      case SortedByFull.date:
        this.searchListFull.sort((a, b) => {
          if (a.date === b.date) {
            return a.value.localeCompare(b.value);
          }
          return a.date - b.date;
        })
        break;
      case SortedByFull.value:
        this.searchListFull.sort((a, b) => {
          if (a.value === b.value) {
            return a.date - b.date;
          }
          return a.value.localeCompare(b.value)
        })
        break;
    }
  }

  private _getUnsortedSearchArray(): Search[] {
    const unsortedSearches: SearchList = this.searchStorage.getSearches();
    const allLastSearches = [];

    for (let searchKey in unsortedSearches) {
      allLastSearches.push({value : searchKey,date: unsortedSearches[searchKey]})
    }

    return allLastSearches
  }
}
