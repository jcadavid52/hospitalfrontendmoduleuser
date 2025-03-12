import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModuleUserNavbarComponent } from '../../components/module-user-navbar/module-user-navbar.component';

@Component({
  selector: 'app-module-user-layout',
  standalone: true,
  imports: [RouterOutlet,ModuleUserNavbarComponent],
  templateUrl: './module-user-layout.component.html',
  styleUrl: './module-user-layout.component.css'
})
export class ModuleUserLayoutComponent {

}
