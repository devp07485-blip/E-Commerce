import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(@Inject(PLATFORM_ID) private platformId: any) { }

  getCartItems() {
    if (!isPlatformBrowser(this.platformId)) {
      return []; // SSR cannot access localStorage
    }

    const data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : [];
  }

  addToCart(product: any) {
    if (typeof localStorage !== 'undefined') {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Product added to cart!');
    } else {
      console.warn('localStorage not available');
    }
  }


  removeItem(id: number) {
    if (!isPlatformBrowser(this.platformId)) return;

    const cart = this.getCartItems().filter((item: any) => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
