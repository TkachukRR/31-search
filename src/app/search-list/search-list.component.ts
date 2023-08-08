import { Component, inject, OnInit } from '@angular/core';
import { SearchStorageService } from "../services/search-storage.service";

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit{
  public searchStorage = inject(SearchStorageService)
  public searchList = this.searchStorage.getSortedByPopularity()

  public ngOnInit(): void {
    console.log(this.searchStorage.getSortedByPopularity())
  }
}
