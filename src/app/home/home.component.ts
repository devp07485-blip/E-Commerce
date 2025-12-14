// src/app/home/home.component.ts
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HomeService } from '../models/home.service';
import { Product } from '../models/product.model';
import { ProductCacheService } from '../services/product-cache.service';
import { CommonModule, CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  latestWomen: Product[] = [];
  latestMen: Product[] = [];
  private routerSub!: Subscription;

  constructor(
    private homeService: HomeService,
    private productCache: ProductCacheService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    // Use cached data if available
    if (this.productCache.womenProducts) {
      this.latestWomen = this.productCache.womenProducts;
    } else {
      this.loadLatestWomen();
    }

    if (this.productCache.menProducts) {
      this.latestMen = this.productCache.menProducts;
    } else {
      this.loadLatestMen();
    }

    // Only subscribe to router events in browser
    if (isPlatformBrowser(this.platformId)) {
      this.routerSub = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          // Reload data if navigating back to /home
          if (event.urlAfterRedirects === '/home') {
            if (!this.productCache.womenProducts) this.loadLatestWomen();
            if (!this.productCache.menProducts) this.loadLatestMen();
          }
        });
    }
  }

  ngOnDestroy(): void {
    if (this.routerSub) this.routerSub.unsubscribe();
  }

  private loadLatestWomen(): void {
    this.homeService.getWomenProducts().subscribe({
      next: (res: Product[]) => {
        console.log('HomeComponent: Received women products:', res);
        this.latestWomen = res;
        this.productCache.womenProducts = res; // save to cache
      },
      error: (err) => console.error('Error loading women products:', err)
    });
  }

  private loadLatestMen(): void {
    this.homeService.getMenProducts().subscribe({
      next: (res: Product[]) => {
        console.log('HomeComponent: Received men products:', res);
        this.latestMen = res;
        this.productCache.menProducts = res; // save to cache
      },
      error: (err) => console.error('Error loading men products:', err)
    });
  }
}
