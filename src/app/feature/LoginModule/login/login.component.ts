import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { DialogRegistroComponent } from '../dialog-registro/dialog-registro.component';
import { AuthService } from '../../../core/service/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    NgIf
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

 loginForm: FormGroup;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private authService:AuthService,private router:Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    let email=this.loginForm.get('email')?.value;
    let password=this.loginForm.get('password')?.value;
    this.authService.login(email,password).subscribe((response:any)=>{
      if(response.success){
        localStorage.setItem('idRol',response.idRol);
        localStorage.setItem('idUser',response.idUser);
        localStorage.setItem('auth_status',response.auth_status);
        this.router.navigate(['home']);
        window.location.reload();
      }else{
        Swal.fire({
          title: "El usuario o la contraseña no son validos!",
          width: 600,
          padding: "3em",
          color: "#716add",
          backdrop: `
            rgba(0,0,123,0.4)
            
            left top
            no-repeat
          `
        });
      }

    })
  }
 
  openRegistrationDialog() {
    const dialogRef = this.dialog.open(DialogRegistroComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Registration data:', result);
        // Handle the registration data, e.g., show a success message
      }
    });
  }
}
