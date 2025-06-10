import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar-component',
  imports: [],
  templateUrl: './navbar-component.component.html',
  styleUrl: './navbar-component.component.css'
})
export class NavbarComponentComponent {
  // NEW: Input property to control button visibility
  @Input() showHomeButtons: boolean = false; // Default to false (buttons hidden)

  @Output() signOut = new EventEmitter<void>();

  // Placeholder methods for navigation/actions
  onCreateCourse(): void {
    console.log('Create a Course clicked!');
    // Example: this.router.navigate(['/create-course']);
  }

  onLogin(): void {
    console.log('Log In clicked!');
    // Example: this.router.navigate(['/login']);
  }

  onSignUp(): void {
    console.log('Sign Up clicked!');
    // Example: this.router.navigate(['/signup']);
  }

  onSignOut(): void {
    console.log('Sign Out clicked!');
    this.signOut.emit(); // Emit the event to the parent (e.g., AccountPageComponent)
    // Example: this.router.navigate(['/']); // Redirect after sign out
  }
}
