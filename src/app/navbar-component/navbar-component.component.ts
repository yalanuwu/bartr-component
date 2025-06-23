// src/app/navbar-component/navbar-component.ts
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Input, OnInit, Inject, PLATFORM_ID, OnDestroy, ElementRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service'; // Correct import path for AuthService
import { User } from '../types';
import { generateAvatarUrl } from '../util';
// Removed modal imports as they are now pages:
// import { SignInComponent } from '../sign-in/sign-in.component';
// import { SignUpModalComponent } from '../register/register.component';

@Component({
  selector: 'app-navbar-component',
  // Removed modal components from imports, as they are now routed pages
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar-component.component.html',
  styleUrl: './navbar-component.component.css'
})
export class NavbarComponentComponent implements OnInit, OnDestroy {
  @Input() dynamicScroll: boolean = false;
  isScrolledDown: boolean = false;
  currentUser: User | null = null;
  userAvatarUrl: string = '';

  // No longer needed as we are using pages instead of modals
  // showSignInModal: boolean = false;
  // showSignUpModal: boolean = false;

  xp: number = 300;

  isLoggedIn: boolean = false;
  // This will now subscribe to the _isLoggedIn state in AuthService,
  // which is updated internally when login/logout methods are called.
  // The AuthService itself doesn't expose a Subject/Observable for its state directly
  // with the current implementation. We will modify AuthService slightly to emit changes.
  private authStateSubscription!: Subscription;
  private userSubscription!: Subscription;

  // Removed @Output() signOut as logout is now handled internally by AuthService and Router

  showAvatarDropdown: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private authService: AuthService, // Injected AuthService
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.dynamicScroll) {
        this.checkScrollState();
      } else {
        this.isScrolledDown = true;
      }
    } else {
      this.isScrolledDown = false;
    }

    // Initialize isLoggedIn status from AuthService on component load
    this.isLoggedIn = this.authService.isLoggedIn();

    // To make `isLoggedIn` reactive in the navbar without requiring a full page refresh
    // after login/logout, we need the AuthService to emit changes.
    // I'll suggest a small update to AuthService below.
    // Assuming AuthService now has `_isLoggedInSubject: BehaviorSubject<boolean>`:
    this.authStateSubscription = this.authService.getLoginStatus().subscribe(status => {
      this.isLoggedIn = status;
      console.log('NavbarComponent: Login status updated to', this.isLoggedIn);
    });


    const username = localStorage.getItem('username');
    if (username) {
      this.userAvatarUrl = generateAvatarUrl(username);

    } else {
      this.userAvatarUrl = generateAvatarUrl('');
    }


  }

  ngOnDestroy(): void {
    if (this.authStateSubscription) {
      this.authStateSubscription.unsubscribe();
    }
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    // Check if the click is outside the navbar itself, including the dropdown
    if (this.showAvatarDropdown && !this.elementRef.nativeElement.contains(event.target)) {
      this.showAvatarDropdown = false;
      console.log('NavbarComponent: Clicked outside avatar dropdown, closing.');
    }
  }

  // onModalClosed, handleLogin, handleGoogleLogin, handleTwitterLogin,
  // handleNavigateToRegister, handleRegister, handleGoogleRegister,
  // handleTwitterRegister, handleNavigateToLoginFromSignUp are no longer needed
  // as modals are replaced by pages and login/register logic is in their respective components.

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (this.dynamicScroll) {
      this.checkScrollState();
    }
  }

  private checkScrollState() {
    const scrollThreshold = 550;
    this.isScrolledDown = window.scrollY > scrollThreshold;
  }

  // No longer needed as [routerLink] handles navigation
  // onCreateCourse(): void {
  //   console.log('Create a Course clicked!');
  // }

  // No longer needed, [routerLink] will handle navigation
  // onLogin(): void {
  //   console.log('Log In clicked! Navigating to /login');
  //   // Use routerLink in HTML directly
  // }

  // No longer needed, [routerLink] will handle navigation
  // onSignUp(): void {
  //   console.log('Sign Up clicked! Navigating to /register');
  //   // Use routerLink in HTML directly
  // }

  onSignOut(): void {
    console.log('NavbarComponent: Sign Out clicked! Calling AuthService.logout()');
    this.authService.logout(); // Call the logout method from AuthService
    // The authService.logout() will handle setting _isLoggedIn to false
    // and navigating to /login. The subscription in ngOnInit will update this.isLoggedIn.
  }

  onXpAvailable(): void {
    console.log('NavbarComponent: XP Available clicked!');
    this.showAvatarDropdown = false; // Close dropdown
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
