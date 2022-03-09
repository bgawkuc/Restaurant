import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminViewComponent } from '../components/admin-view/admin-view.component';
import { DishDetailsComponent } from '../components/dish-details/dish-details.component';
import { DishManagerComponent } from '../components/dish-manager/dish-manager.component';
import { DishUpdateComponent } from '../components/dish-update/dish-update.component';
import { RestaurantComponent } from '../components/restaurant/restaurant.component';
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { StartComponent } from '../components/start/start.component';
import { TrolleyComponent } from '../components/trolley/trolley.component';
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '../guards/auth.guard';
import { ManagerGuard } from '../guards/manager.guard';


const routes: Routes = [
  { path: "", redirectTo: 'start', pathMatch: 'full' },
  { path: "start", component: StartComponent },
  { path: "menu", component: RestaurantComponent },
  { path: "trolley", component: TrolleyComponent, canActivate: [AuthGuard] },
  { path: "menu/:name", component: DishDetailsComponent, canActivate: [AuthGuard] },
  { path: "sign-in", component: SignInComponent },
  { path: "sign-up", component: SignUpComponent },
  { path: "admin-view", component: AdminViewComponent, canActivate: [AdminGuard] },
  { path: "dish-manager", component: DishManagerComponent, canActivate: [ManagerGuard] },
  { path: "dish-manager/:name", component: DishUpdateComponent, canActivate: [ManagerGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
