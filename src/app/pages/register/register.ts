import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Registrar usuario
  register(): void {
    if (this.registerForm.invalid) {
      alert('Completa correctamente el formulario');
      return;
    }

    const { nombre, email, password } = this.registerForm.value;

    this.auth.register(nombre, email, password).subscribe({
      next: () => {
        alert('Usuario registrado exitosamente');
        this.router.navigate(['/login']);
      },
      error: err => {
        console.error('Error registrando usuario', err);
        alert('Error registrando usuario. Revisa la consola.');
      }
    });
  }
}
