// src/app/profile-settings-section/profile-settings-section.component.ts
import { CommonModule } from '@angular/common'; // For NgIf and NgClass
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // For [(ngModel)]

@Component({
  selector: 'app-profile-settings-section',
  standalone: true, // Mark as standalone
  imports: [CommonModule, FormsModule], // Import necessary modules
  templateUrl: './profile-settings-section.component.html',
  styleUrl: './profile-settings-section.component.css'
})
export class ProfileSettingsSectionComponent {

  // --- Change Password Section ---
  currentPassword = '';
  newPassword = '';
  confirmNewPassword = '';
  passwordChangeMessage: string | null = null;
  passwordChangeError: boolean = false;

  changePassword(): void {
    this.passwordChangeMessage = null; // Clear previous messages

    if (!this.currentPassword || !this.newPassword || !this.confirmNewPassword) {
      this.passwordChangeMessage = 'All password fields are required.';
      this.passwordChangeError = true;
      return;
    }

    if (this.newPassword !== this.confirmNewPassword) {
      this.passwordChangeMessage = 'New password and confirmation do not match.';
      this.passwordChangeError = true;
      return;
    }

    if (this.newPassword.length < 6) { // Example: minimum password length
      this.passwordChangeMessage = 'New password must be at least 6 characters long.';
      this.passwordChangeError = true;
      return;
    }

    // Simulate an API call for password change
    console.log('Attempting to change password...');
    console.log('Current:', this.currentPassword, 'New:', this.newPassword);

    // In a real application, you'd send this to your backend
    // For demonstration, let's simulate success after a delay
    setTimeout(() => {
      this.passwordChangeMessage = 'Password changed successfully!';
      this.passwordChangeError = false;
      this.currentPassword = '';
      this.newPassword = '';
      this.confirmNewPassword = '';
    }, 1500);
  }

  // --- Danger Zone: Account Deletion ---
  showDeleteConfirmation: boolean = false;
  deleteAccountConfirmationText: string = '';
  deleteAccountMessage: string | null = null;
  deleteAccountError: boolean = false;
  readonly REQUIRED_DELETE_TEXT = 'DELETE ACCOUNT'; // The phrase user must type

  initiateAccountDeletion(): void {
    this.deleteAccountMessage = null; // Clear previous messages
    this.showDeleteConfirmation = true;
    this.deleteAccountConfirmationText = ''; // Clear confirmation input
  }

  confirmAccountDeletion(): void {
    this.deleteAccountMessage = null; // Clear previous messages

    if (this.deleteAccountConfirmationText.trim() !== this.REQUIRED_DELETE_TEXT) {
      this.deleteAccountMessage = `Please type "${this.REQUIRED_DELETE_TEXT}" exactly to confirm.`;
      this.deleteAccountError = true;
      return;
    }

    // Simulate account deletion
    console.log('Attempting to delete account...');
    // In a real application, you'd send a request to your backend to delete the account
    // This action would typically log the user out and redirect them to a landing page or login.
    setTimeout(() => {
      this.deleteAccountMessage = 'Account successfully deleted. Redirecting...';
      this.deleteAccountError = false;
      console.log('Account Deleted! (Simulated)');
      // alert('Your account has been deleted.');
      // Example: Redirect to home or login page after deletion
      // window.location.href = '/'; // Or use Angular Router: this.router.navigate(['/']);
    }, 2000);
  }

  cancelDeleteAccount(): void {
    this.showDeleteConfirmation = false;
    this.deleteAccountConfirmationText = '';
    this.deleteAccountMessage = null;
  }
}
