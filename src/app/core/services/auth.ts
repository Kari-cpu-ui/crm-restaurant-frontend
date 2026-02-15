import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

interface LoginResponse {
  access_token: string;
  token_type: string;
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
        }),
        catchError(this.handleError)
      );
  }


  // Logout
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('logged');
    this.router.navigate(['/']);
  }


  // Verificaciones
  isLogged(): boolean {
    return localStorage.getItem('logged') === 'true';
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }


  // Manejo de errores
  // private handleError(error: HttpErrorResponse) {
  //   let message = 'Error desconocido';
  //   if (error.error?.detail) {
  //     message = error.error.detail; // Mensajes del backend FastAPI
  //   }
  //   return throwError(() => new Error(message));
  // }

  private handleError(error: any) {
    console.error('Error en AuthService:', error);
    const message = error.error?.detail || 'Error desconocido';
    return throwError(() => new Error(message));
  }
}
