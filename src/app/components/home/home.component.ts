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

  buttons: DashboardButton[] = [
    { icon: 'group', text: '1,732 USUARIOS ACTIVOS', color: 'purple' },
    { icon: 'person_add', text: '983 INSCRIPCIONES', color: 'blue' },
    { icon: 'attach_money', text: '3.050€ INGRESOS', color: 'red' },
    { icon: 'menu_book', text: '10 AFORO MEDIO', color: 'green' },
    { icon: 'book', text: '12 CURSOS ACTIVOS', color: 'yellow' },
    { icon: 'star', text: '4.3 MEDIA VALORACIONES', color: 'grey' }
  ];

}
