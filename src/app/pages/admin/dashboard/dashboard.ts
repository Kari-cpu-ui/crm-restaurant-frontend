import { Component, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink, Router } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../../menus/menu';
import { Menu } from '../../menus/interfaces/Menu';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule]
})
export class AdminDashboardComponent {

  section: string = 'menu-create';

  private API_BASE = 'http://127.0.0.1:8000';

  // --- Menu management ---
  menus: Menu[] = [];
  menuForm: Menu = { name: '', description: '', price: 0, image_url: '', menu_date: '' };
  editingMenuId: number | null = null;
  showMenuForm = false;
  menuLoading = false;
  menuError = '';

  constructor(private http: HttpClient, private menuService: MenuService, private auth: AuthService, private router: Router, private cdr: ChangeDetectorRef) {
    this.loadMenus();
  }

  setSection(section: string): void {
    this.section = section;

    if (section === 'usuarios') {
      this.loadUsers();
    }

    if (section === 'reservas') {
      this.loadReservas();
    }

    if (section === 'menu-create') {
      this.loadMenus();
    }
  }

  // ========== MENUS ==========

  loadMenus(): void {
    this.menuLoading = true;
    this.menuService.getMenus().subscribe({
      next: (data) => {
        this.menus = data.sort((a, b) => (b.menu_date || '').localeCompare(a.menu_date || ''));
        this.menuLoading = false;
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
    this.menuForm = { name: '', description: '', price: 0, image_url: '', menu_date: '' };
    this.showMenuForm = true;
    this.menuError = '';
  }

  openEditMenu(menu: Menu): void {
    this.editingMenuId = menu.id!;
    this.menuForm = { ...menu };
    this.showMenuForm = true;
    this.menuError = '';
  }

  cancelMenuForm(): void {
    this.showMenuForm = false;
    this.editingMenuId = null;
    this.menuError = '';
  }

  saveMenu(): void {
    if (!this.menuForm.name || !this.menuForm.description || !this.menuForm.price) {
      this.menuError = 'Todos los campos son obligatorios';
      return;
    }

    this.menuLoading = true;
    this.menuError = '';

    if (this.editingMenuId) {
      // Update
      this.menuService.updateMenu(this.editingMenuId, this.menuForm).subscribe({
        next: () => {
          this.showMenuForm = false;
          this.editingMenuId = null;
          this.loadMenus();
        },
        error: (err) => {
          console.error('Error actualizando menú', err);
          this.menuError = 'Error al actualizar el menú';
          this.menuLoading = false;
        }
      });
    } else {
      // Create
      this.menuService.createMenu(this.menuForm).subscribe({
        next: () => {
            alert('¡Menú creado correctamente!');
          this.showMenuForm = false;
          this.loadMenus();
        },
        error: (err) => {
          console.error('Error creando menú', err);
          this.menuError = 'Error al crear el menú';
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
        this.cdr.detectChanges();
        alert('Menú eliminado correctamente.');
      },
      error: (err) => {
        console.error('Error eliminando menú', err);
        alert('Error al eliminar el menú.');
      }
    });
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
