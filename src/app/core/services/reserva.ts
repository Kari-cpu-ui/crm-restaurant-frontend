import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva } from '../../shared/models/reserva.model';
import { API_BASE_URL } from '../../app.config';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {

  private http = inject(HttpClient);
  private apiUrl = `${API_BASE_URL}/reservations`;

  // Para Crear una reserva
  crearReserva(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.apiUrl, reserva);
  }

  // Para listar reservas de un usuario
  obtenerReservas(customerId: string): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/user/${customerId}`);
  }

  // Cancelar reserva
  cancelarReserva(reservaId: number): Observable<Object> {
    return this.http.delete(`${this.apiUrl}/${reservaId}`);
  }


}
