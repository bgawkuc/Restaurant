import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Dish } from '../../elements/dish-object';
import { DishService } from '../../services/dish.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/elements/user';

@Component({
  selector: 'app-dish-reviews',
  templateUrl: './dish-reviews.component.html',
  styleUrls: ['./dish-reviews.component.scss']
})
export class DishReviewsComponent implements OnInit {
  @Input() dish!: Dish;
  @Input() isInTrolley!: boolean;
  user!: User;

  reviewForm = new FormGroup({
    nick: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    review: new FormControl(null, [Validators.required, Validators.minLength(50), Validators.maxLength(500)]),
    date: new FormControl()
  });

  constructor(private dishService: DishService, private authService: AuthService) {
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
    for (let i in this.dish.emailReview) {
      if (this.dish.emailReview[i] == email) {
        return false;
      }
    }
    return true;
  }

  onSubmit() {
    if (this.user != null && this.user.isBanned == true) {
      alert('You are banned. You cant add review')
      return
    }

    if (this.isInTrolley == true) {
      let form = this.reviewForm.value;
      let reviews = this.dish.reviews

      if (this.reviewForm.valid) {
        if (this.user != null && this.isFirstReview(this.user.email)) {
          reviews.push(form.nick);
          reviews.push(form.name);
          reviews.push(form.review);
          reviews.push(form.date);
          this.dish.emailReview.push(this.user.email);
          this.dishService.updateDish(this.dish.name, this.dish);
          this.reviewForm.reset();
        }
        else {
          alert('You can add only one review to this dish')
        }
      }
    }
    else {
      alert("You need to add this dish to trolley to add review")
    }

  }
}
