import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Category } from 'src/app/elements/category';
import { Cuisine } from 'src/app/elements/cuisine';
import { Dish } from 'src/app/elements/dish-object';
import { DishService } from 'src/app/services/dish.service';
import { DishType } from 'src/app/elements/type';

@Component({
  selector: 'app-dish-update',
  templateUrl: './dish-update.component.html',
  styleUrls: ['./dish-update.component.scss']
})
export class DishUpdateComponent implements OnInit {
  [x: string]: any;
  dish!: Dish;
  dishes!: Dish[];
  name!: string;
  types: any[] = [];
  cuisines: any[] = [];
  categories: any[] = [];


  constructor(public router: Router, private dishService: DishService, private activatedRoute: ActivatedRoute) {
    this.name = this.activatedRoute.snapshot.params["name"];
    this.getDishesList();
    this.addCategory();
    this.addCuisine();
    this.addType();
  }

  ngOnInit(): void {
    this.getDishesList()
    this.dish = this.dishService.dish;
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

  isDefined() {
    return typeof this.dish != "undefined"
  }

  addType() {
    for (let t in DishType) {
      this.types.push(DishType[t]);
    }
  }

  addCuisine() {
    for (let c in Cuisine) {
      this.cuisines.push(Cuisine[c]);
    }
  }

  addCategory() {
    for (let c in Category) {
      this.categories.push(Category[c]);
    }
  }

  // UPDATE CATEGORY
  categoryForm = new FormGroup({
    category: new FormControl(null, [Validators.required])
  })

  updateCategory() {
    this.dish.category = this.categoryForm.value.category;
    this.dishService.updateDish(this.dish.name, this.dish);
    this.categoryForm.reset();
    alert("New category: " + `${this.dish.category}`)
  }

  // UPDATE CUISINE
  cuisineForm = new FormGroup({
    cuisine: new FormControl(null, [Validators.required])
  })

  updateCuisine() {
    this.dish.cuisine = this.cuisineForm.value.cuisine;
    this.dishService.updateDish(this.dish.name, this.dish);
    this.cuisineForm.reset();
    alert("New cuisine: " + `${this.dish.cuisine}`)

  }

  // UPDATE TYPE
  typeForm = new FormGroup({
    type: new FormControl(null, [Validators.required])
  })

  updateType() {
    this.dish.type = this.typeForm.value.type;
    this.dishService.updateDish(this.dish.name, this.dish);
    this.typeForm.reset();
    alert("New type: " + `${this.dish.type}`)

  }

  // UPDATE INGREDIENTS
  ingredientsForm = new FormGroup({
    ingredients: new FormControl(null, [Validators.required])
  })

  updateIngredients() {
    if (this.ingredientsForm.valid) {
      this.dish.ingredients = this.ingredientsForm.value.ingredients;
      this.dishService.updateDish(this.dish.name, this.dish);
      this.ingredientsForm.reset();
      alert("New ingredients: " + `${this.dish.ingredients}`)
    }
  }

  // UPDATE DESCRIPTION
  descriptionForm = new FormGroup({
    description: new FormControl(null, [Validators.required])
  })

  updateDescription() {
    if (this.descriptionForm.valid) {
      this.dish.description = this.descriptionForm.value.description;
      this.dishService.updateDish(this.dish.name, this.dish);
      this.descriptionForm.reset();
      alert("New description: " + `${this.dish.description}`)
    }
  }

  // UPDATE IMAGES
  imgForm = new FormGroup({
    img: new FormControl(null, [Validators.required])
  })

  updateImg() {
    if (this.imgForm.valid) {
      this.dish.img = this.imgForm.value.img.split(",");
      this.dishService.updateDish(this.dish.name, this.dish);
      this.imgForm.reset();
      alert("New images!")
    }
  }

  // UPDATE MAX NUMBER
  maxForm = new FormGroup({
    max: new FormControl(null, [Validators.required, Validators.min(1), Validators.pattern(/^-?(0|[1-9]\d*)?$/)])
  })

  updateMax() {
    if (this.maxForm.valid) {
      this.dish.maxNumber = this.maxForm.value.max;
      this.dishService.updateDish(this.dish.name, this.dish);
      this.maxForm.reset();
      alert("New max number: " + `${this.dish.maxNumber}`)
    }
  }

  // UPDATE PRICE
  priceForm = new FormGroup({
    price: new FormControl(null, [Validators.required, Validators.min(1), Validators.pattern(/^-?(0|[1-9]\d*)?$/)])
  })

  updatePrice() {
    if (this.priceForm.valid) {
      this.dish.price = this.priceForm.value.price;
      this.dish.priceUSD = this.priceForm.value.price;
      this.dish.priceEUR = this.priceForm.value.price * 0.89;
      this.dishService.updateDish(this.dish.name, this.dish);
      this.priceForm.reset();
      alert("New price: " + `${this.dish.price}`)
    }
  }

  // UPDATE RATE
  rateForm = new FormGroup({
    rate: new FormControl(null, [Validators.required, Validators.pattern("[1-5]")])
  })

  updateRate() {
    if (this.rateForm.valid) {
      this.dish.rate = this.rateForm.value.rate;
      this.dishService.updateDish(this.dish.name, this.dish);
      this.rateForm.reset();
      alert("New rate: " + `${this.dish.rate}`)
    }
  }

}
