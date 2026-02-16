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

  section: string = 'menu-create';

  private API_BASE = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Inicialmente no cargamos usuarios ni reservas
  }

  setSection(section: string): void {
    this.section = section;

    if (section === 'usuarios') {
      this.loadUsers();
    }

    if (section === 'reservas') {
      this.loadReservas();
    }
  }

  // Cargar usuarios desde la DB
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

  // Cargar reservas desde la DB
  loadReservas(): void {
    this.http.get<any[]>(`${this.API_BASE}/reservations/`).subscribe({
      next: (data) => {
        let html = '';
        data.forEach(reserva => {
          html += `
<tr>
  <td>${reserva.customer_name}</td>
  <td>${reserva.date}</td>
  <td>${reserva.table_id}</td>
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
}
