import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  fb = inject(FormBuilder);
  hasError = signal(false);
  isPosting = signal(false);
  router = inject(Router);

  authService = inject(AuthService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      console.log(this.loginForm);
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }

    const { email = '', password = '' } = this.loginForm.value;

    console.log({ email, password });

    this.authService.login(email!, password!).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigateByUrl('/');
      }
      this.hasError.set(true);

      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
    });
  }
}
