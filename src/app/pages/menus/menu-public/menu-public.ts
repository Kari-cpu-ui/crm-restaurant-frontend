import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Interfaz Menu
export interface Menu {
  id: number;
  fecha: string;
  platos: string[];
}

@Component({
  selector: 'app-menu-public',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './menu-public.html',
})
export class MenuPublicComponent {
  date = '';
  menu: Menu | null = null;
  menus: Menu[] = []; // aquí guardaremos los menús encontrados
  error = '';
  loading = false;

  // Simulamos el servicio dentro del componente
  private allMenus: Menu[] = [
    { id: 1, fecha: '2026-02-15', platos: ['Pizza', 'Ensalada'] },
    { id: 2, fecha: '2026-02-16', platos: ['Pasta', 'Sopa'] },
    { id: 3, fecha: '2026-02-17', platos: ['Hamburguesa', 'Patatas'] }
  ];

  constructor() { }

  // Método para buscar menú por fecha
  search(): void {
    this.error = '';
    this.menu = null;
    this.menus = [];

    if (!this.date) {
      this.error = 'Elige una fecha';
      return;
    }

    this.loading = true;

    // Simulamos la llamada al servicio
    const menuFiltrado = this.allMenus.filter(m => m.fecha === this.date);

    if (menuFiltrado.length > 0) {
      this.menus = menuFiltrado;
    } else {
      this.error = 'No hay menú para esa fecha';
    }

    this.loading = false;
  }
}


