// Importo las rutas de Angular
import { Routes } from '@angular/router';

// Importo TODOS los componentes creados
// Estos son los "esqueletos" de las pantallas de nuestra app
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { MenuListComponent } from './pages/menus/menu-list/menu-list';
import { MenuAdminComponent } from './pages/menus/menu-admin/menu-admin';
import { ReservasListComponent } from './pages/reservas/reservas-list/reservas-list';
import { ReservaCreateComponent } from './pages/reservas/reserva-create/reserva-create';
import { MisReservasComponent } from './pages/reservas/mis-reservas/mis-reservas';
import { DashboardComponent } from './pages/admin/dashboard/dashboard';

// Defino todas las rutas de la app
// Esto es solo estructura, no contiene lógica aún
export const routes: Routes = [
  // Ruta principal o "home"
  { path: '', component: HomeComponent }, // Cuando entramos a la raíz "/", se muestra HomeComponent

  // AUTENTICACIÓN
  { path: 'login', component: LoginComponent },    // Pantalla de inicio de sesión
  { path: 'register', component: RegisterComponent }, // Pantalla de registro de usuarios

  // MENÚS
  { path: 'menus', component: MenuListComponent }, // Lista pública de menús
  { path: 'menus/admin', component: MenuAdminComponent }, // Panel admin para CRUD de menús

  // RESERVAS
  { path: 'reservas', component: ReservasListComponent }, // Lista de todas las reservas (solo visual)
  { path: 'reservas/nueva', component: ReservaCreateComponent }, // Formulario para crear nueva reserva
  { path: 'mis-reservas', component: MisReservasComponent }, // Reservas propias del usuario (ver/cancelar)

  // PANEL DE ADMIN
  { path: 'admin', component: DashboardComponent }, // Dashboard general de administración

  // Ruta comodín
  { path: '**', redirectTo: '' } // Si la ruta no existe, redirige a HomeComponent
];

/*
------------------------------------------------------
💡 Explicación:

1️- Cada "path" corresponde a una URL en el navegador.
   Ejemplo: http://localhost:4200/login → LoginComponent
2️ Los componentes actualmente están vacíos (solo esqueleto).
3️- Cuando agreguemos lógica y formularios, Angular mostrará los datos según la ruta.
4️ La estructura ayuda a que cada uno de nosotros  trabaje en su parte:
   - Home: cualquier info pública
   - Auth: login/register
   - Menús: público/admin
   - Reservas: creación y visualización
   - Admin: panel general
5️ Ruta '**' siempre al final para capturar cualquier URL que no exista y evitar errores.
------------------------------------------------------
*/

