import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CrudCursosService } from '../crud-cursos.service';
import { Cursos } from '../cursos.model';
import { DialogCursosComponent } from '../dialog-cursos/dialog-cursos.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-cursos',
  standalone: true,
  imports: [MatPaginator, MatIconModule, CommonModule, HttpClientModule, MatTableModule],
  templateUrl: './tabla-cursos.component.html',
  styleUrl: './tabla-cursos.component.css'
})
export class TablaCursosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'tipo', 'descripcion', 'fechaAlta', 'fechaModificacion', 'acciones'];
  dataSource: MatTableDataSource<Cursos>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private crudService: CrudCursosService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Cursos>([]);
  }

  ngOnInit() {
    this.cargarClases(true);
  }
  cargarClases(usarDatosDePrueba: boolean = false) {
    if (usarDatosDePrueba) {
      // Datos de prueba
      const cursosDePrueba: Cursos[] = [
        { id: 1, nombre: 'Curso 1', tipo: 'virtual', descripcion: '', fechaAlta: '2022-01-01', fechaModificacion: '2022-01-01' },
        { id: 2, nombre: 'Curso 2', tipo: 'presencial', descripcion: '', fechaAlta: '2022-01-15', fechaModificacion: '2022-01-15' },
        { id: 3, nombre: 'Curso 3', tipo: 'virtual', descripcion: '', fechaAlta: '2022-02-21', fechaModificacion: '2022-02-01' },
        { id: 4, nombre: 'Curso 4', tipo: 'presencial', descripcion: '', fechaAlta: '2022-02-22', fechaModificacion: '2022-02-05' },
        { id: 5, nombre: 'Curso 5', tipo: 'virtual', descripcion: '', fechaAlta: '2022-02-24', fechaModificacion: '2022-02-29' },
        { id: 6, nombre: 'Curso 6', tipo: 'presencial', descripcion: '', fechaAlta: '2022-02-15', fechaModificacion: '2022-02-31' },
        { id: 7, nombre: 'Curso 7', tipo: 'virtual', descripcion: '', fechaAlta: '2022-02-10', fechaModificacion: '2022-02-22' },
      ];

      // Asignar los datos de prueba a la fuente de datos de la tabla
      this.dataSource.data = cursosDePrueba;
      this.dataSource.paginator = this.paginator;
    } else {
      // Obtener datos desde el servicio
      this.crudService.obtenerClases().subscribe(cursos => {
        this.dataSource.data = cursos;
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
    const dialogRef = this.dialog.open(DialogCursosComponent, {
      width: '400px',
      data: { modo: 'agregar' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.crudService.agregarClase(result).subscribe(() => {
          this.cargarClases();
        });
      }
    });
  }

  editarClase(curso: Cursos) {
    const dialogRef = this.dialog.open(DialogCursosComponent, {
      width: '400px',
      data: { modo: 'editar', curso: curso }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.crudService.actualizarClase(result).subscribe(() => {
          this.cargarClases();
        });
      }
    });
  }

  eliminarClase(id: number) {

    Swal.fire({
      title: "Estas seguro de eliminar este curso?",
      text: "No podras revertir esto !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {

        this.crudService.eliminarClase(id).subscribe(() => {
          Swal.fire({
            title: "Eliminado!",
            text: "El curso fue eliminado .",
            icon: "success"
          });
          this.cargarClases();
        });

      }
    });





  }
}
