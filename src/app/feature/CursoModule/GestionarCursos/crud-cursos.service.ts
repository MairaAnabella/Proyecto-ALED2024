import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cursos } from './cursos.model';
import { Observable } from 'rxjs';
import { conexion } from '../../../core/config/config';
@Injectable({
  providedIn: 'root'
})
export class CrudCursosService {
 

  constructor(private http: HttpClient) {}

  obtenerCursos(dato:any): Observable<any> {
    return this.http.post<Cursos[]>(conexion.url+'crudCursos.php',dato);
  }

  agregarCurso(curso: any): Observable<Cursos> {
    return this.http.post<Cursos>(conexion.url+'crudCursos.php', curso);
  }

  actualizarCurso(curso: any): Observable<Cursos> {
    return this.http.post<Cursos>(conexion.url+'crudCursos.php', curso);
  }

  eliminarCurso(id:any,action:any): Observable<void> {
    let datos={
      id:id,
      action:action
    }
    return this.http.post<void>(conexion.url + 'crudCursos.php',datos);
  }

  incripcionCurso(id:any,action:any){
    let idUser=localStorage.getItem('idUser');
    let datos={
      idCurso:id,
      action:action,
      idUser
    }

    console.log(datos)

    return this.http.post<void>(conexion.url+'gestionInscripciones.php',datos);
  }
  misCursos(){
    let userId=localStorage.getItem('idUser');
    let datos={
      idUser:userId,
      action:'misCursos'
    }

    return this.http.post<void>(conexion.url+'gestionInscripciones.php',datos);

  }

  bajaCurso(id:any,action:any){
    let idUser=localStorage.getItem('idUser');
    let datos={
      idCurso:id,
      action:action,
      idUser
    }
    return this.http.post<void>(conexion.url+'gestionInscripciones.php',datos)
  }


}
