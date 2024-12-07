import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../core/service/auth.service';

import Swal from 'sweetalert2';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-dialog-registro',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule],
  templateUrl: './dialog-registro.component.html',
  styleUrl: './dialog-registro.component.css'
})
export class DialogRegistroComponent {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogRegistroComponent>,
    private authService: AuthService,
    private router:Router
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('^[a-zA-ZÀ-ÿ\\s]+$')  // Solo letras y espacios
      ]],
      apellido: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('^[a-zA-ZÀ-ÿ\\s]+$')  // Solo letras y espacios
      ]],
      email: ['', [
        Validators.required,
        Validators.email  // Formato válido de correo electrónico
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),  // Mínimo de 6 caracteres
        Validators.maxLength(20), // Máximo de 20 caracteres
       // Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])') // Al menos una letra, un número y un carácter especial
      ]],
      rol: ['', Validators.required],  // Campo obligatorio
      action: ['']
    });
  }

  onSubmit() {
    this.registroForm.get('action')?.setValue('crear');
    let data =this.registroForm.value;
 
    // Convertimos los datos en JSON
    let jsonData = JSON.stringify(data);
   
     this.authService.register(jsonData).subscribe((response: any) => {

      if (response.success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Usuario creado exitosamente!",
          showConfirmButton: false,
          timer: 1500
        }).then(()=>{
          this.dialogRef.close();
          this.router.navigate(['login']);
        })
      }
    })
 

  }

  onCancel() {
    this.dialogRef.close();
  }
}
