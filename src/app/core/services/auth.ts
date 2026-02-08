// Servicio que maneja la autenticación de usuarios
// aquí hay que implementar login, logout y verificación de sesión
import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user.model'; // Importamos el modelo de usuario


@Injectable({
  providedIn: 'root',
})
export class AuthService { // Cambie el nombre "Auth a AuthService" para que quede claro
  currentUser?: User; // Usuario actualmente logueado
  constructor() {}

  // TODO: implementar login
  // TODO: implementar logout 
  // TODO: implementar verificacion de token/session
  
}
