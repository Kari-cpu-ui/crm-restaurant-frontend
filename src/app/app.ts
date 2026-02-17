import { Component, signal } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from './core/services/auth';
import { HomeComponent } from "./pages/home/home";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']  // Corregido
})
export class App {
  protected readonly title = signal('crm-restaurante');

  constructor(private router: Router, private auth: AuthService) { }

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
