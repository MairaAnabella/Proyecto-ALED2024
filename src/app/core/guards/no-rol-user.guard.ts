import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';

export const noRolUserGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const userType = authService.getUser();
  const router = inject(Router);

  if (userType !== '1') {
    // Permitir el acceso solo si el id del usuario no es '1'
    return true;
  } else {
    // Redirigir si el id es '1'
    router.navigateByUrl('/error');
    return false;
  }
};
