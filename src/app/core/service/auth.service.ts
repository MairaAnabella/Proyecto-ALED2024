import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { conexion } from '../config/config';
import { Observable } from 'rxjs';
import { isPlatformBrowser} from '@angular/common';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http:HttpClient, @Inject(PLATFORM_ID) private platformId: Object, private router:Router) { }

   login(email:string,contraseña:string): Observable<any>{
    let datosEnviar={
      email:email,
      password:contraseña
    }

    return this.http.post(conexion.url+'login.php',datosEnviar);
  } 

  logout(): Observable<any>{

    let datosEnviar={
      id:localStorage.getItem('idUser'),
    }
    return this.http.post(conexion.url+'logout.php',datosEnviar);

  

  }
 

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
