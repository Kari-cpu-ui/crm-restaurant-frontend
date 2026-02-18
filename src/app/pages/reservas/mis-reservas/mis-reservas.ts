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


  // Filtrar por hora
  filtrar($event: Event) {
    const htmlElement = $event.target as HTMLSelectElement;
    const hora = htmlElement.value;

    if (hora === 'Todas') {
      this.ngOnInit(); // recargar todas las reservas
    } else {
      const filtradas = this.arrReservas().filter(r => r.time === hora);
      this.arrReservas.set(filtradas);
    }
  }

  // Cancelar una reserva
  cancelarReserva(reservaId?: number) {
    if (!reservaId) return;
    this.reservasService.cancelarReserva(reservaId).subscribe({
      next: () => {
        this.arrReservas.set(this.arrReservas().filter(r => r.id !== reservaId));
        alert('Tu reserva ha sido cancelada correctamente.');
      },
      error: (err) => {
        console.error('Error al cancelar reserva:', err);
        alert('Error al cancelar la reserva. Inténtalo de nuevo.');
      }
    });
  }

  // Ir a reseñas con el código de reserva
  dejarResena(code?: string) {
    if (!code) return;
    this.router.navigate(['/review'], { queryParams: { code } });
  }


  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  isLogged(): boolean {
    return this.auth.isLogged();
  }

  isAdmin(): boolean {
    return this.auth.isAdmin();
  }

  hacerReserva(): void {
    if (this.auth.isLogged()) {
      this.router.navigate(['/reservas/nueva']);
    } else {
      alert('Debes iniciar sesión para hacer una reserva.');
      this.router.navigate(['/login']);
    }
  }
}
