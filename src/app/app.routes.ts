import { Routes } from '@angular/router';
import {  NotAutenticated } from './auth/Guards/auth.guard';

export const routes: Routes = [
    {
      path: 'auth',
      loadChildren:() => import('./auth/auth-front.routes'),
      
    },
    {
      path:'',
      loadChildren:() => import	('./module-user/module-user.routes'),

      
    },
   
];
