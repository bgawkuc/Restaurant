import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../elements/user';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn = false;
  userData!: Observable<firebase.User | null>
  readonly authState$: Observable<firebase.User | null> = this.angularFireAuth.authState
  private authRef: AngularFirestoreCollection<any>;

  constructor(private angularFireAuth: AngularFireAuth, private router: Router, private userService: UserService, db: AngularFirestore) {
    this.authRef = db.collection('users')
    this.userData = angularFireAuth.authState;
    this.angularFireAuth.authState.subscribe(auth => {

      if (auth == null) {
        this.isLoggedIn = false;
      }
      else {
        this.isLoggedIn = true;
      }

    });
  }

  getLoggedUser(): Observable<User> {
    return this.userData.pipe(switchMap(user => this.userService.getUser(user?.email)));
  }

  getUsers() {
    return this.authRef;
  }

  signUp(email: string, password: string, nick: string) {
    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        let user = new User(nick, email, false, false, true, false)
        this.userService.createUser(user.email, user)
        this.isLoggedIn = true;
        this.router.navigate(['/start']);
      })
      .catch(() => {
        alert("There was problem with signing up")
      })
  }

  signIn(email: string, password: string) {
    this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.isLoggedIn = true;
        this.router.navigate(['/start']);
      }).catch(() => {
        alert("There was problem with signing in")
      })
  }

  signOut() {
    this.angularFireAuth.signOut().then(() => {
      this.isLoggedIn = false;
      this.router.navigate(['/start']);
    })
  }

  changePersistence(mode: string) {
    let type: any;
    if (mode === "session") {
      type = firebase.auth.Auth.Persistence.SESSION;
    }
    if (mode === "none") {
      type = firebase.auth.Auth.Persistence.NONE;
    }
    if (mode === "local") {
      type = firebase.auth.Auth.Persistence.LOCAL;
    }
    this.angularFireAuth.setPersistence(type).then(() => { });
  }

}
