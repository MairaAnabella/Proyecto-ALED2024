import { Routes } from '@angular/router';
import { HomeComponent } from './feature/inicio/home/home.component';
import { LoginComponent } from './feature/LoginModule/login/login.component';
import { CursosComponent } from './feature/CursoModule/cursos/cursos.component';
import { TablaCursosComponent } from './feature/CursoModule/GestionarCursos/tabla-cursos/tabla-cursos.component';
import { TablaEstudiantesComponent } from './feature/EstudiantesModule/tabla-estudiantes/tabla-estudiantes.component';
import { MisCursosComponent } from './feature/CursoModule/mis-cursos/mis-cursos.component';



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
    
    {
        path: 'cursos',
        component:CursosComponent ,

    },
    {
        path: 'gestionCursos',
        component:TablaCursosComponent ,

    },  {
        path: 'gestionEstudiantes',
        component:TablaEstudiantesComponent,

    },
    {
        path: 'misCursos',
        component:MisCursosComponent,

    },
   

];
