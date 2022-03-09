import { Component, OnInit } from '@angular/core';
import { Dish } from 'src/app/elements/dish-object';
import { DishService } from 'src/app/services/dish.service';
import { TrolleyService } from 'src/app/services/trolley.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyService } from 'src/app/services/currency.service';
import { map } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.scss']
})
export class DishDetailsComponent implements OnInit {
  dish!: Dish;
  raiting!: number;
  name: any
  dishes!: Dish[];

  constructor(private dishService: DishService, public trolleyService: TrolleyService, public router: Router, public currencyService: CurrencyService, private activatedRoute: ActivatedRoute, private titleService: Title) {
    this.name = this.activatedRoute.snapshot.params["name"];
    this.getDishesList();
    this.titleService.setTitle("Menu/" + this.name)
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
      this.getDish()
    });
  }

  getDish() {
    for (let i of this.dishes) {
      if (i.name == this.name) {
        this.dish = i;
      }
    }
  }

  // ADD/REMOVE DISH TO/FROM TROLLEY
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

  // CHANGE DISH IMAGE
  idx = 0;

  changeSlide(n: number) {
    this.idx += n;
    if (this.idx === this.dish.img.length) {
      this.idx = 0
    }
    else if (this.idx < 0) {
      this.idx = this.dish.img.length - 1
    }
    this.getImage()
  }

  getImage() {
    return this.dish.img[this.idx]
  }

  isInTrolley() {
    if (this.dish.selectedNumber > 0) {
      return true;
    }
    return false;
  }

  isDefined() {
    return typeof this.dish != "undefined"
  }

}
