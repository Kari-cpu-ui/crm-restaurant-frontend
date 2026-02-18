import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';
import { RegisterResponse } from '../../shared/models/user.model';
import { API_BASE_URL } from '../../app.config';

interface LoginResponse {
  access_token: string;
  token_type: string;
  is_admin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${API_BASE_URL}/users/auth`;

  constructor(private http: HttpClient, private router: Router) { }

  /** Registro y login automático */
  register(name: string, email: string, password: string): Observable<LoginResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, { name, email, password })
      .pipe(
        // Si registro OK, hacemos login automáticamente
        switchMap(() => this.login(email, password)),
        catchError(this.handleError)
      );
  }

  /** Login */
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(res => {
          // Guardar datos en localStorage
          localStorage.setItem('token', res.access_token);
          localStorage.setItem('logged', 'true');
          localStorage.setItem('is_admin', String(res.is_admin));

          // Guardar user_id extraído del token JWT
          try {
            const payload = JSON.parse(atob(res.access_token.split('.')[1]));
            if (payload.user_id) localStorage.setItem('user_id', String(payload.user_id));
          } catch (err) {
            console.warn('No se pudo extraer user_id del token', err);
          }
        }),
        catchError(this.handleError)
      );
  }

  /** Logout */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('logged');
    localStorage.removeItem('is_admin');
    localStorage.removeItem('user_id');
    this.router.navigate(['/']);
  }

  /** Verificaciones */
  isLogged(): boolean {
    return localStorage.getItem('logged') === 'true';
  }

  isAdmin(): boolean {
    return localStorage.getItem('is_admin') === 'true';
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserId(): string | null {
    const storedId = localStorage.getItem('user_id');
    if (storedId) return storedId;

    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.user_id ? String(payload.user_id) : null;
    } catch {
      return null;
    }
  }

  /** Manejo de errores */
  private handleError(error: HttpErrorResponse) {
    console.error('Error en AuthService:', error);
    const message = error.error?.detail || 'Error desconocido';
    return throwError(() => new Error(message));
  }
}
