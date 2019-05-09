import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ProductService } from '../../shared/services/product.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  target:number = -1;

  constructor(
    private fb: FormBuilder, // <= 追加 
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService) { }

  ngOnInit() {
    this.target = 2;
    this.route.params.subscribe((params: Params) => {
      this.productService.get(params['id']).subscribe((product: Product) => this.product = product);
    });
    // this.productService.get(this.target).subscribe((product: Product) => this.product = product);
  }
}
