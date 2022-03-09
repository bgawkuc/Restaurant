import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) { }
  canActivate(): Observable<boolean> {

    return this.authService.authState$.pipe(
      switchMap(user => {

        if (user != null) {
          return this.authService.getLoggedUser()
        }
        else {
          this.router.navigate(['/start']);
          return of(null);
        }

      }), map(user => {

        if (user?.isAdmin) {
          return true;
        }
        this.router.navigate(['/start']);
        return false;
      })
    )
  }

}
