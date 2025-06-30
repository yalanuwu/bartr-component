import { Toast, ToastrService } from './../toastr/toastr.service';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-change-password',
  imports: [],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

  currentPassword!: string;
  newPassword!: string;
  confirmNewPassword!: string;

  @Output() passwordChanged = new EventEmitter<{ current: string, new: string }>();
  @Output() cancelChange = new EventEmitter<void>();

  constructor (
    private toastr: ToastrService,
  ) {}

  onCancel(): void {
    this.cancelChange.emit();
  }

  onChangePassword(): void {
    if (!this.currentPassword || !this.newPassword || !this.confirmNewPassword) {
      // alert('Please fill in all password fields.');
      this.toastr.showError("Please fill in all password fields")
      return;
    }

    if (this.newPassword !== this.confirmNewPassword) {
      // alert('New password and confirm password do not match.');
      this.toastr.showError('New password and confirm password do not match.');
      return;
    }

    if (this.newPassword.length < 8) { // Basic validation
      this.toastr.showError('New password must be at least 8 characters long.')
      // alert('New password must be at least 8 characters long.');
      return;
    }

    // Emit the password change data to the parent
    this.passwordChanged.emit({
      current: this.currentPassword,
      new: this.newPassword
    });

    // Optionally clear fields after emission
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmNewPassword = '';
  }
}
