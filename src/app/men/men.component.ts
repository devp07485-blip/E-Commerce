import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../product.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-men',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.css']
})
export class MenComponent implements OnInit {

  latestMen: any[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getLatestMen().subscribe((data: any[]) => {
      this.latestMen = data;
      // Or filter pizza/burger if needed:
      // this.latestMen = data.filter(item => 
      //   item.name.toLowerCase().includes('pizza') || 
      //   item.name.toLowerCase().includes('burger'));
    });
  }
}
