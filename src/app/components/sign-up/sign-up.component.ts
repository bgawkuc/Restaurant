import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { map } from 'rxjs';
import { Dish } from 'src/app/elements/dish-object';
import { User } from 'src/app/elements/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  users!: User[];
  dishes!: Dish[];

  signUpForm = new FormGroup({
    nick: new FormControl(null, Validators.required),
    eMail: new FormControl(null, Validators.required),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  })
  dishService: any;

  constructor(private authService: AuthService, private titleService: Title) {
    this.titleService.setTitle("Sign up");
  }

  ngOnInit(): void {
    this.getAllUsers();
    console.log(this.users)
  }

  getAllUsers() {
    this.authService.getUsers().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(users => {
      this.users = users
    });
    console.log(this.users)
  }

  signUp() {
    if (typeof this.users != "undefined") {
      for (let user of this.users) {
        if (user.email == this.signUpForm.value.eMail) {
          alert("Someone created account with email: " + `${this.signUpForm.value.eMail}` + " before")
          return;
        }
      }
    }

    this.authService.signUp(this.signUpForm.value.eMail, this.signUpForm.value.password, this.signUpForm.value.nick)
    this.signUpForm.reset();
  }
}
