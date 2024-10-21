import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';
interface DashboardButton {
  icon: string;
  text: string;
  color: string;
  route:string;
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatIconModule, 
    MatButtonModule,
     MatMenuModule,
     NavbarComponent,


  
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

icon='psychology';
  buttons: DashboardButton[] = [
    { icon: 'menu_book', text: 'CURSOS', color: 'purple' , route:'cursos' },
    { icon: 'list_alt', text: 'MIS INSCRIPCIONES', color: 'purple', route:'misCursos' },
    { icon: 'edit_note', text: 'GESTIONAR DE CURSOS', color: 'purple', route:'gestionCursos' },
    { icon: 'manage_accounts', text: 'GESTION DE ESTUDIANTES', color: 'purple' , route:'gestionEstudiantes'},
  ];

    filteredButtons: DashboardButton[] = [];
  constructor(private router: Router, private authService:AuthService) { }


  ngOnInit(): void {
    const idRol = localStorage.getItem('idRol'); // Obtener el id del usuario
   
    console.log(idRol)

    if (idRol === '2') {
      console.log('hola')
      // Filtra los botones que quieres ocultar para usuarios con id 1
      this.filteredButtons = this.buttons.filter(button => button.route !== 'gestionEstudiantes' && button.route !=='gestionCursos');
    } else if (idRol === '1') {
      // Por ejemplo, mostrar todos los botones si el id es 2
      this.filteredButtons = this.buttons;
    } else {
      // Para otros ids, mostrar solo algunos botones
      this.filteredButtons = this.buttons.filter(button => button.route === 'cursos');
    }
  }



  navigateToPage(route: string) {
    this.router.navigate([route]);
  }

  cerrarSesion() {
    this.authService.logout().subscribe((response:any)=>{
      if(response.success){
        localStorage.removeItem('idRol');
        localStorage.removeItem('idUser');
        localStorage.removeItem('auth_status');
        
      if(localStorage.getItem('auth_status')===null){
    
        this.router.navigate(['/'], { replaceUrl: true });
       
      };
      }
    })
  }
}
