import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/elements/user';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  user!: User;
  mobile: boolean = false;
  menuBars = faBars;
  showMenu: boolean = false;

  constructor(public authService: AuthService, public userService: UserService) {
    this.authService.getLoggedUser().subscribe(
      user => {
        if (user != null) {
          this.user = user;
        }
      }
    )
  }

  ngOnInit(): void {
    window.onresize = () => this.mobile = window.innerWidth <= 750;
  }

  dropMenu() {
    if (this.showMenu) {
      this.showMenu = false;
    }
    else {
      this.showMenu = true;
    }
  }

  isDefined() {
    if (typeof this.user != "undefined") {
      return true;
    }
    return false;
  }

  signOut() {
    this.authService.signOut()
    this.authService.isLoggedIn = false;
  }

}
