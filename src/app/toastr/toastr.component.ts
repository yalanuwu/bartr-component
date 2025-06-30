// src/app/components/toastr/toastr.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ToastrService, Toast } from '../toastr/toastr.service'; // Import the service and Toast interface
import { Subscription } from 'rxjs'; // For managing subscriptions

@Component({
  selector: 'app-toastr',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.css'] // Style sheet for custom animations and positioning
})
export class ToastrComponent implements OnInit, OnDestroy {
  currentToast: Toast | null = null;
  private toastSubscription!: Subscription;

  constructor(private toastrService: ToastrService) { }

  ngOnInit(): void {
    // Subscribe to the toast$ Observable from the service
    this.toastSubscription = this.toastrService.toast$.subscribe(toast => {
      this.currentToast = toast; // Update the component's internal toast state
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks when the component is destroyed
    if (this.toastSubscription) {
      this.toastSubscription.unsubscribe();
    }
  }

  /**
   * Dismisses the current toast when the close button is clicked.
   */
  dismiss(): void {
    this.toastrService.dismissToast();
  }

  /**
   * Determines the CSS classes based on the toast type.
   */
  get toastClasses(): { [key: string]: boolean } {
    const classes: { [key: string]: boolean } = {
      'toastr-container': true, // Base class for styling
      'toastr-show': !!this.currentToast, // Class to show/hide with animation
      'bg-green-500': this.currentToast?.type === 'success', // Tailwind for success background
      'bg-red-500': this.currentToast?.type === 'error',     // Tailwind for error background
      'text-white': true, // Text color
    };
    return classes;
  }
}
