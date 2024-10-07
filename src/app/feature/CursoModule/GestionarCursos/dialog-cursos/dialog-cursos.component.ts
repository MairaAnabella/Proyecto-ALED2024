import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cursos } from '../cursos.model';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
    this.createForm();
    if (data.modo === 'editar') {
      this.cursoForm.patchValue(data.curso);
    }
  }

  createForm() {
    this.cursoForm = new FormGroup({
      nombre: new FormControl(''),
      descripcion: new FormControl(''),
      tipo: new FormControl('')
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.cursoForm.valid) {
      console.log(this.cursoForm.value);
      // Envíe los datos del formulario al backend
      this.dialogRef.close(this.cursoForm.value);
    }
  }
}