import { CanActivateFn } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';
export const rolUserGuard: CanActivateFn = (route, state) => {
  const authService=inject(AuthService);
  const userType= authService.getUser;
   
  
  return true;
};
