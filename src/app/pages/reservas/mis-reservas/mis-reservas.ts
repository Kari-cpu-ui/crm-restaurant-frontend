import { Component, inject, signal } from '@angular/core';
import { ReservaService } from '../../../core/services/reserva';
import { Reserva } from '../../../shared/models/reserva.model';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.html',
  styleUrls: ['./mis-reservas.css'],
  standalone: true,
  imports: [], 
})
export class MisReservasComponent {

  reservasService = inject(ReservaService);

  // Signal que contiene las reservas del usuario
  arrReservas = signal<Reserva[]>([]);

  // Cargar reservas al iniciar
  async ngOnInit() {
    const reservas = await this.reservasService.obtenerReservas(1); 
    this.arrReservas.set(reservas);
  }

  // Filtrar por mesa
  filtrar($event: Event) {
    const htmlElement = $event.target as HTMLSelectElement;
    const mesa = htmlElement.value;

    if (mesa === 'Todas') {
      this.ngOnInit(); // recargar todas las reservas
    } else {
      const filtradas = this.arrReservas().filter(r => r.mesaId === Number(mesa));
      this.arrReservas.set(filtradas);
    }
  }

  // Cancelar una reserva
  async cancelarReserva(reservaId?: number) {
    if (!reservaId) return;
    await this.reservasService.cancelarReserva(reservaId);
    this.ngOnInit(); // recargar la lista
  }
}
