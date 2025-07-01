// src/app/profile-settings-section/profile-settings-section.component.ts
import { CommonModule } from '@angular/common'; // For NgIf and NgClass
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // For [(ngModel)]
import { ChangePasswordRequest, UserService } from '../services/user.service';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from '../toastr/toastr.service';
import { take } from 'rxjs';
import { User } from '../types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-settings-section',
  standalone: true, // Mark as standalone
  imports: [CommonModule, FormsModule], // Import necessary modules
  templateUrl: './profile-settings-section.component.html',
  styleUrl: './profile-settings-section.component.css'
})
export class ProfileSettingsSectionComponent implements OnInit {

  // --- Change Password Section ---

  passwordData = {
    currentPassword: '',
  };

  newPassword =  '';
  confirmNewPassword = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {

  }

  changePassword(): void {

    // 1. Basic Form Validation
    if (this.passwordData.currentPassword === '' || this.newPassword === '' || this.confirmNewPassword === '') {
      this.toastr.showError('All password fields are required.');
      return;
    }

    if (this.newPassword !== this.confirmNewPassword) {
      this.toastr.showError('New password and confirm new password do not match.');
      return;
    }

    if (this.passwordData.currentPassword === this.newPassword) {
      this.toastr.showError('New password cannot be the same as the current password.');
      return;
    }

    // Add more complex password validation here if needed (e.g., minimum length, special characters)
    if (this.newPassword.length < 6) {
      this.toastr.showError('New password must be at least 6 characters long.');
      return;
    }

    // 2. Get Username from localStorage
    const username = localStorage.getItem('username'); // Assuming username is stored here

    if (!username) {
      this.toastr.showError('Username not found in local storage. Please log in again.');
      return;
    }

    // 3. Use UserService.getByUserName() to get the User object and then its ID
    this.userService.getByUserName(username).pipe(
      take(1) // Ensure we only take the current value and then complete
    ).subscribe({
      next: (user: User) => { // Expecting a User object here
        if (user && user.id !== undefined && user.id !== null) {
          const userId = user.id;
          console.log('Fetched userId from getByUserName:', userId);

          // 4. Prepare the request payload for the UserService
          const requestPayload: ChangePasswordRequest = {
            currentPassword: this.passwordData.currentPassword,
            newPassword: this.newPassword
          };

          // 5. Call UserService to change password
          this.userService.changePassword(userId, requestPayload).subscribe({
            next: (message) => {
              this.toastr.showSuccess(message);
              // Clear the form fields on success
              this.passwordData.currentPassword = '';
              this.newPassword = '';
              this.confirmNewPassword = '';
            },
            error: (err: Error) => {

              this.toastr.showError('Failed to change password.');
              console.error('Password change error:', err);
            }
          });
        } else {
          this.toastr.showError('User data incomplete (ID missing) from backend. Cannot change password.');
          console.error('User data from getByUserName was:', user);
        }
      },
      error: (err) => {
        this.toastr.showError('Failed to fetch user data by username. Cannot change password.');
        console.error('Error fetching user by username:', err);
      }
    });


  }

  // --- Danger Zone: Account Deletion ---
  showDeleteConfirmation: boolean = false;
  deleteAccountConfirmationText: string = '';
  readonly REQUIRED_DELETE_TEXT = 'DELETE ACCOUNT'; // The phrase user must type

  initiateAccountDeletion(): void {
    this.showDeleteConfirmation = true;
    this.deleteAccountConfirmationText = ''; // Clear previous input
    // this.deleteAccountMessage = null; // Clear previous messages
    // this.toastr.showInfo('Please confirm account deletion by typing the required text.');
  }

  confirmAccountDeletion(): void {
    if (this.deleteAccountConfirmationText.trim() !== this.REQUIRED_DELETE_TEXT) {
      this.toastr.showError('Confirmation text does not match. Please type "DELETE ACCOUNT" exactly.');
      // this.deleteAccountMessage = 'Confirmation text does not match.';
      // this.deleteAccountError = true;
      return;
    }

    // Get the current user's ID to delete
    const username = localStorage.getItem('username'); // Get username from localStorage

    if (!username) {
      this.toastr.showError('Username not found in local storage. Please log in again.');
      return;
    }

    // Fetch user ID using username
    this.userService.getByUserName(username).pipe(
      take(1) // Ensures we only take the current value and then complete
    ).subscribe({
      next: (user: User) => {
        if (user && user.id !== undefined && user.id !== null) {
          const userId = user.id;

          // Call the UserService to delete the user
          this.userService.deleteUser(userId).subscribe({
            next: (message) => {
              this.toastr.showSuccess(message); // Display success message from backend
              // this.deleteAccountMessage = message;
              // this.deleteAccountError = false;
              this.showDeleteConfirmation = false; // Hide confirmation section
              this.deleteAccountConfirmationText = ''; // Clear input

              // Crucial: Log out the user after successful account deletion
              this.authService.logout();
              this.router.navigate(['/auth/signin']); // Redirect to login page
            },
            error: (err: Error) => {
              this.toastr.showError(err.message || 'Failed to delete account.'); // Display error message
              // this.deleteAccountMessage = err.message || 'Failed to delete account.';
              // this.deleteAccountError = true;
              console.error('Delete account error:', err);
            }
          });
        } else {
          this.toastr.showError('User ID not found from fetched data. Cannot delete account.');
          // this.deleteAccountMessage = 'User ID not found. Cannot delete account.';
          // this.deleteAccountError = true;
        }
      },
      error: (err) => {
        this.toastr.showError('Error fetching user data for deletion. Cannot delete account.');
        // this.deleteAccountMessage = 'Error fetching user data for deletion.';
        // this.deleteAccountError = true;
        console.error('Error fetching user by username for deletion:', err);
      }
    });
  }

  /**
   * Cancels the account deletion process and hides the confirmation.
   */
  cancelDeleteAccount(): void {
    this.showDeleteConfirmation = false;
    this.deleteAccountConfirmationText = '';
    // this.deleteAccountMessage = null;
    // this.toastr.showInfo('Account deletion cancelled.');
  }
}
