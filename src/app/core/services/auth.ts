// Servicio que maneja la autenticación de usuarios
// aquí hay que implementar login, logout y verificación de sesión

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  register(nombre: string, email: string, password: string): void {

    const user = {
      nombre,
      email,
      role: 'user'
    };

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('logged', 'true');
    localStorage.setItem('role', 'user');
  }

  login(email: string, password: string): void {

    if (email === 'admin@test.com' && password === '1234') {

      const adminUser = {
        nombre: 'Administrador',
        email,
        role: 'admin'
      };

      localStorage.setItem('user', JSON.stringify(adminUser));
      localStorage.setItem('logged', 'true');
      localStorage.setItem('role', 'admin');

    } else {

      const user = {
        nombre: 'Usuario',
        email,
        role: 'user'
      };

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('logged', 'true');
      localStorage.setItem('role', 'user');
    }
  }


  // ✅ Verificar si hay sesión activa
  isLogged(): boolean {
    return localStorage.getItem('logged') === 'true';
  }

  // 👑 Verificar si es administrador
  isAdmin(): boolean {
    return localStorage.getItem('role') === 'admin';
  }

  // Obtener rol actual
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  logout(): void {
    localStorage.removeItem('logged');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
  }

}
