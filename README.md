# Restaurant
### Restaurant website created for Intruduction to Web Applications course (WDAI) at AGH 2021/22
<br>

### Technology used:
* Angular
* Typescript
* HTML
* SCSS
* Firebase
<br><br>

### Home page
Restaurant is a website created to order dishes. 
<br>

<img src="README_files/home_page.png" width=900px>
<br>

### Menu 
As unlogged user you can browse the menu, use custom filters, change currency in which the prices are displayed and change number of dishes on the website.
<br>

<img src="README_files/menu.png" width=900px>
<br>

### Sign in/ Sign up
To access other options you need to sign in. Thanks to AuthGuards you can't access other components without signing in.

There are 3 different types of accounts:
* customer  
* manager
* admin

<br>
You can create new customer account or sign in using 
this data:

| **login**           | **password**        | **user**      |
| :-----------------: | :-----------------: | :-----------: |
|   admin1@gmail.com  | admin1@gmail.com    | admin         |
| manager1@gmail.com  | manager1@gmail.com  | manager       |
| customer1@gmail.com | customer1@gmail.com | customer      |

<br>
<img src="README_files/sign_in.png" width=900px >
<img src="README_files/sign_up.png" width=900px>
<br>

### Dish details
As logged user you can click on the dish image to see more details. In dish details view you can see dish description, rate and reviews.
If you add dish to trolley you can add (only one) dish rate or review. Manager is not allowed to add rates or reviews.
<br>

<img src="README_files/dish_details1.png" width=900px>
<img src="README_files/dish_details2.png" width=900px>
<img src="README_files/dish_details3.png" width=900px>
<br>

### Trolley
After signing in you can add dishes to trolley.
In trolley you can see your whole order or change number of added dishes.
<br>

<img src="README_files/trolley.png" width=900px>
<br>

### Admin view
Only admin has access to admin view. He can add/delete roles (admin, manager, customer) or ban/unban other users.
<br>

<img src="README_files/admin_view.png" width=900px>
<br>

### Dish manager
Admin and manager have access to dish manager. There they can change menu - update, remove or add dishes.

<img src="README_files/dish_manager.png" width=900px>
<img src="README_files/add_dish.png" width=900px>