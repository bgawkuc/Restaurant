import { Component, OnInit } from '@angular/core';
import { Dish } from 'src/app/elements/dish-object';
import { Category } from 'src/app/elements/category';
import { Cuisine } from 'src/app/elements/cuisine';
import { DishType } from 'src/app/elements/type';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DishService } from 'src/app/services/dish.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  types: any[] = [];
  cuisines: any[] = [];
  categories: any[] = [];
  id: number = 12;

  dishForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.pattern("[A-Za-z]*")]),
    cuisine: new FormControl(null, Validators.required),
    type: new FormControl(null, Validators.required),
    category: new FormControl(null, Validators.required),
    ingredients: new FormControl(null, Validators.required),
    maxNumber: new FormControl(null, [Validators.required, Validators.min(1), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    price: new FormControl(null, [Validators.required, Validators.min(1), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    description: new FormControl(null, Validators.required),
    img: new FormControl("", Validators.required)
  });

  constructor(private dishService: DishService) { }

  ngOnInit(): void {
    this.addType();
    this.addCuisine();
    this.addCategory();
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

  onSubmit() {
    let form = this.dishForm.value;
    let createDish: Dish = {
      name: form.name,
      cuisine: form.cuisine,
      type: form.type,
      category: form.category,
      ingredients: form.description,
      selectedNumber: 0,
      maxNumber: form.maxNumber,
      price: Number(form.price),
      priceUSD: Number(form.price),
      priceEUR: Number(form.price) * 0.89,
      description: form.description,
      img: form.img.split(","),
      rate: 0,
      rateNumber: 0,
      reviews: [],
      emailReview: [],
      emailRate: []
    }

    if (this.dishForm.valid) {
      this.id++;
      this.dishService.createDish(createDish)
      this.dishForm.reset();
    }
    else {
      alert("Dish cant be added")
    }

  }

}
