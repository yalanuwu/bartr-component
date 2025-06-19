// src/app/purchase-success-modal/purchase-success-modal.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // For standalone components

@Component({
  selector: 'app-generic-success-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generic-success-modal.component.html',
  styleUrls: ['./generic-success-modal.component.css']
})
export class GenericSuccessModalComponent {

  @Input() title: string = 'Success!';
  @Input() message: string = 'Your action was completed successfully.';
  @Input() primaryButtonText: string = 'Continue';
  @Input() secondaryButtonText: string | null = 'Close'; // Optional secondary button

  @Output() primaryAction = new EventEmitter<void>(); // Emits when primary button is clicked
  @Output() close = new EventEmitter<void>(); // Emits when close button or backdrop is clicked

  constructor() { }

  /**
   * Handles click on the modal backdrop to close the modal.
   * @param event The mouse event.
   */
  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      console.log('PurchaseSuccessModal: Backdrop clicked, emitting close.');
      this.close.emit();
    }
  }

  /**
   * Handles the primary action button click.
   */
  onPrimaryAction(): void {
    console.log('PurchaseSuccessModal: Primary action clicked, emitting primaryAction.');
    this.primaryAction.emit();
  }

  /**
   * Handles the close or secondary action button click.
   */
  onClose(): void {
    console.log('PurchaseSuccessModal: Close button clicked, emitting close.');
    this.close.emit();
  }
}
