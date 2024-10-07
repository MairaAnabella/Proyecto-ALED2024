import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { NavbarComponent } from '../navbar/navbar.component';
interface DashboardButton {
  icon: string;
  text: string;
  color: string;
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
    { icon: 'menu_book', text: 'CURSOS', color: 'purple' },
    { icon: 'list_alt', text: 'MIS INSCRIPCIONES', color: 'purple' },
    { icon: 'edit_note', text: 'GESTIONAR DE CURSOS', color: 'purple' },
    { icon: 'manage_accounts', text: 'GESTION DE ESTUDIANTES', color: 'purple' },
   /*  { icon: 'book', text: '12 CURSOS ACTIVOS', color: 'purple' },
    { icon: 'star', text: '4.3 MEDIA VALORACIONES', color: 'purple' } */
  ];

}
