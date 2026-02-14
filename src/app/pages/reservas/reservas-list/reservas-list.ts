import { Component, signal } from '@angular/core';
import { Reserva } from '../../../shared/models/reserva.model';
import { AuthService } from '../../../core/services/auth';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-reservas-list',
  templateUrl: './reservas-list.html',
  styleUrls: ['./reservas-list.css'],
  standalone: true,
  imports: [RouterModule],
})
export class ReservasListComponent {
  constructor(private auth: AuthService, private router: Router) { }

  // Señal para guardar las reservas
  arrReservas = signal<Reserva[]>([]);

  // Cuando el componente carga
  ngOnInit() {
    // Datos de prueba
    this.arrReservas.set([
      { id: 1, mesaId: 2, fecha: '2026-02-08 20:00', personas: 4, userId: 1 },
      { id: 2, mesaId: 1, fecha: '2026-02-09 18:30', personas: 2, userId: 1 },
      { id: 3, mesaId: 3, fecha: '2026-02-10 21:00', personas: 5, userId: 1 },
    ]);
  }

  // Método para filtrar por mesa
  filtrar($event: Event) {
    const mesa = ($event.target as HTMLSelectElement).value;
    if (mesa === 'Todas') return this.ngOnInit();
    const filtradas = this.arrReservas().filter(r => r.mesaId === Number(mesa));
    this.arrReservas.set(filtradas);
  }

  // Método para cancelar reserva
  cancelarReserva(reservaId?: number) {
    if (!reservaId) return;
    const nuevas = this.arrReservas().filter(r => r.id !== reservaId);
    this.arrReservas.set(nuevas);
  }
}
