import { CanActivateFn } from '@angular/router';

export const noauthGuard: CanActivateFn = (route, state) => {
  return true;
};


/* 
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const noAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuth()) {
    router.navigateByUrl('/home');  // Redirige a la página que desees
    return false;
  } else {
    return true;
  }
}; */
