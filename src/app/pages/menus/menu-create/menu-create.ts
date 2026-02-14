import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MenuFormComponent } from "../menu-form/menu-form";
import { MenuService } from '../menu';
import { Menu } from "../interfaces/Menu";

@Component({
  selector: 'app-menu-create',
  standalone: true,
  imports: [CommonModule, MenuFormComponent],
  templateUrl: './menu-create.html',
})
export class MenuCreateComponent {
  constructor(private menuService: MenuService, private router: Router) { }

  onSave(menu: Menu): void {
    this.menuService.createMenu(menu).subscribe({
      next: () => this.router.navigate(['/menus']),
      error: () => alert('Error creando menú (¿backend apagado o fecha duplicada?)'),
    });
  }
}
