import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Estudiantes } from '../estudiantes.model';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
    this.createForm();
    if (data.modo === 'editar') {
      this.estudianteForm.patchValue(data.estudiante);
    }
  }

  createForm() {
    this.estudianteForm = new FormGroup({
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      email: new FormControl('')
     
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.estudianteForm.valid) {
      console.log(this.estudianteForm.value);
      // Envíe los datos del formulario al backend
      this.dialogRef.close(this.estudianteForm.value);
    }
  }
}
