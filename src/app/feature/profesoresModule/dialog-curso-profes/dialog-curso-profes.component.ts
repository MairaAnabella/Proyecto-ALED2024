import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CrudCursosService } from '../../CursoModule/GestionarCursos/crud-cursos.service';
import { CrudProfesoresService } from '../crud-profesores.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dialog-curso-profes',
  standalone: true,
  imports: [    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './dialog-curso-profes.component.html',
  styleUrl: './dialog-curso-profes.component.css'
})
export class DialogCursoProfesComponent implements OnInit {
  cursosOptions:any=[];
  profesores:any=[];

  selectionForm = this.fb.group({
    profesor: ['', Validators.required],
    curso: ['', Validators.required]
  });


constructor( @Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder,private crudCurso:CrudCursosService,private crudService: CrudProfesoresService, private route: Router,) {}
ngOnInit() {
  this.cargarProfesor();
}
cargarProfesor() {
  let dato = {
    action: 'obtener'
  }
  this.crudService.obtenerProfesores(dato).subscribe((response: any) => {
    this.profesores=response;
    console.log(this.profesores)
  })

  this.crudCurso.obtenerCursos(dato).subscribe((response:any)=>{
    this.cursosOptions=response;
    console.log(this.cursosOptions);
  })

}
  onSubmit() {
    if (this.selectionForm.valid) {
      this.crudService.asignarProfesorCurso(this.selectionForm.value).subscribe((response:any)=>{
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "se asigno correctamente el profesor al curso ",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.reload();
          this.route.navigate(['/gestionProfesores']);
        });
      })
     
    }
  }
}
