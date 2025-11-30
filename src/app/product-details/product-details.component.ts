import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: any = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cart: CartService
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (!productId) {
      this.errorMessage = 'Invalid product ID';
      this.isLoading = false;
      return;
    }

    this.loadProduct(productId);
  }

  addToCart(product: any) {
    this.cart.addToCart(product);
  }

  loadProduct(id: string) {
    this.http.get(`http://localhost:5000/api/products/${id}`)
      .subscribe({
        next: (data) => {
          console.log("API RESPONSE:", data);
          this.product = data;
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = 'Failed to fetch product details';
          this.isLoading = false;
        }
      });
  }
}
