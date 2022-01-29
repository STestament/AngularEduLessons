import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { EdictListComponent } from './lesson1/edict-list/edict-list.component';
import { LoginFormComponent } from './lesson1/login-form/login-form.component';
import { ProfileComponent } from './lesson1/profile/profile.component';

const routes: Routes = [
    { 
        path: '', redirectTo: '/edicts', pathMatch: 'full' 
    },
    { 
        path: 'edicts', 
        component: EdictListComponent,
    },
    { 
        path: 'profile', 
        canActivate: [AuthGuard],
        component: ProfileComponent,
    },
    { 
        path: 'login', 
        component: LoginFormComponent 
    },
    { 
        path: '**',
        component: LoginFormComponent  
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }