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

  constructor(private crudCurso: CrudCursosService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Cursos>([]);
  }

  ngOnInit() {
    this.cargarCursos();
  }
  cargarCursos() {
    let dato={
      action:'obtener'
    }
    this.crudCurso.obtenerCursos(dato).subscribe((response:any)=>{
      this.dataSource=response;
      this.dataSource.paginator=this.paginator;
    })
   
  }
  agregarCurso() {
    const dialogRef = this.dialog.open(DialogCursosComponent, {
      width: '400px',
      data: { modo: 'agregar' }
    });

   
  }

  editarCurso(curso: Cursos) {
    const dialogRef = this.dialog.open(DialogCursosComponent, {
      width: '400px',
      data: { modo: 'editar', curso: curso }
    });

   
  }

  eliminarCurso(id: any) {

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

        this.crudCurso.eliminarCurso(id,'borrar').subscribe(() => {
          Swal.fire({
            title: "Eliminado!",
            text: "El curso fue eliminado .",
            icon: "success"
          });
          this.cargarCursos();
        });

      }
    });





  }
}
