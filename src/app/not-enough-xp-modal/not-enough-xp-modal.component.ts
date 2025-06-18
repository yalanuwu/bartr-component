// src/app/not-enough-xp-modal/not-enough-xp-modal.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // For ngIf

@Component({
  selector: 'app-not-enough-xp-modal',
  standalone: true, // Mark as standalone
  imports: [CommonModule], // Import CommonModule for structural directives
  templateUrl: './not-enough-xp-modal.component.html',
  styleUrls: ['./not-enough-xp-modal.component.css']
})
export class NotEnoughXpModalComponent {

  @Input() requiredXp: number = 0; // Input for the XP required for the action
  @Input() availableXp: number = 0; // Input for the user's current available XP

  @Output() close = new EventEmitter<void>(); // Emits when the modal should be closed
  @Output() earnMoreXp = new EventEmitter<void>(); // Emits when user clicks "Earn More XP"

  constructor() { }

  /**
   * Handles click on the modal backdrop to close the modal.
   * @param event The mouse event.
   */
  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      console.log('NotEnoughXpModal: Backdrop clicked, emitting close.');
      this.close.emit();
    }
  }

  /**
   * Handles the "Earn More XP" button click.
   */
  onEarnMoreXp(): void {
    console.log('NotEnoughXpModal: Earn More XP clicked, emitting earnMoreXp.');
    this.earnMoreXp.emit();
  }
}
