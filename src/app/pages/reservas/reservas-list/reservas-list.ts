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
      { id: 1, table_id: 2, date: '2026-02-08', guests: 4, customer_name: '1' },
      { id: 2, table_id: 1, date: '2026-02-09', guests: 2, customer_name: '1' },
      { id: 3, table_id: 3, date: '2026-02-10', guests: 5, customer_name: '1' },
    ]);
  }

  // Método para filtrar por mesa
  filtrar($event: Event) {
    const mesa = ($event.target as HTMLSelectElement).value;
    if (mesa === 'Todas') return this.ngOnInit();
    const filtradas = this.arrReservas().filter(r => r.table_id === Number(mesa));
    this.arrReservas.set(filtradas);
  }

  // Método para cancelar reserva
  cancelarReserva(reservaId?: number) {
    if (!reservaId) return;
    const nuevas = this.arrReservas().filter(r => r.id !== reservaId);
    this.arrReservas.set(nuevas);
  }
}
