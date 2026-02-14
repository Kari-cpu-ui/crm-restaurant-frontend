import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { MenuPublicComponent } from './pages/menus/menu-public/menu-public';
import { MenuAdminComponent } from './pages/menus/menu-admin/menu-admin';
import { ReservasListComponent } from './pages/reservas/reservas-list/reservas-list';
import { ReservaCreateComponent } from './pages/reservas/reserva-create/reserva-create';
import { MisReservasComponent } from './pages/reservas/mis-reservas/mis-reservas';
import { AdminDashboardComponent } from './pages/admin/dashboard/dashboard';
import { ReviewComponent } from './pages/review/review';
import { MenuCreateComponent } from './pages/menus/menu-create/menu-create';
import { MenuEditComponent } from './pages/menus/menu-edit/menu-edit';
import { MenuFormComponent } from './pages/menus/menu-form/menu-form';

export const routes: Routes = [
  // Rutas públicas
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'menus', component: MenuPublicComponent },
  { path: 'menus/admin', component: MenuAdminComponent },
  { path: 'reservas', component: ReservasListComponent },
  { path: 'reservas/nueva', component: ReservaCreateComponent },
  { path: 'mis-reservas', component: MisReservasComponent },
  { path: 'review', component: ReviewComponent },

  // Dashboard de administración con rutas hijas
  {
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
      { path: 'menu-create', component: MenuCreateComponent },
      { path: 'menu-edit', component: MenuEditComponent },
      { path: 'menu-form', component: MenuFormComponent },
      { path: 'reservas', component: ReservasListComponent }
    ]
  },

  // Ruta comodín (404)
  { path: '**', redirectTo: '' }
];