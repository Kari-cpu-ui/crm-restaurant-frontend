import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private API_BASE = 'http://127.0.0.1:8000'; // Cambia a tu backend
  private http = inject(HttpClient);

  constructor() { }

  /** Obtener todos los usuarios */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_BASE}/users/`);
  }

  /** Crear un usuario (solo admin) */
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.API_BASE}/users/`, user);
  }

  /** Editar usuario existente */
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.API_BASE}/users/${user.id}/`, user);
  }

  /** Borrar usuario */
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.API_BASE}/users/${userId}/`);
  }
}
