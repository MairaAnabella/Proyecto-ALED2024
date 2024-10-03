import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

interface DashboardButton {
  icon: string;
  text: string;
  color: string;
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule, MatIconModule,
    MatGridListModule,CommonModule

  
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tiles: Tile[] = [
    { text: 'One', cols: 4, rows: 2, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 1, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 1, rows: 1, color: '#DDBDF1' },
    { text: 'Five', cols: 1, rows: 1, color: '#DDBDF5' },
  ];
  buttons: DashboardButton[] = [
    { icon: 'group', text: '1,732 USUARIOS ACTIVOS', color: 'purple' },
    { icon: 'person_add', text: '983 INSCRIPCIONES', color: 'blue' },
    { icon: 'attach_money', text: '3.050€ INGRESOS', color: 'red' },
    { icon: 'menu_book', text: '10 AFORO MEDIO', color: 'green' },
    { icon: 'book', text: '12 CURSOS ACTIVOS', color: 'yellow' },
    { icon: 'star', text: '4.3 MEDIA VALORACIONES', color: 'grey' }
  ];

}
