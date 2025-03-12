import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: 'auth',
      loadChildren:() => import('./auth/auth-front.routes')
    },
    {
      path:'',
      loadChildren:() => import	('./module-user/module-user.routes')
      
    },
   
];
