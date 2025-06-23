// src/app/register-page/register-page.component.ts
import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // For programmatic navigation and RouterLink

// Import AuthService and the necessary interfaces
import { AuthService } from '../auth.service'; // Adjust path as needed
import { RegisterCredentials } from '../auth.interface'; // Adjust path as needed

@Component({
  selector: 'app-sign-up-page', // Changed selector as per your request
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, RouterModule], // Added RouterModule for RouterLink
  templateUrl: './sign-up-page.component.html', // Updated template URL as per your request
  styleUrls: ['./sign-up-page.component.css'] // Updated style URL as per your request
})
export class SignUpPageComponent { // Renamed class from SignUpModalComponent to SignUpPageComponent

  // Form fields
  fullName = '';
  username = '';
  email = '';
  password = '';
  passwordVisible = false; // Controls the visibility of the password input
  errorMessage: string | null = null; // For displaying registration errors
  loading = false; // <-- NEW: Add loading state for better UX

  // Removed @Output events as this is now a page, not a modal emitting events.

  constructor(
    private router: Router,
    private authService: AuthService // <-- NEW: Inject AuthService
  ) { }

  /**
   * Toggles the visibility of the password field.
   */
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
    console.log('SignUpPageComponent: Password visibility toggled to', this.passwordVisible);
  }

  /**
   * Handles the main form submission for registration.
   */
  onSubmit(): void {
    this.errorMessage = null; // Clear any previous errors
    this.loading = true;      // Set loading to true when submission starts

    // Client-side validation
    if (!this.fullName || !this.username || !this.email || !this.password) {
      this.errorMessage = 'All fields are required.';
      this.loading = false; // Stop loading if validation fails
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long.';
      this.loading = false;
      return;
    }
    if (!this.email.includes('@') || !this.email.includes('.')) {
      this.errorMessage = 'Please enter a valid email address.';
      this.loading = false;
      return;
    }

    const registrationData: RegisterCredentials = {
      fullname: this.fullName,
      username: this.username,
      email: this.email,
      password: this.password
    };

    console.log('SignUpPageComponent: Attempting registration...');

    // Call the AuthService's register method
    this.authService.register(registrationData).subscribe({
      next: (response) => {
        console.log('SignUpPageComponent: Registration successful!', response);
        this.loading = false; // Stop loading
        // If backend automatically logs in on registration, navigate to dashboard
        this.router.navigate(['/auth/signin']); // Navigate to the home page or dashboard
      },
      error: (error) => {
        console.error('SignUpPageComponent: Registration failed:', error);
        this.loading = false; // Stop loading
        // Display the error message from the AuthService's handleError
        this.errorMessage = error.message || 'Registration failed. Please try again.';
      }
    });
  }

  // Removed onBackdropClick as it's no longer a modal.

  /**
   * Handles Google register button click.
   */
  onGoogleRegister(): void {
    console.log('SignUpPageComponent: Google Register clicked!');
    // In a real app, initiate Google OAuth flow.
    // This typically involves redirecting to a backend endpoint that starts the OAuth process.
    this.errorMessage = 'Google registration not yet fully implemented.';
    // Example: this.router.navigate(['/auth/google']); // Or window.location.href to a backend URL
  }

  /**
   * Handles Twitter register button click.
   */
  onTwitterRegister(): void {
    console.log('SignUpPageComponent: Twitter Register clicked!');
    // In a real app, initiate Twitter OAuth flow.
    this.errorMessage = 'Twitter registration not yet fully implemented.';
    // Example: this.router.navigate(['/auth/twitter']); // Or window.location.href to a backend URL
  }

  /**
   * Handles "Already have an account? Log In" link click.
   */
  onLogin(): void {
    console.log('SignUpPageComponent: Log In link clicked, navigating to /auth/signin.');
    this.router.navigate(['/auth/signin']); // Navigate to the login page
  }
}
