import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { DishesComponent } from './components/dishes/dishes.component';
import { FormComponent } from './components/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DishRatingComponent } from './components/dish-rating/dish-rating.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DishFiltersComponent } from './components/dish-filters/dish-filters.component';

import { FormsModule } from '@angular/forms';
import { TrolleyComponent } from './components/trolley/trolley.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { StartComponent } from './components/start/start.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { DishDetailsComponent } from './components/dish-details/dish-details.component';
import { DishReviewsComponent } from './components/dish-reviews/dish-reviews.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { DishManagerComponent } from './components/dish-manager/dish-manager.component';
import { DishUpdateComponent } from './components/dish-update/dish-update.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantComponent,
    DishesComponent,
    FormComponent,
    DishRatingComponent,
    DishFiltersComponent,
    TrolleyComponent,
    StartComponent,
    NavigationBarComponent,
    DishDetailsComponent,
    DishReviewsComponent,
    SignInComponent,
    SignUpComponent,
    AdminViewComponent,
    DishManagerComponent,
    DishUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireAuthModule,
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
