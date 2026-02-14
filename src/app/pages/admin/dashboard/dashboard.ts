import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  standalone: true,
  imports: [RouterLink]
})
export class AdminDashboardComponent implements OnInit {

  section: string = 'menu-create'; // Sección activa
  usersHTML: string = '';           // HTML dinámico de usuarios
  reservasHTML: string = '';        // HTML dinámico de reservas

  private API_BASE = 'http://127.0.0.1:8000'; // Base de la API

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadUsers();    // Carga usuarios desde la DB
    this.loadReservas(); // Carga reservas desde la DB
  }

  /** Cambiar sección visible en el dashboard */
  setSection(section: string): void {
    this.section = section;
  }

  /** Cargar usuarios desde la API */
  loadUsers(): void {
    this.http.get<any[]>(`${this.API_BASE}/users/`).subscribe({
      next: (data) => {
        this.usersHTML = data.map(user => {
          const roleClass = user.role === 'administrador' ? 'admin' : '';
          return `<tr>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td class="${roleClass}">${user.role}</td>
                  </tr>`;
        }).join('');
      },
      error: (err) => console.error('Error cargando usuarios', err)
    });
  }

  /** Cargar reservas desde la API */
  loadReservas(): void {
    this.http.get<any[]>(`${this.API_BASE}/reservas/`).subscribe({
      next: (data) => {
        this.reservasHTML = data.map(reserva => {
          return `<tr>
                    <td>${reserva.cliente}</td>
                    <td>${reserva.fecha}</td>
                    <td>${reserva.mesa}</td>
                    <td>${reserva.estado}</td>
                  </tr>`;
        }).join('');
      },
      error: (err) => console.error('Error cargando reservas', err)
    });
  }
}
