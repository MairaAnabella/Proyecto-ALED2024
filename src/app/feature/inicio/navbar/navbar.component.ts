import { Component, EventEmitter, HostListener, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIf, NgFor } from '@angular/common';
import { NavItems } from './nav-items';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';





interface SideNavToggle{
  screenWidth:number;
  collapsed:boolean
}


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    RouterModule,
    CommonModule,
    MatToolbarModule, MatButtonModule, MatIconModule

  
    
    
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',

})
export class NavbarComponent implements NavItems ,OnInit{



  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();

  collapsed:boolean=false;
  screenWidth:number=0;
  islogin:boolean=false;
  items: {
    route: string;
    icon: string;
    label: string;
  }[];

  constructor() {
    this.items = [
      {
        route: '/home',
        icon: 'home',
        label: 'Inicio'
      },
      {
        route: '/cursos',
        icon: 'menu_book',
        label: 'Cursos'
      },
      {
        route: '/misCursos',
        icon: 'list_alt',
        label: 'Mis cursos'
      },
      {
        route: '/gestionCursos',
        icon: 'edit_note',
        label: 'Gestionar Cursos'
      },
      {
        route: '/gestionEstudiantes',
        icon: 'manage_accounts',
        label: 'Gestionar Estudiantes'
      }
    
    ];
  }


@HostListener('window:resize',['$event']) //decorador que escucha un evento especifico del DOM este caso la medida de la pantalla
onResize(event:any){
  this.screenWidth=window.innerWidth;
  if(this.screenWidth <= 768){
    this.collapsed=false;
    this.onToggleSideNav.emit({collapsed: this.collapsed,screenWidth:this.screenWidth});
  }
}// controla el tamaño del nav segun la pantalla

    // Rutas usuarios generales 
    commonItems = [
      { route: '/home', icon: 'home', label: 'Inicio' },
      { route: '/cursos', icon: 'menu_book', label: 'Cursos' },
      { route: '/misCursos', icon: 'list_alt', label: 'Mis cursos' }
    ];
 
      // Rutas administrador
    gestionItems = [
    { route: '/gestionCursos', icon: 'edit_note', label: 'Gestionar Cursos' },
    { route: '/gestionEstudiantes', icon: 'manage_accounts', label: 'Gestionar Estudiantes' }
  ];
 idRol = localStorage.getItem('idRol'); // Obtener el id del usuario
  ngOnInit(): void {
   this.screenWidth=window.innerWidth;

   
   if (this.idRol !== '2' && this.idRol != null) {
    this.items = [...this.commonItems, ...this.gestionItems]; // Mostrar todas las rutas si el userId no es 2
  } else  {
    this.items = [...this.commonItems]; // Solo rutas comunes si el userId es 2
  }
 
 
  }




  toggleCollapse(){
    this.collapsed=!this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed,screenWidth:this.screenWidth});
  }

  closeSidenav(){
    this.collapsed=false;
    this.onToggleSideNav.emit({collapsed: this.collapsed,screenWidth:this.screenWidth});
  }


}
