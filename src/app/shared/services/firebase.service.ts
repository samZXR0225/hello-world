import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import UserCredential = firebase.auth.UserCredential;
import { environment } from 'src/environments/environment';
// import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  // EMAIL = 'tsaida0225@gmail.com'; // <= 自分のメールアドレスに変更してください
  // PASSWORD = 'joe001Rainbow' // <= 自分の設定したいパスワードに変更してください
  EMAIL = environment.firebase.email;
  PASSWORD = environment.firebase.password;

  constructor() {
    // const config = {
    //   apiKey: "AIzaSyA_BSi9mVOtg7HP_uzFPP_CBF1wvcrijXk",
    //   authDomain: "fir-sample-ac84d.firebaseapp.com",
    //   databaseURL: "https://fir-sample-ac84d.firebaseio.com",
    //   projectId: "fir-sample-ac84d",
    //   storageBucket: "fir-sample-ac84d.appspot.com",
    //   messagingSenderId: "975244675635",
    //   appId: "1:975244675635:web:54f64eeb97865f69"
    // };
    const config2 = environment.firebase.key;
    // firebase.initializeApp(config);
    firebase.initializeApp(config2);
    this.signInOrCreateUser(this.EMAIL, this.PASSWORD); // <= 追加
  }

  createUser(email, password): void { // <= 追加
    firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential: UserCredential) => {
      console.log(userCredential.user.uid);
    });
  }

  signInOrCreateUser(email, password): void { // <= 変更
    firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential: UserCredential) => {
      console.log(userCredential.user.uid);
      firebase.auth().currentUser.getIdToken().then((token:string) => {
        console.log(token);
      });
    }).catch(() => {
      return firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential: UserCredential) => {
        firebase.auth().currentUser.getIdToken().then((token: string) => {
          console.log(token);
        });
      });
    });
  }
}
