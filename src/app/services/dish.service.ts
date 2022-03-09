import { Injectable } from '@angular/core';
import { Dish } from '../elements/dish-object';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore'

@Injectable({
  providedIn: 'root'
})

export class DishService {
  private dishRef: AngularFirestoreCollection<any>;
  dish!: Dish;

  constructor(db: AngularFirestore) {
    this.dishRef = db.collection('dishes')
  }

  setCurrentDish(dish: Dish) {
    this.dish = dish;
  }

  createDish(dish: Dish): void {
    this.dishRef.doc(dish.name).set({ ...dish });
  }

  getDishesList() {
    return this.dishRef;
  }

  updateDish(key: any, value: any) {
    this.dishRef.doc(key).update(value);
  }

  deleteDish(name: string): Promise<void> {
    return this.dishRef.doc(name).delete();
  }
}
