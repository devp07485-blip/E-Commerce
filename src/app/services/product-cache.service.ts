// src/app/services/product-cache.service.ts
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductCacheService {
  womenProducts: Product[] | null = null;
  menProducts: Product[] | null = null;
}
