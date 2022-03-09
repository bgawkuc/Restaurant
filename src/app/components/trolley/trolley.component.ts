import { Component, OnInit } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { TrolleyService } from 'src/app/services/trolley.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-trolley',
  templateUrl: './trolley.component.html',
  styleUrls: ['./trolley.component.scss']
})

export class TrolleyComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  reservedDishes: any;
  sum: number = 0;
  dishNumber: number = 0;

  constructor(private trolleyService: TrolleyService, public currencyService: CurrencyService, private titleService: Title) { this.titleService.setTitle("Trolley") }

  ngOnInit(): void {
    this.reservedDishes = this.trolleyService.getReservedDishes();
    this.updateSum();
  }

  currencyUSD() {
    if (this.currencyService.currency === 'USD') {
      return true;
    }
    return false;
  }

  updateSum() {
    this.sum = 0;
    this.dishNumber = 0;
    for (let dish of this.reservedDishes) {
      let price: number = 0;
      if (this.currencyUSD()) {
        price = dish.priceUSD;
      }
      else {
        price = dish.priceEUR;
      }
      this.sum += dish.counter * price;
      this.dishNumber += dish.counter;
    }
  }

  plusDish(dish: any) {
    for (let element of this.reservedDishes) {
      if (element.name === dish.name && dish.maxNumber > dish.counter) {
        this.trolleyService.updateTrolley(1, element);
        this.updateSum();
      }
    }
  }

  minusDish(dish: any) {
    for (let element of this.reservedDishes) {
      if (element.name === dish.name && dish.counter > 0) {
        this.trolleyService.updateTrolley(-1, element);
        this.updateSum();
      }
    }
  }

}
