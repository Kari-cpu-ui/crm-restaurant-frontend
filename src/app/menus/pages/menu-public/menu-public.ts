import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../../services/menu';
import { Menu } from '../../models/menu';

@Component({
  selector: 'app-menu-public',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './menu-public.html',
})
export class MenuPublicComponent {
  date = '';
  menu: Menu | null = null;
  error = '';
  loading = false;

  constructor(private menuService: MenuService) {}

  search(): void {
    this.error = '';
    this.menu = null;

    if (!this.date) {
      this.error = 'Elige una fecha';
      return;
    }

    this.loading = true;
    this.menuService.getMenuByDate(this.date).subscribe({
      next: (data) => {
        this.menu = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'No hay menú para esa fecha (o backend apagado)';
        this.loading = false;
      },
    });
  }
}
