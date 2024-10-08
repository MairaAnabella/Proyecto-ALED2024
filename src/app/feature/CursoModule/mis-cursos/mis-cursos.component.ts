import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiCurso } from './miCurso.model';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-mis-cursos',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('cardAnimation', [
      state('in', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(50px)'
        }),
        animate('300ms ease-out')
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({
          opacity: 0,
          transform: 'translateY(50px)'
        }))
      ])
    ]),
    trigger('hoverAnimation', [
      state('normal', style({
        transform: 'scale(1)',
        boxShadow: 'none'
      })),
      state('hovered', style({
        transform: 'scale(1.03)',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
      })),
      transition('normal <=> hovered', [
        animate('200ms ease-in-out')
      ])
    ])
  ],
  templateUrl: './mis-cursos.component.html',
  styleUrl: './mis-cursos.component.css'
})
export class MisCursosComponent {
  miCurso: MiCurso[] = [
    { id: 1, nombre: 'Materia MAM 1 (MAM-1)', periodo: 'Anual 2019', docente: 'García Rosana (Titular), Abonjo Lola (JTP)', horario: '',tipo:'' },
    { id: 2, nombre: 'Comisión: B - Anual 2019', periodo: 'Anual 2019', docente: 'Julianes Profesor (Titular), Sensei Kakaroto (Adjunto)', horario: 'Horario: Mar 11:00 a 13:00',tipo:'' },
    { id: 3, nombre: 'Comisión: A - Anual 2019', periodo: 'Anual 2019', docente: 'Julianes Profesor (Titular), Sensei Kakaroto (Adjunto)', horario: 'Horario: Jue 14:00 a 16:00',tipo:'' },
  ];

  hoveredCourseId: number | null = null;

  unsubscribe(courseId: number) {
    this.miCurso = this.miCurso.filter(curso => curso.id !== courseId);
  }

  onAnimationDone(event: any, courseId: number) {
    if (event.toState === 'void') {
      console.log(`Animation completed for course: ${courseId}`);
      // You can perform additional actions here after the animation is done
    }
  }

  onMouseEnter(courseId: number) {
    this.hoveredCourseId = courseId;
  }

  onMouseLeave() {
    this.hoveredCourseId = null;
  }
}
