import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm = new FormGroup({
    eMail: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  })

  constructor(private authService: AuthService, private titleService: Title) { this.titleService.setTitle("Sign in") }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.signIn(this.signInForm.value.eMail, this.signInForm.value.password)
  }
}
