import { Injectable } from '@angular/core';
import { Product } from '../../shared/models/product';
import { Observable, of } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  BASE_URL = 'https://fir-sample-ac84d.firebaseio.com'; // <= 追加
  UID = '4nr0POWJBcV8xyc3MWuGoFt5d3C3';  // <= 追加  
  TOKEN = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjYxZDE5OWRkZDBlZTVlNzMzZGI0YTliN2FiNDAxZGRhMzgxNTliNjIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmlyLXNhbXBsZS1hYzg0ZCIsImF1ZCI6ImZpci1zYW1wbGUtYWM4NGQiLCJhdXRoX3RpbWUiOjE1NTc0NjQ1MzksInVzZXJfaWQiOiI0bnIwUE9XSkJjVjh4eWMzTVd1R29GdDVkM0MzIiwic3ViIjoiNG5yMFBPV0pCY1Y4eHljM01XdUdvRnQ1ZDNDMyIsImlhdCI6MTU1NzQ2NDUzOSwiZXhwIjoxNTU3NDY4MTM5LCJlbWFpbCI6InRzYWlkYTAyMjVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRzYWlkYTAyMjVAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.ZrH3nsQ5oUNchFFaB_ICP7FbWXb8cciSuMbBcj2QhOjVpb2aVE1j1WdaAaRY_1IcPrS3Ezh8_lahGup4AJK0xMvBrrM38FD36MS2rfA6dCNsnfa5FJevEnINsJhGbQDTsnFGqG1B20mTYHscAC2MTaB_TOTqrnkhJkgf5wYh2V9Ec6EiXmInGWRwNlF4xFf2cKwGhd4Jb2wgOHpX9cla5ZN_XaACJcbJlWVDZOkbvpcRZXHVC-UFdEz8GohxIiolx0ZPefD0cxXNEPwlOTXmWHvfKCqGh6VnUW_JtlE8bQSl9NpDdsY20YN59xbTMCbSOpsKV9TiNu-wyq5q9KQn5A';

  products: Product[] = [
    new Product(1, 'Angular入門書「天地創造の章」', 3800, '神は云った。「Angularあれ」。するとAngularが出来た。'),
    new Product(2, 'Angularを覚えたら、年収も上がって、女の子にももてて、人生が変わりました！', 410, '年収300万のSEが、Angularと出会う。それは、小さな会社の社畜が始めた、最初の抵抗だった。'),
    new Product(3, '異世界転生から始めるAngular生活(1)', 680,
      'スパゲッティの沼でデスマーチ真っ最中の田中。過酷な日々からの現実逃避か彼は、異世界に放り出され、そこでAngularの入門書を拾う。現実逃避でさえ、プログラミングをするしかない彼に待ち受けるのは！？'),
  ];

  constructor(
    private http: HttpClient,
  ) { }

  // list(): Observable<Product[]> {
  //   // return of(this.products);

  // }

  list(): Observable<Product[]> { // 変更↓
    return this.http.get(`${this.BASE_URL}/users/${this.UID}/products.json`, { params: { auth: this.TOKEN } }).pipe(
      map((response: any) => {
        if (response) {
          return Object.keys(response).map((key: string) => {
            const prd = response[key];
            return new Product(key, prd.name, prd.price, prd.description);
          });
        } else {
          return [];
        }
      }
      )
    );

    // map((response: any) => {
    //   Object.keys(response).map((key: string) => {
    //     console.log(response);
    //     const prd = response[key];
    //     return new Product(key, prd.name, prd.price, prd.description);
    //   }
    //   )
    // )
  }

  create(product: Product): Observable<void> {
    return this.http.post(`${this.BASE_URL}/users/${this.UID}/products.json`, product, { params: { auth: this.TOKEN } }).pipe(
      map((response:any) => product.key = response.name),
    );
  }

  get(key: string): Observable<Product> {
    // let target: Product = this.products[id - 1];
    // return of(this.products[id - 1]);
    return this.http.get(`${this.BASE_URL}/users/${this.UID}/products/${key}.json`, { params: { auth: this.TOKEN } }).pipe(
      map((response:any) => {
        return new Product(key, response.name, response.price, response.description);
      })
    );

  }

  delete(key: string): Observable<void> {
    return this.http.delete(`${this.BASE_URL}/users/${this.UID}/products/${key}.json`, { params: { auth: this.TOKEN } }).pipe(
      map(() => {})
    );
  }

  update(product: Product): Observable<void> {
    // const index = this.products.findIndex((prd: Product) => prd.key === product.key);
    // this.products[index] = product;
    return this.http.patch(`${this.BASE_URL}/users/${this.UID}/products/${product.key}.json`, 
    {
      name: product.name,
      priice: product.price,
      description: product.description
    },
    { params: { auth: this.TOKEN } }).pipe(
      map(() => {
      })
    );

  }
}
