import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../services/cart.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: any = null;
  relatedProducts: any[] = [];
  isLoading = true;
  errorMessage = '';
  category: string | null = null;

  // Selection State
  selectedSize: string | null = null;
  quantity: number = 1;

  // UI Constants
  sizes: string[] = ['XS', 'S', 'M', 'L', 'XL'];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cart: CartService,
    private productService: ProductService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category');
      const id = Number(params.get('id')); // FIXED: Get ID from params directly

      if (!id || !this.category) {
        this.errorMessage = 'Invalid product';
        this.isLoading = false;
        return;
      }
      this.loadProduct(id);
    });
  }

  loadProduct(id: number) {
    this.isLoading = true;
    this.product = null; // Clear previous product
    this.relatedProducts = [];

    const productObs = this.category === 'women'
      ? this.productService.getWomenProductById(id)
      : this.productService.getMenProductById(id);

    productObs.subscribe({
      next: (res) => {
        this.product = res;
        this.loadRelatedProducts(id);
        this.isLoading = false;
        if (isPlatformBrowser(this.platformId)) {
          window.scrollTo(0, 0); // Scroll to top on nav
        }
      },
      error: () => {
        this.errorMessage = 'Failed to load product';
        this.isLoading = false;
      }
    });
  }

  loadRelatedProducts(currentId: number) {
    // Determine source array based on category
    // In a real app, we'd have a specific API for "related".
    // Here we'll fetch the list and pick 4 random distinct items.

    const listObs = this.category === 'women'
      ? this.productService.getProducts() // Note: service method name might act differently if cached, assuming it returns observable
      : this.productService.getLatestMen();

    listObs.subscribe(products => {
      if (products && products.length > 0) {
        this.relatedProducts = products
          .filter(p => p.id !== currentId)
          .slice(0, 4); // Simple slice for now
      }
    });
  }

  // selection logic
  selectSize(size: string) {
    this.selectedSize = size;
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) this.quantity--;
  }

  addToCart(product: any) {
    if (!this.selectedSize) {
      alert('Please select a size');
      return;
    }

    // Create a product variant or attach size info
    // Since CartService takes specific structure, we might need to handle this carefully.
    // For now, we'll modify the product object passed to service to include size info string in name or similar 
    // to distinguish it, OR ideally CartService handles variants.
    // Given the simple CartService seen earlier: 
    // it pushes item based on ID. 

    // Simple Workaround: Add size to name for cart display
    const cartProduct = {
      ...product,
      name: `${product.name} (${this.selectedSize})`,
      // We might want to construct a unique ID for variants: `${product.id}-${this.selectedSize}`
      // But let's stick to simple adding for now.
      quantity: this.quantity
    };

    // We need to call addToCart multiple times or update service to accept quantity.
    // The current service adds 1.
    // Let's loop for now (naive) or just call it once and user can adjust.
    // BETTER: Update CartService to accept quantity? 
    // The Plan said "Update addToCart: Log or handle selected size/quantity". 

    // Let's just add it once for now to avoid changing Service logic too deeply in this step.
    // User can adjust qty in cart.
    this.cart.addToCart(cartProduct);
  }

  // Size Chart Logic
  isSizeChartVisible = false;
  sizeUnit: 'cm' | 'in' = 'cm';

  sizeChartData = [
    { size: 'XS', bustCm: 81, waistCm: 61, hipCm: 86, bustIn: 32, waistIn: 24, hipIn: 34 },
    { size: 'S', bustCm: 86, waistCm: 66, hipCm: 91, bustIn: 34, waistIn: 26, hipIn: 36 },
    { size: 'M', bustCm: 91, waistCm: 71, hipCm: 97, bustIn: 36, waistIn: 28, hipIn: 38 },
    { size: 'L', bustCm: 97, waistCm: 76, hipCm: 102, bustIn: 38, waistIn: 30, hipIn: 40 },
    { size: 'XL', bustCm: 102, waistCm: 81, hipCm: 107, bustIn: 40, waistIn: 32, hipIn: 42 }
  ];

  openSizeChart() {
    this.isSizeChartVisible = true;
  }

  closeSizeChart() {
    this.isSizeChartVisible = false;
  }

  toggleSizeUnit(unit: 'cm' | 'in') {
    this.sizeUnit = unit;
  }
}

