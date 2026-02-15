import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      alert('Completa correctamente el formulario');
      return;
    }

    const { email, password } = this.loginForm.value;

    this.auth.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/mis-reservas']);
      },
      error: err => {
        console.error('Error login', err);
        alert('Email o contraseña incorrectos');
      }
    });
  }

  logout(): void {
    this.auth.logout();
  }

  isLogged(): boolean {
    return this.auth.isLogged();
  }
}
