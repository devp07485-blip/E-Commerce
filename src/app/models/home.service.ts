// src/app/models/home.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiWomen = 'http://localhost:5000/api/products';
  private apiMen = 'http://localhost:5000/api/products_men';

  constructor(private http: HttpClient) { }

  getWomenProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiWomen);
  }

  getMenProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiMen);
  }
}
