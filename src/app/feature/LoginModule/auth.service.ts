import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false; // Estado de autenticación

  constructor() { }

/*   login(): void {
    this.isLoggedIn = true;
  } */

/*   logout(): void {
    this.isLoggedIn = false;
  }
 */
  isAuthenticated(): boolean {
   
    return this.isLoggedIn;
  }
}
