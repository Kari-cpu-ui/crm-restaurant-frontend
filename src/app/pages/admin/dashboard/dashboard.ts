import { Component, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink, Router } from "@angular/router";
import { CommonModule } from '@angular/common';
import { MenuService } from '../../menus/menu';
import { Menu } from '../../menus/interfaces/Menu';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  standalone: true,
  imports: [RouterLink, CommonModule]
})
export class AdminDashboardComponent {

  section: string = 'menu-create';
  showMenusTable: boolean = true;

  private API_BASE = 'http://127.0.0.1:8000';

  // --- Menus ---
  menus: Menu[] = [];
  editingMenuId: number | null = null;
  showMenuForm = false;
  menuLoading = false;
  menuError = '';

  constructor(
    private http: HttpClient,
    private menuService: MenuService,
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.loadMenus();

    // --- Listeners globales para botones ---
    document.addEventListener('editMenu', (e: any) => {
      const menu = this.menus.find(m => m.id === e.detail);
      if (menu) this.openEditMenu(menu);
    });

    document.addEventListener('deleteMenu', (e: any) => {
      const menu = this.menus.find(m => m.id === e.detail);
      if (menu) this.deleteMenu(menu);
    });
  }

  setSection(section: string): void {
    this.section = section;
    if (section === 'usuarios') this.loadUsers();
    if (section === 'reservas') this.loadReservas();
    if (section === 'menu-create') this.loadMenus();
  }

  // ========== MENUS ==========

  loadMenus(): void {
    this.menuLoading = true;
    this.menuService.getMenus().subscribe({
      next: (data) => {
        this.menus = data.sort((a, b) => (b.menu_date || '').localeCompare(a.menu_date || ''));
        this.renderMenusTable();
        this.menuLoading = false;
        this.showMenusTable = true;
      },
      error: (err) => {
        console.error('Error cargando menús', err);
        this.menuError = 'Error al cargar los menús';
        this.menuLoading = false;
      }
    });
  }

  openCreateMenu(): void {
    this.editingMenuId = null;
    this.showMenuForm = true;
    this.menuError = '';
  }

  openEditMenu(menu: Menu): void {
    this.editingMenuId = menu.id!;
    this.showMenuForm = true;
    this.menuError = '';

    // Set input values
    (document.querySelector<HTMLInputElement>('#menuDate')!).value = menu.menu_date || '';
    (document.querySelector<HTMLInputElement>('#menuName')!).value = menu.name;
    (document.querySelector<HTMLInputElement>('#menuDesc')!).value = menu.description;
    (document.querySelector<HTMLInputElement>('#menuPrice')!).value = menu.price.toString();
    (document.querySelector<HTMLInputElement>('#menuImage')!).value = menu.image_url || '';
  }

  cancelMenuForm(): void {
    this.closeMenuForm();
  }

  private closeMenuForm(): void {
    this.showMenuForm = false;
    this.editingMenuId = null;
    this.menuError = '';

    const fields = ['#menuDate', '#menuName', '#menuDesc', '#menuPrice', '#menuImage'];
    fields.forEach(selector => {
      const input = document.querySelector<HTMLInputElement>(selector);
      if (input) input.value = '';
    });
  }

  saveMenu(
    menu_date?: string,
    name?: string,
    description?: string,
    price?: string,
    image_url?: string
  ): void {
    name = name?.trim() || '';
    description = description?.trim() || '';
    const numericPrice = Number(price);

    if (!menu_date || !name || !description || !numericPrice) {
      this.menuError = 'Todos los campos son obligatorios';
      return;
    }

    const menuData: Menu = {
      menu_date,
      name,
      description,
      price: numericPrice,
      image_url: image_url?.trim() || undefined
    };

    this.menuLoading = true;
    this.menuError = '';

    if (this.editingMenuId) {
      // UPDATE
      this.menuService.updateMenu(this.editingMenuId, menuData).subscribe({
        next: () => {
          this.menuLoading = false;
          this.closeMenuForm(); // cierra y limpia el formulario
          setTimeout(() => alert('¡Menú actualizado correctamente!'), 0); // alerta no bloqueante
          this.loadMenus();
        },
        error: (err) => {
          console.error('Error actualizando menú', err);
          this.menuError = (err.error?.detail) || 'Error al actualizar el menú';
          this.menuLoading = false;
        }
      });
    } else {
      // CREATE
      this.menuService.createMenu(menuData).subscribe({
        next: () => {
          this.menuLoading = false;
          this.closeMenuForm(); // cierra y limpia el formulario
          this.loadMenus();       // recargar tabla
          setTimeout(() => alert('¡Menú creado correctamente!'), 0); // alerta después
        },
        error: (err) => {
          console.error('Error creando menú', err);
          this.menuError = (err.error?.detail) || 'Error al crear el menú';
          this.menuLoading = false;
        }
      });
    }
  }

  deleteMenu(menu: Menu): void {
    if (!confirm(`¿Eliminar menú "${menu.name}"?`)) return;

    this.menuService.deleteMenu(menu.id!).subscribe({
      next: () => {
        this.menus = this.menus.filter(m => m.id !== menu.id);
        this.renderMenusTable();
        this.cdr.detectChanges();
        alert('Menú eliminado correctamente.');
      },
      error: (err) => {
        console.error('Error eliminando menú', err);
        alert('Error al eliminar el menú.');
      }
    });
  }

  renderMenusTable(): void {
    const tbody = document.querySelector('table.admin-table tbody')!;
    let html = '';
    this.menus.forEach(menu => {
      html += `
<tr>
  <td>${this.formatDate(menu.menu_date)}</td>
  <td>${menu.name}</td>
  <td>${menu.description}</td>
  <td>${menu.price} €</td>
  <td class="td-actions">
    <button class="btn-edit" onclick="document.dispatchEvent(new CustomEvent('editMenu', { detail: ${menu.id} }))">✏️</button>
    <button class="btn-delete" onclick="document.dispatchEvent(new CustomEvent('deleteMenu', { detail: ${menu.id} }))">🗑️</button>
  </td>
</tr>
`;
    });
    tbody.innerHTML = html;
  }

  formatDate(date?: string): string {
    if (!date) return '—';
    const [y, m, d] = date.split('-');
    return `${d}/${m}/${y}`;
  }

  // ========== USERS ==========
  loadUsers(): void {
    this.http.get<any[]>(`${this.API_BASE}/users/`).subscribe({
      next: (data) => {
        let html = '';
        data.forEach(user => {
          html += `
<tr>
  <td>${user.name}</td>
  <td>${user.email}</td>
  <td class="${user.is_admin ? 'admin' : 'user'}">
    ${user.is_admin ? 'Administrador' : 'Usuario'}
  </td>
</tr>
`;
        });
        const tbody = document.getElementById('users-tbody');
        if (tbody) tbody.innerHTML = html;
      },
      error: (err) => console.error('Error cargando usuarios', err)
    });
  }

  // ========== RESERVAS ==========
  loadReservas(): void {
    this.http.get<any[]>(`${this.API_BASE}/reservations/`).subscribe({
      next: (data) => {
        let html = '';
        data.forEach(reserva => {
          html += `
<tr>
  <td>${reserva.reservation_code || ''}</td>
  <td>${reserva.customer_name}</td>
  <td>${reserva.date}</td>
  <td>${reserva.time || ''}</td>
  <td>${reserva.guests}</td>
  <td>${reserva.status}</td>
</tr>
`;
        });
        const tbody = document.getElementById('reservas-tbody');
        if (tbody) tbody.innerHTML = html;
      },
      error: (err) => console.error('Error cargando reservas', err)
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
