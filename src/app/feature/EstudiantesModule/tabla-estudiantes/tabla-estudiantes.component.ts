import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CrudEstudiantesService } from '../crud-estudiantes.service';
import { Estudiantes } from '../estudiantes.model';
import { DialogEstudiantesComponent } from '../dialog-estudiantes/dialog-estudiantes.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';


import Swal from 'sweetalert2';
@Component({
  selector: 'app-tabla-estudiantes',
  standalone: true,
  imports: [MatPaginator, MatIconModule, CommonModule, HttpClientModule, MatTableModule],
  templateUrl: './tabla-estudiantes.component.html',
  styleUrl: './tabla-estudiantes.component.css'
})
export class TablaEstudiantesComponent {
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'email', 'fechaAlta', 'fechaModificacion', 'acciones'];
  dataSource: MatTableDataSource<Estudiantes>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private crudService: CrudEstudiantesService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Estudiantes>([]);
  }

  ngOnInit() {
    this.cargarEstudiante();
  }
  cargarEstudiante() {
    let dato = {
      action: 'obtener'
    }
    this.crudService.obtenerEstudiante(dato).subscribe((response: any) => {
      this.dataSource = response;
      this.dataSource.paginator = this.paginator;
    })

  }
 

   agregarEstudiante() {
     const dialogRef = this.dialog.open(DialogEstudiantesComponent ,{
       width: '400px',
       data: { modo: 'agregar' }
     });
 
        
   }
  
   editarEstudiante(estudiante: Estudiantes) {
     const dialogRef = this.dialog.open(DialogEstudiantesComponent, {
       width: '400px',
       data: { modo: 'editar', estudiante:estudiante }
     });
     
 
   }
 
   eliminarEstudiante(id: any) {
 

     Swal.fire({
       title: "Estas seguro de eliminar este estudiante?",
       text: "No podras revertir esto !",
       icon: "warning",
       showCancelButton: true,
       confirmButtonColor: "#3085d6",
       cancelButtonColor: "#d33",
       confirmButtonText: "Si, eliminar!"
     }).then((result) => {
       if (result.isConfirmed) {
 
         this.crudService.eliminarEstudiante(id,'borrar').subscribe(() => {
           Swal.fire({
             title: "Eliminado!",
             text: "El estudiante fue eliminado .",
             icon: "success"
           });
           this.cargarEstudiante();
         });
 
       }
     });
 
 
 
 
 
   } 
}
