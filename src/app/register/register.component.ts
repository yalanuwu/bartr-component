// src/app/sign-up-modal/sign-up-modal.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // For NgIf
import { FormsModule } from '@angular/forms'; // For [(ngModel)]
import { Router } from '@angular/router'; // For programmatic navigation

@Component({
  selector: 'app-sign-up-modal', // Changed selector to avoid conflict with potential existing 'app-signup'
  standalone: true, // Mark as standalone
  imports: [CommonModule, FormsModule], // Import necessary modules
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class SignUpModalComponent {

  // Form fields
  fullName = '';
  username = '';
  email = '';
  password = '';
  passwordVisible = false; // Controls the visibility of the password input
  errorMessage: string | null = null; // For displaying registration errors

  // Output events for parent component
  @Output() close = new EventEmitter<void>(); // Emits when the modal should be closed
  @Output() register = new EventEmitter<{ fullName: string; username: string; email: string; password: string }>(); // Emits registration credentials
  @Output() googleRegister = new EventEmitter<void>(); // Emits for Google registration
  @Output() twitterRegister = new EventEmitter<void>(); // Emits for Twitter registration
  @Output() navigateToLogin = new EventEmitter<void>(); // Emits to navigate to login

  constructor(private router: Router) { }

  /**
   * Toggles the visibility of the password field.
   */
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
    console.log('SignUpModalComponent: Password visibility toggled to', this.passwordVisible);
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

    console.log('SignUpModalComponent: Attempting registration with:', {
      fullName: this.fullName,
      username: this.username,
      email: this.email,
      password: '*****' // Don't log actual password
    });
    this.register.emit({ fullName: this.fullName, username: this.username, email: this.email, password: this.password });

    // Simulate registration success/failure for demonstration
    // If successful: this.close.emit();
    // If fails: this.errorMessage = 'Registration failed. Please try again.';
  }

  /**
   * Handles click on the modal backdrop to close the modal.
   * @param event The mouse event.
   */
  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close.emit();
      console.log('SignUpModalComponent: Backdrop clicked, emitting close.');
    }
  }

  /**
   * Handles Google register button click.
   */
  onGoogleRegister(): void {
    console.log('SignUpModalComponent: Google Register clicked!');
    this.googleRegister.emit();
  }

  /**
   * Handles Twitter register button click.
   */
  onTwitterRegister(): void {
    console.log('SignUpModalComponent: Twitter Register clicked!');
    this.twitterRegister.emit();
  }

  /**
   * Handles "Already have an account? Log In" link click.
   */
  onLogin(): void {
    console.log('SignUpModalComponent: Log In link clicked, emitting navigateToLogin.');
    this.close.emit(); // Close the modal first
    this.navigateToLogin.emit(); // Let the parent component handle navigation to the login modal
  }
}
