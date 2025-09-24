import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';


export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // default redirect to login
  { path: '**', redirectTo: '/login' }  // wildcard redirect
];