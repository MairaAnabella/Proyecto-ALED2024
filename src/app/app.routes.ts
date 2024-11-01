import { Routes } from '@angular/router';
import { HomeComponent } from './feature/inicio/home/home.component';
import { LoginComponent } from './feature/LoginModule/login/login.component';
import { CursosComponent } from './feature/CursoModule/cursos/cursos.component';
import { TablaCursosComponent } from './feature/CursoModule/GestionarCursos/tabla-cursos/tabla-cursos.component';
import { TablaEstudiantesComponent } from './feature/EstudiantesModule/tabla-estudiantes/tabla-estudiantes.component';
import { MisCursosComponent } from './feature/CursoModule/mis-cursos/mis-cursos.component';
import { authGuard } from './core/guards/auth.guard';
import { noAuthGuard} from './core/guards/noauth.guard';
import { NavbarComponent } from './feature/inicio/navbar/navbar.component';
import { TablaProfesoresComponent } from './feature/profesoresModule/tabla-profesores/tabla-profesores.component';
import { rolUserGuard } from './core/guards/rol-user.guard';
import { ErrorPageComponent } from './feature/error-page/error-page.component';



export const routes: Routes = [
    { // pone la ruta por defecto
        path: 'login',
        component:LoginComponent,
        canActivate:[noAuthGuard]
      

    },{
        path:'',
        redirectTo:'login',
        pathMatch:'full',
       

    },
    
    {
        path: 'home',
        component: HomeComponent,
        canActivate:[authGuard]

    },{
        path: 'cursos',
        component:CursosComponent ,
        canActivate:[authGuard]

    },{
        path: 'gestionCursos',
        /* component:TablaCursosComponent  */
        loadComponent:()=>import('./feature/CursoModule/GestionarCursos/tabla-cursos/tabla-cursos.component').then((c)=>c.TablaCursosComponent),
        canActivate:[authGuard,rolUserGuard]

    },{
        path: 'gestionEstudiantes',
        /* component:TablaEstudiantesComponent, */
        loadComponent:()=>import('./feature/EstudiantesModule/tabla-estudiantes/tabla-estudiantes.component').then((c)=>c.TablaEstudiantesComponent),
        canActivate:[authGuard,rolUserGuard]

    },/* {
        path: 'gestionProfesores',
       component:TablaProfesoresComponent, 
        loadComponent:()=>import('./feature/CursoModule/GestionarCursos/tabla-cursos/tabla-cursos.component').then((c)=>c.TablaCursosComponent),
        canActivate:[authGuard,rolUserGuard]

    }, */{
        path: 'misCursos',
        component:MisCursosComponent,
        canActivate:[authGuard]

    },{
        path:'nav',
        component:NavbarComponent,
        canActivate:[authGuard]
    },{
        path:'noAutorizado',
        component:ErrorPageComponent
    },
 
   

];
