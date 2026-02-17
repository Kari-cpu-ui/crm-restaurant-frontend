import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MenuService } from '../menu';
import { Menu } from '../interfaces/Menu';

@Component({
  selector: 'app-menu-public',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './menu-public.html',
  styleUrls: ['./menu-public.css'],
})
export class MenuPublicComponent {
  selectedDate = '';
  menu: Menu | null = null;
  error = '';
  loading = false;

  constructor(private menuService: MenuService, private cdr: ChangeDetectorRef) {}

  buscarMenu(): void {
    this.error = '';
    this.menu = null;

    if (!this.selectedDate) {
      this.error = 'Selecciona una fecha';
      return;
    }

    this.loading = true;
    this.menuService.getMenuByDate(this.selectedDate).subscribe({
      next: (data) => {
        this.menu = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'No hay menú disponible para esa fecha';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}


