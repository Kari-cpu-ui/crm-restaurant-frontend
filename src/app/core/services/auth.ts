import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

interface LoginResponse {
  access_token: string;
  token_type: string;
  is_admin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://127.0.0.1:8000/users/auth';

  constructor(private http: HttpClient, private router: Router) { }


  // Registro
  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { name, email, password })
      .pipe(
        catchError(this.handleError) // Maneja errores del backend
      );
  }


  // Login
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(res => {
          // Guardamos token solo si login fue exitoso
          localStorage.setItem('token', res.access_token);
          localStorage.setItem('logged', 'true');
          localStorage.setItem('is_admin', String(res.is_admin));

          // Extraer y guardar user ID del token
          try {
            const payload = JSON.parse(atob(res.access_token.split('.')[1]));
            localStorage.setItem('user_id', String(payload.user_id));
          } catch { }
        }),
        catchError(this.handleError)
      );
  }


  // Logout
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('logged');
    localStorage.removeItem('is_admin');
    localStorage.removeItem('user_id');
    this.router.navigate(['/']);
  }


  // Verificaciones
  isLogged(): boolean {
    return localStorage.getItem('logged') === 'true';
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAdmin(): boolean {
    return localStorage.getItem('is_admin') === 'true';
  }

  // Obtener el ID del usuario desde localStorage o token JWT
  getUserId(): string | null {
    // Primero intentar desde localStorage
    const storedId = localStorage.getItem('user_id');
    if (storedId) return storedId;

    // Fallback: decodificar del token
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.user_id ? String(payload.user_id) : null;
    } catch {
      return null;
    }
  }


  private handleError(error: any) {
    console.error('Error en AuthService:', error);
    const message = error.error?.detail || 'Error desconocido';
    return throwError(() => new Error(message));
  }
}
