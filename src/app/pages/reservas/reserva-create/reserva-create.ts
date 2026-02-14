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

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  isLogged(): boolean {
    return this.auth.isLogged();
  }
}
