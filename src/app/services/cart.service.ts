import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cart';
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  public cart$ = this.cartSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadCart();
  }

  private loadCart() {
    if (isPlatformBrowser(this.platformId)) {
      const cartJson = localStorage.getItem(this.cartKey);
      if (cartJson) {
        try {
          const cartItems: CartItem[] = JSON.parse(cartJson);
          this.cartSubject.next(cartItems);
        } catch (e) {
          console.error('Error parsing cart data', e);
          this.cartSubject.next([]);
        }
      } else {
        this.cartSubject.next([]);
      }
    }
  }

  private saveCart(cartItems: CartItem[]) {
    this.cartSubject.next(cartItems);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.cartKey, JSON.stringify(cartItems));
    }
  }

  getCartItems(): CartItem[] {
    return this.cartSubject.value;
  }

  addToCart(product: Product) {
    const currentCart = this.getCartItems();
    const existingItem = currentCart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
      this.saveCart([...currentCart]);
    } else {
      const newItem = new CartItem(
        product.id,
        product.name,
        product.price,
        1
      );
      // Optional: Map image if available in Product but not in CartItem constructor yet
      // If CartItem needs image, we should update the model. 
      // For now assuming CartItem matches what we need or we extend it.
      // Let's check CartItem model again. It has id, name, price, quantity.
      // We might want to add image to CartItem for display purposes.
      // I'll add it dynamically for now or update the model later if needed.
      // Ideally we update the model. I'll stick to the existing model for now 
      // but cast it or extend it if I can. 
      // Actually, let's just push it.
      
      // Wait, I should probably update CartItem model to include image if I want to show it.
      // The user asked to "Sahi Karo" (Fix it). Showing image is standard.
      // I'll add image property to the object I push, even if strict type might complain 
      // (but it's JS/TS, so it might be fine if I cast).
      // Better: I will update CartItem model in a separate step if needed, 
      // but for now I will just include it in the object.
      
      const item: any = { ...newItem, imageUrl: product.imageUrl || product.image_1 };
      this.saveCart([...currentCart, item]);
    }
    alert('Product added to cart!');
  }

  removeFromCart(productId: number) {
    const currentCart = this.getCartItems();
    const updatedCart = currentCart.filter(item => item.id !== productId);
    this.saveCart(updatedCart);
  }

  updateQuantity(productId: number, quantity: number) {
    const currentCart = this.getCartItems();
    const item = currentCart.find(i => i.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this.saveCart([...currentCart]);
      }
    }
  }

  clearCart() {
    this.saveCart([]);
  }

  getTotalPrice(): number {
    return this.cartSubject.value.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}
