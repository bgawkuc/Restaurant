# Restaurant
### Restaurant website created for Intruduction to Web Applications course (WDAI) at AGH 2021/22

### Technologies used:
* Angular
* Typescript
* HTML
* SCSS
* Firebase

### Home page
Restaurant is a website created to order dishes. 

<img src="README_files/home_page.png" width=900px>

### Menu 
As unlogged user you can browse the menu, use custom filters, change currency in which the prices are displayed and change number of dishes on the website.

<img src="README_files/menu.png" width=900px>

### Sign in/ Sign up
To access other options you need to sign in. Thanks to AuthGuards you can't access other components without signing in.

There are 3 different types of accounts:
* customer  
* manager
* admin

You can create new customer account or sign in using 
this data:

| **login**           | **password**        | **user**      |
| :-----------------: | :-----------------: | :-----------: |
|   admin1@gmail.com  | admin1@gmail.com    | admin         |
| manager1@gmail.com  | manager1@gmail.com  | manager       |
| customer1@gmail.com | customer1@gmail.com | customer      |

<img src="README_files/sign_in.png" width=900px >
<img src="README_files/sign_up.png" width=900px>

### Dish details
As logged user you can click on the dish image to see more details. In dish details view you can see dish description, rate and reviews.
If you add dish to trolley you can add (only one) dish rate or review. Manager is not allowed to add rates or reviews.

<img src="README_files/dish_details1.png" width=900px>
<img src="README_files/dish_details2.png" width=900px>
<img src="README_files/dish_details3.png" width=900px>

### Trolley
After signing in you can add dishes to trolley.
In trolley you can see your whole order or change number of added dishes.

<img src="README_files/trolley.png" width=900px>

### Admin view
Only admin has access to admin view. He can add/delete roles (admin, manager, customer) or ban/unban other users.

<img src="README_files/admin_view.png" width=900px>

### Dish manager
Admin and manager have access to dish manager. There they can change menu - update, remove or add dishes.

<img src="README_files/dish_manager.png" width=900px>
<img src="README_files/add_dish.png" width=900px>

<br>

# Project details

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
