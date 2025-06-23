// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Observable } from 'rxjs'; // Import Observable
import { environment } from '../../environments/environment';
import { User } from '../types'; // Assuming your User interface is correctly defined here

// Remove this import: 'node:path' is for Node.js environments, not Angular frontend
// import { resolve } from 'node:path';


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

  // You might also want a method to get the currently authenticated user's data
  // if your backend has an endpoint for it (e.g., /api/users/me)
  // getCurrentUserProfile(): Observable<User> {
  //   const url = `${this.userApiUrl}/me`; // Example endpoint for current user
  //   return this.http.get<User>(url);
  // }
}
