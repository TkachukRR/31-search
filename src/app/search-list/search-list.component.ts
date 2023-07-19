import { Component, inject } from '@angular/core';
import { SearchStorageService } from "../services/search-storage.service";

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent {
  public searchStorage = inject(SearchStorageService)

  public removeSearch(event: any) {
    const id = event.target.id;
    this.searchStorage.removeSearch(+id);
  }
}
