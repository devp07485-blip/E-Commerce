import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartItem } from '../models/cart-item.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems$: Observable<CartItem[]>;
  totalPrice: number = 0;

  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.cart$;
  }

  ngOnInit(): void {
    this.cartItems$.subscribe(() => {
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  increaseQuantity(item: CartItem) {
    this.cartService.updateQuantity(item.id, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.id, item.quantity - 1);
    }
  }

  removeItem(id: number) {
    this.cartService.removeFromCart(id);
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
