 import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CrudProfesoresService } from '../crud-profesores.service';
import { Profesores } from '../profesores.model';
import { DialogProfesoresComponent } from '../dialog-profesores/dialog-profesores.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormField ,MatLabel} from '@angular/material/form-field';
import { MatSelect , MatOption } from '@angular/material/select';
import { CrudCursosService } from '../../CursoModule/GestionarCursos/crud-cursos.service';


import Swal from 'sweetalert2';
import { DialogCursoProfesComponent } from '../dialog-curso-profes/dialog-curso-profes.component';

@Component({
  selector: 'app-tabla-profesores',
  standalone: true,
  imports: [
    MatPaginator, 
    MatIconModule, 
    CommonModule, 
    HttpClientModule, 
    MatTableModule,
    MatFormField,
    MatSelect,
    MatLabel,
    MatOption,
    MatTooltipModule
  ],
  templateUrl: './tabla-profesores.component.html',
  styleUrl: './tabla-profesores.component.css'
})
export class TablaProfesoresComponent {
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'email',  'fechaAlta', 'fechaModificacion', 'acciones'];
  dataSource: MatTableDataSource<Profesores>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private crudService: CrudProfesoresService, private dialog: MatDialog, ) {
    this.dataSource = new MatTableDataSource<Profesores>([]);
  }

  ngOnInit() {
    this.cargarProfesor();
  }
  cargarProfesor() {
    let dato = {
      action: 'obtener'
    }
    this.crudService.obtenerProfesores(dato).subscribe((response: any) => {
      this.dataSource = response;
      this.dataSource.paginator = this.paginator;
    })

  }
 

   agregarProfesor() {
     const dialogRef = this.dialog.open(DialogProfesoresComponent ,{
       width: '400px',
       data: { modo: 'agregar' }
     });
 
        
   }
  
   editarProfesor(profesor: Profesores) {
     const dialogRef = this.dialog.open(DialogProfesoresComponent, {
       width: '400px',
       data: { modo: 'editar', profesor:profesor }
     });
     
 
   }

     
   ProfesCurso(profesor: Profesores) {
    const dialogRef = this.dialog.open(DialogCursoProfesComponent, {
      width: '400px',
      data: { modo: 'añadir', profesor:profesor }
    });
    

  }
 
   eliminarProfesor(id: any) {
 

     Swal.fire({
       title: "Estas seguro de eliminar este profesores?",
       text: "No podras revertir esto !",
       icon: "warning",
       showCancelButton: true,
       confirmButtonColor: "#3085d6",
       cancelButtonColor: "#d33",
       confirmButtonText: "Si, eliminar!"
     }).then((result) => {
       if (result.isConfirmed) {
 
         this.crudService.eliminarProfesores(id,'borrar').subscribe(() => {
           Swal.fire({
             title: "Eliminado!",
             text: "El profesor fue eliminado .",
             icon: "success"
           });
           this.cargarProfesor();
         });
 
       }
     });
 
 
 
 
 
   } 
}
