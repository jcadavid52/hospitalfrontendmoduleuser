import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-module-user-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './module-user-navbar.component.html',
  styleUrl: './module-user-navbar.component.css'
})
export class ModuleUserNavbarComponent {

}
