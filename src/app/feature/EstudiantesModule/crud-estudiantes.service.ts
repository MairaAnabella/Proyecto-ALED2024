import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estudiantes } from './estudiantes.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudEstudiantesService {
  private apiUrl = 'https://67040211ab8a8f8927329c9e.mockapi.io/'; // Reemplaza esto con tu endpoint real

  constructor(private http: HttpClient) {}

  obtenerEstudiante(): Observable<Estudiantes[]> {
    return this.http.get<Estudiantes[]>(this.apiUrl);
  }

  agregarEstudiante(estudiante: Estudiantes): Observable<Estudiantes> {
    return this.http.post<Estudiantes>(this.apiUrl, estudiante);
  }

  actualizarEstudiante(estudiante: Estudiantes): Observable<Estudiantes> {
    return this.http.put<Estudiantes>(`${this.apiUrl}/${estudiante.id}`, estudiante);
  }

  eliminarEstudiante(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
