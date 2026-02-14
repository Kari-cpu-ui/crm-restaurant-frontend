import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-menu-admin',
  imports: [RouterModule],
  standalone: true,
  templateUrl: './menu-admin.html',
  styleUrl: './menu-admin.css',
})
export class MenuAdminComponent {
  constructor(private auth: AuthService, private router: Router) { }

}
