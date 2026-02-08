// Servicio que maneja información de usuarios
// Obtener lista de usuarios, roles y detalles

import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user.model'; // Modelo de usuario

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = []; // Lista de usuarios
  constructor() {

  }
  
   // TODO: implementar obtener usuarios
  // TODO: implementar crear/editar/borrar usuarios (admin)
}
