import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../product';

@Component({
  selector: 'app-home',
  imports: [BrowserModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  constructor(private productService: ProductService) { }
  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('API Error:', err)
    });
  }
  isFirstOpen = false;

  toggleFirst() {
    this.isFirstOpen = !this.isFirstOpen;
  }

  Product_Name = [
    { name: "T-shirt", imageUrl: "...", imageSet: "..." },
    { name: "Shoes", imageUrl: "...", imageSet: "..." }
  ];
}
