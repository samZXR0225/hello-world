import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Subscription } from 'rxjs';

import { FirebaseInfo } from '../models/FirebaseInfo';

@Injectable({
  providedIn: 'root'
})
export class SharedInfoService {
  private fireBase: FirebaseInfo;
  private sharedData = new Subject<FirebaseInfo>();
  private sharedData$ = this.sharedData.asObservable();
  private subscription: Subscription;

  constructor() {
    this.fireBase = new FirebaseInfo();
   }

  getUrl(): string {
    return this.fireBase.url;
  }

  getFireBaseKey(): any {
    return this.fireBase.key;
  }

  getFireBaseUser(): any {
    return this.fireBase.user;
  }

  getFireBaseEmail(): string {
    return this.fireBase.user.email;
  }

  getFireBasePassword(): string {
    return this.fireBase.user.password;
  }

  getFireBaseUserId(): string {
    let name = '';
    this.sharedData$.subscribe(
      data => {
        name = data.user.name;
      }
    );
    // return name;
    return this.fireBase.user.name;
  }

  getFireBaseToken(): string {
    let token = '';
    this.sharedData$.subscribe(
      data => {
        token = data.token;
      }
    );
    // return token;
    return this.fireBase.token;
  }

  setFireBaseUserId(uid: string): void {
    this.fireBase.user.name = uid;
    this.sharedData.next(this.fireBase);
  }

  setFireBaseToken(token: string): void {
    this.fireBase.token = token;
    this.sharedData.next(this.fireBase);
  }
}
