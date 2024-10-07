import { Component , Inject} from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { Cursos } from '../cursos.model';
import{MatTableModule} from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-dialog-cursos',
  standalone: true,
  imports: [MatTableModule,MatDialogModule,MatInputModule,MatSelectModule],
  templateUrl: './dialog-cursos.component.html',
  styleUrl: './dialog-cursos.component.css'
})
export class DialogCursosComponent {
  curso: Cursos;

  constructor(
    public dialogRef: MatDialogRef<DialogCursosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.curso = data.curso ? {...data.curso} : {id: null, nombre: '', tipo: '', fechaAlta: new Date(), fechaModificacion: new Date()};
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
