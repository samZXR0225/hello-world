import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ProductService } from '../../shared/services/product.service';
import { FirebaseService } from '../../shared/services/firebase.service';

class ProductListElement extends Product {
  hovered: boolean;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit {
  products: ProductListElement[] = null;

  constructor(
    private firebaseService: FirebaseService,
    private productService: ProductService,
    ) { }

  ngOnInit() {
    this.productService.list().subscribe((products: Product[]) => {
      this.products = products.map((product: Product) => {
        return { // <= 変更
          ...product,
          hovered: false,
        };
      });
    });
  }

  hovered(product: ProductListElement): void {
    product.hovered = true;
  } // <= 追加
  unhovered(product: ProductListElement): void {
    product.hovered = false;
  } // <= 追加
}
