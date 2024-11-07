import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';





export const rolUserGuard: CanActivateFn = (route, state) => {
  const authService=inject(AuthService);
  const userType= authService.getUser();
  const router = inject(Router);
  console.log(userType==='1');
  if(userType==='1'){
    return true

  }else{
    router.navigateByUrl('/error'); 
    return false;
  }


 
   
 
};
