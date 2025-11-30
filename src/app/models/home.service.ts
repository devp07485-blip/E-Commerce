import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiBase = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  getWomenProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiBase}/products`, {
      headers: new HttpHeaders({ 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' })
    });
  }

  getMenProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiBase}/products_men`, {
      headers: new HttpHeaders({ 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' })
    });
  }
}
