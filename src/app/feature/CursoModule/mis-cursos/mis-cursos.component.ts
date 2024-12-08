import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiCurso } from './miCurso.model';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { CrudCursosService } from '../GestionarCursos/crud-cursos.service';
import Swal from 'sweetalert2';

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
export class MisCursosComponent implements OnInit{
  miCurso: MiCurso[] = [];

  constructor(private service:CrudCursosService){
    
  }
  ngOnInit(): void {
   this.service.misCursos().subscribe((response:any)=>{
    this.miCurso=response;
   })
  }





  hoveredCourseId: number | null = null;

  bajaCurso(curso:any) {
    console.log(curso)
    let idCurso=curso['idCurso'];
    this.service.bajaCurso(idCurso,'baja').subscribe((response:any)=>{
      if(response.success){
        Swal.fire({
          title: "Tu inscripcion al curso "+curso['nombre']+", Fue dada de baja con exito!",
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
          }
        }).then(()=>{
          window.location.reload();
        })
      } 
    })
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
1