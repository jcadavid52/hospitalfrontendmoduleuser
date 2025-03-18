import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-module-user-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './module-user-navbar.component.html',
  styleUrl: './module-user-navbar.component.css'
})
export class ModuleUserNavbarComponent {
  authService = inject(AuthService);
  router = inject(Router);

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
