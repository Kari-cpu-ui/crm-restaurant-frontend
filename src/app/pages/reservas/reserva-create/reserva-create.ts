import { Component, inject, signal } from '@angular/core';
import { ReservaService } from '../../../core/services/reserva';
import { Reserva } from '../../../shared/models/reserva.model';


@Component({
  selector: 'app-reserva-create',
  templateUrl: './reserva-create.html',
  styleUrl: './reserva-create.css',
})
export class ReservaCreateComponent {

  reservasService = inject(ReservaService);

  nuevaReserva = signal<Reserva>({
    fecha: '',
    personas: 1,
    mesaId: 1,
    userId: 1,
  });

  async ngOnInit() {
    // para  cargar reservas existentes para verificar disponibilidad
    const todasReservas: Reserva[] = await this.reservasService.obtenerReservas(this.nuevaReserva().userId);
    console.log('Reservas existentes:', todasReservas);
  }

  async crearReserva() {
    const reserva = this.nuevaReserva();

    // Comprobar disponibilidad antes de crear
    const reservasExistentes: Reserva[] = await this.reservasService.obtenerReservas(reserva.userId);
    if (this.reservasService.estaDisponible(reserva.mesaId, reserva.fecha, reservasExistentes)) {
      const res = await this.reservasService.crearReserva(reserva);
      console.log('Reserva creada:', res);
      alert('Reserva creada con éxito');
    } else {
      alert('La mesa no está disponible en esa fecha');
    }
  }
}
