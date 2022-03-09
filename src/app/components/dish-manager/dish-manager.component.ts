import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Dish } from 'src/app/elements/dish-object';
import { CurrencyService } from 'src/app/services/currency.service';
import { DishService } from 'src/app/services/dish.service';
import { TrolleyService } from 'src/app/services/trolley.service';

@Component({
  selector: 'app-dish-manager',
  templateUrl: './dish-manager.component.html',
  styleUrls: ['./dish-manager.component.scss']
})
export class DishManagerComponent implements OnInit {
  dishes!: Dish[];

  constructor(private dishService: DishService, private trolleyService: TrolleyService, public currencyService: CurrencyService, private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title) {
    this.getDishesList();
    this.titleService.setTitle("Dish-manager")
  }

  ngOnInit(): void {
    this.getDishesList();
  }

  getDishesList() {
    this.dishService.getDishesList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(dishes => {
      this.dishes = (<Dish[]>dishes);
    });
  }

  removeDish(dish: Dish) {
    alert("You are not allowed to delete any dish")
    return
    this.dishService.deleteDish(dish.name).catch(error => console.log(error))
    this.trolleyService.updateTrolley(0, dish);
  }

  updateDish(dish: Dish) {
    this.dishService.setCurrentDish(dish);
    this.router.navigate([dish.name], {
      relativeTo: this.activatedRoute
    })
  }

}
