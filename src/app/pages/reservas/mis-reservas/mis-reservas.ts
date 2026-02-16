import { Component, inject, signal } from '@angular/core';
import { ReservaService } from '../../../core/services/reserva';
import { Reserva } from '../../../shared/models/reserva.model';
import { AuthService } from '../../../core/services/auth';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.html',
  styleUrls: ['./mis-reservas.css'],
  standalone: true,
  imports: [RouterModule],
})
export class MisReservasComponent {
  constructor(private auth: AuthService, private router: Router) { }

  reservasService = inject(ReservaService);

  // Signal que contiene las reservas del usuario
  arrReservas = signal<Reserva[]>([]);

  // Cargar reservas al iniciar
  ngOnInit() {
    const userId = this.auth.getUserId();
    if (!userId) return;
    this.reservasService.obtenerReservas(userId).subscribe({
      next: (reservas) => this.arrReservas.set(reservas),
      error: (err) => console.error('Error al obtener reservas:', err)
    });
  }


  // Filtrar por mesa
  filtrar($event: Event) {
    const htmlElement = $event.target as HTMLSelectElement;
    const mesa = htmlElement.value;

    if (mesa === 'Todas') {
      this.ngOnInit(); // recargar todas las reservas
    } else {
      const filtradas = this.arrReservas().filter(r => r.table_id === Number(mesa));
      this.arrReservas.set(filtradas);
    }
  }

  // Cancelar una reserva
  cancelarReserva(reservaId?: number) {
    if (!reservaId) return;
    this.reservasService.cancelarReserva(reservaId).subscribe({
      next: () => this.ngOnInit(), // recargar la lista
      error: (err) => console.error('Error al cancelar reserva:', err)
    });
  }


  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  isLogged(): boolean {
    return this.auth.isLogged();
  }
}
