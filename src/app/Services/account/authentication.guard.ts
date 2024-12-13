import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { inject } from '@angular/core';

export const authenticationGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthenticationService);
  if (!authService.isAuthenticated()) {
    authService.redirectTo('/login');
    
    return false;
  }
  return true;
};
