import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private cache: any[] | null = null;  // CACHE HERE

  private apiUrl = 'http://localhost:5000/api/products';  // replace

  constructor(private http: HttpClient) { }

  getProducts() {
    if (this.cache) {
      return of(this.cache);
    }
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(data => this.cache = data)
    );
  }

  clearCache() {
    this.cache = null;
  }
}
