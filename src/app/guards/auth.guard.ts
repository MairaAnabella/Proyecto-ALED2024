import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};

/* import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


export const authGuard: CanActivateFn = () => {
  const authService= inject(AuthService);
  const router=inject(Router);
 if(authService.isAuth()){
  return true;
 }else{
  router.navigateByUrl('/');
  return false;
 }
} */;