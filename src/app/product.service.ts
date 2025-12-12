import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private cache: any[] | null = null;
  private apiWomenList: string;
  private apiMenList: string;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    const baseUrl = isPlatformServer(this.platformId) ? 'http://localhost:5000' : '';
    this.apiWomenList = `${baseUrl}/api/products`;
    this.apiMenList = `${baseUrl}/api/products_men`;
  }

  // WOMEN LIST
  getProducts() {
    if (this.cache) {
      return of(this.cache);
    }
    return this.http.get<any[]>(this.apiWomenList).pipe(
      tap(data => this.cache = data)
    );
  }

  // MEN LIST
  getLatestMen() {
    return this.http.get<any[]>(this.apiMenList);
  }

  // WOMEN DETAILS
  getWomenProductById(id: number) {
    return this.http.get<any>(`${this.apiWomenList}/${id}`);
  }

  // MEN DETAILS
  getMenProductById(id: number) {
    return this.http.get<any>(`${this.apiMenList}/${id}`);
  }

  clearCache() {
    this.cache = null;
  }
}
