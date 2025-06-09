import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-profile-settings-section',
  imports: [ChangePasswordComponent],
  templateUrl: './profile-settings-section.component.html',
  styleUrl: './profile-settings-section.component.css'
})
export class ProfileSettingsSectionComponent implements OnInit {
  onSaveChanges = () => {
    console.log('Changes saved successfully!');
    // Implement your save logic here (e.g., update user profile, make API call)

  }

  ngOnInit(): void {

  }

  showChangePasswordForm: boolean = false;

  @Output() saveChanges = new EventEmitter<any>();
  @Output() signOut = new EventEmitter<void>();
  @Output() passwordUpdated = new EventEmitter<{ current: string, new: string }>();

  onDeactivateAccount = () => {

  }

  onChangePassword = () => {

  }

  toggleChangePasswordForm(): void {
    this.showChangePasswordForm = !this.showChangePasswordForm;
  }

  handlePasswordChanged(passwordData: { current: string, new: string }): void {
    console.log('ProfileSettingsSection: Password change event received from modal:', passwordData);
    // In a real app, you'd typically pass this data up to the parent component
    // (account-page.component) to call an authentication/user service.
    this.passwordUpdated.emit(passwordData); // Re-emit to account-page.component

    alert('Password change initiated successfully!'); // Or show a more sophisticated message
    this.toggleChangePasswordForm(); // Hide the modal after submission
  }
}
