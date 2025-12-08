import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private cache: any[] | null = null;

  private apiWomenList = 'http://localhost:5000/api/products';
  private apiMenList = 'http://localhost:5000/api/products_men';

  constructor(private http: HttpClient) { }

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
