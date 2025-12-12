// src/app/models/home.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiWomen: string;
  private apiMen: string;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    const baseUrl = isPlatformServer(this.platformId) ? 'http://localhost:5000' : '';
    console.log(`[HomeService] Platform: ${isPlatformServer(this.platformId) ? 'Server' : 'Browser'}, BaseURL: '${baseUrl}'`);
    this.apiWomen = `${baseUrl}/api/products`;
    this.apiMen = `${baseUrl}/api/products_men`;
    console.log(`[HomeService] apiWomen: '${this.apiWomen}'`);
  }

  getWomenProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiWomen);
  }

  getMenProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiMen);
  }
}
