import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cursos } from './cursos.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CrudCursosService {
  private apiUrl = 'https://67040211ab8a8f8927329c9e.mockapi.io/'; // Reemplaza esto con tu endpoint real

  constructor(private http: HttpClient) {}

  obtenerClases(): Observable<Cursos[]> {
    return this.http.get<Cursos[]>(this.apiUrl);
  }

  agregarClase(curso: Cursos): Observable<Cursos> {
    return this.http.post<Cursos>(this.apiUrl, curso);
  }

  actualizarClase(curso: Cursos): Observable<Cursos> {
    return this.http.put<Cursos>(`${this.apiUrl}/${curso.id}`, curso);
  }

  eliminarClase(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
