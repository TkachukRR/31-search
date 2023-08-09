import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SearchStorageService } from "../services/search-storage.service";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit, OnDestroy{
  public searchStorage = inject(SearchStorageService)
  public searchList: string[] = []
  public sortedBy: 'pop' | 'date' = 'date'
  public isVisibleFullList = false
  private _subscriptions: Subscription[] = []
  public  searchListFull: any

  public ngOnInit(): void {
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
      case 'date':
        this.searchList = this.searchStorage.getSortedByDate();
        break;
      case "pop":
        this.searchList = this.searchStorage.getSortedByPopularity();
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

  public deleteItem(value: string, date: string){
    this.searchStorage.removeSearch(value, date)
  }

  public changeSortedByTo(sortBy: 'pop' | 'date'){
    this.sortedBy = sortBy
    this.getSortedSearchList()
  }
}
