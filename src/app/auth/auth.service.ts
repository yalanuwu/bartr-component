// src/app/auth/auth.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { User } from '../types';
import { AuthResponse, LoginCredentials, RegisterCredentials } from './auth.interface';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_API_URL = `${environment.apiUrl}`;

  private _isLoggedInSubject: BehaviorSubject<boolean>;
  private _currentUserSubject: BehaviorSubject<User | null>;

  private isBrowser: boolean;

  constructor(
    private router: Router,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    let initialLoginStatus = false;
    let initialUser: User | null = null;

    if (this.isBrowser) {
      initialLoginStatus = this.hasValidToken();
      initialUser = this.getStoredUser();
    }

    this._isLoggedInSubject = new BehaviorSubject<boolean>(initialLoginStatus);
    this._currentUserSubject = new BehaviorSubject<User | null>(initialUser);
  }

  getLoginStatus(): Observable<boolean> {
    return this._isLoggedInSubject.asObservable();
  }

  getCurrentUser(): Observable<User | null> {
    return this._currentUserSubject.asObservable();
  }

  isLoggedIn(): boolean {
    return this.isBrowser && this.hasValidToken();
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    const loginEndpoint = `${this.AUTH_API_URL}/login`;

    return this.http.post<AuthResponse>(loginEndpoint, credentials).pipe(
      tap(response => {
        console.log('Login Response received (AuthService):', response);
        console.log('Login Response token (AuthService):', response.token);

        if (this.isBrowser) {
          if (response.token) {
              this.setToken(response.token);
          } else {
              console.warn('AuthService: Login response did not contain a token. LocalStorage not updated.');
          }
          // Assuming response.user is available and you want to store it:
          // if (response.user) {
          //   this.storeUser(response.user);
          // } else {
          //   console.warn('AuthService: Login response did not contain user data.');
          // }
        }
        this._isLoggedInSubject.next(true);
        // Assuming response.user is available and you want to update BehaviorSubject:
        // if (response.user) {
        //   this._currentUserSubject.next(response.user);
        // }

        console.log('AuthService: Login successful for', (credentials as any).username);
        console.log('AuthService: Current login status:', this._isLoggedInSubject.getValue());
      }),
      catchError(this.handleError)
    );
  }

  register(userData: RegisterCredentials): Observable<AuthResponse> {
    const registerEndpoint = `${this.AUTH_API_URL}/api/users/register`;

    return this.http.post<AuthResponse>(registerEndpoint, userData).pipe(
      tap(response => {
        // --- DIAGNOSTIC LOGS FOR REGISTER ---
        console.log('Register Response received (AuthService):', response);
        // This log will likely show `undefined` for token, which is now expected behavior for signup
        console.log('Register Response token (AuthService):', response.token);
        // --- END DIAGNOSTIC LOGS ---

        // IMPORTANT CHANGE: Do NOT set token or update login status here
        // as the backend is not sending a token and user is not automatically logged in.
        console.log('AuthService: Registration successful. User needs to log in manually.');
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('user_data');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
    }
    this._isLoggedInSubject.next(false);
    this._currentUserSubject.next(null);
    console.log('AuthService: User logged out.');
    this.router.navigate(['/auth/signin']);
  }

  private setToken(token: string): void {
    if (this.isBrowser) {
      localStorage.setItem('token', token);
      console.log('AuthService: Token set in localStorage (first 10 chars):', token ? token.substring(0, 10) + '...' : 'undefined/null');
    }
  }

  private getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('token');
    }
    return null;
  }

  private hasValidToken(): boolean {
    const token = this.getToken();
    return !!token;
  }

  private storeUser(user: User): void {
    if (this.isBrowser) {
      localStorage.setItem('user_data', JSON.stringify(user));
    }
  }

  private getStoredUser(): User | null {
    if (this.isBrowser) {
      const userData = localStorage.getItem('user_data');
      try {
        return userData ? JSON.parse(userData) : null;
      } catch (e) {
        console.error('Error parsing stored user data:', e);
        return null;
      }
    }
    return null;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side Error: ${error.error.message}`;
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);

      if (error.status === 401) {
        errorMessage = error.error.message || 'Invalid credentials. Please check your email and password.';
      } else if (error.error && error.error.message) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Server Error: ${error.statusText || error.status}`;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}
