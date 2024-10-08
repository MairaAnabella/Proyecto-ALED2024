import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { conexion } from '../../core/config/config';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false; // Estado de autenticación

  constructor(private http:HttpClient) { }

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

  isAuthenticated(): boolean {
   
    return this.isLoggedIn;
  }
}
