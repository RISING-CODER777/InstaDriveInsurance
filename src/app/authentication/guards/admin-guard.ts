import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const adminGuard = (): boolean => {
    const router = inject(Router);
    
    // TODO: Get User Role
    //   const authService = inject(AuthService);
    //   const user = authService.getUser();
  if ( /* user && user.role === 'admin' */ true) {
    return true;
  } else {
    router.navigate(['error/access-denied']);
    return false;
  }
};
