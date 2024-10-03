import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
    { // pone la ruta por defecto
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'

    },
    {
        path: 'home',
        component: HomeComponent,

    },
    {
        path:'login',
        component:LoginComponent
    }
];
