import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/elements/user';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent implements OnInit {
  users!: User[];

  constructor(private authService: AuthService, private userService: UserService, private titleService: Title) { this.titleService.setTitle("Admin view") }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService
      .getUsers()
      .snapshotChanges()
      .pipe(map(changes =>
        changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }))))
      .subscribe(users => {
        this.users = users;
      });
  }

  updateMode(event: Event, mode: string) {
    event.preventDefault();
    this.authService.changePersistence(mode);
    if (mode === 'session') {
      alert("Session mode")
    }
    if (mode === 'none') {
      alert("None mode")
    }
    if (mode === 'local') {
      alert("Local mode")
    }
  }

  banUser(user: User) {
    user.isBanned = true;
    this.userService.updateUser(user.email, user);
  }

  unbanUser(user: User) {
    user.isBanned = false;
    this.userService.updateUser(user.email, user);
  }

  updateRole(user: User, value: string, change: boolean) {
    if (value == "admin") {
      user.isAdmin = change;
    }
    if (value == "manager") {
      user.isManager = change;
    }
    if (value == "customer") {
      user.isCustomer = change;
    }
    this.userService.updateUser(user.email, user)
  }
}
