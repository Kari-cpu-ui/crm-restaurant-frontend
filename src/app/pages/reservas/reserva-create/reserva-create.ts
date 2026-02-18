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
    time: '',
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

    const hoy = new Date();
    const fechaSeleccionada = new Date(reserva.date);

    if (fechaSeleccionada < new Date(hoy.setHours(0, 0, 0, 0))) {
      alert('No puedes seleccionar una fecha pasada.');
      return;
    }

    this.reservasService.crearReserva(reserva).subscribe({
      next: (res) => {
        alert('Reserva creada con éxito');
        this.router.navigate(['/mis-reservas']);
      },
      error: (err) => {
        // Mostrar mensaje del backend en alerta amigable
        if (err.error && err.error.detail) {
          alert(err.error.detail);  // Esa hora no está disponible, intenta otra.
        } else {
          alert('Error al crear la reserva. Intenta nuevamente.');
        }
      }
    });
  }

  actualizarCampo(campo: string, event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    const reservaActual = this.nuevaReserva();

    if (campo === 'guests') {
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
