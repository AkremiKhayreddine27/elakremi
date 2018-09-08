import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators/switchMap';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private router: Router,
  ) {
    this.user = this.check();
  }

  check(): Observable<User> {
    return this.angularFireAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.angularFirestore.doc<User>('users/' + user.uid).valueChanges();
        } else {
          return Observable.of(null);
        }
      })
    );
  }


  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  emailPasswordLogin(email: string, password: string) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  register(user: User) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(credential => {
      this.updateUserCredential({
        uid: credential.user.uid,
        email: credential.user.email,
        firstname: user.displayName,
        lastname: user.displayName,
        phone: '+ 216 25 198 368',
        password: '139752684',
        displayName: user.displayName,
        photoURL: ''
      });
      this.emailPasswordLogin(user.email, user.password);
    });
  }

  private oAuthLogin(provider) {
    return this.angularFireAuth.auth.signInWithPopup(provider).then(credential => {
      this.updateUserCredential(credential.user);
    });
  }

  updateUserCredential(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.angularFirestore.doc('users/' + user.uid);
    const data: User = {
      uid: user.uid,
      email: user.email,
      firstname: user.displayName.includes(' ') ? user.displayName.split(' ')[0] : user.displayName,
      lastname: user.displayName.includes(' ') ? user.displayName.split(' ')[1] : user.displayName,
      phone: '+ 216 25 198 368',
      password: '139752684',
      displayName: user.displayName,
      photoURL: user.photoURL
    }
    return userRef.set(data);
  }

  signOut() {
    this.angularFireAuth.auth.signOut().then(() => {
      this.router.navigate(['/auth/login']);
    });
  }

}
