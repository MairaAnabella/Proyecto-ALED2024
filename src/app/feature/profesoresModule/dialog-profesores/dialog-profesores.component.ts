import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Profesores } from '../profesores.model';
import { CrudProfesoresService } from '../crud-profesores.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-profesores',
  standalone: true,
  imports: [MatTableModule, MatDialogModule, MatInputModule, MatSelectModule, NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './dialog-profesores.component.html',
  styleUrl: './dialog-profesores.component.css'
})
export class DialogProfesoresComponent {
  profesorForm!: FormGroup;
  profesor!: Profesores;

  constructor(
    public dialogRef: MatDialogRef<DialogProfesoresComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private crudService: CrudProfesoresService,
    private route: Router
  ) {
    console.log(data);
    this.createForm();
    if (data.modo === 'editar') {
      this.profesorForm.patchValue({
        id:data.profesor.id,
        nombre: data.profesor.nombre,
        apellido: data.profesor.apellido,
        email: data.profesor.email,
        curso:data.profesor.curso,
        password:data.profesor.password, 
        rol: data.profesor.idRol, 
        action: data.modo 
      });
      console.log(this.profesorForm.value)
    }
  }

  createForm() {
    this.profesorForm = new FormGroup({
      id:new FormControl(''),
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      email: new FormControl(''),
      curso:new FormControl(''),
      password: new FormControl(''),
      rol: new FormControl(),
      action:new FormControl(''),

    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {

    this.profesorForm.get('rol')?.setValue(2);
    this.profesorForm.get('action')?.setValue('crear');
    console.log(this.profesorForm.value);
    let data = this.profesorForm.value;
    let jsonData = JSON.stringify(data);
    this.crudService.agregarProfesores(jsonData).subscribe((response: any) => {
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

    console.log(this.profesorForm.value);
    let data = this.profesorForm.value;
    let jsonData = JSON.stringify(data);
    this.crudService.actualizarProfesores(jsonData).subscribe((response: any) => {
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
