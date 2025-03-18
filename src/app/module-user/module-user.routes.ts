import { Routes } from "@angular/router";
import { ModuleUserLayoutComponent } from "./layout/module-user-layout/module-user-layout.component";
import { AppointmentPageComponent } from "./pages/appointment-page/appointment-page.component";
import { ProtectedPageComponent } from "./pages/protected-page/protected-page.component";
import { NotfoundPageComponent } from "./pages/notfound-page/notfound-page.component";
import { IndexPageComponent } from "./pages/index-page/index-page.component";
import { NotAutenticated } from "../auth/Guards/auth.guard";

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
                    NotAutenticated
                ]

            },
            {
                path:'protected',
                component:ProtectedPageComponent,
                canActivate:[
                    NotAutenticated
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