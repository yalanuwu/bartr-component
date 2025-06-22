import { AuthService } from './../auth.service';
// src/app/sign-in-page/sign-in-page.component.ts
import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // For programmatic navigation and RouterLink

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, RouterModule], // Added RouterModule
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css']
})
export class SignInPageComponent {
  email = '';
  password = '';
  passwordVisible = false;
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
    console.log('SignInPageComponent: Password visibility toggled to', this.passwordVisible);
  }

  onSubmit(): void {
    this.errorMessage = null;

    if (!this.email || !this.password) {
      this.errorMessage = 'Both username/email and password are required.';
      return;
    }

    // Use AuthService for login
    this.authService.login(this.email, this.password).subscribe(
      success => {
        if (success) {
          console.log('SignInPageComponent: Login successful!');
          this.router.navigate(['/']); // Navigate to a protected dashboard route
        } else {
          this.errorMessage = 'Invalid username/email or password.';
        }
      },
      error => {
        console.error('SignInPageComponent: Login error:', error);
        this.errorMessage = 'An error occurred during login. Please try again.';
      }
    );
  }

  onGoogleLogin(): void {
    console.log('SignInPageComponent: Google Login clicked!');
    // In a real app, initiate Google OAuth flow.
    // For now, simulate success.
    this.authService.login(this.authService['PLACEHOLDER_EMAIL'], this.authService['PLACEHOLDER_PASSWORD']).subscribe(success => {
      if(success) this.router.navigate(['/']);
    });
  }

  onTwitterLogin(): void {
    console.log('SignInPageComponent: Twitter Login clicked!');
    // In a real app, initiate Twitter OAuth flow.
    // For now, simulate success.
    this.authService.login(this.authService['PLACEHOLDER_EMAIL'], this.authService['PLACEHOLDER_PASSWORD']).subscribe(success => {
      if(success) this.router.navigate(['/']);
    });
  }

  onRegister(): void {
    console.log('SignInPageComponent: Register link clicked, navigating to /register.');
    this.router.navigate(['/auth/signup']); // Navigate to the register page
  }
}
