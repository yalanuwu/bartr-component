// src/app/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service'; // Make sure the path to your AuthService is correct

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {

    return this.authService.isLoggedIn$.pipe(
      take(1), // Ensures we only take the current value and then complete the observable
      map(isLoggedIn => {
        if (isLoggedIn) {
          // If the user is logged in, grant access
          console.log('AuthGuard: User is logged in. Access granted to:', state.url);
          return true;
        } else {
          // If the user is NOT logged in, redirect them.
          // Since your login is a modal, the most straightforward approach for a guard
          // is to redirect to your home page, where the user can then click to open the login modal.
          console.log('AuthGuard: User is NOT logged in. Redirecting to home page.');
          return this.router.createUrlTree(['/login']); // Redirects to the root URL (your home page)
          // ALTERNATIVE: If you have a dedicated /login route (even if it just opens a modal),
          // you could redirect there: return this.router.createUrlTree(['/login']);
        }
      })
    );
  }
}
