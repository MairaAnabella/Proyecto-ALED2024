import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Estudiantes } from '../estudiantes.model';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CrudEstudiantesService } from '../crud-estudiantes.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dialog-estudiantes',
  standalone: true,
  imports: [MatTableModule, MatDialogModule, MatInputModule, MatSelectModule, NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './dialog-estudiantes.component.html',
  styleUrl: './dialog-estudiantes.component.css'
})
export class DialogEstudiantesComponent {
  estudianteForm!: FormGroup;
  estudiante!: Estudiantes;

  constructor(
    public dialogRef: MatDialogRef<DialogEstudiantesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private crudService: CrudEstudiantesService,
    private route: Router
  ) {
    console.log(data);
    this.createForm();
    if (data.modo === 'editar') {
      this.estudianteForm.patchValue({
        id:data.estudiante.id,
        nombre: data.estudiante.nombre,
        apellido: data.estudiante.apellido,
        email: data.estudiante.email,
        password:data. estudiante.password, // Puedes dejarlo vacío si no lo necesitas mostrar
        rol: data.estudiante.idRol, // Asociamos `idRol` con el campo `rol`
        action: data.modo // Aquí asignamos el valor de `modo` al campo `action`
      });
      console.log(this.estudianteForm.value)
    }
  }

  createForm() {
    this.estudianteForm = new FormGroup({
      id:new FormControl(''),
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      rol: new FormControl(),
      action:new FormControl(''),

    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {

    this.estudianteForm.get('rol')?.setValue(2);
    this.estudianteForm.get('action')?.setValue('crear');
    console.log(this.estudianteForm.value);
    let data = this.estudianteForm.value;
    let jsonData = JSON.stringify(data);
    this.crudService.agregarEstudiante(jsonData).subscribe((response: any) => {
      if (response.success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Usuario creado exitosamente!",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.reload();
          this.route.navigate(['/gestionEstudiantes']);
        })
      }
    })

  }


  onSubmitEdit() {

    console.log(this.estudianteForm.value);
    let data = this.estudianteForm.value;
    let jsonData = JSON.stringify(data);
    this.crudService.actualizarEstudiante(jsonData).subscribe((response: any) => {
      if (response.success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Usuario editado exitosamente!",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.reload();
          this.route.navigate(['/gestionEstudiantes']);
        })
      }
    })

  }

}
