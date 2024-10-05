import { Routes } from '@angular/router';
import { HomeComponent } from './feature/inicio/home/home.component';



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
   

];
