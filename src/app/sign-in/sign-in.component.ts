import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  email = '';
  password = '';
  passwordVisible = false; // Controls the visibility of the password input
  errorMessage: string | null = null; // For displaying login errors

  @Output() close = new EventEmitter<void>(); // Emits when the modal should be closed
  @Output() login = new EventEmitter<{ email: string; password: string }>(); // Emits login credentials
  @Output() googleLogin = new EventEmitter<void>(); // Emits for Google login
  @Output() twitterLogin = new EventEmitter<void>(); // Emits for Twitter login
  @Output() navigateToRegister = new EventEmitter<void>(); // Emits to navigate to register

  constructor(private router: Router) { } // Inject Router for programmatic navigation

  /**
   * Toggles the visibility of the password field.
   */
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  /**
   * Handles the main form submission for email/password login.
   */
  onSubmit(): void {
    this.errorMessage = null; // Clear any previous errors

    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }

    // In a real application, you would send this data to an authentication service.
    console.log('Attempting login with:', this.email, this.password);
    this.login.emit({ email: this.email, password: this.password });

    // Simulate login success/failure for demonstration
    // If login is successful: this.close.emit();
    // If login fails: this.errorMessage = 'Invalid credentials.';
  }

  /**
   * Handles click on the modal backdrop to close the modal.
   * @param event The mouse event.
   */
  onBackdropClick(event: MouseEvent): void {

    console.log('SignInComponent: Backdrop click event received.'); // ADD THIS LOG
    if (event.target === event.currentTarget) {
      console.log('SignInComponent: Emitting close event from backdrop click.'); // ADD THIS LOG
      this.close.emit();
    } else {
      console.log('SignInComponent: Click was inside modal content, not backdrop.'); // ADD THIS LOG
    }
  }

  /**
   * Handles Google login button click.
   */
  onGoogleLogin(): void {
    console.log('Google Login clicked!');
    this.googleLogin.emit();
    // In a real app, this would redirect to Google's OAuth or trigger a popup.
  }

  /**
   * Handles Twitter login button click.
   */
  onTwitterLogin(): void {
    console.log('Twitter Login clicked!');
    this.twitterLogin.emit();
    // In a real app, this would redirect to Twitter's OAuth or trigger a popup.
  }

  /**
   * Handles "Not a member? Register Now" link click.
   */
  onRegisterNow(): void {
    console.log('Register Now clicked!');
    this.close.emit(); // Close the modal before navigating
    // this.router.navigate(['/signup']); // Navigate to your signup page
    this.navigateToRegister.emit(); // Also emit an event for parent to handle if needed
  }
}
