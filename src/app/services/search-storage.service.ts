import { Injectable } from '@angular/core';
import { Searching } from "./interfaces";

@Injectable({
  providedIn: 'root'
})
export class SearchStorageService {
  private _searchStorage!: Searching[]
}
