// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, BehaviorSubject } from 'rxjs'; // Import BehaviorSubject
import { delay, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly PLACEHOLDER_EMAIL = 'user@example.com';
  private readonly PLACEHOLDER_PASSWORD = 'password123';

  // Use a BehaviorSubject to hold and emit the current login status
  private _isLoggedInSubject: BehaviorSubject<boolean>;

  constructor(private router: Router) {
    // Initialize the BehaviorSubject with the current login status from localStorage
    const initialLoginStatus = localStorage.getItem('isLoggedIn') === 'true';
    this._isLoggedInSubject = new BehaviorSubject<boolean>(initialLoginStatus);
  }

  /**
   * Returns an Observable for the current login status.
   * Components can subscribe to this to react to login/logout changes.
   */
  getLoginStatus(): Observable<boolean> {
    return this._isLoggedInSubject.asObservable();
  }

  /**
   * Checks if the user is currently logged in (synchronously for guards/initial checks).
   * Note: For reactive updates, subscribe to getLoginStatus().
   * @returns True if the user is logged in, false otherwise.
   */
  isLoggedIn(): boolean {
    return this._isLoggedInSubject.getValue(); // Get the current value from the Subject
  }

  login(email: string, password: string): Observable<boolean> {
    return of(null).pipe(
      delay(1000),
      tap(() => {
        if (email === this.PLACEHOLDER_EMAIL && password === this.PLACEHOLDER_PASSWORD) {
          localStorage.setItem('isLoggedIn', 'true');
          this._isLoggedInSubject.next(true); // Emit the new true status
          console.log('AuthService: Login successful for', email);
        } else {
          localStorage.removeItem('isLoggedIn');
          this._isLoggedInSubject.next(false); // Emit the new false status
          console.log('AuthService: Login failed for', email);
        }
        console.log('AuthService: Current login status:', this._isLoggedInSubject.getValue());
      }),
      map(() => this._isLoggedInSubject.getValue()) // Map to the current status
    );
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    this._isLoggedInSubject.next(false); // Emit the new false status
    console.log('AuthService: User logged out.');
    this.router.navigate(['/auth/signin']); // Navigate to login page
  }
}
