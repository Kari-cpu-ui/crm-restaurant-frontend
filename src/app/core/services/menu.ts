// Servicio que maneja la autenticación de usuarios
// Aquí implementaremos login, logout y verificación de sesión
import { Injectable } from '@angular/core';
import { Menu } from '../../shared/models/menu.model'; // Modelo de menú

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  menus: Menu[] = []; // Arreglo de menús
  
  constructor() { }

  //TODO: implementar obtener menús
  //TODO: implementar crear/editar/eliminar menú (admin)
}
