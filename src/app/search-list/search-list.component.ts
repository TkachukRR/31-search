import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SearchStorageService } from "../services/search-storage.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit, OnDestroy{
  public searchStorage = inject(SearchStorageService)
  public searchList: string[] = []
  public sortedBy: 'pop' | 'date' = 'date'
  private _subscriptions: Subscription[] = []

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
    switch (this.sortedBy) {
      case 'date':
        this.searchList = this.searchStorage.getSortedByDate();
        break;
      case "pop":
        this.searchList = this.searchStorage.getSortedByPopularity();
        break;
    }
  }
}
