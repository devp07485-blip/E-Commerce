import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: Product[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.cartService.getCartItems().map((item: Product) => {
      item.quantity = item.quantity ?? 1; // initialize if undefined
      return item;
    });
  }

  increaseQuantity(item: Product) {
    item.quantity! += 1;
    this.updateCart();
  }

  decreaseQuantity(item: Product) {
    if (item.quantity! > 1) {
      item.quantity! -= 1;
      this.updateCart();
    }
  }

  removeItem(id: number) {
    this.cartService.removeItem(id);
    this.loadCart();
  }

  updateCart() {
    // update localStorage
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => {
      return sum + (item.price * (item.quantity ?? 1));
    }, 0);
  }
}
