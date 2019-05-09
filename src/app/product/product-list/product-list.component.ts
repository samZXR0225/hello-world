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
    private productService: ProductService,
    private firebaseService: FirebaseService,
    ) { }

  ngOnInit() {
    // this.productService.list().subscribe((products: Product[]) => this.products = products);
    // this.productService.list().subscribe(
    //   (products: Product[]) => products.map((product: Product) =>{
    //   return {
    //     ... product,
    //     hoverd: false,
    //   };
    // }));
    this.productService.list().subscribe((products: Product[]) => {
      this.products = products.map((product: Product) => {
        return { // <= 変更
          ...product,
          hovered: false,
        };
      });
    });

    // setTimeout(() => {
    //   this.products = [
    //     new Product(1, 'Angular入門書「天地創造の章」', 3800, '神は云った。「Angularあれ」。するとAngularが出来た。'),
    //     new Product(2, 'Angularを覚えたら、年収も上がって、女の子にももてて、人生が変わりました！', 410, '年収300万のSEが、Angularと出会う。それは、小さな会社の社畜が始めた、最初の抵抗だった。'),
    //     new Product(3, '異世界転生から始めるAngular生活(1)', 680,
    //       'スパゲッティの沼でデスマーチ真っ最中の田中。過酷な日々からの現実逃避か彼は、異世界に放り出され、そこでAngularの入門書を拾う。現実逃避でさえ、プログラミングをするしかない彼に待ち受けるのは！？'),
    //   ];
    // }, 3000);
  }

  hovered(product: ProductListElement): void {
    product.hovered = true;
  } // <= 追加
  unhovered(product: ProductListElement): void {
    product.hovered = false;
  } // <= 追加
}
