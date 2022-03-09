import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) { }

  canActivate(): Observable<boolean> {
    return this.authService.authState$.pipe(map(state => {

      if (state !== null) {
        return true;
      }

      this.router.navigate(['/start']);
      return false;
    }))
  }
}
