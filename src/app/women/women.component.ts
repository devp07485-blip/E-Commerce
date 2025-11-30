import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../product.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-women',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.css']
})
export class WomenComponent implements OnInit {

  latestWomen: any[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: any[]) => {
      this.latestWomen = data.filter(item => item.name.toLowerCase().includes('kurti'));
    });
  }
}
