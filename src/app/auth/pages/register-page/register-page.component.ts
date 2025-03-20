import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RegisterUser } from '../../interfaces/register-user.interface';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  fb = inject(FormBuilder);
  hasError = signal(false);
  isPosting = signal(false);
  router = inject(Router);
  authServie = inject(AuthService);

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    fullName: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    age: ['', [Validators.required]],
    address: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  private passwordMatchValidator() {
    if (
      this.registerForm.value.password ===
      this.registerForm.value.confirmPassword
    ) {
      return true;
    }

    return false;
  }

  onSubmit() {
    if (this.registerForm.invalid || !this.passwordMatchValidator()) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }

    const {
      email = '',
      password = '',
      fullName = '',
      confirmPassword = '',
      address = '',
      age = 1,
      phoneNumber = '',
    } = this.registerForm.value;

    const userData: RegisterUser = {
      email: email!,
      password: password!,
      fullName: fullName!,
      confirmPassword: confirmPassword!,
      address: address!,
      age: Number(age),
      phoneNumber: phoneNumber!,
    };

    this.authServie.register(userData).subscribe((isRegistered) => {
      if (isRegistered) {
        console.log('Registro existoso');
      } else {
        console.log('Hubo un error');

        this.hasError.set(true);

        setTimeout(() => {
          this.hasError.set(false);
        }, 2000);
      }
    });
  }
}
