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
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rol: ['', Validators.required],
      action:['']
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
