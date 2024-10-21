import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profesores } from './profesores.model';
import { conexion } from '../../core/config/config';
@Injectable({
  providedIn: 'root'
})
export class CrudProfesoresService {
  constructor(private http: HttpClient) {}

  obtenerEstudiante(dato:any): Observable<any> {
    console.log(dato)
   
    return this.http.post<Profesores[]>(conexion.url+'crudProfesores.php',dato);
  }

  agregarProfesores(datos:any): Observable<Profesores> {
    return this.http.post<Profesores>(conexion.url+'crudProfesores.php', datos);
  }

  actualizarProfesores(profesores: any): Observable<Profesores> {
    return this.http.post<Profesores>(conexion.url+'crudProfesores.php', profesores);
  }

  eliminarProfesores(id:any,action:any): Observable<void> {
    let datos={id:id,action:action}
    console.log(datos)
  
    return this.http.post<void>(conexion.url+'crudProfesores.php',datos);
  } 
}
