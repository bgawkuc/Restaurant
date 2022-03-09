import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { DISHES } from 'src/app/elements/dishes';
import { DishService } from 'src/app/services/dish.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { map } from 'rxjs';
import { Dish } from 'src/app/elements/dish-object';


@Component({
  selector: 'app-dish-filters',
  templateUrl: './dish-filters.component.html',
  styleUrls: ['./dish-filters.component.scss']
})

export class DishFiltersComponent implements OnInit {
  dishes = DISHES;
  newDishes: any;
  cuisineFilter: any = [];
  categoryFilter: any = [];
  raitingFilter: any = [];
  priceFilterMax: number = 0;
  priceFilterMin: number = 0;
  minPrice!: number;
  maxPrice!: number;
  filters: boolean = true;

  filteredDishes = [this.cuisineFilter, this.categoryFilter, this.raitingFilter, this.priceFilterMin, this.priceFilterMax]

  @Output() filteredDishesEmit = new EventEmitter()

  constructor(private dishService: DishService, public currencyService: CurrencyService) {
  }

  ngOnInit(): void {
    this.getDishesList();
    this.setPriceRange();
  }

  getDishesList() {
    this.dishService.getDishesList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(dishes => {
      this.dishes = <Array<Dish>>dishes;
    });
  }

  currentChange() {
    if (this.currencyService.currency === 'USD') {
      return true;
    }
    return false;
  }

  hideFilters() {
    if (this.filters) {
      this.filters = false;
    }
    else {
      this.filters = true;
    }
  }

  // FILTER BY PRICE RANGE
  setPriceRange() {
    let min = 99999;
    let max = 0;
    for (let i in this.dishes) {
      let dish = this.dishes[i];
      if (min > dish.price) {
        min = dish.price;
      }
      else if (max < dish.price) {
        max = dish.price
      }
    }
    this.minPrice = min;
    this.maxPrice = max;
    this.priceFilterMin = min;
    this.priceFilterMax = max;
  }

  updatePriceRange() {
    let min: number = 999999;
    let max: number = 0;
    for (let i in this.dishes) {
      let dish = this.dishes[i];

      if (min > dish.price) {
        min = dish.price;
      }
      else if (max < dish.price) {
        max = dish.price
      }
    }

    if (this.minPrice < min) {
      this.priceFilterMin = min;
    }
    if (this.minPrice > max) {
      this.priceFilterMax = max;
    }
    if (min == 99999 && max == 0) {
      return
    }
    this.minPrice = min;
    this.maxPrice = max;
  }

  updateMinPrice(event: any) {
    this.priceFilterMin = parseInt(event.target.value);
    this.filteredDishes = [this.cuisineFilter, this.categoryFilter, this.raitingFilter, this.priceFilterMin, this.priceFilterMax];
    this.filteredDishesEmit.emit(this.filteredDishes);
  }

  updateMaxPrice(event: any) {
    this.priceFilterMax = parseInt(event.target.value);
    this.filteredDishes = [this.cuisineFilter, this.categoryFilter, this.raitingFilter, this.priceFilterMin, this.priceFilterMax];
    this.filteredDishesEmit.emit(this.filteredDishes);
  }

  getCuisine() {
    let cuisines: string | string[] = [];
    for (let i in this.dishes) {
      if (!cuisines.includes(this.dishes[i].cuisine)) {
        cuisines.push(this.dishes[i].cuisine)
      }
    }
    this.updatePriceRange();
    return cuisines
  }

  getCategory() {
    let categories: string | string[] = [];
    for (let i in this.dishes) {
      if (!categories.includes(this.dishes[i].category)) {
        categories.push(this.dishes[i].category)
      }
    }
    return categories
  }

  // FILTER BY: CUISINE, CATEGORY, NUMBER OF STARS
  addCuisine(event: any) {
    if (event.target.checked) {
      this.cuisineFilter.push(event.target.value);
    }
    else {
      this.cuisineFilter = this.cuisineFilter.filter((filter: any) => {
        return filter != event.target.value
      })
    }
    console.log(this.cuisineFilter)
    this.filteredDishes = [this.cuisineFilter, this.categoryFilter, this.raitingFilter, this.priceFilterMin, this.priceFilterMax]
    this.filteredDishesEmit.emit(this.filteredDishes);
  }

  addCategory(event: any) {
    if (event.target.checked) {
      this.categoryFilter.push(event.target.value);
    }
    else {
      this.categoryFilter = this.categoryFilter.filter((filter: any) => {
        return filter != event.target.value
      })
    }
    this.filteredDishes = [this.cuisineFilter, this.categoryFilter, this.raitingFilter, this.priceFilterMin, this.priceFilterMax]
    this.filteredDishesEmit.emit(this.filteredDishes);
  }

  addStars(event: any, rate: number) {
    if (event.target.checked) {
      this.raitingFilter.push(rate);
    }
    else {
      this.raitingFilter = this.raitingFilter.filter((filter: any) => {
        return filter != rate
      })
    }
    this.filteredDishes = [this.cuisineFilter, this.categoryFilter, this.raitingFilter, this.priceFilterMin, this.priceFilterMax]
    this.filteredDishesEmit.emit(this.filteredDishes);
  }
}
