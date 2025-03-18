import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

export const Autenticated: CanActivateFn = async(route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = await firstValueFrom(authService.checkStatusToken())

  if(isAuthenticated){
    return true
  }

  
  router.navigateByUrl('auth/login');
  return false;
};


