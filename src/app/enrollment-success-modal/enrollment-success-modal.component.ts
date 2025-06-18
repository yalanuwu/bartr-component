// src/app/enrollment-success-modal/enrollment-success-modal.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // For standalone components

@Component({
  selector: 'app-enrollment-success-modal',
  standalone: true, // Mark as standalone
  imports: [CommonModule], // Import CommonModule for structural directives
  templateUrl: './enrollment-success-modal.component.html',
  styleUrls: ['./enrollment-success-modal.component.css']
})
export class EnrollmentSuccessModalComponent {

  @Input() courseTitle: string = ''; // Input for the title of the successfully enrolled course

  @Output() close = new EventEmitter<void>(); // Emits when the modal should be closed (e.g., via backdrop click or 'Back to Home')
  @Output() viewCourse = new EventEmitter<void>(); // Emits when user clicks "View Course"

  constructor() { }

  /**
   * Handles click on the modal backdrop to close the modal.
   * @param event The mouse event.
   */
  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      console.log('EnrollmentSuccessModal: Backdrop clicked, emitting close.');
      this.close.emit();
    }
  }

  /**
   * Handles the "View Course" button click.
   */
  onViewCourse(): void {
    console.log('EnrollmentSuccessModal: View Course clicked, emitting viewCourse.');
    this.viewCourse.emit();
  }

  /**
   * Handles the "Back to Home" button click (or general close action).
   */
  onBackToHome(): void {
    console.log('EnrollmentSuccessModal: Back to Home clicked, emitting close.');
    this.close.emit(); // Re-use 'close' to handle returning home (or you can add a new output if different behavior is needed)
  }
}
