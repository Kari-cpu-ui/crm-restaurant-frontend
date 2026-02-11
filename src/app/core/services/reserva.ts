import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Reserva } from '../../shared/models/reserva.model';
import { API_BASE_URL } from '../../app.config';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {

  private http = inject(HttpClient);
  private apiUrl = `${API_BASE_URL}/reservas`;

  // Para Crear una reserva
  crearReserva(reserva: Reserva) {
    return firstValueFrom(this.http.post<Reserva>(this.apiUrl, reserva));
  }

  // Para listar reservas de un usuario
  obtenerReservas(userId: number) {
    return firstValueFrom(this.http.get<Reserva[]>(`${this.apiUrl}?userId=${userId}`));
  }

  // Cancelar reserva
  cancelarReserva(reservaId: number) {
    return firstValueFrom(this.http.delete(`${this.apiUrl}/${reservaId}`));
  }

  // Verificar disponibilidad (simple)
  estaDisponible(mesaId: number, fecha: string, reservasExistentes: Reserva[]): boolean {
    return !reservasExistentes.some(r => r.mesaId === mesaId && r.fecha === fecha);
  }
}
