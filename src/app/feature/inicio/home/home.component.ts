import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
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
    CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatMenuModule,NavbarComponent

  
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
icon='psychology';
  buttons: DashboardButton[] = [
    { icon: 'menu_book', text: 'CURSOS', color: 'purple' , route:'cursos' },
    { icon: 'list_alt', text: 'MIS INSCRIPCIONES', color: 'purple', route:'misCursos' },
    { icon: 'edit_note', text: 'GESTIONAR DE CURSOS', color: 'purple', route:'gestionCursos' },
    { icon: 'manage_accounts', text: 'GESTION DE ESTUDIANTES', color: 'purple' , route:'gestionEstudiantes'},
   /*  { icon: 'book', text: '12 CURSOS ACTIVOS', color: 'purple' },
    { icon: 'star', text: '4.3 MEDIA VALORACIONES', color: 'purple' } */
  ];
  constructor(private router: Router) { }

  navigateToPage(route: string) {
    this.router.navigate([route]);
  }
}
