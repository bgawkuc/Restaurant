import { Component, OnInit, Input } from '@angular/core';
import { Dish } from 'src/app/elements/dish-object';
import { DishService } from 'src/app/services/dish.service';
import { TrolleyService } from 'src/app/services/trolley.service';
import { ReservedDish } from '../../elements/reservedDish';
import { CurrencyService } from 'src/app/services/currency.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})

export class DishesComponent implements OnInit {
  @Input() dish!: Dish;
  @Input() i!: number;
  @Input() currentPage!: number;
  @Input() item!: number;
  @Input() lowestPriceDish!: Dish;
  @Input() highestPriceDish!: Dish;

  constructor(private dishService: DishService, private trolleyService: TrolleyService, public currencyService: CurrencyService, private router: Router, private activatedRoute: ActivatedRoute, public authService: AuthService) { }

  ngOnInit(): void {
    let reservedDishes: Array<ReservedDish> = this.trolleyService.getReservedDishes();

    for (let dish of reservedDishes) {
      if (dish.name === this.dish.name) {
        this.dish.selectedNumber = dish.counter;
        break;
      }
    }
  }

  isIn() {
    if (this.i >= this.currentPage * this.item && this.i < (this.currentPage + 1) * this.item) {
      return true;
    }
    return false;
  }

  plusDish(dish: any) {
    if (dish.selectedNumber < dish.maxNumber) {
      dish.selectedNumber++;
      this.trolleyService.updateTrolley(1, this.dish);
    }
  }

  minusDish(dish: any) {
    if (dish.selectedNumber > 0) {
      dish.selectedNumber--;
      this.trolleyService.updateTrolley(-1, this.dish);
    }
  }

  displayDish(dish: Dish) {
    if (this.authService.isLoggedIn != false) {
      this.dishService.setCurrentDish(dish);
      this.router.navigate([this.dish.name], {
        relativeTo: this.activatedRoute
      })
    }
  }

}
