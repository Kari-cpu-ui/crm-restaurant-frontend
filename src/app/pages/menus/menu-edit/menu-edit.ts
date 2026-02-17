import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { MenuFormComponent } from '../menu-form/menu-form';
import { MenuService } from '../menu';
import { Menu } from '../interfaces/Menu';

@Component({
  selector: 'app-menu-edit',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './menu-edit.html',
})
export class MenuEditComponent {
  id = 0;
  initialMenu: Menu | null = null;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menuService: MenuService
  ) { }

  onInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const parsed = Number(idParam);

    if (!parsed || Number.isNaN(parsed)) {
      this.error = 'ID inválido';
      return;
    }

    this.id = parsed;
    this.loading = true;

    this.menuService.getMenuById(this.id).subscribe({
      next: (menu) => {
        this.initialMenu = menu;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el menú (¿backend apagado?)';
        this.loading = false;
      },
    });
  }

  onSave(updated: Menu): void {
    this.menuService.updateMenu(this.id, updated).subscribe({
      next: () => this.router.navigate(['/menus']),
      error: () => alert('Error actualizando menú'),
    });
  }
}
