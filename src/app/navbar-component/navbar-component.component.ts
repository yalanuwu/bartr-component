import { CommonModule, isPlatformBrowser } from '@angular/common'; // Import isPlatformBrowser
import { Component, EventEmitter, HostListener, Input, OnInit, Output, Inject, PLATFORM_ID, OnDestroy, ElementRef } from '@angular/core'; // Import Inject and PLATFORM_ID
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpModalComponent } from '../register/register.component';

@Component({
  selector: 'app-navbar-component',
  imports: [CommonModule, RouterLink, SignInComponent, SignUpModalComponent ],
  templateUrl: './navbar-component.component.html',
  styleUrl: './navbar-component.component.css'
})
export class NavbarComponentComponent implements OnInit, OnDestroy {
  // @Input() showHomeButtons: boolean = false;
  @Input() dynamicScroll: boolean = false;
  isScrolledDown: boolean = false;

  showSignInModal: boolean = false;
  showSignUpModal: boolean = false;

  xp: number = 300;

  // New property to control conditional rendering based on login status
  isLoggedIn: boolean = false;
  private authSubscription!: Subscription; // To hold the subscription and prevent memory leaks

  @Output() signOut = new EventEmitter<void>(); // Keep if parent needs to react to sign out

  showAvatarDropdown: boolean = false;


  // Inject PLATFORM_ID into the constructor
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
  private router: Router,
  private authService: AuthService,
  private elementRef: ElementRef
  ) { }

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

    // Subscribe to the login status from the AuthService
    this.authSubscription = this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      // console.log('Navbar: isLoggedIn updated to', this.isLoggedIn); // For debugging
      // and let `isLoggedIn` fully control the display logic.
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the observable when the component is destroyed
    // to prevent memory leaks, especially with long-lived services.
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (this.showAvatarDropdown && !this.elementRef.nativeElement.contains(event.target)) {
      this.showAvatarDropdown = false;
      console.log('NavbarComponent: Clicked outside avatar dropdown, closing.');
    }
  }

  onModalClosed(): void {
    console.log('Sign-in modal closed by user (or backdrop/close button).');
    this.showSignInModal = false; // Hide the modal
    this.showSignUpModal = false;
    this.router.navigate(['/']); // Navigate to the home page
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


  // Placeholder methods for navigation/actions
  onCreateCourse(): void {
    console.log('Create a Course clicked!');
    // Example: this.router.navigate(['/create-course']);
  }

  onLogin(): void {
    console.log('Log In clicked!');
    // Example: this.router.navigate(['/login']);
    this.authService.login();
    this.showSignInModal = true;
  }

  onSignUp(): void {
    console.log('Sign Up clicked!');
    this.showSignUpModal = true;
    // Example: this.router.navigate(['/signup']);

  }

  onSignOut(): void {
    console.log('Sign Out clicked!');
    this.signOut.emit();
    this.authService.logout();
    this.isLoggedIn = false;
    // Example: this.router.navigate(['/']);
  }

  handleLogin(credentials: { email: string; password: string }): void {
    console.log('Login credentials received from modal:', credentials);
    // Here, you would typically call your authentication service
    // e.g., this.authService.login(credentials.email, credentials.password).subscribe(...)

    // For demonstration: simulate successful login
    this.isLoggedIn = true;
    this.showSignInModal = false; // Close modal after handling login
    console.log('Simulated login success!');
    // If successful, you might want to navigate to a dashboard or refresh the page
    // this.router.navigate(['/dashboard']);
  }

  handleGoogleLogin(): void {
    console.log('Initiating Google Login from Navbar...');
    // Implement Google OAuth flow
    this.showSignInModal = false; // Close modal
  }

  handleTwitterLogin(): void {
    console.log('Initiating Twitter Login from Navbar...');
    // Implement Twitter OAuth flow
    this.showSignInModal = false; // Close modal
  }

  handleNavigateToRegister(): void {
    console.log('Navigating to Register page from Navbar...');
    // The modal already handles the router.navigate(['/signup']) internally
    // You might just want to ensure the modal closes here if it hasn't already.
    this.showSignInModal = false;
  }

  //REgister functions
  handleRegister(credentials: { fullName: string; username: string; email: string; password: string }): void {
    console.log('NavbarComponent: handleRegister() called with credentials (from SignUp modal):', credentials);
    // In a real application: Call your authentication service for registration
    this.isLoggedIn = true; // Simulate success after registration
    this.onModalClosed(); // Close SignUp modal and navigate home
  }

  handleGoogleRegister(): void {
    console.log('NavbarComponent: handleGoogleRegister() called (from SignUp modal).');
    // Implement Google OAuth for registration
    this.onModalClosed(); // Close SignUp modal and navigate home
  }

  handleTwitterRegister(): void {
    console.log('NavbarComponent: handleTwitterRegister() called (from SignUp modal).');
    // Implement Twitter OAuth for registration
    this.onModalClosed(); // Close SignUp modal and navigate home
  }

  handleNavigateToLoginFromSignUp(): void {
    console.log('NavbarComponent: handleNavigateToLoginFromSignUp() called. (from SignUp modal). Closing SignUp, opening SignIn).');
    this.showSignUpModal = false; // Close sign-up modal
    this.showSignInModal = true;  // Open sign-in modal
  }

  onXpAvailable(): void {
    console.log('NavbarComponent: XP Available clicked!');
    this.showAvatarDropdown = false; // Close dropdown
    // You might want to navigate to an XP history page, or open a modal
    // For now, it just logs to console.
    // Example: this.router.navigate(['/xp-history']);
  }

  toggleAvatarDropdown(event: Event): void {
    event.stopPropagation(); // Prevent document:click from immediately closing it
    this.showAvatarDropdown = !this.showAvatarDropdown;
    console.log('NavbarComponent: Avatar dropdown toggled to', this.showAvatarDropdown);
  }

  onViewProfile(): void {
    console.log('NavbarComponent: View Profile clicked!');
    this.showAvatarDropdown = false;
    this.router.navigate(['/profile']);
  }

  onPurchaseXP(): void {
    console.log('NavbarComponent: Purchase XP clicked!');
    this.router.navigate(['/purchase-xp']);
  }

}
