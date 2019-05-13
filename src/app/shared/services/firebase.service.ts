import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import UserCredential = firebase.auth.UserCredential;
import { SharedInfoService } from './shared-info.service';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  EMAIL = '';
  PASSWORD = '';
  // EMAIL = environment.firebase.user.email;
  // PASSWORD = environment.firebase.user.password;

  constructor(
    private sharedInfo: SharedInfoService
  ) {
    // const config = environment.firebase.key;
    const config = this.sharedInfo.getFireBaseKey();
    this.EMAIL = this.sharedInfo.getFireBaseEmail();
    this.PASSWORD = this.sharedInfo.getFireBasePassword();
    firebase.initializeApp(config);
    this.signInOrCreateUser(this.EMAIL, this.PASSWORD); // <= 追加
  }

  // createUser(email, password): void { // <= 追加
  //   firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential: UserCredential) => {
  //     console.log(userCredential.user.uid);
  //   });
  // }

  signInOrCreateUser(email, password): void { // <= 変更
    firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential: UserCredential) => {
      console.log(userCredential.user.uid);
      this.sharedInfo.setFireBaseUserId(userCredential.user.uid);
      firebase.auth().currentUser.getIdToken().then((token: string) => {
        console.log(token);
        this.sharedInfo.setFireBaseToken(token);
      });
    }).catch(() => {
      return firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential: UserCredential) => {
        console.log(userCredential.user.uid);
        this.sharedInfo.setFireBaseUserId(userCredential.user.uid);
        firebase.auth().currentUser.getIdToken().then((token: string) => {
          console.log(token);
          this.sharedInfo.setFireBaseToken(token);
        });
      });
    });
  }
}
