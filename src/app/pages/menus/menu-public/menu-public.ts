import { Component, signal } from '@angular/core';
import { MenuService } from '../../../core/services/menu';
import { Menu } from '../../../shared/models/menu.model';

@Component({
  selector: 'app-menu-public',
  templateUrl: './menu-public.html',
  styleUrls: ['./menu-public.css']
})
export class MenuPublicComponent {
  selectedDate: string = '';           // Fecha seleccionada
  error: string = '';                  // Mensaje de error
  menu = signal({} as Menu); // Menú obtenido

  constructor(private menuService: MenuService) { }

  onDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedDate = input.value;

    this.error = '';
    this.menu.set({} as Menu); // Reiniciamos el menú antes de cargar uno nuevo

    if (!this.selectedDate) return;

    this.menuService.obtenerMenu(this.selectedDate).subscribe({
      next: (res: Menu) => {
        console.log(res);
        this.menu.set(res);
      },
      error: () => {
        this.error = 'No hay menú para esta fecha';
        this.menu.set({} as Menu); // aseguramos que siga siendo un objeto
      }
    });
  }
}
