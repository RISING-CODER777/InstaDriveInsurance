import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();
  const userRole = authService.getRole();

  if (token && userRole === 'Admin') {
    return true;
  }

  router.navigate(['error/access-denied']);
  return false;
};

