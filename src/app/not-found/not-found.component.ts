// src/app/not-found/not-found.component.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // Import RouterLink for the home button
import { CommonModule } from '@angular/common'; // For standalone component

@Component({
  selector: 'app-not-found',
  standalone: true, // Mark as standalone
  imports: [CommonModule, RouterLink], // Import RouterLink to enable [routerLink] directive
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {
  // No specific logic needed here, it's primarily a display component.
  // The home button will use routerLink directly.
}
