// Servicio que maneja la autenticación de usuarios
// aquí hay que implementar login, logout y verificación de sesión

import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {


  currentUser?: User; // Usuario actualmente logueado

  constructor() {
    this.loadUserFromStorage();
  }

  // 🔐 Login
  login(user: User): void {
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  // 🚪 Logout
  logout(): void {
    this.currentUser = undefined;
    localStorage.removeItem('user');
  }

  // ✅ Verificar si hay sesión activa
  isLogged(): boolean {
    return !!this.currentUser;
  }

  // 👑 Verificar si es administrador
  isAdmin(): boolean {
    return this.currentUser?.role === 'ADMIN';
  }

  // 🔄 Recuperar usuario al recargar la página
  private loadUserFromStorage(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
  }

}




// TODO: implementar login
// TODO: implementar logout
// TODO: implementar verificacion de token/session


