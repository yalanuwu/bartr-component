import { resolve } from 'node:path';
// src/app/sign-in-page/sign-in-page.component.ts
import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // For programmatic navigation and RouterLink

import { AuthService } from '../auth.service'; // <-- Ensure this path is correct based on your project structure
import { LoginCredentials } from '../auth.interface'; // <-- NEW: Import LoginCredentials interface
import axios from 'axios';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, RouterModule],
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css']
})
export class SignInPageComponent {
  username = '';
  password = '';
  passwordVisible = false;
  errorMessage: string | null = null;
  loading = false; // <-- NEW: Add loading state for better UX

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
  ) { }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
    console.log('SignInPageComponent: Password visibility toggled to', this.passwordVisible);
  }

  onSubmit(): void {
    this.errorMessage = null; // Clear any previous error messages
    this.loading = true;      // Set loading to true when submission starts

    if (!this.username || !this.password) {
      this.errorMessage = 'Both username and password are required.';
      this.loading = false; // Stop loading if validation fails
      return;
    }

    const credentials: LoginCredentials = {
      username: this.username,
      password: this.password
    };

    // Use AuthService for login with the new credentials object
    this.authService.login(credentials).subscribe({
      next: (response) => { // 'next' handles successful responses
        console.log('SignInPageComponent: Login successful!', response);
        let username:string='';
        axios.get(environment.apiUrl+"/me",{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}).then(function(response){
          localStorage.setItem("username",response.data);
          console.log(response.data);
        });
        this.loading = false; // Stop loading
        this.toastr.success('Logged in Successfully!', 'Success!');
        this.router.navigate(['/']); // Navigate to a protected route (e.g., home or dashboard)
      },
      error: (error) => { // 'error' handles failed responses (from AuthService.handleError)
        console.error('SignInPageComponent: Login error:', error);
        this.loading = false; // Stop loading
        // The error object thrown by AuthService.handleError has a 'message' property
        this.errorMessage = error.message || 'An unknown error occurred during login. Please try again.';
        this.toastr.error('Error Occurred', 'Login Error');
      }
    });
  }

  // --- OAuth Login Buttons (Placeholder/Example) ---
  // Note: Actual Google/Twitter OAuth integration involves backend redirects and
  // handling callbacks, which is beyond just updating the login component for a simple backend call.
  // These methods here are placeholders for where you would initiate those flows.
  onGoogleLogin(): void {
    console.log('SignInPageComponent: Google Login clicked! (Implement actual OAuth flow)');
    // Example: window.location.href = 'YOUR_BACKEND_GOOGLE_OAUTH_START_URL';
    this.errorMessage = 'Google login is not yet fully implemented.';
  }

  onTwitterLogin(): void {
    console.log('SignInPageComponent: Twitter Login clicked! (Implement actual OAuth flow)');
    // Example: window.location.href = 'YOUR_BACKEND_TWITTER_OAUTH_START_URL';
    this.errorMessage = 'Twitter login is not yet fully implemented.';
  }

  onRegister(): void {
    console.log('SignInPageComponent: Register link clicked, navigating to /auth/signup.');
    this.router.navigate(['/auth/signup']); // Navigate to the register page
  }
}
