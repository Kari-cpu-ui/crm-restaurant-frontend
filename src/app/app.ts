import { Component, signal } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './core/services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrls: ['./app.css']  // Corregido
})
export class App {
  protected readonly title = signal('crm-restaurante');

  constructor(private router: Router, private auth: AuthService) {}

  logout() {
    try {
      this.auth.logout();
      // Puedes agregar redirección después del logout, ejemplo:
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('No se ha podido cerrar sesión', error);
    }
  }

  goToReviews() {
    this.router.navigate(['/review']);
  }
}
