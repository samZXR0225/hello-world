import { Injectable } from '@angular/core';
import { Product } from '../../shared/models/product';
import { Observable, of } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FirebaseService } from './firebase.service';
import { SharedInfoService } from '../../shared/services/shared-info.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  BASE_URL = '';
  UID = '';  // <= 追加
  TOKEN = '';

  constructor(
    private http: HttpClient,
    private sharedInfo: SharedInfoService,
    private firebaseService: FirebaseService
  ) {
    this.BASE_URL = this.sharedInfo.getUrl();
    this.UID = this.sharedInfo.getFireBaseUserId();
    // this.TOKEN =  this.sharedInfo.getFireBaseToken();
  }

  list(): Observable<Product[]> { // 変更↓
    this.TOKEN =  this.sharedInfo.getFireBaseToken();
    this.UID = this.sharedInfo.getFireBaseUserId();
    console.log(this.UID + ' & =>'+ this.TOKEN);
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
  }

  create(product: Product): Observable<void> {
    this.TOKEN =  this.sharedInfo.getFireBaseToken();
    this.UID = this.sharedInfo.getFireBaseUserId();
    console.log(this.UID + ' & =>'+ this.TOKEN);
    return this.http.post(`${this.BASE_URL}/users/${this.UID}/products.json`, product, { params: { auth: this.TOKEN } }).pipe(
      map((response: any) => product.key = response.name),
    );
  }

  get(key: string): Observable<Product> {
    this.TOKEN =  this.sharedInfo.getFireBaseToken();
    this.UID = this.sharedInfo.getFireBaseUserId();
    console.log(this.UID + ' & =>'+ this.TOKEN);
    return this.http.get(`${this.BASE_URL}/users/${this.UID}/products/${key}.json`, { params: { auth: this.TOKEN } }).pipe(
      map((response: any) => {
        return new Product(key, response.name, response.price, response.description);
      })
    );

  }

  delete(key: string): Observable<void> {
    this.TOKEN =  this.sharedInfo.getFireBaseToken();
    this.UID = this.sharedInfo.getFireBaseUserId();
    console.log(this.TOKEN);
    return this.http.delete(`${this.BASE_URL}/users/${this.UID}/products/${key}.json`, { params: { auth: this.TOKEN } }).pipe(
      map(() => {})
    );
  }

  update(product: Product): Observable<void> {
    this.TOKEN =  this.sharedInfo.getFireBaseToken();
    this.UID = this.sharedInfo.getFireBaseUserId();
    console.log(this.UID + ' & =>'+ this.TOKEN);
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
