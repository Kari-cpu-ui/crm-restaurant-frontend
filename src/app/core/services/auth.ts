import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

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
  register(nombre: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { name: nombre, email, password });
  }

  // Login
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.access_token);
          localStorage.setItem('logged', 'true');
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('logged');
    this.router.navigate(['/']);
  }

  isLogged(): boolean {
    return localStorage.getItem('logged') === 'true';
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
