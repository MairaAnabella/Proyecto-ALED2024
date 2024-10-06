import { Routes } from '@angular/router';
import { HomeComponent } from './feature/inicio/home/home.component';
import { LoginComponent } from './feature/LoginModule/login/login.component';



export const routes: Routes = [
    { // pone la ruta por defecto
        path: 'login',
        component:LoginComponent
      

    },
  
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'

    },

 
    {
        path: 'home',
        component: HomeComponent,

    },
   

];
