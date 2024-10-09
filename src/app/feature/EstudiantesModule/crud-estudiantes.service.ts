import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estudiantes } from './estudiantes.model';
import { Observable } from 'rxjs';
import { conexion } from '../../core/config/config';
@Injectable({
  providedIn: 'root'
})
export class CrudEstudiantesService {
 
  constructor(private http: HttpClient) {}

  obtenerEstudiante(dato:any): Observable<any> {
    console.log(dato)
   
    return this.http.post<Estudiantes[]>(conexion.url+'crudUser.php',dato);
  }

  agregarEstudiante(datos:any): Observable<Estudiantes> {
    return this.http.post<Estudiantes>(conexion.url+'crudUser.php', datos);
  }

  actualizarEstudiante(estudiante: any): Observable<Estudiantes> {
    return this.http.post<Estudiantes>(conexion.url+'crudUser.php', estudiante);
  }

  eliminarEstudiante(id:any,action:any): Observable<void> {
    let datos={id:id,action:action}
    console.log(datos)
  
    return this.http.post<void>(conexion.url+'crudUser.php',datos);
  } 
}
