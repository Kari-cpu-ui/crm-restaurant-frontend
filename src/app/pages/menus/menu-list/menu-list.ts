import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MenuService } from '../menu';
import { Menu } from '../interfaces/Menu';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu-list.html',
  styleUrl: './menu-list.css',
})
export class MenuListComponent implements OnInit {
  menus: Menu[] = [];
  loading = false;
  error = '';

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.loadMenus();
  }

  loadMenus(): void {
    this.loading = true;
    this.error = '';

    this.menuService.getMenus().subscribe({
      next: (data) => {
        this.menus = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los menús (¿backend apagado?)';
        this.loading = false;
      },
    });
  }

  deleteMenu(id?: number): void {
    if (!id) return;

    const ok = confirm('¿Seguro que quieres borrar este menú?');
    if (!ok) return;

    this.menuService.deleteMenu(id).subscribe({
      next: () => this.loadMenus(),
      error: () => alert('Error borrando menú'),
    });
  }
}

