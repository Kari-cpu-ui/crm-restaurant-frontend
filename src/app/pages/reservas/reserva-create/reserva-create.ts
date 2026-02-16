import { Component, inject, signal } from '@angular/core';
import { ReservaService } from '../../../core/services/reserva';
import { Reserva } from '../../../shared/models/reserva.model';
import { AuthService } from '../../../core/services/auth';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-reserva-create',
  standalone: true,
  templateUrl: './reserva-create.html',
  styleUrl: './reserva-create.css',
  imports: [RouterModule],
})
export class ReservaCreateComponent {
  constructor(private auth: AuthService, private router: Router) { }

  reservasService = inject(ReservaService);

  nuevaReserva = signal<Reserva>({
    table_id: 1,
    customer_name: '',
    date: '',
    guests: 1,
  });

  ngOnInit() {
    const userId = this.auth.getUserId() ?? '';
    this.nuevaReserva.update(r => ({ ...r, customer_name: userId }));

    // para  cargar reservas existentes para verificar disponibilidad
    this.reservasService.obtenerReservas(userId).subscribe({
      next: (todasReservas) => console.log('Reservas existentes:', todasReservas),
      error: (err) => console.error('Error al obtener reservas:', err)
    });
  }

  crearReserva() {
    const reserva = this.nuevaReserva();

    // Comprobar disponibilidad antes de crear
    this.reservasService.obtenerReservas(reserva.customer_name).subscribe({
      next: (reservasExistentes) => {
        if (this.reservasService.estaDisponible(reserva.table_id, reserva.date, reservasExistentes)) {
          this.reservasService.crearReserva(reserva).subscribe({
            next: (res) => {
              console.log('Reserva creada:', res);
              alert('Reserva creada con éxito');
              this.router.navigate(['/mis-reservas']);
            },
            error: (err) => console.error('Error al crear reserva:', err)
          });
        } else {
          alert('La mesa no está disponible en esa fecha');
        }
      },
      error: (err) => console.error('Error al verificar disponibilidad:', err)
    });
  }

  actualizarCampo(campo: string, event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    const reservaActual = this.nuevaReserva();

    if (campo === 'table_id' || campo === 'guests') {
      this.nuevaReserva.set({ ...reservaActual, [campo]: Number(valor) });
    } else {
      this.nuevaReserva.set({ ...reservaActual, [campo]: valor });
    }
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  isLogged(): boolean {
    return this.auth.isLogged();
  }
}
