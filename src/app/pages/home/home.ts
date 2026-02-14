import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  constructor(private auth: AuthService, private router: Router) { }

  hacerReserva() {
    if (this.auth.isLogged()) {
      // Usuarios logados pueden crear reserva
      this.router.navigate(['/reservas-create']);
    } else {
      alert('Debes iniciar sesión para hacer una reserva.');
      this.router.navigate(['/login']);
    }
  }

  verMisReservas() {
    if (this.auth.isLogged()) {
      this.router.navigate(['/mis-reservas']);
    } else {
      alert('Debes iniciar sesión para ver tus reservas.');
      this.router.navigate(['/login']);
    }
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }


  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  isLogged(): boolean {
    return this.auth.isLogged();
  }
}



