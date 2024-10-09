import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { conexion } from '../../core/config/config';
import { Observable } from 'rxjs';
import { isPlatformBrowser} from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http:HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

   login(email:string,contraseña:string): Observable<any>{
    let datosEnviar={
      email:email,
      password:contraseña
    }

    return this.http.post(conexion.url+'login.php',datosEnviar);
  } 

/*   logout(): void {
    this.isLoggedIn = false;
  }
 */

  register(datos:any):Observable<any>{
    console.log(datos)
    
    return this.http.post(conexion.url+'crudUser.php',datos);
  }


 // DEVUELVE SI ESTA LOGUEADO O NO
  isAuth(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const authStatus = localStorage.getItem('auth_status');
      return authStatus === 'logged_in';
    }
    return false;
  }
  
}
