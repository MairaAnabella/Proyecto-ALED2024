import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
    { // pone la ruta por defecto
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'

    },
    {
        path: 'login',
        component: LoginComponent,

    },
];
