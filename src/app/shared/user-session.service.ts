import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

 
  private userKey = 'user'; // Clave para identificar el usuario en Local Storage

  constructor() { }

  // Función para guardar el usuario en el Local Storage
  setUser(user: any): void {
   // const userData = JSON.stringify(user); // Convertir el objeto a string
    localStorage.setItem(this.userKey, user); // Guardar en Local Storage
  }

  // Función para obtener el usuario desde el Local Storage
  getUser(): any | null {
    const userData = localStorage.getItem(this.userKey); // Obtener los datos
    if (userData) {
      return JSON.parse(userData); // Convertir el string a objeto
    }
    return null; // Si no hay datos, devolver null
  }

  // Función para eliminar el usuario del Local Storage (opcional)
  removeUser(): void {
    localStorage.removeItem(this.userKey); // Eliminar el usuario
  }
}
