import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  isAdmin(): boolean {
    return this.auth.isAdmin();
  }

  isLogged(): boolean {
    return this.auth.isLogged();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}