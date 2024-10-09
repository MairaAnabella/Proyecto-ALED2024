import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cursos } from '../cursos.model';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CrudCursosService } from '../crud-cursos.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-cursos',
  standalone: true,
  imports: [MatTableModule, MatDialogModule, MatInputModule, MatSelectModule, NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './dialog-cursos.component.html',
  styleUrl: './dialog-cursos.component.css'
})
export class DialogCursosComponent {
  cursoForm!: FormGroup;
  curso!: Cursos;

  constructor(
    public dialogRef: MatDialogRef<DialogCursosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private crudService:CrudCursosService,
    private route:Router
  ) {
    console.log(data);
    this.createForm();
    if (data.modo === 'editar') {
      this.cursoForm.patchValue({
        id:data.curso.id,
        nombre:data.curso.nombre,
        tipo:data.curso.tipo,
        periodo:data.curso.periodo,
        docente:data.curso.docente,
        horario:data.curso.horario,
        descripcion:data.curso.descripcion,
        action:data.modo
      });
    }
  }

  createForm() {
    this.cursoForm = new FormGroup({
      id:new FormControl(''),
      nombre: new FormControl(''),
      tipo: new FormControl(''),
      periodo: new FormControl(''),
      docente: new FormControl(''),
      horario: new FormControl(''),
      descripcion: new FormControl(''),
      action:new FormControl(''),
    
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.cursoForm.get('action')?.setValue('crear');
    console.log(this.cursoForm.value);
    let data = this.cursoForm.value;
    let jsonData = JSON.stringify(data);
    this.crudService.agregarCurso(jsonData).subscribe((response: any) => {
      if (response.success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Usuario creado exitosamente!",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.reload();
          this.route.navigate(['/gestionCursos']);
        })
      }
    })

  }


  
  onSubmitEdit() {

    console.log(this.cursoForm.value);
    let data = this.cursoForm.value;
    let jsonData = JSON.stringify(data);
    this.crudService.actualizarCurso(jsonData).subscribe((response: any) => {
      if (response.success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Usuario editado exitosamente!",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.reload();
          this.route.navigate(['/gestionCursos']);
        })
      }
    })

  }
}