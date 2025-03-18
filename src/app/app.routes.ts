import { Routes } from '@angular/router';
import { noAuthGuard } from './auth/Guards/no-auth.guard';

export const routes: Routes = [
    {
      path: 'auth',
      loadChildren:() => import('./auth/auth-front.routes'),
      canActivate: [
        noAuthGuard
      ],
    },
    {
      path:'',
      loadChildren:() => import	('./module-user/module-user.routes'),

      
    },
   
];
