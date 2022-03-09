import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ReservedDish } from '../elements/reservedDish';
import { Dish } from '../elements/dish-object';

@Injectable({
  providedIn: 'root'
})

export class TrolleyService {
  public numberReserved: number = 0;
  public reservedDishes = new Array<ReservedDish>();

  private numberReserved2 = new Subject<number>()

  constructor() { }

  changeNumberReserved2(sum: number) {
    this.numberReserved2.next(sum)
  }

  getReservedDishes() {
    return this.reservedDishes
  }

  updateTrolley(number: number, dish: Dish) {
    this.numberReserved += number;
    this.changeNumberReserved2(this.numberReserved)
    if (number == 1) {
      this.plusDish(dish)
    }
    else if (number == -1) {
      this.minusDish(dish)
    }
    else {
      this.removeDish(dish)
    }
  }

  isIn(dish: Dish) {
    if (this.reservedDishes.find(element => (element.name == dish.name))) {
      return true;
    }
    return false;
  }

  plusDish(dish: Dish) {
    if (this.isIn(dish)) {
      const dishReservedDish: any = this.reservedDishes.find(element => (element.name == dish.name))
      dishReservedDish.counter++;
    }
    else {
      this.reservedDishes.push({
        name: dish.name,
        counter: 1,
        price: dish.price,
        priceUSD: dish.priceUSD,
        priceEUR: dish.priceEUR,
        img: dish.img,
        maxNumber: dish.maxNumber
      })
    }
  }

  minusDish(dish: Dish) {
    if (this.isIn(dish)) {
      const dishReservedDish: any = this.reservedDishes.find(element => (element.name == dish.name))
      dishReservedDish.counter--;
      if (dishReservedDish.counter == 0) {
        this.removeDish(dish);
      }
    }

  }

  removeDish(dish: Dish) {
    if (this.isIn(dish)) {
      const dishReservedDish: any = this.reservedDishes.find(element => (element.name == dish.name))
      this.reservedDishes = this.reservedDishes.filter(element => element.name != dishReservedDish.name)
    }
  }

}
