import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../feature/LoginModule/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService= inject(AuthService);
  const router=inject(Router);
 if(authService.isAuth()){
  return true;
 }else{
  router.navigateByUrl('/');
  return false;
 }
 
};



