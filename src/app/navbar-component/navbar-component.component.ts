import { CommonModule, isPlatformBrowser } from '@angular/common'; // Import isPlatformBrowser
import { Component, EventEmitter, HostListener, Input, OnInit, Output, Inject, PLATFORM_ID } from '@angular/core'; // Import Inject and PLATFORM_ID
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-component',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar-component.component.html',
  styleUrl: './navbar-component.component.css'
})
export class NavbarComponentComponent implements OnInit {
  @Input() showHomeButtons: boolean = false;
  @Input() dynamicScroll: boolean = false;
  isScrolledDown: boolean = false;

  // Inject PLATFORM_ID into the constructor
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    // Only execute window-dependent logic if running in a browser
    if (isPlatformBrowser(this.platformId)) {
      // On initialization, if it's a dynamic page (homepage), check scroll state
      if (this.dynamicScroll) {
        this.checkScrollState();
      } else {
        // If it's not a dynamic page (other pages), immediately show the 'scrolled down' style
        this.isScrolledDown = true;
      }
    } else {
      // For server-side rendering, default to true or appropriate non-scrolled state
      // This prevents styling issues on the initial server render
      this.isScrolledDown = false; // Or true, depending on desired SSR default appearance
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // @HostListener is inherently browser-only, so window.scrollY is safe here.
    // No need for isPlatformBrowser check inside this method.
    if (this.dynamicScroll) {
      this.checkScrollState();
    }
  }

  private checkScrollState() {
    // This method is now only called when isPlatformBrowser(this.platformId) is true,
    // making window.scrollY safe to access.
    const scrollThreshold = 550;
    this.isScrolledDown = window.scrollY > scrollThreshold;
  }

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
    this.signOut.emit();
    // Example: this.router.navigate(['/']);
  }
}
