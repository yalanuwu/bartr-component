// src/app/register-page/register-page.component.ts
import { Component } from '@angular/core'; // Removed Output, EventEmitter as it's a page now
import { CommonModule, NgIf } from '@angular/common'; // For NgIf
import { FormsModule } from '@angular/forms'; // For [(ngModel)]
import { Router, RouterModule } from '@angular/router'; // For programmatic navigation and RouterLink

@Component({
  selector: 'app-sign-up-page', // Changed selector
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, RouterModule], // Added RouterModule for RouterLink
  templateUrl: './sign-up-page.component.html', // Updated template URL
  styleUrls: ['./sign-up-page.component.css'] // Updated style URL
})
export class SignUpPageComponent { // Renamed class from SignUpModalComponent

  // Form fields
  fullName = '';
  username = '';
  email = '';
  password = '';
  passwordVisible = false; // Controls the visibility of the password input
  errorMessage: string | null = null; // For displaying registration errors

  // Removed @Output events as this is now a page, not a modal emitting events.

  constructor(private router: Router) { }

  /**
   * Toggles the visibility of the password field.
   */
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
    console.log('RegisterPageComponent: Password visibility toggled to', this.passwordVisible);
  }

  /**
   * Handles the main form submission for registration.
   */
  onSubmit(): void {
    this.errorMessage = null; // Clear any previous errors

    if (!this.fullName || !this.username || !this.email || !this.password) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    if (this.password.length < 6) { // Example: minimum password length
      this.errorMessage = 'Password must be at least 6 characters long.';
      return;
    }
    if (!this.email.includes('@') || !this.email.includes('.')) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    console.log('RegisterPageComponent: Attempting registration with:', {
      fullName: this.fullName,
      username: this.username,
      email: this.email,
      password: '*****' // Don't log actual password
    });

    // Simulate API call for registration
    // In a real app, you'd call an authentication service here:
    // this.authService.register({ fullName, username, email, password }).subscribe(
    //   response => {
    //     console.log('Registration successful:', response);
    //     this.router.navigate(['/dashboard']); // Navigate to dashboard or login page
    //   },
    //   error => {
    //     this.errorMessage = error.message || 'Registration failed. Please try again.';
    //   }
    // );

    // For demonstration:
    console.log('RegisterPageComponent: Registration simulated successfully!');
    // On success, navigate to the login page or a dashboard
    this.router.navigate(['/signin']);
  }

  // Removed onBackdropClick as it's no longer a modal.

  /**
   * Handles Google register button click.
   */
  onGoogleRegister(): void {
    console.log('RegisterPageComponent: Google Register clicked!');
    // Implement Google OAuth login or call a service
    // this.authService.googleLogin().subscribe(...)
    this.router.navigate(['/dashboard']); // Navigate on success
  }

  /**
   * Handles Twitter register button click.
   */
  onTwitterRegister(): void {
    console.log('RegisterPageComponent: Twitter Register clicked!');
    // Implement Twitter OAuth login or call a service
    // this.authService.twitterLogin().subscribe(...)
    this.router.navigate(['/dashboard']); // Navigate on success
  }

  /**
   * Handles "Already have an account? Log In" link click.
   */
  onLogin(): void {
    console.log('RegisterPageComponent: Log In link clicked, navigating to /login.');
    this.router.navigate(['/auth/signin']); // Navigate to the login page
  }
}
