import { Injectable } from '@angular/core';
import { Product } from '../../shared/models/product';
import { Observable, of } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  TOKEN = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjYxZDE5OWRkZDBlZTVlNzMzZGI0YTliN2FiNDAxZGRhMzgxNTliNjIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmlyLXNhbXBsZS1hYzg0ZCIsImF1ZCI6ImZpci1zYW1wbGUtYWM4NGQiLCJhdXRoX3RpbWUiOjE1NTc0MDAzODcsInVzZXJfaWQiOiI0bnIwUE9XSkJjVjh4eWMzTVd1R29GdDVkM0MzIiwic3ViIjoiNG5yMFBPV0pCY1Y4eHljM01XdUdvRnQ1ZDNDMyIsImlhdCI6MTU1NzQwMDM4NywiZXhwIjoxNTU3NDAzOTg3LCJlbWFpbCI6InRzYWlkYTAyMjVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRzYWlkYTAyMjVAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.or2DPtDf6-wZ3nnLi_SJcoN6MvlY_Pfc8-TlNSTWY00vj7qqFX9ZY8WCDO_0elVXtBLhu5d50gmpwTQgqe3fLZgQ6XpuPQET7FyIcadVljmLL7YvIbehFz9loshhfo0o8pY91UidbHTg1JZO_iR-fC6GKxXUh_UzcOTBh8NRcGzkA_Mv7QJxNONmUJpG9wRDDz-B4CB6m8xnsYpH7jkapACmVQ_3ILH6GIkBL9ESFboCPdTxJEUWyEE-UvgIGG4SRr9ckWh735Yanq0zpdMAsoh3SNUkcWuX7jsGPOjFoYDiMN-8c3ClB-5ECmszjHAot1xegKtM02QQLLSClaUqsQ';

  products: Product[] = [
    new Product(1, 'Angular入門書「天地創造の章」', 3800, '神は云った。「Angularあれ」。するとAngularが出来た。'),
    new Product(2, 'Angularを覚えたら、年収も上がって、女の子にももてて、人生が変わりました！', 410, '年収300万のSEが、Angularと出会う。それは、小さな会社の社畜が始めた、最初の抵抗だった。'),
    new Product(3, '異世界転生から始めるAngular生活(1)', 680,
      'スパゲッティの沼でデスマーチ真っ最中の田中。過酷な日々からの現実逃避か彼は、異世界に放り出され、そこでAngularの入門書を拾う。現実逃避でさえ、プログラミングをするしかない彼に待ち受けるのは！？'),
  ];

  constructor(
    private http:HttpClient,
  ) { }

  // list(): Observable<Product[]> {
  //   // return of(this.products);

  // }

  list(): Observable<Product[]> { // 変更↓
    return this.http.get(`https://fir-sample-ac84d.firebaseio.com/products.json`, { params: { auth: this.TOKEN } }).pipe(
      map((response: any) =>
        Object.keys(response).map((key: string) => {
          console.log(response);
          const prd = response[key];
          return new Product(prd.id, prd.name, prd.price, prd.description);
        })
      )
    );
  }


  get(id: number): Observable<Product> {
    let target: Product = this.products[id - 1];
    return of(this.products[id - 1]);
  }

  update(product:Product): void {
    const index = this.products.findIndex((prd:Product) => prd.id === product.id);
    this.products[index] = product;
  }
}
