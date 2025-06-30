// src/app/services/toastr.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Define the interface for a single toast message
export interface Toast {
  message: string;
  type: 'success' | 'error'; // Can be expanded to 'warning', 'info' etc.
  id: number; // Unique ID for each toast, helpful if managing multiple or for dismissals
}

@Injectable({
  providedIn: 'root'
})
export class ToastrService {
  // BehaviorSubject to hold the current toast state. Null means no toast is active.
  private _toastSubject: BehaviorSubject<Toast | null> = new BehaviorSubject<Toast | null>(null);

  // Expose the toast state as an Observable for the ToastrComponent to subscribe to
  public toast$: Observable<Toast | null> = this._toastSubject.asObservable();

  private toastIdCounter = 0; // To ensure unique IDs for toasts
  private autoDismissTimeout: any; // To hold the timeout ID for auto-dismissal

  constructor() { }

  /**
   * Displays a success toast message.
   * @param message The message to display.
   * @param duration The duration in milliseconds before the toast auto-dismisses (default: 3000ms).
   */
  showSuccess(message: string, duration: number = 3000): void {
    this.clearAutoDismissal(); // Clear any existing auto-dismissal
    this.toastIdCounter++;
    const newToast: Toast = { message, type: 'success', id: this.toastIdCounter };
    this._toastSubject.next(newToast); // Emit the new toast
    this.setAutoDismissal(duration);   // Set auto-dismissal
  }

  /**
   * Displays an error toast message.
   * @param message The message to display.
   * @param duration The duration in milliseconds before the toast auto-dismisses (default: 5000ms).
   */
  showError(message: string, duration: number = 5000): void {
    this.clearAutoDismissal(); // Clear any existing auto-dismissal
    this.toastIdCounter++;
    const newToast: Toast = { message, type: 'error', id: this.toastIdCounter };
    this._toastSubject.next(newToast); // Emit the new toast
    this.setAutoDismissal(duration);   // Set auto-dismissal
  }

  /**
   * Dismisses the currently displayed toast message.
   */
  dismissToast(): void {
    this.clearAutoDismissal(); // Clear the timeout if dismissed manually
    this._toastSubject.next(null); // Set toast state to null to hide it
  }

  /**
   * Sets up the auto-dismissal timeout.
   * @param duration The duration in milliseconds.
   */
  private setAutoDismissal(duration: number): void {
    this.autoDismissTimeout = setTimeout(() => {
      this.dismissToast();
    }, duration);
  }

  /**
   * Clears any active auto-dismissal timeout.
   */
  private clearAutoDismissal(): void {
    if (this.autoDismissTimeout) {
      clearTimeout(this.autoDismissTimeout);
      this.autoDismissTimeout = null;
    }
  }

  // Optional: You could add methods for info, warning, etc.
  // showInfo(message: string, duration: number = 3000): void {
  //   this.clearAutoDismissal();
  //   this.toastIdCounter++;
  //   const newToast: Toast = { message, type: 'info', id: this.toastIdCounter };
  //   this._toastSubject.next(newToast);
  //   this.setAutoDismissal(duration);
  // }
}
