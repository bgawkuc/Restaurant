import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { User } from '../elements/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  userRef: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore) {
    this.userRef = db.collection("users");
    this.getUsers();
  }

  createUser(email: string, user: User): void {
    this.userRef.doc(email).set({ ...user })
  }

  deleteUser(email: string) {
    this.userRef.doc(email).delete()
  }

  updateUser(email: string, updatedUser: any) {
    this.userRef.doc(email).update(updatedUser)
  }

  getUser(email: any): Observable<User> {
    return this.userRef.doc(email).valueChanges();
  }

  getUsers() {
    return this.userRef
  }
}
