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
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'email','fechaAlta', 'fechaModificacion', 'acciones'];
  dataSource: MatTableDataSource<Estudiantes>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private crudService: CrudEstudiantesService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Estudiantes>([]);
  }

  ngOnInit() {
    this.cargarEstudiante(true);
  }
  cargarEstudiante(usarDatosDePrueba: boolean = false) {
    if (usarDatosDePrueba) {
      // Datos de prueba
      const estudiantesPrueba: Estudiantes[] = [
        { id: 1, nombre: 'Curso 1', apellido: 'virtual', email: 'prueba@gmail.com', fechaAlta: '2022-01-01', fechaModificacion: '2022-01-01' },
        { id: 2, nombre: 'Curso 2', apellido: 'presencial', email: 'prueba@gmail.com', fechaAlta: '2022-01-15', fechaModificacion: '2022-01-15' },
        { id: 3, nombre: 'Curso 3', apellido: 'virtual', email: 'prueba@gmail.com', fechaAlta: '2022-02-21', fechaModificacion: '2022-02-01' },
        { id: 4, nombre: 'Curso 4', apellido: 'presencial', email: 'prueba@gmail.com', fechaAlta: '2022-02-22', fechaModificacion: '2022-02-05' },
        { id: 5, nombre: 'Curso 5', apellido: 'virtual', email: 'prueba@gmail.com', fechaAlta: '2022-02-24', fechaModificacion: '2022-02-29' },
        { id: 6, nombre: 'Curso 6', apellido: 'presencial', email: 'prueba@gmail.com', fechaAlta: '2022-02-15', fechaModificacion: '2022-02-31' },
        { id: 7, nombre: 'Curso 7', apellido: 'virtual', email: 'prueba@gmail.com', fechaAlta: '2022-02-10', fechaModificacion: '2022-02-22' },
      ];

      // Asignar los datos de prueba a la fuente de datos de la tabla
      this.dataSource.data = estudiantesPrueba;
      this.dataSource.paginator = this.paginator;
    } else {
      // Obtener datos desde el servicio
      this.crudService.obtenerEstudiante().subscribe(estudiante => {
        this.dataSource.data = estudiante;
        this.dataSource.paginator = this.paginator;
      });
    }
  }
  /*   cargarClases() {
      this.crudService.obtenerClases().subscribe(cursos => {
        this.dataSource.data = cursos;
        this.dataSource.paginator = this.paginator;
      });
    } */

  agregarClase() {
    const dialogRef = this.dialog.open(DialogEstudiantesComponent ,{
      width: '400px',
      data: { modo: 'agregar' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.crudService.agregarEstudiante(result).subscribe(() => {
          this.cargarEstudiante();
        });
      }
    });
  }

  editarEstudiante(estudiante: Estudiantes) {
    const dialogRef = this.dialog.open(DialogEstudiantesComponent, {
      width: '400px',
      data: { modo: 'editar', estudiante:estudiante }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.crudService.actualizarEstudiante(result).subscribe(() => {
          this.cargarEstudiante();
        });
      }
    });
  }

  eliminarEstudiante(id: number) {

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

        this.crudService.eliminarEstudiante(id).subscribe(() => {
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
