import { Component, OnInit } from '@angular/core';
import { DishService } from 'src/app/services/dish.service'
import { map } from 'rxjs';
import { Dish } from 'src/app/elements/dish-object';
import { CurrencyService } from 'src/app/services/currency.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent implements OnInit {
  dishes!: Dish[];
  allDishes!: Dish[];
  filteredDishes: any = [[], [], [], -1, -1];
  highestPriceDish!: Dish;
  lowestPriceDish!: Dish;

  constructor(
    private dishService: DishService, public currencyService: CurrencyService, private titleService: Title) {
    this.getDishesList();
    this.titleService.setTitle("Menu");
  }

  ngOnInit(): void {
    this.getDishesList()
  }

  getDishesList() {
    this.dishService.getDishesList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(dishes => {
      this.dishes = (<Dish[]>dishes);
      this.allDishes = (<Dish[]>dishes);
      this.getLowestPriceDish(dishes);
      this.getHighestPriceDish(dishes);
      this.item = this.dishes.length;
    });
  }

  // PAGING
  items: number[] = [2, 4, 8, 16];
  item: number = 4;
  currentPage: number = 0;

  paginationForm = new FormGroup({
    item: new FormControl()
  })

  itemChoice() {
    this.item = this.paginationForm.value.item;
  }

  pageNumber() {
    if (typeof this.dishes != "undefined") {
      if (this.dishes.length % this.item == 0) {
        return ~~(this.dishes.length / this.item) - 1
      }
      else {
        return ~~(this.dishes.length / this.item)
      }
    }
    return 1

  }

  nextPage() {
    this.currentPage++
  }

  prevPage() {
    this.currentPage--
  }

  // CHEAPEST/MOST EXPENSIVE DISH
  getHighestPriceDish(dishes: Dish[]) {
    this.highestPriceDish = dishes[0];
    for (let dish of dishes) {
      if (dish.price > this.highestPriceDish.price) {
        this.highestPriceDish = dish;
      }
    }
  }

  getLowestPriceDish(dishes: Dish[]) {
    this.lowestPriceDish = dishes[0];
    for (let dish of dishes) {
      if (dish.price < this.lowestPriceDish.price) {
        this.lowestPriceDish = dish;
      }
    }
  }

  // CHANGE CURRENCY
  changeCurrency(currency: string) {
    if (currency === 'EUR') {
      this.currencyService.currency = 'USD'
    }
    else {
      this.currencyService.currency = 'EUR'
    }
  }

  // FILTERS
  updatefilteredDishes(event: any) {
    this.filteredDishes = event
  }

  filterByCuisine(cuisines: any) {
    let res = [];
    for (let cuisine of cuisines) {
      for (let dish of this.allDishes) {
        if (dish.cuisine == cuisine) {
          res.push(dish);
        }
      }
    }
    return res;
  }

  filterByCategory(categories: any) {
    let res = [];
    for (let category of categories) {
      for (let dish of this.dishes) {
        if (dish.category == category) {
          res.push(dish);
        }
      }
    }
    return res;
  }

  filterByStars(rates: any) {
    let res = [];
    for (let rate of rates) {
      for (let dish of this.dishes) {
        console.log(dish.rate)
        if (dish.rateNumber != 0 && Math.floor(dish.rate / dish.rateNumber) == rate) {
          res.push(dish)
        }
      }
    }
    return res;
  }

  getDishes() {
    if (this.filteredDishes[0].length > 0) {
      this.dishes = this.filterByCuisine(this.filteredDishes[0])
    }

    if (this.filteredDishes[1].length > 0) {
      this.dishes = this.filterByCategory(this.filteredDishes[1])
    }

    if (this.filteredDishes[2].length > 0) {
      this.dishes = this.filterByStars(this.filteredDishes[2])
    }

    if (this.filteredDishes[3] != -1) {
      this.dishes = this.dishes.filter(dish => {
        return dish.price >= this.filteredDishes[3]
      })
    }

    if (this.filteredDishes[4] != -1) {
      this.dishes = this.dishes.filter(dish => {
        return dish.price <= this.filteredDishes[4]
      })
    }

    if (typeof this.dishes != "undefined") {
      this.getHighestPriceDish(this.dishes);
      this.getLowestPriceDish(this.dishes);
    }

    return this.dishes
  }
}


