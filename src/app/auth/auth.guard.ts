// src/app/auth/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Import your AuthService

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    console.log('AuthGuard: User is logged in. Access granted.');
    return true; // Allow navigation
  } else {
    console.log('AuthGuard: User is not logged in. Redirecting to login.');
    router.navigate(['/auth/signin']); // Redirect to login page
    return false; // Prevent navigation
  }
};
