import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // BehaviorSubject holds the current state and emits it to new subscribers
  private _isLoggedIn = new BehaviorSubject<boolean>(false);

  // Expose the state as an Observable so components can subscribe to changes
  isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // On service initialization, check if user was previously logged in (e.g., from localStorage)
    if (isPlatformBrowser(this.platformId)){
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      this._isLoggedIn.next(loggedIn);
    }

   }

   login(): void {
    // Set login state to true
    this._isLoggedIn.next(true);
    // Store in localStorage for persistence across browser sessions
    localStorage.setItem('isLoggedIn', 'true');
    console.log('AuthService: User logged in.');
  }

  logout(): void {
    // Set login state to false
    this._isLoggedIn.next(false);
    // Remove from localStorage
    localStorage.removeItem('isLoggedIn');
    console.log('AuthService: User logged out.');
  }

  /**
   * Returns the current login status synchronously (useful for guards, but prefer observable for reactive updates).
   */
  get isLoggedInValue(): boolean {
    return this._isLoggedIn.value;
  }
}
