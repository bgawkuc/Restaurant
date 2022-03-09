import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Dish } from 'src/app/elements/dish-object';
import { AuthService } from 'src/app/services/auth.service';
import { DishService } from 'src/app/services/dish.service';
import { User } from 'src/app/elements/user';

@Component({
  selector: 'app-dish-rating',
  templateUrl: './dish-rating.component.html',
  styleUrls: ['./dish-rating.component.scss']
})

export class DishRatingComponent implements OnInit {
  yourRate = 0;
  user!: User;
  @Input() dish!: Dish;
  @Input() isInTrolley!: boolean;

  constructor(private authService: AuthService, private dishService: DishService) {
    this.authService.getLoggedUser().subscribe(
      user => {
        if (user != null) {
          this.user = user;
        }
      }
    )
  }

  ngOnInit(): void {
  }

  isFirstReview(email: string) {
    for (let i in this.dish.emailRate) {
      if (this.dish.emailRate[i] == email) {
        return false;
      }
    }
    return true;
  }

  updateRate() {
    if (this.user != null && this.user.isManager) {
      alert('Manager cant add rate')
      return
    }
    if (this.user != null && this.user.isBanned == true) {
      alert('You are banned. You cant add review')
      return
    }

    if (this.isInTrolley == true && this.user != null) {
      if (this.isFirstReview(this.user.email)) {
        this.dish.emailRate.push(this.user.email);
        this.dish.rate += this.yourRate;
        this.dish.rateNumber++;
        this.dishService.updateDish(this.dish.name, this.dish);
      }
      else {
        alert('You can add only one rate to this dish')
      }
    }
    else {
      alert('You need to add this dish to trolley to add rate')
    }

  }
}
