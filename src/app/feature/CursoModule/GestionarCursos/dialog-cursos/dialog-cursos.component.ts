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
        docente:data.curso.nombreProfe+' '+data.curso.apelliProfe,
        horario:data.curso.horario,
        descripcion:data.curso.descripcion,
        action:data.modo
      });
      this.cursoForm.get('docente')?.disable();
    }
  }

  createForm() {
    this.cursoForm = new FormGroup({
      id: new FormControl(''),
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-ZÀ-ÿ\\s]+$')  // Solo letras y espacios
      ]),
      tipo: new FormControl('', Validators.required),
      periodo: new FormControl('', Validators.required),
      docente: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-ZÀ-ÿ\\s]+$')  // Solo letras y espacios
      ]),
      horario: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+$')  // Solo números
      ]),
      descripcion: new FormControl('', [
        Validators.maxLength(200)
      ]),
      action: new FormControl(''),
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
          title: "Curso creado exitosamente!",
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
    this.cursoForm.get('action')?.setValue('editar');
    console.log(this.cursoForm.value);
    let data = this.cursoForm.value;
    let jsonData = JSON.stringify(data);
    this.crudService.actualizarCurso(jsonData).subscribe((response: any) => {
      if (response.success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Curso editado exitosamente!",
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