import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public getItem(key: string): string {
    const item = localStorage.getItem(key);
    if (!item) return ''
    return JSON.parse(item);
  }
}
