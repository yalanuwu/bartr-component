// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http'; // Import HttpClient
import { catchError, map, Observable, tap, throwError } from 'rxjs'; // Import Observable
import { environment } from '../../environments/environment';
import { User } from '../types'; // Assuming your User interface is correctly defined here

// Remove this import: 'node:path' is for Node.js environments, not Angular frontend
// import { resolve } from 'node:path';

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Base URL for user-related API endpoints
  // Assuming environment.apiUrl is like 'http://localhost:3000'
  // and your user API is at 'http://localhost:3000/api/users'
  private readonly userApiUrl = `${environment.apiUrl}/api/users`;

  constructor(private http: HttpClient) { } // Inject HttpClient

  /**
   * Fetches a user's data from the backend by their username.
   * @param username The username of the user to fetch.
   * @returns An Observable that emits the User object.
   */
  getByUserName(username: string): Observable<User> {
    // Construct the full URL for the API endpoint
    // Example: http://localhost:3000/api/users/byUsername?username=someuser
    const url = `${this.userApiUrl}/byUsername?username=${username}`;

    // Use Angular's HttpClient to make the GET request.
    // The <User> in http.get<User> tells TypeScript the expected response type.
    return this.http.get<User>(url);
  }

  /**
   * Calls the backend API to change a user's password.
   * @param userId The ID of the user whose password is to be changed.
   * @param data An object containing currentPassword and newPassword.
   * @returns An Observable of type 'string' (the success message from the backend).
   */
  changePassword(userId: number, data: ChangePasswordRequest): Observable<string> {
    const url = `${this.userApiUrl}/changePassword/${userId}`; // Backend endpoint URL

    const authToken = localStorage.getItem('token');

    let headers = new HttpHeaders();
    if (authToken) {
      headers = headers.set('Authorization', `Bearer ${authToken}`);
      console.log('UserService: Manually adding Authorization header with token:', authToken); // Debugging
    } else {
      console.warn('UserService: No authToken found in localStorage for password change request.'); // Warning
    }

    // Create HttpParams for @RequestParam
    let params = new HttpParams();
    params = params.append('currentPassword', data.currentPassword);
    params = params.append('newPassword', data.newPassword);

    // Make the PATCH request. The response type is text, so specify responseType: 'text'.
    // If the backend returns a JSON object with a message, you'd use <any> or a specific interface.
    // Given ResponseEntity<?> and "Password updated successfully", 'text' is a good guess.
    return this.http.patch(url, null, { headers: headers, params: params, responseType: 'text' }).pipe(
      // The backend returns a String directly, so map it.
      map((response: string) => response),
      catchError(this.handleError)
    );
  }

  /**
   * Calls the backend API to delete a user.
   * Manually adds Authorization header by fetching token from localStorage.
   * @param userId The ID of the user to be deleted.
   * @returns An Observable of type 'string' (the success message from the backend).
   */
  deleteUser(userId: number): Observable<string> {
    const url = `${this.userApiUrl}/${userId}`; // Assuming your user base path is /api/users

    // --- MANUAL AUTH HEADER ADDITION ---
    const authToken = localStorage.getItem('token'); // Get token from localStorage

    let headers = new HttpHeaders();
    if (authToken) {
      headers = headers.set('Authorization', `Bearer ${authToken}`);
      console.log('UserService: Manually adding Authorization header with token:', authToken); // Debugging
    } else {
      console.warn('UserService: No authToken found in localStorage for delete user request.'); // Warning
    }
    // --- END MANUAL AUTH HEADER ADDITION ---

    console.log('UserService: Preparing to send DELETE request to:', url);

    // Make the DELETE request. The response type is text.
    return this.http.delete(url, { headers: headers, responseType: 'text' }).pipe(
      tap(response => console.log('UserService: DELETE request successful, response:', response)),
      map((response: string) => response),
      catchError(error => {
        console.error('UserService: DELETE request failed, error:', error);
        return this.handleError(error);
      })
    );
  }

  // You might also want a method to get the currently authenticated user's data
  // if your backend has an endpoint for it (e.g., /api/users/me)
  // getCurrentUserProfile(): Observable<User> {
  //   const url = `${this.userApiUrl}/me`; // Example endpoint for current user
  //   return this.http.get<User>(url);
  // }

  //Handle Error
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Client-side Error: ${error.error.message}`;
    } else {
      // Backend returned an unsuccessful response code.
      // The response body may contain more information.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);

      if (error.status === 400 || error.status === 401 || error.status === 403) {
        // Specific errors like bad credentials, forbidden, etc.
        // Backend error response might be a string or an object with a 'message' field
        errorMessage = error.error.message || error.error || 'Authentication/Authorization failed.';
      } else if (error.status === 404) {
        errorMessage = 'Resource not found.';
      } else if (error.error && error.error.message) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Server Error: ${error.statusText || error.status}`;
      }
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error(errorMessage));
  }
}
