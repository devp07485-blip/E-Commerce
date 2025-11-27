import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { Router } from 'express';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data: any[]) => {
        console.log('Products fetched:', data);
        this.products = data;
      },
      error: (err) => console.error('API Error:', err),
    });
  }

  isFirstOpen = false;

  toggleFirst() {
    this.isFirstOpen = !this.isFirstOpen;
  }

}
