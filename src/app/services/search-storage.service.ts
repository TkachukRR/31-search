import { inject, Injectable } from '@angular/core';

interface Search {
  userName: string;
  searchValue: string;
  date: number[];
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class SearchStorageService {
  private _searchStorage: Search[] = []
}
