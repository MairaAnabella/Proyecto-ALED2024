import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { trigger, state, style, animate, transition } from '@angular/animations';

interface Curso {
  id: number;
  nombre: string;
  descripcion: string;
  imagenUrl: string;
}

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatGridListModule],
  animations: [
    trigger('descripcionEstado', [
      state('ocultar', style({
        opacity: 0,
        height: '0px',
      })),
      state('mostrar', style({
        opacity: 1,
        height: '*',
      })),
      transition('ocultar <=> mostrar', animate('300ms ease-in-out'))
    ])
  
  ],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent {
  cursos: (Curso & { mostrarDescripcion?: boolean })[] = [
    {
      id: 1,
      nombre: 'Introducción a Angular',
      descripcion: 'Aprende los fundamentos de Angular y construye tu primera aplicación.',
      imagenUrl: '/assets/angular.jpg',
    },
    {
      id: 2,
      nombre: 'TypeScript Avanzado',
      descripcion: 'Profundiza en los conceptos de TypeScript y las mejores prácticas.',
      imagenUrl: '/assets/typescript.jpg',
    },
    {
      id: 3,
      nombre: 'Fundamentos de Diseño UI/UX',
      descripcion: 'Domina los principios del diseño de interfaz de usuario y experiencia de usuario.',
      imagenUrl: '/assets/ux-ui.webp',
    },
  ];

  breakpoint!: number;

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 800) ? 1 : (window.innerWidth <= 1200) ? 2 : 3;
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 800) ? 1 : (event.target.innerWidth <= 1200) ? 2 : 3;
  }
}
