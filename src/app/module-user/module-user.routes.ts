import { Routes } from "@angular/router";
import { ModuleUserLayoutComponent } from "./layout/module-user-layout/module-user-layout.component";
import { AppointmentPageComponent } from "./pages/appointment-page/appointment-page.component";
import { ProtectedPageComponent } from "./pages/protected-page/protected-page.component";
import { NotfoundPageComponent } from "./pages/notfound-page/notfound-page.component";
import { IndexPageComponent } from "./pages/index-page/index-page.component";
import { Autenticated } from "../auth/Guards/autenticated.guard";

export const ModuleUserRoutes:Routes = [
    {
        path:'',
        component:ModuleUserLayoutComponent,
        children:[
            
            {
                path:'',
                component:IndexPageComponent,
                
                
            },
            {
                path:'appointments',
                component:AppointmentPageComponent,
                canActivate:[
                    Autenticated
                ]

            },
            {
                path:'protected',
                component:ProtectedPageComponent,
                canActivate:[
                    Autenticated
                ]
            },
            {
                path:'**',
                component:NotfoundPageComponent
            }
        ],
        
    },
    {
        path:'**',
        component:NotfoundPageComponent
    }
]

export  default ModuleUserRoutes;